'use client';

import {
  Chip,
  Avatar,
  Stack,
  Box,
} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import DoneIcon from '@mui/icons-material/Done';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

const codeSnippet = `import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import DoneIcon from '@mui/icons-material/Done';

// Filled (default)
<Chip label="Filled" />

// Outlined
<Chip label="Outlined" variant="outlined" />

// Colour
<Chip label="Primary" color="primary" />
<Chip label="Success" color="success" />

// With avatar
<Chip
  avatar={<Avatar>A</Avatar>}
  label="Avatar"
/>

// With icon
<Chip icon={<DoneIcon />} label="Done" color="primary" />

// Deletable
<Chip
  label="Deletable"
  onDelete={() => console.log('deleted')}
/>

// Clickable
<Chip
  label="Clickable"
  onClick={() => console.log('clicked')}
  color="primary"
  variant="outlined"
/>`;

const propRows: PropRow[] = [
  {
    prop: 'label',
    type: 'ReactNode',
    default: '—',
    description: 'The text content displayed inside the chip.',
  },
  {
    prop: 'variant',
    type: '"filled" | "outlined"',
    default: '"filled"',
    description: 'Sets the visual style of the chip.',
  },
  {
    prop: 'color',
    type: '"default" | "primary" | "secondary" | "error" | "warning" | "info" | "success"',
    default: '"default"',
    description: 'The theme colour applied to the chip.',
  },
  {
    prop: 'size',
    type: '"small" | "medium"',
    default: '"medium"',
    description: 'Controls the height and padding of the chip.',
  },
  {
    prop: 'onDelete',
    type: '() => void',
    default: '—',
    description: 'When provided, renders a delete icon and fires on click.',
  },
  {
    prop: 'avatar',
    type: 'ReactElement',
    default: '—',
    description: 'Avatar element to display at the start of the chip.',
  },
  {
    prop: 'icon',
    type: 'ReactElement',
    default: '—',
    description: 'Icon element displayed before the label.',
  },
];

export default function ChipPage() {
  return (
    <Box>
      <PageHeader
        title="Chip"
        description="Chips are compact elements that represent an input, attribute, or action. They can display text, icons, and avatars, and can be made clickable or deletable."
        muiLink="https://mui.com/material-ui/react-chip/"
      />

      {/* Variants */}
      <DocSection title="Variants">
        <PreviewCanvas>
          <PreviewGroup label="Filled (default)">
            <Chip label="Filled" />
          </PreviewGroup>
          <PreviewGroup label="Outlined">
            <Chip label="Outlined" variant="outlined" />
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Colors */}
      <DocSection title="Colors">
        <PreviewCanvas>
          {(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'] as const).map((color) => (
            <PreviewGroup key={color} label={color}>
              <Chip label={color.charAt(0).toUpperCase() + color.slice(1)} color={color} />
            </PreviewGroup>
          ))}
        </PreviewCanvas>
      </DocSection>

      {/* States */}
      <DocSection title="States">
        <PreviewCanvas>
          <PreviewGroup label="Default">
            <Chip label="Default" color="primary" />
          </PreviewGroup>
          <PreviewGroup label="Disabled">
            <Chip label="Disabled" color="primary" disabled />
          </PreviewGroup>
          <PreviewGroup label="Deletable">
            <Chip
              label="Deletable"
              color="primary"
              onDelete={() => undefined}
            />
          </PreviewGroup>
          <PreviewGroup label="Clickable">
            <Chip
              label="Clickable"
              color="primary"
              variant="outlined"
              onClick={() => undefined}
            />
          </PreviewGroup>
          <PreviewGroup label="With Avatar">
            <Chip
              avatar={<Avatar><FaceIcon fontSize="small" /></Avatar>}
              label="Avatar"
              variant="outlined"
            />
          </PreviewGroup>
          <PreviewGroup label="With Icon">
            <Chip
              icon={<DoneIcon />}
              label="Done"
              color="success"
            />
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Sizes */}
      <DocSection title="Sizes">
        <PreviewCanvas>
          <PreviewGroup label="Small">
            <Chip label="Small" color="primary" size="small" />
          </PreviewGroup>
          <PreviewGroup label="Medium (default)">
            <Chip label="Medium" color="primary" size="medium" />
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Code */}
      <DocSection title="Usage">
        <CodeBlock code={codeSnippet} />
      </DocSection>

      {/* Props */}
      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
      </DocSection>
    </Box>
  );
}
