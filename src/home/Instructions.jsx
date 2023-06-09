import { Container } from '@mui/material'
import React from 'react'

const Instructions = () => {
  return (
    <Container maxWidth="xs" sx={{ textAlign: 'left' }}>
      <p>how to use this</p>
      <ol>
        <li>download the template using the link below</li>
        <li>add your data to the template</li>
        <li>upload the updated file below</li>
        <li>confirm the data in the table below</li>
      </ol>
    </Container>
  )
}

export default Instructions