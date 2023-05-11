import { useDispatch } from "react-redux"
import "./Button.scss"
import { changeMouseVariant } from "@/store/reducers/uiReducer"

export const Button = ({ text, onClick, variant }) => {
  const dispatch = useDispatch()

  return (
    <button
      onPointerEnter={() => dispatch(changeMouseVariant("buttonHover"))}
      onPointerLeave={() => dispatch(changeMouseVariant("default"))}
      className={`${variant === "main" && "Button--main"} Button`}
      onClick={() => {
        dispatch(changeMouseVariant("default"))
        onClick()
      }}
    >
      <div className="Button__border">{text}</div>
    </button>
  )
}
