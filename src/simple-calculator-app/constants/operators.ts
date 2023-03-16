import {
  absoluteValue,
  add,
  divide,
  multiply,
  percent,
  square,
  squareRoot,
  subtract,
  toggleSign,
} from "./calculatorFunctions";

interface Operator {
  name: string;
  fn: Function;
  priority: number;
  displayString?: string;
}

const operationsList: Array<Operator> = [
  { name: "add", displayString: "+", fn: add, priority: 0 },
  { name: "subtract", displayString: "−", fn: subtract, priority: 0 },
  { name: "multiply", displayString: "×", fn: multiply, priority: 1 },
  { name: "divide", displayString: "÷", fn: divide, priority: 1 },
  { name: "percent", displayString: "%", fn: percent, priority: -1 },
  { name: "toggleSign", displayString: "+/-", fn: toggleSign, priority: -1 },
  { name: "absoluteValue", displayString: "|x|", fn: absoluteValue, priority: -1 },
  { name: "square", displayString: "x²", fn: square, priority: 2 },
  { name: "squareRoot", displayString: "√x", fn: squareRoot, priority: 2 },
];

const orderOfOperationsMap: Record<string, Operator> = {
  add: { name: "add", displayString: "+", fn: add, priority: 0 },
  subtract: { name: "subtract", displayString: "−", fn: subtract, priority: 0 },
  multiply: { name: "multiply", displayString: "×", fn: multiply, priority: 1 },
  divide: { name: "divide", displayString: "÷", fn: divide, priority: 1 },
  percent: { name: "percent", displayString: "%", fn: percent, priority: -1 },
  toggleSign: { name: "toggleSign", displayString: "+/-", fn: toggleSign, priority: -1 },
  absoluteValue: {
    name: "absoluteValue",
    displayString: "|x|",
    fn: absoluteValue,
    priority: -1,
  },
  square: { name: "square", displayString: "x²", fn: square, priority: 2 },
  squareRoot: { name: "squareRoot", displayString: "√x", fn: squareRoot, priority: 2 },
};

export { operationsList, orderOfOperationsMap };
export type { Operator };
