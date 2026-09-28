import { StepCard, StepperCard } from './StepperCard';
import figma from '@figma/code-connect';

/**
 * StepperCard Connections
 * `Step | Card` (Stepper page, node 3742:14813) → <StepCard>; Hover is a live
 * interaction state in code, so it maps to 'inactive'.
 * `Stepper | Card` (node 3742:14814) → <StepperCard>.
 */
const BASE = 'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=';

figma.connect(StepCard, `${BASE}3742-14813`, {
  props: {
    state: figma.enum('State', {
      Inactive: 'inactive',
      Hover: 'inactive',
      Active: 'active',
      Complete: 'complete',
    }),
    number: figma.string('Number'),
    label: figma.string('Label'),
  },
  example: ({ state, number, label }) => <StepCard state={state} number={number} label={label} />,
});

figma.connect(StepperCard, `${BASE}3742-14814`, {
  example: () => (
    <StepperCard
      activeStep={4}
      steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }, { label: 'Step 4' }, { label: 'Step 5' }]}
    />
  ),
});
