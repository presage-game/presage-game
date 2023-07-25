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
  adinkraMaterial: "#E3D9D6",
  road: {
    main: "#2D2D2C",
    line: "#E4C629",
  },
  fenceMaterial: "#757271",
  concreteMaterial: "#988FA1",
  house: {
    wall: "#D4C1AA",
    main: "#8D6363",
  },
  metal: {
    main: "#A19E98",
    rusty: "#504D5A",
  },
  moutainMaterial: "#6D4D4A",
  leafMaterial: "#4F7552",
  grassMaterial: "#626F52",
  megalithicMaterials: {
    main: "#A26656",
    selected: "#C5806E",
  },
  treeMaterial: "#704D46",
  stoneMaterial: "#7A675C",
  swampMaterial: "#526F5E",
  cloudMaterial: "#C3FDFD",
  backgroundMaterial: "#69D6FF",
  gasPumpMaterials: {
    green: "#84A58D",
    orange: "#ED9746",
    ledScreen: "#354927",
    wall: "#E7DEB4",
    white: "#FFF6FA",
  },
  waterMaterial: "#50709D",
}

const nightMaterials = {
  floorMaterial: "#F6B791",
  adinkraMaterial: "#E3D9D6",
  road: {
    main: "#3E5365",
    line: "#E4C629",
  },
  fenceMaterial: "#757271",
  concreteMaterial: "#988FA1",
  house: {
    wall: "#D4C1AA",
    main: "#8D6363",
  },
  metal: {
    main: "#A19E98",
    rusty: "#504D5A",
  },
  moutainMaterial: "#7B89B2",
  leafMaterial: "#5B7A93",
  grassMaterial: "#5B7A93",
  megalithicMaterials: {
    main: "#30435E",
    selected: "#C5806E",
  },
  treeMaterial: "#577AAB",
  stoneMaterial: "#464D5F",
  swampMaterial: "#516C83",
  cloudMaterial: "#C3FDFD",
  backgroundMaterial: "#69D6FF",
  gasPumpMaterials: {
    green: "#84A58D",
    orange: "#ED9746",
    ledScreen: "#354927",
    wall: "#E7DEB4",
    white: "#FFF6FA",
  },
  waterMaterial: "#2A3F60",
}

const variantMaterials = {
  floorMaterial: "#918E8D",
  adinkraMaterial: "#E3D9D6",
  road: {
    main: "#2D2D2C",
    line: "#E4C629",
  },
  fenceMaterial: "#757271",
  concreteMaterial: "#988FA1",
  house: {
    wall: "#D4C1AA",
    main: "#8D6363",
  },
  metal: {
    main: "#A19E98",
    rusty: "#504D5A",
  },
  moutainMaterial: "#A1736F",
  leafMaterial: "#D8BF66",
  grassMaterial: "#626F52",
  megalithicMaterials: {
    main: "#A26656",
    selected: "#C8A49B",
  },
  treeMaterial: "#704D46",
  stoneMaterial: "#7A675C",
  swampMaterial: "#38522C",
  cloudMaterial: "#C65948",
  backgroundMaterial: "#C65948",
  gasPumpMaterials: {
    green: "#84A58D",
    orange: "#ED9746",
    ledScreen: "#354927",
    wall: "#F0D547",
    white: "#FFF6FA",
  },
  waterMaterial: "#50709D",
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

    const MaterialsColor =
      variant === "default"
        ? defaultMaterials
        : variant === "night"
        ? nightMaterials
        : variantMaterials

    const floorMaterial = new MeshToonMaterial({
      color: MaterialsColor.floorMaterial,
      gradientMap: toonFiveTone,
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

    const adinkraMaterial = new MeshToonMaterial({
      color: MaterialsColor.adinkraMaterial,
      gradientMap: toonFiveTone,
    })

    const fenceMaterial = new MeshToonMaterial({
      color: MaterialsColor.fenceMaterial,
      gradientMap: toonFiveTone,
    })

    const concreteMaterial = new MeshToonMaterial({
      color: MaterialsColor.concreteMaterial,
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

    const metalMaterials = {
      main: new MeshToonMaterial({
        color: MaterialsColor.metal.main,
        gradientMap: toonFiveTone,
      }),
      rusty: new MeshToonMaterial({
        color: MaterialsColor.metal.rusty,
        gradientMap: toonFiveTone,
      }),
    }

    const moutainMaterial = new MeshToonMaterial({
      color: MaterialsColor.moutainMaterial,
      gradientMap: toonFiveTone,
    })

    const leafMaterial = new MeshToonMaterial({
      color: MaterialsColor.leafMaterial,
      gradientMap: toonThreeTone,
    })

    const grassMaterial = new MeshToonMaterial({
      color: MaterialsColor.grassMaterial,
      gradientMap: toonThreeTone,
    })

    const megalithicMaterials = {
      main: new MeshToonMaterial({
        color: MaterialsColor.megalithicMaterials.main,
        gradientMap: toonFiveTone,
      }),
      selected: new MeshToonMaterial({
        color: MaterialsColor.megalithicMaterials.selected,
        gradientMap: toonFiveTone,
      }),
    }

    const treeMaterial = new MeshToonMaterial({
      color: MaterialsColor.treeMaterial,
      gradientMap: toonThreeTone,
    })

    const stoneMaterial = new MeshToonMaterial({
      color: MaterialsColor.stoneMaterial,
      gradientMap: toonFiveTone,
    })

    const swampMaterial = new MeshToonMaterial({
      color: MaterialsColor.swampMaterial,
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

    const mapMaterial = new MeshToonMaterial({
      color: "#e3cfc2",
      gradientMap: toonFiveTone,
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

    const waterMaterial = new MeshToonMaterial({
      color: MaterialsColor.waterMaterial,
      gradientMap: toonThreeTone,
    })

    return {
      floorMaterial,
      roadMaterials,
      adinkraMaterial,
      fenceMaterial,
      concreteMaterial,
      houseMaterials,
      metalMaterials,
      moutainMaterial,
      leafMaterial,
      grassMaterial,
      megalithicMaterials,
      treeMaterial,
      stoneMaterial,
      swampMaterial,
      cloudMaterial,
      backgroundMaterial,
      outlineMaterial,
      selectedMaterial,
      mapMaterial,
      gasPumpMaterials,
      waterMaterial,
    }
  })
