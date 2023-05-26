import {
  DoubleSide,
  LoadingManager,
  MeshStandardMaterial,
  MeshToonMaterial,
  MeshBasicMaterial,
  NearestFilter,
  TextureLoader,
} from "three"

const defaultMaterials = {
  floorMaterial: "#F6B791",
  roadMaterial: "#2D2D2C",
  fenceMaterial: "#757271",
  houseMaterial: '#8D6363',
  leafMaterial: "#4F7552",
  grassMaterial: "#626F52",
  megalithicMaterial: "#D4C1AA",
  treeMaterial: "#704D46",
  stoneMaterial: "#7A675C",
  cloudMaterial: "#C3FDFD",
  backgroundMaterial: "#69D6FF",
}

const variantMaterials = {
  floorMaterial: "#918E8D",
  roadMaterial: "#2D2D2C",
  fenceMaterial: "#757271",
  houseMaterial: '#8D6363',
  leafMaterial: "#D8BF66",
  grassMaterial: "#626F52",
  megalithicMaterial: "#D4C1AA",
  treeMaterial: "#704D46",
  stoneMaterial: "#7A675C",
  cloudMaterial: "#C65948",
  backgroundMaterial: "#C65948",
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

    const fenceMaterial = new MeshToonMaterial({
      color: MaterialsColor.fenceMaterial,
      gradientMap: toonFiveTone,
    })

    const houseMaterial = new MeshToonMaterial({
      color: MaterialsColor.houseMaterial,
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
      color: MaterialsColor.backgroundMaterial
    })
    
    const outlineMaterial = new MeshBasicMaterial({
      color: "#000000"
    })

    const selectedMaterial = new MeshBasicMaterial({
      color: "#FFFFFF"
    })

    return {
      floorMaterial,
      roadMaterial,
      fenceMaterial,
      houseMaterial,
      leafMaterial,
      grassMaterial,
      megalithicMaterial,
      treeMaterial,
      stoneMaterial,
      cloudMaterial,
      backgroundMaterial,
      outlineMaterial,
      selectedMaterial
    }
  })
