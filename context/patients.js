import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../utils/supabase";

const initialContextValue = {
  patients: [],
  loadingPatients: true,
  setPatients: () => {},
  fetchPatients: () => {}
}

const Context = createContext(initialContextValue)

const Provider = ({ children }) => {
  const [patients, setPatients] = useState([])
  const [loadingPatients, setLoadingPatients] = useState(true)

  // GET PATIENTS FROM DATABASE
  const fetchPatients = async () => {
    try {
      setLoadingPatients(true)

      const { data, error } = await supabase
        .from('patients')
        .select()

      if (error) throw error

      setPatients(data)
    } catch (error) {
      console.log(error);
      alert(error.message)
    } finally {
      setLoadingPatients(false)
    }
  }

  // GET INITIAL PATIENTS FROM DATABASE
  useEffect(() => {
    fetchPatients()
  }, [])

  const exposed = {
    patients,
    loadingPatients,
    setPatients,
    fetchPatients
  }

  return (
    <Context.Provider value={exposed}>
      {children}
    </Context.Provider>
  )
}

export const usePatients = () => useContext(Context)
export default Provider