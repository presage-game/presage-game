import { useDispatch } from 'react-redux'
import { startExperience } from '../../store/reducers/introductionReducer'
import './StartButton.scss'

export const StartButton = ({text}) => {
  const dispatch = useDispatch()

  const endIntroduction = () => {
    dispatch(startExperience())
  }

  // Template
  return (
    <button className="StartButton" onClick={() => endIntroduction()}>
      {text}
    </button>
  )
}
