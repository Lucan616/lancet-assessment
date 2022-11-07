import { useState } from "react"
import { useRouter } from "next/router";
import Link from "next/link"
// 👇 MUI COMPONENT IMPORTS
import { Box, Divider, Fab, List, ListItem, ListItemText, TextField } from "@mui/material"
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
// 👇 MY COMPONENT IMPORTS
import PatientDrawerItem from "../PatientDrawerItem";
import stringsInclude from "../../helpers/stringsInclude";
import { usePatients } from "../../context/patients";

/*
  TODO: 

  - give extra visual feedback to user when they click the refresh button
*/

export default function PatientsDrawerContent() {
  const router = useRouter()
  const [filterText, setFilterText] = useState('')
  const { patients, loadingPatients, fetchPatients } = usePatients()

  // UPDATE FILTER TEXT STATE
  const updateFilterText = (e) => {
    setFilterText(e.target.value.toLowerCase())
  }

  // GENERATE PATIENT ELEMENTS
  const patientListElements = patients
    .filter(({ id, full_name, national_identity_number }) => {
      return stringsInclude(filterText, [id, full_name, national_identity_number])
    })
    .map((patient) => {
      const active = router.query.id === patient.id

      return (
        <PatientDrawerItem key={patient.id} data={patient} isActive={active} />
      )
    })

  // CONDITIONALLY RENDERS EITHER THE PATIENTS LIST, IF THERE ARE PATIENTS. OR TEXT NOTIFYING THE USER OF NO PATIENTS
  const listDisplay = loadingPatients 
    ? <ListItem><ListItemText primary="Loading..."/></ListItem>
    : patientListElements.length !== 0 
    ? patientListElements
    : <ListItem><ListItemText primary="No patient found"/></ListItem>

  return (
    <Box>
      {/* 👇 Filter input */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: '0.75rem',  backgroundColor: '#fff' }}>
          <TextField 
            label="Filter" 
            variant="standard" 
            type="search"
            fullWidth 
            onChange={updateFilterText} 
          />
          <FilterListIcon sx={{ color: 'action.active', ml: 1, my: 0.5 }} />
        </Box>
        <Divider />
      </Box>
      {/* 👇 Patients List */}
      <List>
        {listDisplay}
      </List>
      {/* 👇 Add patient and refresh patients buttons */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '1rem',
        margin: '1rem',
        position: 'absolute',
        right: 0,
        bottom: 0
      }}>
        <Link href="/add-patient" legacyBehavior>
          <Fab aria-label="add" color="primary">
            <AddIcon />
          </Fab>
        </Link>
        <Fab aria-label="refresh" color="primary" onClick={fetchPatients}>
          <RefreshIcon />
        </Fab>
      </Box>
    </Box>
  )
}