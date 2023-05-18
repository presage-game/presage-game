import {
  DoubleSide,
  LoadingManager,
  MeshStandardMaterial,
  MeshToonMaterial,
  MeshBasicMaterial,
  NearestFilter,
  TextureLoader,
  RepeatWrapping,
} from "three"

const defaultMaterials = {
  floorMaterial: "#F6B791",
  roadMaterial: "#2D2D2C",
  fenceMaterial: "#757271",
  houseMaterial: "#8D6363",
  leafMaterial: "#4F7552",
  treeMaterial: "#704D46",
  stoneMaterial: "#7A675C",
  cloudMaterial: "#C3FDFD",
  backgroundMaterial: "#69D6FF",
}

const variantMaterials = {
  floorMaterial: "#918E8D",
  roadMaterial: "#2D2D2C",
  fenceMaterial: "#757271",
  houseMaterial: "#8D6363",
  leafMaterial: "#D8BF66",
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
      "/assets/materials/floor/floorTexture.png",
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
    const floorTexture = result[2]
    floorTexture.wrapS = RepeatWrapping
    floorTexture.wrapT = RepeatWrapping
    floorTexture.repeat.set(8, 8)
    floorTexture.magFilter = NearestFilter
    floorTexture.minFilter = NearestFilter

    const MaterialsColor = variant === "default" ? defaultMaterials : variantMaterials

    const floorMaterial = new MeshToonMaterial({
      color: MaterialsColor.floorMaterial,
      gradientMap: toonFiveTone,
      map: floorTexture,
    })

    const sandMaterial = new MeshToonMaterial({
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

    return {
      floorMaterial,
      sandMaterial,
      roadMaterial,
      fenceMaterial,
      houseMaterial,
      leafMaterial,
      treeMaterial,
      stoneMaterial,
      cloudMaterial,
      backgroundMaterial,
      outlineMaterial,
      selectedMaterial,
    }
  })
