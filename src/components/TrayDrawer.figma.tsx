import { TrayDrawer } from './TrayDrawer';
import { ActionCard } from './ActionCard';
import figma from '@figma/code-connect';

/**
 * TrayDrawer Connection
 * `<Drawer> | Tray` (Drawer page, component set 4259:674) → <TrayDrawer>.
 * The ↳ Content slot maps to children (rows of <ActionCard type="summary" />).
 */
figma.connect(
  TrayDrawer,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=4259-674',
  {
    props: {
      expanded: figma.enum('Expanded', { True: true, False: false }),
      title: figma.string('Title'),
      count: figma.string('Count'),
    },
    example: ({ expanded, title, count }) => (
      <TrayDrawer expanded={expanded} title={title} count={count} actionLabel="Save action plan" onAction={() => {}}>
        <ActionCard
          type="summary"
          category="1. Equal pay for equivalent work"
          title="Equal Pay Policy Development"
          proposedAction="Consider setting targets for the gender composition of junior, middle, upper and top management levels."
          onDelete={() => {}}
        />
      </TrayDrawer>
    ),
  }
);
