import { useState } from "react";
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function RequisitionRow({ requisition }) {
  const [open, setOpen] = useState(false)

  const {
    referringPhysician,
    dateSubmitted,
    tests
  } = requisition

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{referringPhysician}</TableCell>
        <TableCell align="right">{dateSubmitted}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom>
                Tests
              </Typography>
              <Table size="small" aria-label="tests">
                <TableHead>
                  <TableRow>
                    <TableCell>Test Name</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell align="right">Normal Range</TableCell>
                    <TableCell align="right">Test Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tests.map((test) => {
                    return (
                      <TableRow key={test.id}>
                        <TableCell component="th" scope="row">{test.testName}</TableCell>
                        <TableCell>{test.comment}</TableCell>
                        <TableCell align="right">{test.normalRange}</TableCell>
                        <TableCell align="right">{test.testResult}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function RequisitionsTable({ requisitions }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Referring Physician</TableCell>
            <TableCell align="right">Date Submitted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requisitions.map((requisition) => {
            return (
              <RequisitionRow key={requisition.id} requisition={requisition}  />
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}