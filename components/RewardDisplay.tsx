import styled from "@emotion/styled";
import { Reward } from "../models/Reward";
import { RaidStats } from "./InvocationDisplay";

interface RewardProps {
  rewards: Reward[];
  raidStats: RaidStats;
}

const RewardsContainer = styled('div')`
margin-bottom: 1rem;
padding: 0.75rem 0.5rem;
border: 1px solid rgba(28,26,21,255);
display: grid;
grid-template-columns: repeat(4, 55px);
gap: 0.75rem;
justify-content: center;
box-shadow: inset 0 0 0 1px rgba(57,57,55,255);
background: rgba(255, 255, 255, 0.1);

@media only screen and (max-width: 768px) {
  display: flex;
  flex-wrap: wrap;
}
`;

const RewardImage = styled('div')`
padding: 0.25rem;
border: 2px solid black;
display: flex;
justify-self: center;
justify-content: center;
align-items: center;
background: rgb(56, 51, 45);
height: 55px;
width: 55px;

img {
  opacity: .5;
  object-fit: contain;
  transform: scale(1.2);
}

@media only screen and (max-width: 768px) {
  height: 40px;
  width: 40px;

  img {
    transform: scale(1);
  }
}
`;

const HighlightedRewardImage = styled(RewardImage)`
border-color: rgb(249, 191, 60);
box-shadow: inset 0 0 0 2px rgb(89, 52, 19);

img {
  opacity: 1;
}
`;

const getRewardIcon = (reward: Reward): string => {
  const name = reward.name.replaceAll('\'', '')
    .replaceAll(' ', '_')
    .toLowerCase();

  return `./icons/${name}_icon.png`;
}

const RewardsDisplay = ({ rewards, raidStats }: RewardProps) => {

  return (
    <RewardsContainer>
      {
        rewards.map((reward: Reward) => (
          raidStats.raidLevel < reward.levelRequired
            ? <RewardImage key={reward.name}>
              <img src={getRewardIcon(reward)} />
            </RewardImage>
            : <HighlightedRewardImage key={reward.name}>
              <img src={getRewardIcon(reward)} />
            </HighlightedRewardImage>
        ))
      }
    </RewardsContainer>
  );
}

export default RewardsDisplay;