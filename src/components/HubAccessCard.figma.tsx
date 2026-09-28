import { HubAccessCard } from './HubAccessCard';
import figma from '@figma/code-connect';

/**
 * HubAccessCard Connection
 * `<Card> | Hub Access` (Card page, set 3819:56927) → <HubAccessCard>.
 */
figma.connect(
  HubAccessCard,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=3819-56927',
  {
    props: {
      platform: figma.enum('Platform', {
        Insights: 'insights',
        Knowledge: 'knowledge',
        Connections: 'connections',
        Certifications: 'certifications',
        Compliance: 'compliance',
        'Pay Tool': 'payTool',
      }),
    },
    example: ({ platform }) => <HubAccessCard platform={platform} href="#" />,
  }
);
