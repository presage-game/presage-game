import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  code: null,
  infos: {
    carPos: {
      x: -17,
      y: 0.3,
      z: 13.6,
    },
    currentChapter: 1,
    currentPresages: [
      [
        {
          name: "megalithicCircles",
          value: "b",
        },
        {
          name: "phosphateMine",
          value: "a",
        },
      ],
      [
        {
          name: "keurGnialo",
          value: "a",
        },
        {
          name: "memsen",
          value: "a",
        },
      ],
      [
        {
          name: "trail",
          value: "a",
        },
        {
          name: "sacosse",
          value: "b",
        },
      ],
    ],
    nextPresages: [],
  },
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload
    },
    setCarPos: (state, action) => {
      state.infos.carPos = action.payload
    },
    setInfos: (state, action) => {
      state.infos = action.payload
    },
  },
})

export const { setCode, setCarPos, setInfos } = gameSlice.actions

export default gameSlice.reducer
