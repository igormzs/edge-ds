import { TaskCard } from './TaskCard';
import figma from '@figma/code-connect';

/**
 * TaskCard Connection
 * `<Card> | Content` Type=Task (Card page, set 3688:904) → <TaskCard>.
 * State=Hover is a live interaction state in code.
 */
figma.connect(
  TaskCard,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=3688-904',
  {
    variant: { Type: 'Task' },
    props: {
      number: figma.string('Number'),
      title: figma.string('Title'),
      surface: figma.enum('Surface', { Paper: 'paper', Subtle: 'subtle' }),
    },
    example: ({ number, title, surface }) => <TaskCard number={number} title={title} surface={surface} />,
  }
);
