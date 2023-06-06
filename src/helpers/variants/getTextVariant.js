import { useSelector } from "react-redux"

export const getTextVariant = (index, type) => {
  const { code, infos } = useSelector((state) => state.game)

  const data = [
    // Scenes
    {
      index: 1,
      type: "scene",
      name: "megalithicCircles",
    },
    {
      index: 3,
      type: "scene",
      name: "keurGnialo",
    },
    {
      index: 5,
      type: "scene",
      name: "trail",
    },
    // Pinpoints
    {
      index: 0,
      type: "pinpoint",
      name: "phosphateMine",
    },
    {
      index: 2,
      type: "pinpoint",
      name: "memsen",
    },
    {
      index: 3,
      type: "pinpoint",
      name: "sacosse",
    },
  ]

  const isInsideData = data.find((item) => item.index === index && item.type === type)

  if (isInsideData) {
    if (type === "scene") {
      let value =
        index === 1
          ? infos.currentPresages[0][0].value
          : index === 3
          ? infos.currentPresages[1][0].value
          : index === 5
          ? infos.currentPresages[2][0].value
          : "a"

      console.log(`scene ${index} with variant ${value}`)

      return value
    } else if (type === "pinpoint") {
      let value =
        index === 0
          ? infos.currentPresages[0][1].value
          : index === 2
          ? infos.currentPresages[1][1].value
          : index === 3
          ? infos.currentPresages[2][1].value
          : "a"

      console.log(`pinpoint ${index} with variant ${value}`)

      return value
    }
  } else {
    console.log("this content has no variant")
  }
}
