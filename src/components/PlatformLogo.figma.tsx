import { PlatformLogo } from './PlatformLogo';
import figma from '@figma/code-connect';

/**
 * PlatformLogo Connection
 * Maps the Figma `<PlatformLogo>` component set (Assets page, node 3754:430)
 * to `<PlatformLogo>`. `Size` maps directly; the `Logo` instance swap has no
 * enum to map from, so pick `platform` to match the swapped master
 * (Internal / PlatformLogo / Insights → 'insights', …/Pay Tool → 'payTool').
 */
figma.connect(
  PlatformLogo,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=3754-430',
  {
    props: {
      size: figma.enum('Size', {
        '16': 16,
        '24': 24,
        '32': 32,
        '48': 48,
        '64': 64,
        '100': 100,
      }),
    },
    example: ({ size }) => <PlatformLogo platform="insights" size={size} />,
  }
);
