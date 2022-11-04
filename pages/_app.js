import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';

import PatientsProvider from '../context/patients'
import Layout from '../components/Layout'
// import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <PatientsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PatientsProvider>
    </>
  )
}

export default MyApp
