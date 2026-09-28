import { AccordionSection } from './AccordionSection';
import { ViewSwitcher } from './FilledCircleToggle';
import figma from '@figma/code-connect';

/**
 * AccordionSection Connection
 * `<Accordion> | Section` (Accordion page, node 3716:555) → <AccordionSection>.
 * ↳ Content has no code equivalent to map; pass the content as children.
 */
figma.connect(
  AccordionSection,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=3716-555',
  {
    props: {
      title: figma.string('Title'),
      defaultExpanded: figma.enum('State', { Expanded: true, Default: false }),
      showProgress: figma.boolean('Progress?'),
      showActions: figma.boolean('Actions?'),
    },
    example: ({ title, defaultExpanded, showProgress, showActions }) => (
      <AccordionSection
        title={title}
        defaultExpanded={defaultExpanded}
        progress={showProgress ? 50 : undefined}
        actions={showActions ? <ViewSwitcher value="grid" onChange={() => {}} /> : undefined}
      >
        {/* section content */}
      </AccordionSection>
    ),
  }
);
