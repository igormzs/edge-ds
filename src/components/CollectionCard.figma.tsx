import { CollectionCard } from './CollectionCard';
import figma from '@figma/code-connect';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

/**
 * CollectionCard Connection
 * `<Card> | Collection` (Card page, component 4164:1069) → <CollectionCard>.
 */
figma.connect(
  CollectionCard,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=4164-1069',
  {
    props: {
      count: figma.boolean('Count?', { true: figma.string('↳ Count'), false: undefined }),
      eyebrow: figma.boolean('Eyebrow?', { true: figma.string('↳ Eyebrow'), false: undefined }),
      title: figma.string('Title'),
      intent: figma.boolean('Intent?', { true: figma.string('↳ Intent'), false: undefined }),
      description: figma.boolean('Description?', { true: figma.string('↳ Description'), false: undefined }),
    },
    example: ({ count, eyebrow, title, intent, description }) => (
      <CollectionCard
        icon={<HandymanOutlinedIcon />}
        count={count}
        eyebrow={eyebrow}
        title={title}
        intent={intent}
        description={description}
        links={[{ label: 'Collection name', count: 12, href: '#' }]}
        newest={{ meta: 'Newest here · 12 Jan 2026', title: 'Title of the newest item in this section' }}
        href="#"
      />
    ),
  }
);
