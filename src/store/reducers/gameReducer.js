import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  code: null,
  infos: {
    currentChapter: 1,
    currentPresages: [
      [
        {
          name: "megalithicCircles",
          value: "b",
        },
        {
          name: "phosphateMine",
          value: "b",
        },
      ],
      [
        {
          name: "keurGnialo",
          value: "b",
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
    setInfos: (state, action) => {
      state.infos = action.payload
    },
  },
})

export const { setCode, setInfos } = gameSlice.actions

export default gameSlice.reducer
