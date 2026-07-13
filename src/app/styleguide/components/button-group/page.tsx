'use client';

import {
  ButtonGroup,
  Button,
  Stack,
  Box,
  Divider,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

const codeSnippet = `import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

// Basic — Contained
<ButtonGroup variant="contained" color="primary">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>

// Outlined
<ButtonGroup variant="outlined" color="secondary">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>

// Vertical orientation
<ButtonGroup orientation="vertical" variant="contained" color="primary">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>

// Sizes
<ButtonGroup size="small" variant="contained">...</ButtonGroup>
<ButtonGroup size="medium" variant="contained">...</ButtonGroup>
<ButtonGroup size="large" variant="contained">...</ButtonGroup>

// Split button (main action + secondary dropdown trigger)
<ButtonGroup variant="contained" color="primary" aria-label="split button">
  <Button>Save</Button>
  <Button size="small" aria-label="more save options">
    <ArrowDropDownIcon />
  </Button>
</ButtonGroup>

// Disabled
<ButtonGroup variant="contained" disabled>
  <Button>One</Button>
  <Button>Two</Button>
</ButtonGroup>`;

const propRows: PropRow[] = [
  {
    prop: 'variant',
    type: '"contained" | "outlined" | "text"',
    default: '"outlined"',
    description: 'Visual style, inherited by every Button child unless overridden individually.',
  },
  {
    prop: 'color',
    type: '"primary" | "secondary" | "error" | "warning" | "info" | "success"',
    default: '"primary"',
    description: 'Theme colour applied to all buttons and the divider between them.',
  },
  {
    prop: 'orientation',
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: 'Stacks buttons in a row or a column. Only the outer edge of the first and last button keep the standard corner radius — every edge where two buttons meet is squared off.',
  },
  {
    prop: 'size',
    type: '"small" | "medium" | "large"',
    default: '"medium"',
    description: 'Applied to every button in the group.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables every button in the group at once.',
  },
  {
    prop: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'Stretches the group (and each button equally) to fill its container width.',
  },
  {
    prop: 'disableElevation',
    type: 'boolean',
    default: 'false',
    description: 'Removes the drop shadow on the contained variant.',
  },
];

export default function ButtonGroupPage() {
  return (
    <Box>
      <PageHeader
        title="Button Group"
        description="Button Group wraps a set of related Button instances into a single, visually joined control. It shares the exact padding, typography, and colour tokens defined for the standalone Button — only the corner radius is position-aware, so the buttons read as one continuous shape rather than a row of separate pills."
        muiLink="https://mui.com/material-ui/react-button-group/"
      />

      {/* Visual Variants */}
      <DocSection title="Visual Variants">
        <PreviewCanvas>
          <PreviewGroup label="Contained">
            <ButtonGroup variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Outlined">
            <ButtonGroup variant="outlined" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Text">
            <ButtonGroup variant="text" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <PreviewGroup label="Secondary">
            <ButtonGroup variant="contained" color="secondary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Error">
            <ButtonGroup variant="contained" color="error">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Orientation */}
      <DocSection title="Orientation">
        <PreviewCanvas>
          <PreviewGroup label="Horizontal (default)">
            <ButtonGroup variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Vertical">
            <ButtonGroup orientation="vertical" variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Sizing */}
      <DocSection title="Sizing">
        <PreviewCanvas>
          <PreviewGroup label="Small">
            <ButtonGroup size="small" variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Medium (default)">
            <ButtonGroup size="medium" variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Large">
            <ButtonGroup size="large" variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Interactive States */}
      <DocSection title="Interactive States">
        <PreviewCanvas>
          <PreviewGroup label="Default — hover / focus the items">
            <ButtonGroup variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Disabled">
            <ButtonGroup variant="contained" color="primary" disabled>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Split button (main action + dropdown)">
            <ButtonGroup variant="contained" color="primary" aria-label="split button">
              <Button>Save</Button>
              <Button size="small" aria-label="more save options">
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
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

      {/* Accessibility */}
      <DocSection title="Accessibility Notes">
        <PreviewCanvas>
          <Stack spacing={1.5} sx={{ width: '100%' }}>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Set <code>role=&quot;group&quot;</code> together with a descriptive <code>aria-label</code> on the group root — MUI applies <code>role=&quot;group&quot;</code> automatically, but the <code>aria-label</code> (e.g. &quot;text alignment&quot;, &quot;split button&quot;) is on you, and it&apos;s what tells screen-reader users what the group of buttons is for.
            </Box>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Every button in the group is its own real, individually focusable <code>&lt;button&gt;</code> — keyboard users Tab through each one in sequence and activate with Enter/Space, no roving-tabindex or custom key handling required.
            </Box>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • For a split button, give the small dropdown-trigger button its own <code>aria-label</code> (e.g. &quot;more save options&quot;) — it renders no visible text, so without a label it announces only as an unlabeled button.
            </Box>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • The divider between buttons is a purely visual cue — don&apos;t rely on it as the only signal separating actions; button labels should stand on their own.
            </Box>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • <code>disabled</code> on the group disables every child button and removes them all from the tab order — make sure surrounding copy explains why, the same as a standalone disabled Button.
            </Box>
          </Stack>
        </PreviewCanvas>
      </DocSection>
    </Box>
  );
}
