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

const InvocationDisplay = () => {
  const [raidLevel, setRaidLevel] = useState(0);

  return (
    <Container>
      <Invocations invocations={invocationData}
        raidLevel={raidLevel}
        setRaidLevel={setRaidLevel} />
      <RaidStats raidLevel={raidLevel} />
    </Container>
  )
}

export default InvocationDisplay