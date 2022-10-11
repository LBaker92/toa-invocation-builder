import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React from 'react'

interface Props {
  raidLevel: number;
}

const RaidLevelProgressBar = styled('div')`
display: flex;
align-items: center;
background: white;
height: 1.5rem;
width: 100%;
box-shadow: 0 0 0 1px black;
`;

const RaidLevelNumber = styled('span')`
font-weight: bold;
font-size: 24px;
`;

const Progress = ({ raidLevel }: Props) => {
  const percentage = Math.round((raidLevel / 600) * 100);

  const EntryBarFiller = styled('div')`
  height: 100%;
  background: rgb(249,195,75);
  width: ${percentage}%;
  `;

  const NormalBarFiller = styled(EntryBarFiller)`
  background: rgb(60,79,143);
  `;

  const ExpertBarFiller = styled(EntryBarFiller)`
  background: rgb(189,38,50);
  `;

  if (raidLevel >= 300) return <ExpertBarFiller />
  else if (raidLevel >= 150) return <NormalBarFiller />
  else return <EntryBarFiller />
}

const RaidStats = ({ raidLevel }: Props) => {
  return (
    <Box padding='0 1rem'
      display='flex'
      flexDirection='column'
      alignItems='center'
      fontFamily='RuneScape-Bold-12'>
      <RaidLevelNumber>
        {raidLevel}
      </RaidLevelNumber>

      <RaidLevelProgressBar>
        <Progress raidLevel={raidLevel} />
      </RaidLevelProgressBar>
    </Box>
  )
}

export default RaidStats