'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Stack,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

const codeSnippet = `import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Standard Accordion
<Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography>Accordion 1</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>Content here...</Typography>
  </AccordionDetails>
</Accordion>

// Filters Variant — same Accordion/AccordionSummary/AccordionDetails structure
// as Standard; the "filters" variant styles the card, bold teal title and
// brand chevron. Details list one group per filter category: a body-xs label
// above a wrapping row of small, removable <Chip variant="outlined">.
const [filtersExpanded, setFiltersExpanded] = useState(true);
const filterGroups = [
  { label: 'Department', values: ['Engineering'] },
  { label: 'Employment Type', values: ['Full-time', 'Part-time'] },
  { label: 'Region', values: ['EMEA', 'APAC', 'Americas', 'Remote'] },
];

<Accordion
  variant="filters"
  expanded={filtersExpanded}
  onChange={(_, isExpanded) => setFiltersExpanded(isExpanded)}
>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography>Filters applied</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Stack spacing={1}>
      {filterGroups.map((group) => (
        <Stack key={group.label} spacing={0.5} role="group" aria-label={group.label}>
          <Typography variant="body-xs" color="text.secondary">{group.label}</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {group.values.map((value) => (
              <Chip key={value} size="small" color="primary" variant="outlined" label={value} onDelete={() => {}} />
            ))}
          </Box>
        </Stack>
      ))}
    </Stack>
  </AccordionDetails>
</Accordion>`;

const propRows: PropRow[] = [
  {
    prop: 'variant',
    type: '"standard" | "filters"',
    default: '"standard"',
    description: 'Controls the visual variant of the accordion.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'If true, the accordion cannot be toggled and uses disabled styling.',
  },
];

const filterGroups = [
  { label: 'Department', values: ['Engineering'] },
  { label: 'Employment Type', values: ['Full-time', 'Part-time'] },
  { label: 'Region', values: ['EMEA', 'APAC', 'Americas', 'Remote'] },
];

export default function AccordionPage() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box>
      <PageHeader
        title="Accordion"
        description="Accordions contain creation flows and allow editing of information. The standard and filters variants allow diverse usage contexts."
        muiLink="https://mui.com/material-ui/react-accordion/"
      />

      <DocSection title="Standard">
        <PreviewCanvas>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Accordion title="Standard Expanded" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ border: '1px dashed #9747ff', bgcolor: 'rgba(151,71,255,0.04)', borderRadius: 1, p: 2, textAlign: 'center', color: '#9747ff' }}>
                  <Typography variant="caption">Instance Slot</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion title="Standard Collapsed" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Content inside the second accordion.</Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion disabled>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Disabled Accordion</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>You cannot see this.</Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Filters Variant">
        <PreviewCanvas>
          <Accordion
            variant="filters"
            expanded={filtersExpanded}
            onChange={(event, isExpanded) => setFiltersExpanded(isExpanded)}
            sx={{ width: '100%' }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Filters applied</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                {filterGroups.map((group) => (
                  <Stack key={group.label} spacing={0.5} role="group" aria-label={group.label}>
                    <Typography variant="body-xs" color="text.secondary">
                      {group.label}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {group.values.map((value) => (
                        <Chip
                          key={value}
                          size="small"
                          color="primary"
                          variant="outlined"
                          label={value}
                          onDelete={() => {}}
                        />
                      ))}
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
      </DocSection>

      <DocSection title="Usage">
        <CodeBlock code={codeSnippet} />
      </DocSection>
    </Box>
  );
}
