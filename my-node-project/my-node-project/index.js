const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name? ', (name) => {
  rl.question('What is your age? ', (age) => {
    console.log(`Hello, ${name}! You are ${age} years old.`);
    rl.close();
  });
});
