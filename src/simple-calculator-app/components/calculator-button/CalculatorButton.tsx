import "./CalculatorButton.scss";

type ButtonStyle = "Default" | "Primary" | "Secondary";

interface CalculatorButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  buttonStyle?: ButtonStyle;
  additionalClasses?: Array<string>;
  isActive?: boolean;
}

function CalculatorButton({
  children,
  buttonStyle = "Default",
  additionalClasses,
  isActive,
  ...rest
}: CalculatorButtonProps) {
  return (
    <button
      type="button"
      className={`button${buttonStyle} ${additionalClasses?.join(" ")} ${
        isActive && "isActive"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
export default CalculatorButton;
