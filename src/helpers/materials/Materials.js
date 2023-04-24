import {
  DoubleSide,
  LoadingManager,
  MeshStandardMaterial,
  MeshToonMaterial,
  NearestFilter,
  TextureLoader,
} from "three"

const defaultMaterials = {
  floorMaterial: "#F6B791",
  roadMaterial: "#2D2D2C",
  fenceMaterial: "#757271",
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

    const floorMaterial = new MeshToonMaterial({
      color:
        variant === "default" ? defaultMaterials.floorMaterial : variantMaterials.floorMaterial,
      gradientMap: toonFiveTone,
    })

    // const roadMaterial = new MeshToonMaterial({
    //   color: variant === "default" ? defaultMaterials.roadMaterial : variantMaterials.roadMaterial,
    //   side: DoubleSide,
    // })

    const roadMaterial = new MeshStandardMaterial({
      color: variant === "default" ? defaultMaterials.roadMaterial : variantMaterials.roadMaterial,
      side: DoubleSide,
    })

    const fenceMaterial = new MeshToonMaterial({
      color:
        variant === "default" ? defaultMaterials.fenceMaterial : variantMaterials.fenceMaterial,
      gradientMap: toonFiveTone,
    })

    const leafMaterial = new MeshToonMaterial({
      color: variant === "default" ? defaultMaterials.leafMaterial : variantMaterials.leafMaterial,
      gradientMap: toonThreeTone,
    })

    const treeMaterial = new MeshToonMaterial({
      color: variant === "default" ? defaultMaterials.treeMaterial : variantMaterials.treeMaterial,
      gradientMap: toonThreeTone,
    })

    const stoneMaterial = new MeshToonMaterial({
      color:
        variant === "default" ? defaultMaterials.stoneMaterial : variantMaterials.stoneMaterial,
      gradientMap: toonFiveTone,
    })

    const cloudMaterial = new MeshToonMaterial({
      color:
        variant === "default" ? defaultMaterials.cloudMaterial : variantMaterials.cloudMaterial,
      gradientMap: toonThreeTone,
    })

    const backgroundMaterial = new MeshToonMaterial({
      color:
        variant === "default"
          ? defaultMaterials.backgroundMaterial
          : variantMaterials.backgroundMaterial,
    })

    return {
      floorMaterial,
      roadMaterial,
      fenceMaterial,
      leafMaterial,
      treeMaterial,
      stoneMaterial,
      cloudMaterial,
      backgroundMaterial,
    }
  })
