import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Typography, Box } from "@mui/material";
import supabase from "../../utils/supabase";
import RequisitionsTable from "../../components/RequisitionsTable";

export default function PatientPage() {
  const router = useRouter();
  const { id } = router.query

  const [patient, setPatient] = useState(null)
  const [loadingPatient, setLoadingPatient] = useState(true)

  // FETCHES PATIENT DATA
  const fetchPatient = async (patientId) => {
    try {
      setLoadingPatient(true)

      const { data, error } = await supabase
        .from('patients')
        .select()
        .eq('id', patientId)
        .single()

      if (error) throw error

      setPatient(data)
    } catch (error) {
      console.log(error)
      alert(error.message)
    } finally {
      setLoadingPatient(false)
    }
  }

  useEffect(() => {
    if (!id) return
    fetchPatient(id)
  }, [id])

  if (loadingPatient) {
    return (
      <Container>
        <Typography variant="h4">
          Loading...
        </Typography>
      </Container>
    )
  }

  if (!patient && !loadingPatient) {
    return (
      <Container>
        <Typography variant="h4">
          No patient found.
        </Typography>
      </Container>
    )
  }

  const dataItemStyles = { display: 'flex', justifyContent: 'space-between', borderBottom: 1, borderColor: 'grey.300' } 

  return (
    <Container>
      <Typography variant="h4">
        {patient.full_name}
      </Typography>

      <Box sx={{ width: { sx: 1, md: 1/2 }, marginY: 4 }}>
        <Box sx={dataItemStyles}>
          <Typography>ID:</Typography> <Typography>{patient.national_identity_number}</Typography>
        </Box>
        <Box sx={dataItemStyles}>
          <Typography>Date of birth:</Typography> <Typography>{patient.date_of_birth}</Typography>
        </Box>
      </Box>

      <Typography variant="h5" gutterBottom>
        Requisitions
      </Typography>

      <RequisitionsTable requisitions={DUMMY_REQUISITIONS} />
    </Container>
  )
}

const DUMMY_REQUISITIONS = [
  {
    id: '1',
    dateSubmitted: '2022-11-05',
    referringPhysician: 'Dr. Strange',
    tests: [
      {
        id: '1',
        testName: 'Magic Abilities',
        comment: 'Lorem, ipsum.',
        normalRange: 0,
        testResult: 0
      },
      {
        id: '2',
        testName: 'Astral Projection',
        comment: 'Lorem, ipsum.',
        normalRange: 0,
        testResult: 0
      },
      {
        id: '3',
        testName: 'Portal Conjuring',
        comment: 'Lorem, ipsum.',
        normalRange: 0,
        testResult: 0
      },
    ]
  },
  {
    id: '2',
    dateSubmitted: '2022-11-05',
    referringPhysician: 'Dr. Phil',
    tests: [
      {
        id: '2',
        testName: 'Normality',
        comment: 'Lorem, ipsum dolor.',
        normalRange: 0,
        testResult: 0
      },
    ]
  },
  {
    id: '3',
    dateSubmitted: '2022-11-05',
    referringPhysician: 'Doctor Evil',
    tests: [
      {
        id: '3',
        testName: 'Evilness',
        comment: 'Lorem ipsum dolor sit amet.',
        normalRange: 0,
        testResult: 0
      },
    ]
  },
  {
    id: '4',
    dateSubmitted: '2022-11-05',
    referringPhysician: 'Dr Pepper',
    tests: [
      {
        id: '4',
        testName: 'Sugar?',
        comment: 'Lorem ipsum dolor sit amet consectetur.',
        normalRange: 0,
        testResult: 0
      },
    ]
  },
]