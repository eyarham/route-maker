import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <Box sx={{ height: 40 }}>
      <Typography sx={{ float: "left" }} variant={"h4"}>route maker</Typography>
      <Typography variant='button' sx={{ float: "right" }} >
        <a href='https://github.com/eyarham/route-maker' target="_blank" rel="noreferrer">code</a>
      </Typography>
    </Box>
  )
}

export default Header