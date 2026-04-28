'use client';

import React from 'react';
import {
  Fab,
  Box,
  Typography,
  Stack,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';
import ShareIcon from '@mui/icons-material/Share';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

const codeSnippet = `import Fab from '@mui/material/Fab';
import { Plus, NavigationArrow } from '@phosphor-icons/react';

// Circular
<Fab color="primary" aria-label="add">
  <AddIcon />
</Fab>

// Extended
<Fab variant="extended" color="secondary">
  <NavigationIcon sx={{ mr: 1 }} />
  Navigate
</Fab>

// Sizes
<Fab size="small" color="primary">
  <AddIcon fontSize="small" />
</Fab>`;

const propRows: PropRow[] = [
  {
    prop: 'color',
    type: '"primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit"',
    default: '"default"',
    description: 'The color of the component.',
  },
  {
    prop: 'size',
    type: '"small" | "medium" | "large"',
    default: '"large"',
    description: 'The size of the component.',
  },
  {
    prop: 'variant',
    type: '"circular" | "extended"',
    default: '"circular"',
    description: 'The variant to use.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'If true, the component is disabled.',
  },
];

export default function FabPage() {
  return (
    <Box>
      <PageHeader
        title="Floating Action Button (FAB)"
        description="A floating action button (FAB) performs the primary, or most common, action on a screen."
        muiLink="https://mui.com/material-ui/react-floating-action-button/"
      />

      <DocSection title="Variants">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Circular FABs are for icons, while extended FABs can include text.
        </Typography>
        <PreviewCanvas>
          <Stack direction="row" spacing={8} alignItems="center">
            <PreviewGroup label="Circular">
              <Stack spacing={2}>
                <Fab color="primary">
                  <AddIcon />
                </Fab>
                <Fab color="secondary">
                  <AddIcon />
                </Fab>
              </Stack>
            </PreviewGroup>
            <PreviewGroup label="Extended">
              <Stack spacing={2}>
                <Fab variant="extended" color="primary">
                  <AddIcon sx={{ mr: 1 }} />
                  Add Item
                </Fab>
                <Fab variant="extended" color="secondary">
                  <NavigationIcon sx={{ mr: 1 }} />
                  Navigate
                </Fab>
              </Stack>
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Sizes">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Use different sizes based on the prominence of the action.
        </Typography>
        <PreviewCanvas>
          <Stack direction="row" spacing={6} alignItems="flex-end">
            <PreviewGroup label="Large (Default)">
              <Fab color="primary" size="large">
                <AddIcon />
              </Fab>
            </PreviewGroup>
            <PreviewGroup label="Medium">
              <Fab color="primary" size="medium">
                <AddIcon />
              </Fab>
            </PreviewGroup>
            <PreviewGroup label="Small">
              <Fab color="primary" size="small">
                <AddIcon fontSize="small" />
              </Fab>
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Colors">
        <Typography variant="body2" sx={{ mb: 3 }}>
          FABs support all semantic brand colors.
        </Typography>
        <PreviewCanvas>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            <Fab color="primary"><AddIcon /></Fab>
            <Fab color="secondary"><AddIcon /></Fab>
            <Fab color="success"><AddIcon /></Fab>
            <Fab color="error"><AddIcon /></Fab>
            <Fab color="warning"><AddIcon /></Fab>
            <Fab color="info"><AddIcon /></Fab>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="FAB Menu (Speed Dial)">
        <Typography variant="body2" sx={{ mb: 3 }}>
          A FAB Menu (Speed Dial) displays multiple actions when clicked. It supports different display patterns for the actions.
          All menu items follow a standardized visual pattern: 40px height, 8px border radius, subtle shadows, and consistent typography.
        </Typography>

        <PreviewCanvas>
          <Box sx={{ display: 'flex', width: '100%', gap: 3, py: 2 }}>
            {/* Icon + Title */}
            <PreviewGroup label="Icon + Title" sx={{ flex: 1, alignItems: 'stretch' }}>
              <Box sx={{ height: 400, transform: 'translateZ(0px)', width: '100%', position: 'relative', border: '1px solid rgba(0,0,0,0.04)', borderRadius: 2, bgcolor: 'rgba(0,0,0,0.01)' }}>
                <SpeedDial
                  ariaLabel="SpeedDial icon and title"
                  sx={{ position: 'absolute', bottom: 16, right: 16 }}
                  icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
                >
                  {[
                    { icon: <FileCopyIcon sx={{ fontSize: 20 }} />, label: 'Copy' },
                    { icon: <SaveIcon sx={{ fontSize: 20 }} />, label: 'Save' },
                    { icon: <PrintIcon sx={{ fontSize: 20 }} />, label: 'Print' },
                  ].map((action) => (
                    <SpeedDialAction
                      key={action.label}
                      icon={<Box sx={{ display: 'none' }} />}
                      tooltipTitle={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          {action.icon}
                          <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'none', fontSize: '0.875rem' }}>{action.label}</Typography>
                        </Box>
                      }
                      tooltipOpen
                      sx={{
                        mb: 1.5, // Spacing between items
                        '& .MuiSpeedDialAction-fab': { display: 'none' },
                        '& .MuiSpeedDialAction-staticTooltipLabel': {
                          position: 'static',
                          bgcolor: 'white',
                          color: 'text.primary',
                          boxShadow: '0px 2px 8px rgba(0,0,0,0.12)',
                          border: '1px solid rgba(0,0,0,0.08)',
                          height: 40,
                          px: 2,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: '#f8f9fa' }
                        }
                      }}
                    />
                  ))}
                </SpeedDial>
              </Box>
            </PreviewGroup>

            {/* Just Icon */}
            <PreviewGroup label="Just Icon" sx={{ flex: 1, alignItems: 'stretch' }}>
              <Box sx={{ height: 400, transform: 'translateZ(0px)', width: '100%', position: 'relative', border: '1px solid rgba(0,0,0,0.04)', borderRadius: 2, bgcolor: 'rgba(0,0,0,0.01)' }}>
                <SpeedDial
                  ariaLabel="SpeedDial icons only"
                  sx={{ position: 'absolute', bottom: 16, right: 16 }}
                  icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
                >
                  <SpeedDialAction 
                    icon={<FileCopyIcon sx={{ fontSize: 20 }} />} 
                    tooltipTitle="Copy"
                    sx={{ mb: 1.5 }}
                    FabProps={{ 
                      sx: { 
                        height: 40, 
                        width: 40, 
                        borderRadius: 2, 
                        bgcolor: 'white', 
                        color: 'text.primary',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.12)',
                        border: '1px solid rgba(0,0,0,0.08)',
                        '&:hover': { bgcolor: '#f8f9fa' }
                      } 
                    }}
                  />
                  <SpeedDialAction 
                    icon={<SaveIcon sx={{ fontSize: 20 }} />} 
                    tooltipTitle="Save"
                    sx={{ mb: 1.5 }}
                    FabProps={{ 
                      sx: { 
                        height: 40, 
                        width: 40, 
                        borderRadius: 2, 
                        bgcolor: 'white', 
                        color: 'text.primary',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.12)',
                        border: '1px solid rgba(0,0,0,0.08)',
                        '&:hover': { bgcolor: '#f8f9fa' }
                      } 
                    }}
                  />
                  <SpeedDialAction 
                    icon={<PrintIcon sx={{ fontSize: 20 }} />} 
                    tooltipTitle="Print"
                    sx={{ mb: 1.5 }}
                    FabProps={{ 
                      sx: { 
                        height: 40, 
                        width: 40, 
                        borderRadius: 2, 
                        bgcolor: 'white', 
                        color: 'text.primary',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.12)',
                        border: '1px solid rgba(0,0,0,0.08)',
                        '&:hover': { bgcolor: '#f8f9fa' }
                      } 
                    }}
                  />
                </SpeedDial>
              </Box>
            </PreviewGroup>

            {/* Just Title */}
            <PreviewGroup label="Just Title" sx={{ flex: 1, alignItems: 'stretch' }}>
              <Box sx={{ height: 400, transform: 'translateZ(0px)', width: '100%', position: 'relative', border: '1px solid rgba(0,0,0,0.04)', borderRadius: 2, bgcolor: 'rgba(0,0,0,0.01)' }}>
                <SpeedDial
                  ariaLabel="SpeedDial titles only"
                  sx={{ position: 'absolute', bottom: 16, right: 16 }}
                  icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
                >
                  {[
                    { label: 'Copy' },
                    { label: 'Save' },
                    { label: 'Print' },
                  ].map((action) => (
                    <SpeedDialAction
                      key={action.label}
                      icon={<Box sx={{ display: 'none' }} />}
                      tooltipTitle={
                        <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'none', fontSize: '0.875rem' }}>{action.label}</Typography>
                      }
                      tooltipOpen
                      sx={{
                        mb: 1.5,
                        '& .MuiSpeedDialAction-fab': { display: 'none' },
                        '& .MuiSpeedDialAction-staticTooltipLabel': {
                          position: 'static',
                          bgcolor: 'white',
                          color: 'text.primary',
                          boxShadow: '0px 2px 8px rgba(0,0,0,0.12)',
                          border: '1px solid rgba(0,0,0,0.08)',
                          height: 40,
                          px: 2,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: '#f8f9fa' }
                        }
                      }}
                    />
                  ))}
                </SpeedDial>
              </Box>
            </PreviewGroup>
          </Box>
        </PreviewCanvas>
      </DocSection>

      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
      </DocSection>

      <DocSection title="Usage Example">
        <CodeBlock code={codeSnippet} />
      </DocSection>
    </Box>
  );
}
