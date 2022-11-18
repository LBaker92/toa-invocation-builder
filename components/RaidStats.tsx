import styled from '@emotion/styled';
import React from 'react'
import { RaidStats as RaidStatsInterface } from './InvocationDisplay';

interface StatsProps {
  raidStats: RaidStatsInterface;
}

const Container = styled('div')`
border: 1px solid black;
padding: 0.5rem 1rem;
grid-column: 2;
display: flex;
flex-direction: column;
background: rgba(255, 255, 255, 0.1);
`

const RaidLevelProgressBar = styled('div')`
display: flex;
align-items: center;
background: white;
height: 1.5rem;
box-shadow: 0 0 0 1px black;
`;

const Stats = styled('div')`
margin: 0 auto;
padding: 0.5rem 1rem;
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: start;
width: 60%;
`;

const Stat = styled('div')`
padding: 0 0.5rem;
display: flex;
flex-direction: column;
align-items: center;
font-weight: 500;
font-size: 18px;

img {
  width: 22px;
}
`;

const Progress = ({ raidStats }: StatsProps) => {
  const percentage = Math.round((raidStats.raidLevel / 600) * 100);

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

  if (raidStats.raidLevel >= 300) return <ExpertBarFiller />
  else if (raidStats.raidLevel >= 150) return <NormalBarFiller />
  else return <EntryBarFiller />
}

const RaidLevelIcon = ({ raidStats }: StatsProps) => {
  const Icon = styled('img')`
  width: 40px;
  `
  if (raidStats.raidLevel >= 300) return <Icon src="./icons/expert_mode_icon.png" />
  else if (raidStats.raidLevel >= 150) return <Icon src="./icons/normal_mode_icon.png" />
  else return <Icon src="./icons/entry_mode_icon.png" />
}

const RaidStats = ({ raidStats }: StatsProps) => {
  return (
    <Container>
      <Stats>
        <Stat>
          <img src="./icons/raid_level_icon.png" />
          {raidStats.raidLevel}
        </Stat>

        <RaidLevelIcon raidStats={raidStats} />

        <Stat>
          <img src="./icons/invocations_icon.png" />
          {raidStats.invocationCount}
        </Stat>
      </Stats>

      <RaidLevelProgressBar>
        <Progress raidStats={raidStats} />
      </RaidLevelProgressBar>
    </Container>
  );
}

export default RaidStats;