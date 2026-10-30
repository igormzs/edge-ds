import { PlatformIcon } from './PlatformIcon';
import figma from '@figma/code-connect';

/**
 * PlatformIcon Connection
 * Maps the Figma `<PlatformIcon>` component set (Assets page, node 3754:430)
 * to `<PlatformIcon>`. `Size` maps directly; the `Logo` instance swap has no
 * enum to map from, so pick `platform` to match the swapped master
 * (Internal / PlatformIcon / Insights → 'insights', …/Pay Tool → 'payTool').
 */
figma.connect(
  PlatformIcon,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=3754-430',
  {
    props: {
      size: figma.enum('Size', {
        '16': 16,
        '24': 24,
        '32': 32,
        '48': 48,
        '64': 64,
        '80': 80,
        '100': 100,
      }),
    },
    example: ({ size }) => <PlatformIcon platform="insights" size={size} />,
  }
);
