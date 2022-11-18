import styled from '@emotion/styled';
import React from 'react'
import { RaidStats as RaidStatsInterface } from './InvocationDisplay';

interface StatsProps {
  raidStats: RaidStatsInterface;
}

const Container = styled('div')`
grid-column: 2;
display: flex;
flex-direction: column;
`

const StatContainer = styled('div')`
padding: 0.75rem 0.5rem;
border: 1px solid rgba(28,26,21,255);
box-shadow: inset 0 0 0 1px rgba(57,57,55,255);
background: rgba(255, 255, 255, 0.1);
`;

const Stats = styled('div')`
display: flex;
justify-content: center;
align-items: start;
`;

const Stat = styled('div')`
display: flex;
flex-direction: column;
align-items: center;
font-weight: 500;
font-size: 18px;
width: 40px;

img {
  width: 23px;
}
`;

const RaidLevelProgressBar = styled('div')`
margin-top: 0.5rem;
display: flex;
background: rgba(255, 255, 255, 0.5);
height: 1.5rem;
box-shadow: 0 0 0 1px black;
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
  margin: 0 1rem;
  height: 42px;
  `
  if (raidStats.raidLevel >= 300) return <Icon src="./icons/expert_mode_icon.png" />
  else if (raidStats.raidLevel >= 150) return <Icon src="./icons/normal_mode_icon.png" />
  else return <Icon src="./icons/entry_mode_icon.png" />
}

const RaidStats = ({ raidStats }: StatsProps) => {
  return (
    <Container>
      <StatContainer>
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
      </StatContainer>
    </Container>
  );
}

export default RaidStats;