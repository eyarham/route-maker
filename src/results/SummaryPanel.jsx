import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'

const SummaryPanel = ({ data }) => {
  const [resultCount, setResultCount] = useState()
  const [canTotal, setCanTotal] = useState()
  useEffect(() => {
    if (!data) return;
    setResultCount(data.length);
    const cans = data.reduce((p, c) => p + 1 * c.cans, 0)
    setCanTotal(cans)
  }, [data])
  return (
    <Box sx={{ margin: 1 }}>
      <span>Summary:  </span>
      <span>results: {resultCount}  </span>
      <span>cans: {canTotal}</span>
    </Box>
  )
}

export default SummaryPanel