import { useRouter } from "next/router";
import { Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function PatientPage() {
  const router = useRouter();
  const { id } = router.query

  const [patient, setPatient] = useState(null)
  const [loadingPatient, setLoadingPatient] = useState(true)

  // FETCHES PATIENT DATA
  const fetchPatient = async (patientId) => {
    try {
      setLoadingPatient(true)
      const data = await fetch(`/api/patients/${patientId}`).then(res => res.json());
      setPatient(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingPatient(false)
    }
  }

  useEffect(() => {
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

  return (
    <Container>
      <Typography variant="h4">
        {patient.name}
      </Typography>

      <pre>{JSON.stringify(patient)}</pre>
    </Container>
  )
}