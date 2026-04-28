'use client';

import React from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Chip,
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

const options = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];

const codeSnippet = `import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Single Select
<Autocomplete
  options={options}
  renderInput={(params) => <TextField {...params} label="Single Select" />}
/>

// Multi-Select with Chips
<Autocomplete
  multiple
  options={options}
  renderInput={(params) => <TextField {...params} label="Multi Select" />}
/>`;

const propRows: PropRow[] = [
  {
    prop: 'multiple',
    type: 'boolean',
    default: 'false',
    description: 'If true, the user can select multiple values.',
  },
  {
    prop: 'options',
    type: 'any[]',
    default: '[]',
    description: 'Array of options to choose from.',
  },
  {
    prop: 'renderInput',
    type: '(params) => ReactNode',
    default: '—',
    description: 'Function to render the input element.',
  },
];

const turquoiseSx = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#07bebe',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#07bebe',
  },
};

export default function AutocompletePage() {
  return (
    <Box>
      <PageHeader
        title="Autocomplete"
        description="The autocomplete is a normal text input enhanced by a panel of suggested options. It's ideal for choosing from large lists or when users need to search through options."
        muiLink="https://mui.com/material-ui/react-autocomplete/"
      />

      <DocSection title="Single Select">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Standard single-select autocomplete. Notice the turquoise highlight on focus, matching our brand design.
        </Typography>
        <PreviewCanvas>
          <Box sx={{ width: 300 }}>
            <Autocomplete
              options={options}
              sx={turquoiseSx}
              renderInput={(params) => <TextField {...params} label="Label" placeholder="Select an option" />}
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Multi-Select (Chips)">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Allows selecting multiple options, which are displayed as removable Chips inside the input.
        </Typography>
        <PreviewCanvas>
          <Box sx={{ width: 400 }}>
            <Autocomplete
              multiple
              options={options}
              defaultValue={[options[0], options[1]]}
              sx={turquoiseSx}
              renderInput={(params) => <TextField {...params} label="Multiple Values" placeholder="Select options" />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    size="small"
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Key Mapping (MUI)">
        <PropsTable rows={propRows} />
      </DocSection>

      <DocSection title="Usage Example">
        <CodeBlock code={codeSnippet} />
      </DocSection>
    </Box>
  );
}
