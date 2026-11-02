import { CardTab, CardTabs } from './CardTabs';
import figma from '@figma/code-connect';

/**
 * CardTabs Connections
 * `<Tab> | Card` (Tabs page, node 4256:696) → <CardTab>; Hover is a live
 * interaction state in code, so it maps to an unselected tab.
 * `<Tabs> | Card` (node 4256:697) → <CardTabs>.
 */
const BASE = 'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=';

figma.connect(CardTab, `${BASE}4256-696`, {
  props: {
    label: figma.string('Label'),
  },
  example: ({ label }) => <CardTab label={label} />,
});

figma.connect(CardTabs, `${BASE}4256-697`, {
  example: () => (
    <CardTabs value={1} onChange={() => {}} aria-label="Action categories">
      <CardTab label="Equal pay for equivalent work" />
      <CardTab label="Recruitment and promotion" />
      <CardTab label="Leadership development training and mentoring" />
      <CardTab label="Flexible working" />
      <CardTab label="Organizational culture" />
    </CardTabs>
  ),
});
