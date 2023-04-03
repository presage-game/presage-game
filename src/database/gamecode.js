import { supabase } from "./client"

export const getGame = async (code) => {
  const { data, error } = await supabase.from("Users").select("id")

  console.log(data)
}
