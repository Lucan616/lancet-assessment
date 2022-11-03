/*
  Display: 
  - patient image
  - patient name
  - patient date of birth
*/

import Link from "next/link";
import { ListItem, ListItemAvatar, Avatar, Divider, ListItemText } from "@mui/material";

export default function PatientMenuItem({ data }) {
  const { 
    id, 
    name, 
    dateOfBirth 
  } = data

  return (
    <>
      <Link href={`/patient/${id}`} style={{ color: "inherit", textDecoration: "none"}}>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src="" alt={name} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={dateOfBirth}
            />
        </ListItem>
      </Link>
      <Divider />
    </>
  )
}