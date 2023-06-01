import "./Button.scss"

export const Button = ({ text, onClick, variant }) => {
  return (
    <button
      className={`${variant === "main" ? "Button--main" : ""} Button`}
      onClick={() => onClick()}
    >
      <div className="Button__border">{text}</div>
    </button>
  )
}
