import { useDispatch } from "react-redux"
import "./Button.scss"
import { changeMouseVariant } from "@/store/reducers/uiReducer"
import { useEffect } from "react"

export const Button = ({ text, onClick, variant }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(changeMouseVariant("default"))
    }
  }, [])

  return (
    <button
      onPointerEnter={() => dispatch(changeMouseVariant("buttonHover"))}
      onPointerLeave={() => dispatch(changeMouseVariant("default"))}
      className={`${variant === "main" && "Button--main"} Button`}
      onClick={() => onClick()}
    >
      <div className="Button__border">{text}</div>
    </button>
  )
}
