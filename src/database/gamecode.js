import { supabase } from "./client"

export const getGame = async (code) => {
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("game_code", code)
    .limit(1)
    .single()
  console.log(data)
  if (error) {
    throw new Error(error)
  }
  return data
}

const gameExists = async (code) => {
  const { data, error } = await supabase
    .from("Users")
    .select("game_code")
    .eq("game_code", code)
    .limit(1)
    .single()
  if (error) {
    return false
  }
  return data
}

export const saveGame = async (code, partydata) => {
  const { data, error } = await supabase
    .from("Users")
    .update({ game_info: partydata })
    .eq("game_code", code)
  console.log(data)
  if (error) {
    throw new Error(error)
  }
}

export const createGame = async () => {
  let validCode = false
  let finalGameCode = null
  while (!validCode) {
    const gameCode = Math.floor(Math.random() * (999999 - 100000) + 100000)
    console.log(gameCode)
    if (gameExists(gameCode) !== false) {
      validCode = true
      finalGameCode = gameCode
    }
  }

  const { data, error } = await supabase
    .from("Users")
    .insert({ game_code: finalGameCode })
    .select()
    .single()
  console.log(data)
  if (error) {
    throw new Error(error)
  }
  return data
}


const getFinishedGame = async () => {
  const { data, error } = await supabase
    .from("Users")
    .select("finished")
    .eq("finished", true)
    .limit(1)
    .single()
  console.log("finishedGame : ")
  console.log(data)
  if (error) {
    throw new Error(error)
  }
  return data
}
