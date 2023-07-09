import { MathUtils } from "three"

export const LightLerp = (current, add = 0, speed = 0.05) => MathUtils.lerp(current, add, speed)
