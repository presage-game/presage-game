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
      console.log("scene with variant", index)
    } else if (type === "pinpoint") {
      console.log("pinpoint with variant", index)
    }
  }
}
