import { toggleRadioModule } from "@/store/reducers/uiReducer"
import { completeRadioModule } from "@/store/reducers/userReducer"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useDispatch } from "react-redux"

export const RadioModule = () => {
  const dispatch = useDispatch()
  const [activeFrequency, setActiveFrequency] = useState(0)
  const frequencies = [98.2, 100.8, 110.1, 145.2]

  const changeFrequency = (number) => {
    const newFrequency = activeFrequency + number
    newFrequency >= 0 && newFrequency <= 3 && setActiveFrequency(newFrequency)
  }

  const testFrequency = () => {
    if (activeFrequency === 3) {
      dispatch(toggleRadioModule())
      dispatch(completeRadioModule())
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="textBox"
        className="TextBox TextBox--bottom"
        initial={{ opacity: 0, y: "-60%", x: "-50%" }}
        animate={{ opacity: 1, y: "-50%", x: "-50%" }}
        exit={{ opacity: 0, y: "-60%", x: "-50%" }}
        transition={{ y: { type: "spring", stiffness: 100 } }}
      >
        {" "}
        <div className="TextBox__inner">
          <h2>Retrouve la fréquence radio</h2>
          <div>
            <button onClick={() => changeFrequency(-1)}>moins</button>
            <p>{frequencies[activeFrequency]} Hz</p>
            <button onClick={() => changeFrequency(1)}>plus</button>
          </div>
          <button onClick={() => testFrequency()}>Valider</button>
        </div>{" "}
      </motion.div>
    </AnimatePresence>
  )
}
