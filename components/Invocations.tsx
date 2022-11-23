import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { Invocation } from '../models/Invocation';
import { RaidStats } from './InvocationDisplay';

interface InvocationsProps {
  invocations: Invocation[];
  raidStats: RaidStats;
  setRaidStats: React.Dispatch<React.SetStateAction<RaidStats>>;
}

const Container = styled('div')`
padding: 1.5rem;
display: grid;
gap: 2rem;
grid-template-columns: repeat(4, 1fr);
border: 1px solid rgb(28, 26, 21);
box-shadow: inset 0 0 0 1px rgba(57,57,55,255);
overflow-y: auto;

@media only screen and (max-width: 768px) {
  grid-row: 2;
  column-gap: 1rem;
  row-gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
}

@media only screen and (max-width: 480px) {
  padding: 1rem 0;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0;
}
`;

const InvocationButton = styled('div')`
border: none;
cursor: pointer;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
background: transparent;
color: rgba(255, 255, 255, 0.45);
text-shadow:
1.5px 1.2px 0px black,
0 1px 2px black;

@media only screen and (max-width: 480px) {
  font-size: 14px;
}
`;

const InvocationImage = styled('img')`
margin-bottom: 0.75rem;
transform: scale(1.3);
filter: grayscale(100%) brightness(10%);

@media only screen and (max-width: 480px) {
  transform: scale(1);
  margin-bottom: 0;
}
`;

const ActiveInvocationImage = styled(InvocationImage)`
filter: none;
`;

const ActiveInvocationButton = styled(InvocationButton)`
color: rgba(206,161,80,255);
`;

const uniqueInvocationCategories = new Set<string>([
  'Attempts',
  'Time Limit',
  'Helpful Spirit',
  'Path Level'
]);

const getInvocationCount = (activeInvocationsByCategory: Map<string, Set<Invocation>>): number => {
  let totalInvocations = 0;

  for (const invocationSet of activeInvocationsByCategory.values()) {
    totalInvocations += invocationSet.size;
  }

  return totalInvocations;
}

const Invocations = ({ invocations, raidStats, setRaidStats }: InvocationsProps) => {
  const [activeInvocationsByCategory, setActiveInvocationsByCategory] = useState(new Map<string, Set<Invocation>>());

  const handleInvocationClicked = (invocation: Invocation): void => {
    const currentInvocationsByCategory = new Map(activeInvocationsByCategory);
    const currentInvocations = currentInvocationsByCategory.get(invocation.category) || new Set<Invocation>();

    // Current invocation exists.
    if (currentInvocations.has(invocation)) {
      raidStats.raidLevel -= invocation.modifier;
      currentInvocations.delete(invocation);

      // Remove any invocations dependent on this current invocation.
      for (const currentInvocation of currentInvocations.values()) {
        if (currentInvocation.dependencies && currentInvocation.dependencies.includes(invocation.name)) {
          raidStats.raidLevel -= currentInvocation.modifier;
          currentInvocations.delete(currentInvocation);
        }
      }

      currentInvocationsByCategory.set(invocation.category, currentInvocations);

      setActiveInvocationsByCategory(currentInvocationsByCategory);
      setRaidStats({
        raidLevel: raidStats.raidLevel,
        invocationCount: getInvocationCount(currentInvocationsByCategory)
      } as RaidStats);

      return;
    }

    // There can only be one invocation active for this category.
    if (uniqueInvocationCategories.has(invocation.category) && currentInvocations.size > 0) {
      for (const currentInvocation of currentInvocations.values()) {
        raidStats.raidLevel -= currentInvocation.modifier;
        currentInvocations.delete(currentInvocation);
      }

      currentInvocations.add(invocation);
      currentInvocationsByCategory.set(invocation.category, currentInvocations);

      setActiveInvocationsByCategory(currentInvocationsByCategory)
      setRaidStats({
        raidLevel: raidStats.raidLevel + invocation.modifier,
        invocationCount: getInvocationCount(currentInvocationsByCategory)
      } as RaidStats);
      return;
    }

    // Current invocation needs it's dependencies to be active already.
    if (invocation.dependencies && currentInvocations.size === 0) return;

    if (invocation.dependencies) {
      const currentInvocationNames = new Set(Array.from(currentInvocations)
        .map((invocation) => invocation.name)
      );

      for (const dependency of invocation.dependencies) {
        if (!currentInvocationNames.has(dependency)) {
          return;
        }
      }
    }

    currentInvocations.add(invocation);
    currentInvocationsByCategory.set(invocation.category, currentInvocations);

    setActiveInvocationsByCategory(currentInvocationsByCategory);
    setRaidStats({
      raidLevel: raidStats.raidLevel + invocation.modifier,
      invocationCount: getInvocationCount(currentInvocationsByCategory)
    } as RaidStats);
  }

  const getIconPath = (invocation: Invocation): string => {
    let formattedCategory = invocation.category;

    if (invocation.category === 'Restoration') {
      formattedCategory = invocation.name;
    }

    formattedCategory = formattedCategory.replaceAll(' ', '_')
      .toLowerCase();

    return `./icons/${formattedCategory}_icon.png`
  }

  return (
    <Container>
      {
        invocations.map(invocation => (
          <Tooltip title={invocation.details} key={invocation.name}>
            {
              activeInvocationsByCategory.get(invocation.category)?.has(invocation)
                ?
                <ActiveInvocationButton
                  onClick={() => handleInvocationClicked(invocation)}>
                  <ActiveInvocationImage src={getIconPath(invocation)}></ActiveInvocationImage>
                  {invocation.name}
                </ActiveInvocationButton>
                :
                <InvocationButton
                  onClick={() => handleInvocationClicked(invocation)}>
                  <InvocationImage src={getIconPath(invocation)}></InvocationImage>
                  {invocation.name}
                </InvocationButton>
            }
          </Tooltip>
        ))
      }
    </Container>
  );
}

export default Invocations;
