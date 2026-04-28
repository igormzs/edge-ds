'use client';

import React, { useState } from 'react';
import {
  Backdrop,
  CircularProgress,
  Button,
  Box,
  Typography,
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

const codeSnippet = `import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const [open, setOpen] = useState(false);

const handleClose = () => {
  setOpen(false);
};

const handleOpen = () => {
  setOpen(true);
};

return (
  <div>
    <Button onClick={handleOpen}>Show Backdrop</Button>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>
);`;

const propRows: PropRow[] = [
  {
    prop: 'open',
    type: 'boolean',
    default: 'false',
    description: 'If true, the backdrop is visible.',
  },
  {
    prop: 'onClick',
    type: 'func',
    default: '—',
    description: 'Callback fired when the component is clicked.',
  },
  {
    prop: 'sx',
    type: 'SxProps<Theme>',
    default: '—',
    description: 'The system prop that allows defining system overrides as well as additional CSS styles.',
  },
  {
    prop: 'transitionDuration',
    type: 'number | { enter?: number, exit?: number }',
    default: '{ enter: 225, exit: 195 }',
    description: 'The duration for the transition, in milliseconds.',
  },
];

export default function BackdropPage() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <PageHeader
        title="Backdrop"
        description="The backdrop component is used to provide emphasis on a particular element or parts of it. It signals a state change of the application and can be used for creating loaders, dialogs, and more."
        muiLink="https://mui.com/material-ui/react-backdrop/"
      />

      <DocSection title="Example Usage">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Click the button below to see the backdrop in action. It will show a loading spinner over the entire screen. Click anywhere on the backdrop to close it.
        </Typography>
        <PreviewCanvas>
          <PreviewGroup label="Interactive Demo">
            <Button variant="contained" onClick={handleToggle}>
              Show Backdrop
            </Button>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress color="inherit" sx={{ mb: 2 }} />
                <Typography variant="h6">Loading...</Typography>
              </Box>
            </Backdrop>
          </PreviewGroup>
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
