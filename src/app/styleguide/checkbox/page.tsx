'use client';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Box,
} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

const codeSnippet = `import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

// Basic Checkbox
<Checkbox defaultChecked color="primary" />

// With Label
<FormGroup>
  <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
  <FormControlLabel required control={<Checkbox />} label="Required" />
  <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
</FormGroup>

// Sizes
<Checkbox size="small" />
<Checkbox size="medium" />

// Colors
<Checkbox color="secondary" />
<Checkbox color="success" />

// Indeterminate
<Checkbox indeterminate />`;

const propRows: PropRow[] = [
  {
    prop: 'checked',
    type: 'boolean',
    default: 'false',
    description: 'If true, the component is checked.',
  },
  {
    prop: 'color',
    type: '"primary" | "secondary" | "error" | "info" | "success" | "warning" | "default"',
    default: '"primary"',
    description: 'The color of the component. It supports both default and custom theme colors.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'If true, the component is disabled.',
  },
  {
    prop: 'indeterminate',
    type: 'boolean',
    default: 'false',
    description: 'If true, the component appears indeterminate. This does not set the native input element to indeterminate due to visual reasons.',
  },
  {
    prop: 'size',
    type: '"small" | "medium"',
    default: '"medium"',
    description: 'The size of the component. small is equivalent to the dense checkbox styling.',
  },
];

export default function CheckboxPage() {
  return (
    <Box>
      <PageHeader
        title="Checkbox"
        description="Checkboxes allow the user to select one or more items from a set."
        muiLink="https://mui.com/material-ui/react-checkbox/"
      />

      {/* Basic Checkboxes */}
      <DocSection title="Basic Checkboxes">
        <Stack spacing={2}>
          <PreviewCanvas>
            <PreviewGroup label="Unchecked">
              <Checkbox />
            </PreviewGroup>
            <PreviewGroup label="Checked">
              <Checkbox defaultChecked />
            </PreviewGroup>
            <PreviewGroup label="Indeterminate">
              <Checkbox indeterminate />
            </PreviewGroup>
          </PreviewCanvas>
        </Stack>
      </DocSection>

      {/* With Label */}
      <DocSection title="With Label">
        <PreviewCanvas>
          <FormGroup row>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Subscribed" />
            <FormControlLabel required control={<Checkbox />} label="Accept terms" />
            <FormControlLabel disabled control={<Checkbox />} label="Disabled option" />
          </FormGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Sizes */}
      <DocSection title="Sizes">
        <PreviewCanvas>
          <PreviewGroup label="Small">
            <Checkbox size="small" defaultChecked />
          </PreviewGroup>
          <PreviewGroup label="Medium (Default)">
            <Checkbox size="medium" defaultChecked />
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Colors */}
      <DocSection title="Semantic Colors">
        <PreviewCanvas>
          <PreviewGroup label="Primary (Default)">
            <Checkbox color="primary" defaultChecked />
          </PreviewGroup>
          <PreviewGroup label="Secondary">
            <Checkbox color="secondary" defaultChecked />
          </PreviewGroup>
          <PreviewGroup label="Success">
            <Checkbox color="success" defaultChecked />
          </PreviewGroup>
          <PreviewGroup label="Warning">
            <Checkbox color="warning" defaultChecked />
          </PreviewGroup>
          <PreviewGroup label="Error">
            <Checkbox color="error" defaultChecked />
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>
      
      {/* Custom Icons */}
      <DocSection title="Custom Icons">
        <PreviewCanvas>
          <PreviewGroup label="Heart Icon">
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} color="error" />
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* States */}
      <DocSection title="States">
        <PreviewCanvas>
          <PreviewGroup label="Enabled">
            <Checkbox defaultChecked />
          </PreviewGroup>
          <PreviewGroup label="Disabled (Checked)">
            <Checkbox disabled defaultChecked />
          </PreviewGroup>
          <PreviewGroup label="Disabled (Unchecked)">
            <Checkbox disabled />
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
