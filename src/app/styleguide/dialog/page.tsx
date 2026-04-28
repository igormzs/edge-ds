'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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

const codeSnippet = `import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const [open, setOpen] = useState(false);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

return (
  <>
    <Button variant="contained" onClick={handleOpen}>
      Open Dialog
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Use Google's location service?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} variant="contained" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </>
);`;

const propRows: PropRow[] = [
  {
    prop: 'open',
    type: 'boolean',
    default: 'false',
    description: 'If true, the component is shown.',
  },
  {
    prop: 'onClose',
    type: 'func',
    default: '—',
    description: 'Callback fired when the component requests to be closed.',
  },
  {
    prop: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'If true, the dialog stretches to maxWidth.',
  },
  {
    prop: 'maxWidth',
    type: '"xs" | "sm" | "md" | "lg" | "xl" | false',
    default: '"sm"',
    description: 'Determine the max-width of the dialog.',
  },
];

export default function DialogPage() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <PageHeader
        title="Dialog"
        description="Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks."
        muiLink="https://mui.com/material-ui/react-dialog/"
      />

      <DocSection title="Interactive Demo">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Click the button to open a standard confirmation dialog.
        </Typography>
        <PreviewCanvas>
          <PreviewGroup label="Confirmation Dialog">
            <Button variant="contained" onClick={handleClickOpen}>
              Open Confirmation Dialog
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm account deletion?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ p: 2, pt: 1 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} variant="contained" color="error" autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
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
