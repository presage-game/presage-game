export const getSceneVariants = (infos) => {
  const data = [
    {
      index: 1,
      name: "megalithicCircles",
    },
    {
      index: 3,
      name: "keurGnialo",
    },
    {
      index: 5,
      name: "trail",
    },
  ]

  let tab = []
  
  for (let i = 0; i < data.length - 1; i++) {
    let lineTab = infos.currentPresages[i].filter((element) => element.name === data[i].name)
    
    if (lineTab.length > 0) {
      tab.push({ ...lineTab[0], index: data[i].index })
    } else {
      tab.push({ name: data[i].name, index: data[i].index, value: "a" })
    }
  }

  
  return tab
}
