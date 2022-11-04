import { useRouter } from "next/router";
import { Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";

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

  return (
    <Container>
      <Typography variant="h4">
        {patient.full_name}
      </Typography>

      <pre>{JSON.stringify(patient, null, 2)}</pre>
    </Container>
  )
}
