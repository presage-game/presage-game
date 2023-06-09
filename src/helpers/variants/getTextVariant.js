export const getTextVariant = (index, type, infos, adinkras) => {

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

      

      return value
    }
  } else if (type === "scene") {
    let value

    if (index === 2) {
      value = adinkras[0].isCollected ? "a" : "b"
    } else if (index === 4) {
      value = adinkras[1].isCollected ? "a" : "b"
    } else if (index === 6) {
      value = adinkras[2].isCollected ? "a" : "b"
    } else {
      value = "a"
    }

    return value
  }
}
