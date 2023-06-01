import {
  DoubleSide,
  LoadingManager,
  MeshStandardMaterial,
  MeshToonMaterial,
  MeshBasicMaterial,
  NearestFilter,
  TextureLoader,
  BackSide,
} from "three"

const defaultMaterials = {
  floorMaterial: "#F6B791",
  roadMaterial: "#2D2D2C",
  road: {
    main: "#2D2D2C",
    line: "#E4C629",
  },
  fenceMaterial: "#757271",
  concreteMaterial: "#988FA1",
  houseMaterial: "#8D6363",
  house: {
    wall: "#D4C1AA",
    main: "#8D6363",
  },
  leafMaterial: "#4F7552",
  grassMaterial: "#626F52",
  megalithicMaterial: "#D4C1AA",
  treeMaterial: "#704D46",
  stoneMaterial: "#7A675C",
  cloudMaterial: "#C3FDFD",
  backgroundMaterial: "#69D6FF",
  gasPumpMaterials: {
    green: "#84A58D",
    orange: "#ED9746",
    ledScreen: "#354927",
    wall: "#DFD2CB",
    white: "#FFF6FA",
  },
}

const variantMaterials = {
  floorMaterial: "#918E8D",
  roadMaterial: "#2D2D2C",
  road: {
    main: "#2D2D2C",
    line: "#E4C629",
  },
  fenceMaterial: "#757271",
  concreteMaterial: "#988FA1",
  houseMaterial: "#8D6363",
  house: {
    wall: "#D4C1AA",
    main: "#8D6363",
  },
  leafMaterial: "#D8BF66",
  grassMaterial: "#626F52",
  megalithicMaterial: "#D4C1AA",
  treeMaterial: "#704D46",
  stoneMaterial: "#7A675C",
  cloudMaterial: "#C65948",
  backgroundMaterial: "#C65948",
  gasPumpMaterials: {
    green: "#84A58D",
    orange: "#ED9746",
    ledScreen: "#354927",
    wall: "#DFD2CB",
    white: "#FFF6FA",
  },
}

const getTextures = () =>
  new Promise((resolve, reject) => {
    const manager = new LoadingManager(() => resolve(textures))
    const loader = new TextureLoader(manager)
    const textures = [
      "/assets/materials/toon/threeTone.jpg",
      "/assets/materials/toon/fiveTone.jpg",
    ].map((filename) => loader.load(filename))
  })

export const getMaterials = async (variant) =>
  await getTextures().then((result) => {
    const toonThreeTone = result[0]
    toonThreeTone.minFilter = NearestFilter
    toonThreeTone.magFilter = NearestFilter
    const toonFiveTone = result[1]
    toonFiveTone.minFilter = NearestFilter
    toonFiveTone.magFilter = NearestFilter

    const MaterialsColor = variant === "default" ? defaultMaterials : variantMaterials

    const floorMaterial = new MeshToonMaterial({
      color: MaterialsColor.floorMaterial,
      gradientMap: toonFiveTone,
    })

    // const roadMaterial = new MeshToonMaterial({
    //   color: variant === "default" ? defaultMaterials.roadMaterial : variantMaterials.roadMaterial,
    //   side: DoubleSide,
    // })

    const roadMaterial = new MeshStandardMaterial({
      color: MaterialsColor.roadMaterial,
      side: DoubleSide,
    })

    const roadMaterials = {
      main: new MeshStandardMaterial({
        color: MaterialsColor.road.main,
        side: DoubleSide,
      }),
      line: new MeshBasicMaterial({
        color: MaterialsColor.road.line,
      }),
    }

    const fenceMaterial = new MeshToonMaterial({
      color: MaterialsColor.fenceMaterial,
      gradientMap: toonFiveTone,
    })

    const concreteMaterial = new MeshToonMaterial({
      color: MaterialsColor.concreteMaterial,
      gradientMap: toonFiveTone,
    })

    const houseMaterial = new MeshToonMaterial({
      color: MaterialsColor.houseMaterial,
      gradientMap: toonFiveTone,
    })

    const houseMaterials = {
      wall: new MeshToonMaterial({
        color: MaterialsColor.house.wall,
        gradientMap: toonFiveTone,
      }),
      backwall: new MeshToonMaterial({
        color: "#AB8D72",
        gradientMap: toonFiveTone,
        side: BackSide,
      }),
      main: new MeshToonMaterial({
        color: MaterialsColor.house.main,
        gradientMap: toonFiveTone,
      }),
    }

    const leafMaterial = new MeshToonMaterial({
      color: MaterialsColor.leafMaterial,
      gradientMap: toonThreeTone,
    })

    const grassMaterial = new MeshToonMaterial({
      color: MaterialsColor.grassMaterial,
      gradientMap: toonThreeTone,
    })

    const megalithicMaterial = new MeshToonMaterial({
      color: MaterialsColor.megalithicMaterial,
      gradientMap: toonFiveTone,
    })

    const treeMaterial = new MeshToonMaterial({
      color: MaterialsColor.treeMaterial,
      gradientMap: toonThreeTone,
    })

    const stoneMaterial = new MeshToonMaterial({
      color: MaterialsColor.stoneMaterial,
      gradientMap: toonFiveTone,
    })

    const cloudMaterial = new MeshToonMaterial({
      color: MaterialsColor.cloudMaterial,
      gradientMap: toonThreeTone,
    })

    const backgroundMaterial = new MeshToonMaterial({
      color: MaterialsColor.backgroundMaterial,
    })

    const outlineMaterial = new MeshBasicMaterial({
      color: "#000000",
    })

    const selectedMaterial = new MeshBasicMaterial({
      color: "#FFFFFF",
    })

    const gasPumpMaterials = {
      green: new MeshToonMaterial({
        color: MaterialsColor.gasPumpMaterials.green,
        gradientMap: toonFiveTone,
      }),
      orange: new MeshToonMaterial({
        color: MaterialsColor.gasPumpMaterials.orange,
        gradientMap: toonFiveTone,
      }),
      ledScreen: new MeshToonMaterial({
        color: MaterialsColor.gasPumpMaterials.ledScreen,
        gradientMap: toonThreeTone,
      }),
      wall: new MeshToonMaterial({
        color: MaterialsColor.gasPumpMaterials.wall,
        gradientMap: toonFiveTone,
      }),
      white: new MeshToonMaterial({
        color: MaterialsColor.gasPumpMaterials.white,
        gradientMap: toonFiveTone,
      }),
      jerrycan: new MeshToonMaterial({
        color: "#B70F0F",
        gradientMap: toonThreeTone,
      }),
    }

    return {
      floorMaterial,
      roadMaterial,
      roadMaterials,
      fenceMaterial,
      concreteMaterial,
      houseMaterial,
      houseMaterials,
      leafMaterial,
      grassMaterial,
      megalithicMaterial,
      treeMaterial,
      stoneMaterial,
      cloudMaterial,
      backgroundMaterial,
      outlineMaterial,
      selectedMaterial,
      gasPumpMaterials,
    }
  })
