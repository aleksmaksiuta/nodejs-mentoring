function reverse(str) {
  if (typeof str === 'string') {
    return str.split('').reverse().join('');
  }

  return str;
}

process.stdin.on('readable', () => {
  const input = process.stdin.read();

  if (input === null) {
    return;
  }

  const reversedStr = reverse(input.toString()) + '\n';
  process.stdout.write(reversedStr);
});