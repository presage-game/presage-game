import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  code: null,
  infos: {
    currentChapter: 1,
    currentPresages: [
      [
        {
          name: "phosphateMine",
          value: "a",
        },
        {
          name: "megalithicCircles",
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
          name: "sacosse",
          value: "a",
        },
        {
          name: "trail",
          value: "a",
        },
      ],
    ],
    nextPresages: [],
  },
}
