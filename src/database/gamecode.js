import { supabase } from "./client"

export const getGame = async (code) => {
  const { data, error } = await supabase.from("Users").select("*").eq("game_code", code)
  console.log(data)
  if (error) {
    throw new Error(error)
  }
}

export const saveGame = async (data) => {

}

export const createGame = async () => {
    
}