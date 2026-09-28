import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { FilledCircleToggleButton, ViewSwitcher } from './FilledCircleToggle';
import figma from '@figma/code-connect';

/**
 * Filled Circle Connections
 * `<ToggleButton> | Filled Circle` (Toggle Button page, node 3709:371) →
 * <FilledCircleToggleButton>; `<ToggleButtonGroup> | Filled Circle`
 * (node 3709:405) → <ViewSwitcher> (the List / Grid default).
 */
const BASE = 'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=';

figma.connect(FilledCircleToggleButton, `${BASE}3709-371`, {
  props: {
    size: figma.enum('Size', { Large: 'large', Medium: 'medium', Small: 'small' }),
    selected: figma.enum('State', {
      Enabled: false,
      Hovered: false,
      Selected: true,
      'Selected Hovered': true,
      Disabled: false,
    }),
    disabled: figma.enum('State', { Disabled: true }),
  },
  example: ({ size, selected, disabled }) => (
    <FilledCircleToggleButton value="list" size={size} selected={selected} disabled={disabled} aria-label="List view">
      <ViewHeadlineIcon />
    </FilledCircleToggleButton>
  ),
});

figma.connect(ViewSwitcher, `${BASE}3709-405`, {
  props: {
    size: figma.enum('Size', { Large: 'large', Medium: 'medium', Small: 'small' }),
    divider: figma.boolean('Divider'),
  },
  example: ({ size, divider }) => <ViewSwitcher value="grid" onChange={() => {}} size={size} divider={divider} />,
});
