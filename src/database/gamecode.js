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
  const { data, error } = await supabase.from("Users").insert()
  console.log(data)
  if (error) {
    throw new Error(error)
  }
}
