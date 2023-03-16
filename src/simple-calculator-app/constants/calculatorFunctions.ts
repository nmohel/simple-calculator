const add = (a: number, b: number): number => a + b;
const subtract = (a: number, b: number): number => a - b;
const multiply = (a: number, b: number): number => a * b;
const divide = (a: number, b: number): number => a / b;
const percent = (a: number): number => a * 0.01;
const toggleSign = (a: number) => a * -1;
const absoluteValue = (a: number): number => Math.abs(a);
const squareRoot = (a: number): number => Math.sqrt(a);
const square = (a: number): number => Math.pow(a, 2);

export {
  add,
  subtract,
  multiply,
  divide,
  percent,
  toggleSign,
  absoluteValue,
  squareRoot,
  square,
};
