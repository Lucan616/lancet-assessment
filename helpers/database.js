import supabase from "../utils/supabase"

export const addPatientAvatar = async (file, fullName) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${fullName}-${Math.random().toString().slice(2)}.${fileExt}`.toLowerCase().replaceAll(' ', '-')
  const filePath = `${fileName}`

  const { error } = await supabase.storage
    .from('patient-avatars')
    .upload(filePath, file)

  if (error) throw error

  return filePath
}