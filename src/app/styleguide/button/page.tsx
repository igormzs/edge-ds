'use client';

import {
  Button,
  Stack,
  Box,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

const codeSnippet = `import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

// Contained (Primary)
<Button variant="contained" color="primary">
  Send
</Button>

// Outlined (Secondary)
<Button variant="outlined" color="secondary">
  Cancel
</Button>

// Text
<Button variant="text" color="primary">
  Learn more
</Button>

// With start icon
<Button variant="contained" startIcon={<SendIcon />}>
  Send Message
</Button>

// Disabled
<Button variant="contained" disabled>
  Submit
</Button>`;

const propRows: PropRow[] = [
  {
    prop: 'variant',
    type: '"contained" | "outlined" | "text"',
    default: '"text"',
    description: 'Controls the visual style of the button.',
  },
  {
    prop: 'color',
    type: '"primary" | "secondary" | "error" | "warning" | "info" | "success"',
    default: '"primary"',
    description: 'The theme colour applied to the button.',
  },
  {
    prop: 'size',
    type: '"small" | "medium" | "large" | "icon"',
    default: '"medium"',
    description: 'Adjusts padding, font size and icon size. "icon" creates a 44x44 circular button.',
  },
  {
    prop: 'startIcon / endIcon',
    type: 'ReactNode',
    default: '—',
    description: 'Icon placed before or after the label text.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'When true, the button is non-interactive and visually muted.',
  },
  {
    prop: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'Stretches the button to fill its container width.',
  },
];

export default function ButtonPage() {
  return (
    <Box>
      <PageHeader
        title="Button"
        description="Buttons allow users to trigger actions with a single tap. The EDGE Design System provides three hierarchy levels — Contained (primary action), Outlined (secondary), and Text (tertiary) — in three sizes across multiple semantic colour roles."
        muiLink="https://mui.com/material-ui/react-button/"
      />

      {/* Variants */}
      <DocSection title="Variants">
        <Stack spacing={2}>
          <PreviewCanvas>
            <PreviewGroup label="Contained">
              <Button variant="contained" color="primary">Contained</Button>
            </PreviewGroup>
            <PreviewGroup label="Outlined">
              <Button variant="outlined" color="primary">Outlined</Button>
            </PreviewGroup>
            <PreviewGroup label="Text (Tertiary)">
              <Button variant="text" color="primary">Text</Button>
            </PreviewGroup>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <PreviewGroup label="Secondary Contained">
              <Button variant="contained" color="secondary">Secondary</Button>
            </PreviewGroup>
            <PreviewGroup label="Secondary Outlined">
              <Button variant="outlined" color="secondary">Outlined</Button>
            </PreviewGroup>
            <PreviewGroup label="Secondary Text">
              <Button variant="text" color="secondary">Tertiary</Button>
            </PreviewGroup>
          </PreviewCanvas>
        </Stack>
      </DocSection>

      {/* Sizes */}
      <DocSection title="Sizes">
        <PreviewCanvas>
          <PreviewGroup label="Small">
            <Button variant="contained" size="small">Small</Button>
          </PreviewGroup>
          <PreviewGroup label="Medium (default)">
            <Button variant="contained" size="medium">Medium</Button>
          </PreviewGroup>
          <PreviewGroup label="Large">
            <Button variant="contained" size="large">Large</Button>
          </PreviewGroup>
          <PreviewGroup label="Icon (44px round)">
            <Button variant="contained" size="icon">
              <SendIcon />
            </Button>
          </PreviewGroup>
          <PreviewGroup label="Icon Outlined">
            <Button variant="outlined" size="icon">
              <DeleteIcon />
            </Button>
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* States */}
      <DocSection title="States">
        <PreviewCanvas>
          <PreviewGroup label="Default">
            <Button variant="contained">Default</Button>
          </PreviewGroup>
          <PreviewGroup label="Disabled">
            <Button variant="contained" disabled>Disabled</Button>
          </PreviewGroup>
          <PreviewGroup label="Start Icon">
            <Button variant="contained" startIcon={<SendIcon />}>Send</Button>
          </PreviewGroup>
          <PreviewGroup label="End Icon">
            <Button variant="outlined" endIcon={<DownloadIcon />}>Download</Button>
          </PreviewGroup>
          <PreviewGroup label="Active (Simulated)">
            <Button 
              variant="contained" 
              sx={(theme) => ({ 
                backgroundColor: 'colors.edgeTurquoise.active',
                // Forcing active state for preview
                bgcolor: '#0e837d' 
              })}
            >
              Active
            </Button>
          </PreviewGroup>
          <PreviewGroup label="Icon Only">
            <Button variant="outlined" sx={{ minWidth: 0, px: 1.25 }}>
              <DeleteIcon />
            </Button>
          </PreviewGroup>
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
