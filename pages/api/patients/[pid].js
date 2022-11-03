import patientProfiles from "../../../data/patients"

export default function handler(req, res) {
  const { pid } = req.query

  const patient = patientProfiles.find(({ id }) => id === pid)

  if (!patient) {
    res.status(400).json({ message: "No patient found with that id."})
  } else {
    res.status(200).json(patient)
  }

}