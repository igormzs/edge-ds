import { EmpowerFooter } from './EmpowerFooter';
import figma from '@figma/code-connect';

/**
 * EmpowerFooter Connection
 * Maps the Figma `<EmpowerFooter>` component (Header & Footer page,
 * node 3757:1799) to `<EmpowerFooter>`.
 */
figma.connect(
  EmpowerFooter,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=3757-1799',
  {
    props: {
      copyright: figma.string('Copyright'),
    },
    example: ({ copyright }) => <EmpowerFooter copyright={copyright} />,
  }
);
