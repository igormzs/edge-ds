'use client';

import {
  Box,
  Typography,
} from '@mui/material';
import { StatusTag } from '@/components/StatusTag';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

const codeSnippet = `import { StatusTag } from '@/components/StatusTag';

// Success Status Tag
<StatusTag type="success" label="Status" />

// Error Status Tag (Large)
<StatusTag type="error" size="large" label="Status" />

// Warning Status Tag (Small)
<StatusTag type="warning" size="small" label="Status" />

// Neutral without icon
<StatusTag type="neutral" showIcon={false} label="Status" />`;

const propRows: PropRow[] = [
  {
    prop: 'type',
    type: '"success" | "error" | "info" | "warning" | "neutral"',
    default: '"neutral"',
    description: 'Defines the color scheme and icon based on the status.',
  },
  {
    prop: 'size',
    type: '"small" | "medium" | "large"',
    default: '"medium"',
    description: 'Sets the height and padding of the tag.',
  },
  {
    prop: 'showIcon',
    type: 'boolean',
    default: 'true',
    description: 'Toggles the visibility of the status-specific icon.',
  },
  {
    prop: 'label',
    type: 'string',
    default: 'Type in uppercase',
    description: 'The text content displayed inside the tag.',
  },
];

export default function StatusTagPage() {
  return (
    <Box>
      <PageHeader
        title="Status Tag"
        description="Status Tags are non-interactive visual indicators used to communicate the status of an object or a process. They provide quick, scannable feedback without requiring user action."
        muiLink="https://mui.com/material-ui/react-chip/"
      />

      <DocSection title="Types">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Status Tags use a light background with a contrasting border and dark text/icons for maximum readability.
        </Typography>
        <PreviewCanvas>
          {(['success', 'error', 'info', 'warning', 'neutral'] as const).map((t) => (
            <PreviewGroup key={t} label={t.charAt(0).toUpperCase() + t.slice(1)}>
              <StatusTag type={t} label="STATUS" />
            </PreviewGroup>
          ))}
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Sizes">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Available in Large (40px), Medium (32px), and Small (24px) variants.
        </Typography>
        <PreviewCanvas>
          <PreviewGroup label="Large">
            <StatusTag type="success" size="large" label="STATUS" />
          </PreviewGroup>
          <PreviewGroup label="Medium">
            <StatusTag type="success" size="medium" label="STATUS" />
          </PreviewGroup>
          <PreviewGroup label="Small">
            <StatusTag type="success" size="small" label="STATUS" />
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Usage without Icons">
        <PreviewCanvas>
          <StatusTag type="success" showIcon={false} label="STATUS" />
          <StatusTag type="error" showIcon={false} label="STATUS" />
          <StatusTag type="info" showIcon={false} label="STATUS" />
          <StatusTag type="warning" showIcon={false} label="STATUS" />
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Props Mapping">
        <PropsTable rows={propRows} />
      </DocSection>

      <DocSection title="Usage Example">
        <CodeBlock code={codeSnippet} />
      </DocSection>
    </Box>
  );
}
