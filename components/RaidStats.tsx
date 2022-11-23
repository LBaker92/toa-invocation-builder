import styled from '@emotion/styled';
import React from 'react'
import { RaidStats as RaidStatsInterface } from './InvocationDisplay';
import rewardData from '../public/rewards.json';
import RewardsDisplay from './RewardDisplay';
import RaidLevelIcon from './RaidLevelIcon';
import RaidLevelProgress from './RaidLevelProgress';

export interface RaidStatsProps {
  raidStats: RaidStatsInterface;
}

const Container = styled('div')`
grid-column: 2;
display: flex;
flex-direction: column;

@media only screen and (max-width: 768px) {
  grid-row: 1;
  grid-column: 1;
}
`;

const StatContainer = styled('div')`
margin-bottom: 1rem;
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

const RaidLevelProgressContainer = styled('div')`
margin-top: 0.5rem;
display: flex;
background: rgba(255, 255, 255, 0.5);
height: 1.5rem;
box-shadow: 0 0 0 1px black;
`;

const RaidStats = ({ raidStats }: RaidStatsProps) => {
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

        <RaidLevelProgressContainer>
          <RaidLevelProgress raidStats={raidStats} />
        </RaidLevelProgressContainer>
      </StatContainer>

      <RewardsDisplay rewards={rewardData} raidStats={raidStats} />
    </Container>
  );
}

export default RaidStats;