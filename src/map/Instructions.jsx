import { Box } from '@mui/system'
import React from 'react'

const Instructions = ({ legs }) => {
  return (
    <Box sx={{ height: 250, overflow: "auto" }}>
      {legs.map((l, i) => {
        return (<div key={i}>
          <div style={{ fontWeight: 700, margin: 2 }}>{`leg ${i + 1}`}</div>
          {l.steps.map((s, i) => { return (<div key={i}>{s.maneuver.instruction}</div>) })}
        </div>)
      })}
    </Box>
  )
}

export default Instructions