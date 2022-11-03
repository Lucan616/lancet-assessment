import { Container, Typography } from '@mui/material'
import Head from 'next/head'
// import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Lancet Assessment</title>
        <meta name="description" content="Lancet Assessment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 4rem)"}}>
        <Typography variant="subtitle1" textAlign="center">
          SELECT A PATIENT
        </Typography>
      </Container>
    </>
  )
}
