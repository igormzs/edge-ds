import { Autocomplete, TextField } from '@mui/material';
import figma from '@figma/code-connect';

/**
 * Autocomplete Connection
 * Maps the Figma "Autocomplete" component set to MUI Autocomplete.
 * Figma: https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6570:49843
 */
figma.connect(
  Autocomplete,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6570:49843',
  {
    props: {
      multiple: figma.boolean('Multiple Values'),
    },
    example: ({ multiple }) => (
      <Autocomplete
        multiple={multiple}
        options={['Option 1', 'Option 2', 'Option 3']}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#07bebe',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#07bebe',
          },
        }}
        renderInput={(params) => <TextField {...params} label="Label" />}
      />
    ),
  }
);
