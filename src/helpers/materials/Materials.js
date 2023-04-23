import { DoubleSide, LoadingManager, MeshToonMaterial, NearestFilter, TextureLoader } from "three"

const getTextures = () =>
  new Promise((resolve, reject) => {
    const manager = new LoadingManager(() => resolve(textures))
    const loader = new TextureLoader(manager)
    const textures = [
      "/assets/materials/toon/threeTone.jpg",
      "/assets/materials/toon/fiveTone.jpg",
    ].map((filename) => loader.load(filename))
  })

export const getMaterials = async () =>
  await getTextures().then((result) => {
    const toonThreeTone = result[0]
    toonThreeTone.minFilter = NearestFilter
    toonThreeTone.magFilter = NearestFilter
    const toonFiveTone = result[1]
    toonFiveTone.minFilter = NearestFilter
    toonFiveTone.magFilter = NearestFilter

    const floorMaterial = new MeshToonMaterial({
      color: "#FDEAD2",
      gradientMap: toonFiveTone,
    })

    const roadMaterial = new MeshToonMaterial({
      color: "#F1DFC9",
      side: DoubleSide,
    })

    const fenceMaterial = new MeshToonMaterial({
      color: "#8D8A85",
      gradientMap: toonFiveTone,
    })

    const leafMaterial = new MeshToonMaterial({
      color: "#4F7552",
      gradientMap: toonFiveTone,
    })

    const treeMaterial = new MeshToonMaterial({
      color: "#704D46",
      gradientMap: toonThreeTone,
    })

    const stoneMaterial = new MeshToonMaterial({
      color: "#8D8A85",
      gradientMap: toonFiveTone,
    })

    const cloudMaterial = new MeshToonMaterial({
      color: "#C3FDFD",
      gradientMap: toonThreeTone,
    })

    return {
      floorMaterial,
      roadMaterial,
      fenceMaterial,
      leafMaterial,
      treeMaterial,
      stoneMaterial,
      cloudMaterial,
    }
  })
