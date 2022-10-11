import React, { useState } from 'react'
import { Grid } from '@mui/material';
import Invocations from './Invocations';
import invocationData from '../public/invocations.json';
import RaidStats from './RaidStats';

const InvocationDisplay = () => {
  const [raidLevel, setRaidLevel] = useState(0);

  return (
    <Grid container
      width={'50%'}
      sx={{
        background: 'rgba(62,53,41,255)',
        border: '5px solid rgba(28,28,26,255)',
      }}>
      <Grid item lg={8}>
        <Invocations invocations={invocationData}
          raidLevel={raidLevel}
          setRaidLevel={setRaidLevel} />
      </Grid>
      <Grid item lg={4}>
        <RaidStats raidLevel={raidLevel} />
      </Grid>
    </Grid >
  )
}

export default InvocationDisplay