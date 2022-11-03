import patientProfiles from "../../../data/patients"

export default function handler(req, res) {
  res.status(200).json(patientProfiles)
}