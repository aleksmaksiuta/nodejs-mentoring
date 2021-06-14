import csvtojson from 'csvtojson';
import fs from 'fs';

const PROCESS_MODES = {
  STREAM: 'stream',
  LINE: 'line',
};
let currentMode = PROCESS_MODES.STREAM;

console.log(`Selected parsing mode: ${currentMode}`);

const onError = (err) => {
  console.error(err);
};
const onComplete = () => {
  console.log('End of file');
};

const getOutputFileName = (absoluteFileName, ext = 'txt') => {
  try {
    if (!absoluteFileName) {
      throw new Error('No filename provided');
    }

    const fileName = absoluteFileName
      .split('/')
      .pop()
      .split('.')
      .shift();

    let nameFound = false;
    let postfix = 2;
    let outputFileName;

    while (!nameFound) {
      try {
        const fileNameToCheck = `${fileName}_${postfix++}`;

        if (fs.existsSync(`${fileNameToCheck}.${ext}`) === false) {
          nameFound = true;
          outputFileName = fileNameToCheck;
        }
      } catch(err) {
        onError(`Error: ${err.message}`)
      }
    }

    return outputFileName;
  } catch (err) {
    onError(`Error: ${err.message}`)
  }
}

const readFileByLine = (filePath) => {
  try {
    const outputFileName = getOutputFileName(filePath) + '.txt';
    const ws = fs.createWriteStream(outputFileName);

    csvtojson({ noheader: false })
      .fromFile(filePath)
      .on('data', data => {
        ws.write(data);
      })
      .on('error', err => {
        onError(err);
      })
      .on('done', () => {
        ws.end();
        onComplete();
      });
  } catch (err) {
    onError(`Error: ${err.message}`)
  }
};

const readFileByLineStream = (filePath) => {
  try {
    const rs = fs.createReadStream(filePath)
    rs.on('error', err => {
      onError(err);
    });

    const outputFileName = getOutputFileName(filePath) + '.txt';
    const ws = fs.createWriteStream(outputFileName);

    csvtojson({ noheader: false })
      .fromStream(rs)
      .on('done', () => {
        ws.end();
        onComplete();
      })
      .pipe(ws)
      .on('error', err => {
        onError(err);
      })
  } catch (err) {
    onError(`Error: ${err.message}`);
  }
};

const PROCESS_ACTIONS = {
  [PROCESS_MODES.STREAM]: readFileByLineStream,
  [PROCESS_MODES.LINE]: readFileByLine,
};

const getMode = mode => PROCESS_MODES[mode.toUpperCase()];

process.stdin.on('readable', () => {
  const input = process.stdin.read();

  if (input) {
    const str = input.toString().trim();
    const mode = getMode(str.toLowerCase());

    if (mode) {
      currentMode = mode;
      console.log(`Changed parsing mode to ${currentMode}`);
    } else {
      try {
        if (!fs.existsSync(str)) {
          throw new Error('File does not exist');
        }

        PROCESS_ACTIONS[currentMode](str);
      } catch (err) {
        onError(`Error: ${err.message}`);
      }
    }
  }
});

