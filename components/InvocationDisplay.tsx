import React, { useState } from 'react'
import Invocations from './Invocations';
import invocationData from '../public/invocations.json';
import RaidStats from './RaidStats';
import styled from '@emotion/styled';

const Container = styled('div')`
padding: 1rem;
display: grid;
grid-template-columns: 2fr 1fr;
gap: 1rem;
background: rgba(64, 55, 45, 0.97);
box-shadow: 0 0 3rem black;
border: 0.15rem solid black;
`;

export interface RaidStats {
  raidLevel: number;
  invocationCount: number;
}

const InvocationDisplay = () => {
  const [raidStats, setRaidStats] = useState({
    raidLevel: 0,
    invocationCount: 0
  } as RaidStats);

  return (
    <Container>
      <Invocations invocations={invocationData}
        raidStats={raidStats}
        setRaidStats={setRaidStats} />
      <RaidStats raidStats={raidStats} />
    </Container>
  )
}

export default InvocationDisplay;