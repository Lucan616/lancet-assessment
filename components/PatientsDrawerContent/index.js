import { useEffect, useState } from "react"
import Link from "next/link"
// 👇 MUI COMPONENT IMPORTS
import { Box, Divider, Fab, List, ListItem, ListItemText, TextField } from "@mui/material"
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
// 👇 MY COMPONENT IMPORTS
import PatientMenuItem from "../PatientMenuItem";
import stringsInclude from "../../helpers/stringsInclude";

/*
  TODO: 

  - give extra visual feedback to user when they click the refresh button
  - add button to clear input field if the input field has a value
*/

export default function PatientsDrawerContent() {
  const [patients, setPatients] = useState([])
  const [loadingPatients, setLoadingPatients] = useState(true)
  const [filterText, setFilterText] = useState('')

  // LOADS PATIENTS
  const fetchPatients = async () => {
    try {
      const data = await fetch('/api/patients').then(res => res.json())
      setPatients(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingPatients(false)
    }
  }

  // UPDATE FILTER TEXT STATE
  const updateFilterText = (e) => {
    setFilterText(e.target.value.toLowerCase())
  }

  // INITIAL FETCH FOR PATIENTS
  useEffect(() => {
    fetchPatients();
  }, [])

  // GENERATE PATIENT ELEMENTS
  const patientListElements = patients
    .filter(({ id, name }) => {
      return stringsInclude(filterText, [id, name])
    })
    .map((patient) => {
      return (
        <PatientMenuItem key={patient.id} data={patient} />
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
      <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: '0.75rem' }}>
        <TextField fullWidth label="Filter" variant="standard" onChange={updateFilterText} />
        <FilterListIcon sx={{ color: 'action.active', ml: 1, my: 0.5 }} />
      </Box>
      <Divider />
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