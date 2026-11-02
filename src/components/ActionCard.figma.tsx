import { ActionCard } from './ActionCard';
import figma from '@figma/code-connect';

/**
 * ActionCard Connection
 * `<Card> | Action` (Card page, component set 4257:1580) → <ActionCard>.
 * Type maps to `type`; State maps to added (Proposed), expanded/editing (Selected).
 */
figma.connect(
  ActionCard,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=4257-1580',
  {
    props: {
      type: figma.enum('Type', { Proposed: 'proposed', Selected: 'selected', Summary: 'summary' }),
      added: figma.enum('State', { Added: true }),
      expanded: figma.enum('State', { Expanded: true, Editing: true }),
      editing: figma.enum('State', { Editing: true }),
      assigned: figma.boolean('Status?'),
      title: figma.string('Title'),
      category: figma.string('Category'),
      rationale: figma.string('Rationale'),
      proposedAction: figma.string('Proposed Action'),
    },
    example: ({ type, added, expanded, editing, assigned, title, category, rationale, proposedAction }) => (
      <ActionCard
        type={type}
        title={title}
        category={category}
        rationale={rationale}
        proposedAction={proposedAction}
        added={added}
        assigned={assigned}
        expanded={expanded}
        editing={editing}
        details={[
          { title: '1. Ownership', fields: [{ label: 'Responsible role or function', value: 'Human Resources' }] },
        ]}
        onToggleAdd={() => {}}
        onEdit={() => {}}
        onConfirm={() => {}}
        onDelete={() => {}}
      />
    ),
  }
);
