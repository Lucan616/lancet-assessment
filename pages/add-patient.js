import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup'
import { Button, Container, Grid, Typography } from "@mui/material";
import { SimpleFileUpload, TextField } from "formik-mui";
import supabase from "../utils/supabase"
import { usePatients } from "../context/patients";
import { addPatientAvatar } from "../helpers/database";

/*
  TODO: 

  - add address inputs
*/

const initialPatientValues = {
  nationalIdentityNumber: '',
  fullName: '',
  // firstName: '',
  // lastName: '',
  dateOfBirth: '',
  avatar: null,
}

const validationSchema = Yup.object({
  nationalIdentityNumber: Yup.string().matches(/^(\d{13})?$/, "ID number must be 13 digits long").required(),
  fullName: Yup.string().required("Full name is required"),
  // firstName: Yup.string().required(),
  // lastName: Yup.string().required(),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  // avatar: 
})

export default function AddPatientPage() {
  const router = useRouter()
  const { setPatients } = usePatients()

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: '1.5rem'}}>
        Add Patient
      </Typography>
      <Formik
        initialValues={initialPatientValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const {
            fullName,
            nationalIdentityNumber,
            dateOfBirth,
            avatar
          } = values

          let avatarPath = null

          try {
            if (avatar) {
              avatarPath = await addPatientAvatar(avatar, fullName)
            }

            const { data, error } = await supabase
              .from('patients')
              .insert({
                full_name: fullName,
                national_identity_number: nationalIdentityNumber,
                date_of_birth: dateOfBirth,
                ...(avatarPath && { avatar_path: avatarPath })
              })
              .select()
              .single()

            if (error) throw error

            resetForm()
            setPatients(prevPatients => [...prevPatients, data])
            router.push(`/patient/${data.id}`)
          } catch (error) {
            console.log(error);
            alert(error.message)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container rowSpacing={3} columnSpacing={6}>
              <Grid item xs={12}>
                <Field
                  label="Full Name"
                  name="fullName"
                  component={TextField}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <Field
                  label="First Name"
                  name="firstName"
                  component={TextField}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  label="Last Name"
                  name="lastName"
                  component={TextField}
                  variant="standard"
                  fullWidth
                />
              </Grid> */}
              <Grid item xs={12} md={6}>
                <Field
                  label="ID Number"
                  name="nationalIdentityNumber"
                  component={TextField}
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  component={TextField}
                  variant="standard"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  label="Patient Photo"
                  name="avatar"
                  accept="image/*"
                  component={SimpleFileUpload}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained" 
                  disabled={isSubmitting}
                >{isSubmitting ? 'Adding patient...' : 'Add patient'}</Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}