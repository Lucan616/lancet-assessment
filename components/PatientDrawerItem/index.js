/*
  Display: 
  - patient image
  - patient name
  - patient date of birth
*/

import Link from "next/link";
import { ListItem, ListItemAvatar, Avatar, Divider, ListItemText } from "@mui/material";
import supabase from "../../utils/supabase";

export default function PatientDrawerItem({ data, isActive }) {
  const { 
    id, 
    full_name, 
    date_of_birth,
    avatar_path
  } = data

  // GET PUBLIC AVATAR URL
  const { data: { publicUrl: avatar_url } } = supabase
    .storage
    .from('patient-avatars')
    .getPublicUrl(avatar_path)

  // STYLES FOR IF THE CURRENT PAGE IS THAT OF THE PATIENT
  const activeStyles = isActive ? { borderRight: 3, borderColor: 'primary.main' } : {}

  return (
    <>
      <Link href={`/patient/${id}`} style={{ color: "inherit", textDecoration: "none"}}>
        <ListItem alignItems="flex-start" sx={activeStyles}>
            <ListItemAvatar>
              <Avatar src={avatar_url} alt={full_name} />
            </ListItemAvatar>
            <ListItemText
              primary={full_name}
              secondary={date_of_birth}
            />
        </ListItem>
      </Link>
      <Divider />
    </>
  )
}