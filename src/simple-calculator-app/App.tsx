import { useEffect, useState } from "react";
import CalculatorButton from "./components/calculator-button/CalculatorButton";
import { orderOfOperationsMap, Operator } from "./constants/operators";
import "./App.scss";

type ActiveType = "operator" | "operand";

function SimpleCalculator() {
  const [operations, setOperations] = useState<Operator[]>([]);
  const [operands, setOperands] = useState<string[]>(["0"]);
  const [activeType, setActiveType] = useState<ActiveType>("operand");
  const [activeButton, setActiveButton] = useState<string>("");
  const [displayValue, setDisplayValue] = useState<string>(operands[operands.length - 1]);
  const [shouldCalculate, setShouldCalculate] = useState<boolean>(false);

  const onOperandClick = (val: string) => {
    if (!operands.length || activeType === "operator") {
      setDisplayValue(val);
      operands.push(val);
    } else {
      let newValue;
      const prevValue = operands[operands.length - 1];
      if (prevValue === "0" && val !== ".") {
        // don't show leading zeros
        newValue = val;
      } else {
        // update value, pressing decimal more than once for the same # is invalid and ignored
        newValue = prevValue.includes(".") && val === "." ? prevValue : prevValue + val;
      }
      setDisplayValue(newValue);
      operands[operands.length - 1] = newValue;
    }
    setOperands([...operands]);
    setActiveButton(val);
    setActiveType("operand");
  };

  const onOperatorClick = (name: string) => {
    const currentOperation = orderOfOperationsMap[name];
    let prevOperation = operations[operations.length - 1];
    if (
      activeType === "operator" &&
      prevOperation &&
      prevOperation !== currentOperation
    ) {
      // user is updating the operation to be used, so remove old one
      operations.pop();
      prevOperation = operations[operations.length - 1];
    }
    operations.push(currentOperation);
    setOperations([...operations]);
    setShouldCalculate(checkShouldCalculate(currentOperation, prevOperation));
    setActiveButton(name);
    setActiveType("operator");
  };

  const handleEqual = () => {
    if (activeType === "operator") {
      operations.pop();
    }
    setOperations([...operations]);
    setActiveButton("");
    calculate();
  };

  const handleClear = function (): void {
    /* TODO: allow user to clear current input, not everything, then clear all */
    setOperands(["0"]);
    setOperations([]);
    setDisplayValue("0");
    setActiveButton("");
    setActiveType("operand");
  };

  const checkShouldCalculate = (current: Operator, prev?: Operator): boolean => {
    if (!prev && current.priority === -1) {
      /* 
      if there is no other operation waiting and current takes a single parameter
      do operation immediately 
      */
      return true;
    } else if (prev && prev.priority > current.priority) {
      /* 
      previous operation waiting is more important and can be done first
      calculate() will handle doing both if current only takes one parameter
      */
      return true;
    }
    /* current operation is higher priority and needs to wait for more parameters */
    return false;
  };

  useEffect(() => {
    if (shouldCalculate) {
      calculate();
    }
  }, [shouldCalculate]);

  const calculate = () => {
    let newVal;
    if (operands.length === 1) {
      /* only one number to calculate so operation takes a single param */
      let num = parseFloat(operands[0]);
      newVal = operations[0].fn(num).toString();
    } else {
      let singleParamOperation;
      let tempOperands = operands;
      if (operations[operations.length - 1].priority === -1) {
        singleParamOperation = operations.pop();
      }
      while (operations.length > 0) {
        const nextOperation =
          operations[operations.length - 2] &&
          operations[operations.length - 2].priority >
            operations[operations.length - 1].priority
            ? operations.splice(operations.length - 2)[0]
            : operations.pop();
        newVal = nextOperation?.fn(
          parseFloat(tempOperands[tempOperands.length - 2]),
          parseFloat(tempOperands[tempOperands.length - 1])
        );
        tempOperands = tempOperands.slice(0, tempOperands.length - 2);
        tempOperands.push(newVal.toString());
      }
      if (singleParamOperation) {
        newVal = singleParamOperation.fn(parseFloat(tempOperands[0])).toString();
      }
    }
    setOperands([newVal]);
    setDisplayValue(newVal);
    setOperations([]);
    setShouldCalculate(false);
  };

  return (
    <div className="SimpleCalculator">
      <div className="displayArea">
        <input type="text" value={displayValue}></input>
      </div>
      <div className="buttons">
        <CalculatorButton onClick={handleClear} buttonStyle="Secondary">
          AC
        </CalculatorButton>
        <CalculatorButton
          onClick={() => onOperatorClick("toggleSign")}
          buttonStyle="Secondary"
        >
          +/-
        </CalculatorButton>
        <CalculatorButton
          onClick={() => onOperatorClick("percent")}
          buttonStyle="Secondary"
        >
          %
        </CalculatorButton>
        <CalculatorButton
          onClick={(e) => onOperatorClick("divide")}
          buttonStyle="Primary"
          isActive={activeButton === "divide"}
        >
          ÷
        </CalculatorButton>
        <CalculatorButton onClick={() => onOperandClick("7")}>7</CalculatorButton>
        <CalculatorButton onClick={() => onOperandClick("8")}>8</CalculatorButton>
        <CalculatorButton onClick={() => onOperandClick("9")}>9</CalculatorButton>
        <CalculatorButton
          onClick={() => onOperatorClick("multiply")}
          buttonStyle="Primary"
          isActive={activeButton === "multiply"}
        >
          ×
        </CalculatorButton>
        <CalculatorButton onClick={() => onOperandClick("4")}>4</CalculatorButton>
        <CalculatorButton onClick={() => onOperandClick("5")}>5</CalculatorButton>
        <CalculatorButton onClick={() => onOperandClick("6")}>6</CalculatorButton>
        <CalculatorButton
          onClick={() => onOperatorClick("subtract")}
          buttonStyle="Primary"
          isActive={activeButton === "subtract"}
        >
          −
        </CalculatorButton>
        <CalculatorButton onClick={() => onOperandClick("1")}>1</CalculatorButton>
        <CalculatorButton onClick={() => onOperandClick("2")}>2</CalculatorButton>
        <CalculatorButton onClick={() => onOperandClick("3")}>3</CalculatorButton>
        <CalculatorButton
          onClick={() => onOperatorClick("add")}
          buttonStyle="Primary"
          isActive={activeButton === "add"}
        >
          +
        </CalculatorButton>
        <CalculatorButton
          onClick={() => onOperandClick("0")}
          additionalClasses={["wide"]}
        >
          0
        </CalculatorButton>
        <CalculatorButton onClick={() => onOperandClick(".")}>.</CalculatorButton>
        <CalculatorButton onClick={handleEqual} buttonStyle="Primary">
          =
        </CalculatorButton>
      </div>
    </div>
  );
}

export default SimpleCalculator;
