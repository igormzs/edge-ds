'use client';

import React from 'react';
import {
  Divider,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

const codeSnippet = `import Divider from '@mui/material/Divider';

// Horizontal (Default)
<Divider />

// Vertical
<Box sx={{ display: 'flex', height: 20 }}>
  <Typography>Left</Typography>
  <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
  <Typography>Right</Typography>
</Box>

// With Text
<Divider>CENTERED TEXT</Divider>`;

const propRows: PropRow[] = [
  {
    prop: 'orientation',
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: 'The component orientation.',
  },
  {
    prop: 'variant',
    type: '"fullWidth" | "inset" | "middle"',
    default: '"fullWidth"',
    description: 'The variant to use.',
  },
  {
    prop: 'flexItem',
    type: 'boolean',
    default: 'false',
    description: 'If true, a vertical divider will have the correct height when used in flex containers.',
  },
];

export default function DividerPage() {
  return (
    <Box>
      <PageHeader
        title="Divider"
        description="A divider is a thin line that groups content in lists and layouts."
        muiLink="https://mui.com/material-ui/react-divider/"
      />

      <DocSection title="Horizontal">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Horizontal dividers are used to separate blocks of content or items in a list.
        </Typography>
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ py: 2 }}>Section Above</Typography>
            <Divider />
            <Typography variant="body1" sx={{ py: 2 }}>Section Below</Typography>
          </Box>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Vertical">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Vertical dividers are used to separate items in a horizontal layout, such as a header or a toolbar.
        </Typography>
        <PreviewCanvas>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <Typography>Item 1</Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
            <Typography>Item 2</Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
            <Typography>Item 3</Typography>
          </Box>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="With Content">
        <Typography variant="body2" sx={{ mb: 3 }}>
          You can also add text or other components inside the divider.
        </Typography>
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <Divider>OR</Divider>
            <Box sx={{ py: 4 }} />
            <Divider textAlign="left">LEFT ALIGNED</Divider>
            <Box sx={{ py: 4 }} />
            <Divider textAlign="right">RIGHT ALIGNED</Divider>
          </Box>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
      </DocSection>

      <DocSection title="Usage Example">
        <CodeBlock code={codeSnippet} />
      </DocSection>
    </Box>
  );
}
