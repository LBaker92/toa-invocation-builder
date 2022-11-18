import styled from '@emotion/styled';
import React, { useState } from 'react'
import { Invocation } from '../models/Invocation';
import { RaidStats } from './InvocationDisplay';

interface Props {
  invocations: Invocation[];
  raidStats: RaidStats;
  setRaidStats: React.Dispatch<React.SetStateAction<RaidStats>>;
}

const Container = styled('div')`
display: grid;
grid-template-columns: repeat(5, 1fr);
row-gap: 1.5rem;
`

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
`;

const InvocationImage = styled('img')`
filter: grayscale(100%) brightness(10%);
`

const ActiveInvocationImage = styled(InvocationImage)`
filter: none;
`

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

const Invocations = ({ invocations, raidStats, setRaidStats }: Props) => {
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
          activeInvocationsByCategory.get(invocation.category)?.has(invocation)
            ? <ActiveInvocationButton
              key={invocation.name}
              onClick={() => handleInvocationClicked(invocation)}>
              <ActiveInvocationImage src={getIconPath(invocation)}></ActiveInvocationImage>
              {invocation.name}
            </ActiveInvocationButton>
            : <InvocationButton
              key={invocation.name}
              onClick={() => handleInvocationClicked(invocation)}>
              <InvocationImage src={getIconPath(invocation)}></InvocationImage>
              {invocation.name}
            </InvocationButton>
        ))
      }
    </Container>
  );
}

export default Invocations;
