const regex = /\w{4,5}\S{3,}/;

const test1 = 'http://example.com/';
const test2 = 'https://www.example.com/';
const test3 = 'http://1-example.com';
const test4 = 'http://example.com/go/even/deeper/';
const test5 = 'http://example-example-example.com';

const result1 = test1.match(regex);
const result2 = test2.match(regex);
const result3 = test3.match(regex);
const result4 = test4.match(regex);
const result5 = test5.match(regex);

console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);