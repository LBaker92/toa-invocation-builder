import styled from "@emotion/styled";
import { RaidStatsProps } from "./RaidStats";

const Icon = styled('img')`
margin: 0 1rem;
height: 42px;
`;

const RaidLevelIcon = ({ raidStats }: RaidStatsProps) => {
  if (raidStats.raidLevel >= 300) return <Icon src="./icons/expert_mode_icon.png" />
  else if (raidStats.raidLevel >= 150) return <Icon src="./icons/normal_mode_icon.png" />
  else return <Icon src="./icons/entry_mode_icon.png" />
}

export default RaidLevelIcon;