import styled from "@emotion/styled";
import { RaidStatsProps } from "./RaidStats";

interface EntryBarProps {
  width?: number;
}

const EntryBarFiller = styled('div')`
height: 100%;
background: rgb(249, 195, 75);
width: ${(props: EntryBarProps) => props?.width || 0}%;
`;

const NormalBarFiller = styled(EntryBarFiller)`
background: rgb(60,79,143);
`;

const ExpertBarFiller = styled(EntryBarFiller)`
background: rgb(189,38,50);
`;

const RaidLevelProgress = ({ raidStats }: RaidStatsProps) => {
  const percentage = Math.round((raidStats.raidLevel / 600) * 100);

  if (raidStats.raidLevel >= 300) return <ExpertBarFiller width={percentage} />;
  else if (raidStats.raidLevel >= 150) return <NormalBarFiller width={percentage} />;
  else return <EntryBarFiller width={percentage} />;
}

export default RaidLevelProgress;