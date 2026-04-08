'use client';

import {
  Alert,
  AlertTitle,
  Stack,
  Box,
} from '@mui/material';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

const codeSnippet = `import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// Basic severities
<Alert severity="success">This is a success alert.</Alert>
<Alert severity="info">This is an info alert.</Alert>
<Alert severity="warning">This is a warning alert.</Alert>
<Alert severity="error">This is an error alert.</Alert>

// Filled variant
<Alert variant="filled" severity="success">
  Upload completed successfully!
</Alert>

// Outlined variant  
<Alert variant="outlined" severity="error">
  Something went wrong.
</Alert>

// With title
<Alert severity="warning">
  <AlertTitle>Warning</AlertTitle>
  Please review your input before submitting.
</Alert>

// Dismissible (with onClose)
<Alert
  severity="info"
  onClose={() => setOpen(false)}
>
  This alert can be dismissed.
</Alert>`;

const propRows: PropRow[] = [
  {
    prop: 'severity',
    type: '"success" | "info" | "warning" | "error"',
    default: '"success"',
    description: 'Controls the icon, colour, and semantic meaning of the alert.',
  },
  {
    prop: 'variant',
    type: '"standard" | "filled" | "outlined"',
    default: '"standard"',
    description: 'Sets the visual style — standard is subtle, filled is bold.',
  },
  {
    prop: 'onClose',
    type: '() => void',
    default: '—',
    description: 'When provided, renders a close (×) button that fires on click.',
  },
  {
    prop: 'icon',
    type: 'ReactNode | false',
    default: 'auto',
    description: 'Override the default severity icon, or pass false to remove it.',
  },
  {
    prop: 'action',
    type: 'ReactNode',
    default: '—',
    description: 'Custom action (e.g., button) rendered at the end of the alert.',
  },
];

export default function AlertPage() {
  return (
    <Box>
      <PageHeader
        title="Alert"
        description="Alerts display brief, important messages in a way that attracts attention without interrupting the user's task. They come in four semantic severities and three visual variants."
        muiLink="https://mui.com/material-ui/react-alert/"
      />

      {/* Severities */}
      <DocSection title="Severities">
        <PreviewCanvas>
          <Stack spacing={1.5} sx={{ width: '100%' }}>
            <Alert severity="success">This is a success message — the action was completed.</Alert>
            <Alert severity="info">This is an info message — here's something you should know.</Alert>
            <Alert severity="warning">This is a warning — please review before continuing.</Alert>
            <Alert severity="error">This is an error — the action could not be completed.</Alert>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Variants */}
      <DocSection title="Variants">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <Box>
              <Stack spacing={1.5}>
                <Alert variant="standard" severity="info">Standard variant (default)</Alert>
                <Alert variant="filled" severity="info">Filled variant — high emphasis</Alert>
                <Alert variant="outlined" severity="info">Outlined variant — subtle emphasis</Alert>
              </Stack>
            </Box>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* States */}
      <DocSection title="States">
        <PreviewCanvas>
          <Stack spacing={1.5} sx={{ width: '100%' }}>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Your profile has been updated — with a title and no close button.
            </Alert>
            <Alert severity="warning" onClose={() => undefined}>
              <AlertTitle>Action required</AlertTitle>
              Your session is about to expire — with a title and close button.
            </Alert>
            <Alert severity="error" onClose={() => undefined}>
              Dismissible error without a title.
            </Alert>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* All filled severities */}
      <DocSection title="Filled — All Severities">
        <PreviewCanvas>
          <Stack spacing={1.5} sx={{ width: '100%' }}>
            {(['success', 'info', 'warning', 'error'] as const).map((s) => (
              <Alert key={s} variant="filled" severity={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}: This is a filled alert.
              </Alert>
            ))}
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Props */}
      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
      </DocSection>

      {/* Code */}
      <DocSection title="Usage">
        <CodeBlock code={codeSnippet} />
      </DocSection>
    </Box>
  );
}
