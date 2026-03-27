'use client';

import {
  TextField,
  InputAdornment,
  Stack,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

const codeSnippet = `import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

// Outlined (default)
<TextField label="Label" variant="outlined" />

// Filled
<TextField label="Label" variant="filled" />

// Standard
<TextField label="Label" variant="standard" />

// With helper text
<TextField
  label="Email"
  helperText="We'll never share your email."
/>

// With error
<TextField
  label="Email"
  error
  helperText="Please enter a valid email address."
/>

// Disabled
<TextField label="Disabled" disabled />

// With start adornment
<TextField
  label="Search"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
/>

// Multiline
<TextField
  label="Message"
  multiline
  rows={4}
/>`;

const propRows: PropRow[] = [
  {
    prop: 'variant',
    type: '"outlined" | "filled" | "standard"',
    default: '"outlined"',
    description: 'Visual style of the input field.',
  },
  {
    prop: 'label',
    type: 'ReactNode',
    default: '—',
    description: 'The floating label shown above the input.',
  },
  {
    prop: 'helperText',
    type: 'ReactNode',
    default: '—',
    description: 'Hint or error message displayed below the field.',
  },
  {
    prop: 'error',
    type: 'boolean',
    default: 'false',
    description: 'When true, applies error styles (red border + label).',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Makes the field non-interactive and muted.',
  },
  {
    prop: 'multiline',
    type: 'boolean',
    default: 'false',
    description: 'Transforms the input into a textarea.',
  },
  {
    prop: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'Stretches the field to the width of its container.',
  },
];

export default function TextFieldPage() {
  return (
    <Box>
      <PageHeader
        title="TextField"
        description="TextFields let users enter and edit text. They come in three variants, support adornments for icons and prefixes, and handle helper text, error states, and multiline input."
        muiLink="https://mui.com/material-ui/react-text-field/"
      />

      {/* Variants */}
      <DocSection title="Variants">
        <PreviewCanvas>
          <TextField label="Outlined" variant="outlined" size="small" sx={{ width: 200 }} />
          <TextField label="Filled" variant="filled" size="small" sx={{ width: 200 }} />
          <TextField label="Standard" variant="standard" size="small" sx={{ width: 200 }} />
        </PreviewCanvas>
      </DocSection>

      {/* States */}
      <DocSection title="States">
        <Stack spacing={2}>
          <PreviewCanvas>
            <TextField label="Default" variant="outlined" size="small" sx={{ width: 200 }} />
            <TextField label="With value" variant="outlined" size="small" defaultValue="Ada Lovelace" sx={{ width: 200 }} />
            <TextField label="Disabled" variant="outlined" size="small" disabled defaultValue="Can't touch this" sx={{ width: 200 }} />
            <TextField
              label="Error"
              variant="outlined"
              size="small"
              error
              helperText="Invalid input."
              sx={{ width: 200 }}
            />
            <TextField
              label="Helper text"
              variant="outlined"
              size="small"
              helperText="This is a hint."
              sx={{ width: 200 }}
            />
          </PreviewCanvas>
        </Stack>
      </DocSection>

      {/* With Icons / Adornments */}
      <DocSection title="Adornments">
        <PreviewCanvas>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{ width: 220 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            sx={{ width: 220 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            sx={{ width: 220 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Visibility fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Amount"
            variant="outlined"
            size="small"
            sx={{ width: 160 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </PreviewCanvas>
      </DocSection>

      {/* Multiline */}
      <DocSection title="Multiline">
        <PreviewCanvas>
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            sx={{ width: 340 }}
            placeholder="Type your message here…"
          />
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
