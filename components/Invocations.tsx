import { Grid, styled } from '@mui/material';
import React, { useState } from 'react'
import { Invocation } from '../models/Invocation';

interface Props {
  invocations: Invocation[];
  raidLevel: number;
  setRaidLevel: React.Dispatch<React.SetStateAction<number>>;
}

const InvocationButton = styled('div')`
border: none;
cursor: pointer;
display: flex;
flex-direction: column;
background: transparent;
justify-content: center;
align-items: center;
height: 75px;
width: 100%;
color: black;
filter: grayscale(100%) brightness(10%);
`;

const ActiveInvocationButton = styled(InvocationButton)`
color: rgba(206,161,80,255);
text-shadow:
1.5px 1.2px 0px black,
0 1px 2px black;
filter: none;
`;

const uniqueInvocationCategories = new Set<string>([
  'Attempts',
  'Time Limit',
  'Helpful Spirit',
  'Path Level'
]);

const Invocations = ({ invocations, raidLevel, setRaidLevel }: Props) => {
  const [activeInvocationsByCategory, setActiveInvocationsByCategory] = useState(new Map<string, Set<Invocation>>());

  const handleInvocationClicked = (invocation: Invocation): void => {
    const currentInvocationsByCategory = new Map(activeInvocationsByCategory);
    const currentInvocations = currentInvocationsByCategory.get(invocation.category) || new Set<Invocation>();

    // Current invocation exists.
    if (currentInvocations.has(invocation)) {
      raidLevel -= invocation.modifier;
      currentInvocations.delete(invocation);

      // Remove any invocations dependent on this current invocation.
      for (const currentInvocation of currentInvocations.values()) {
        if (currentInvocation.dependencies && currentInvocation.dependencies.includes(invocation.name)) {
          raidLevel -= currentInvocation.modifier;
          currentInvocations.delete(currentInvocation);
        }
      }

      currentInvocationsByCategory.set(invocation.category, currentInvocations);

      setActiveInvocationsByCategory(currentInvocationsByCategory);
      setRaidLevel(raidLevel);

      return;
    }

    // There can only be one invocation active for this category.
    if (uniqueInvocationCategories.has(invocation.category) && currentInvocations.size > 0) {
      for (const currentInvocation of currentInvocations.values()) {
        raidLevel -= currentInvocation.modifier;
        currentInvocations.delete(currentInvocation);
      }

      currentInvocations.add(invocation);
      currentInvocationsByCategory.set(invocation.category, currentInvocations);

      setActiveInvocationsByCategory(currentInvocationsByCategory)
      setRaidLevel(raidLevel + invocation.modifier);
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
    setRaidLevel(raidLevel + invocation.modifier);
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
    <Grid container
      columns={4}>
      {
        invocations.map(invocation => (
          <Grid item lg={1}
            key={invocation.name}>
            {
              activeInvocationsByCategory.get(invocation.category)?.has(invocation)
                ? <ActiveInvocationButton
                  onClick={() => handleInvocationClicked(invocation)}>
                  <img src={getIconPath(invocation)}></img>
                  {invocation.name}
                </ActiveInvocationButton>
                : <InvocationButton
                  onClick={() => handleInvocationClicked(invocation)}>
                  <img src={getIconPath(invocation)}></img>
                  {invocation.name}
                </InvocationButton>
            }
          </Grid>
        ))
      }
    </Grid >
  );
}

export default Invocations