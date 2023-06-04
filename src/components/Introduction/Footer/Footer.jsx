import { useSelector } from "react-redux"
import { Button } from "@/components/Button/Button"
import { useDispatch } from "react-redux"
import { startExperience } from "@/store/reducers/userReducer"

import "./Footer.scss"

export const Footer = () => {
  const { gameCode } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  return (
    <footer className="Footer">
      <div className="Footer__baseline">
        <p>Code partie: {gameCode}</p>
      </div>
      <Button text="Démarrer" onClick={() => dispatch(startExperience())} />
    </footer>
  )
}
