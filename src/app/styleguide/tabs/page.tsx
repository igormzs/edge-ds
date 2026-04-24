'use client';

import { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HelpIcon from '@mui/icons-material/Help';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

// ─── Reusable TabPanel helper ─────────────────────────────────────────────────

function TabPanel({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      sx={{ p: 3, flex: 1 }}
    >
      {value === index && (
        <Typography variant="body2" color="text.secondary">
          {children}
        </Typography>
      )}
    </Box>
  );
}

// ─── Demo: Basic horizontal tabs ─────────────────────────────────────────────

function BasicTabsDemo() {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={(_, v) => setValue(v)} aria-label="basic tabs demo">
          <Tab label="Tab One" id="basic-tab-0" aria-controls="basic-tabpanel-0" />
          <Tab label="Tab Two" id="basic-tab-1" aria-controls="basic-tabpanel-1" />
          <Tab label="Tab Three" id="basic-tab-2" aria-controls="basic-tabpanel-2" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>Content for Tab One</TabPanel>
      <TabPanel value={value} index={1}>Content for Tab Two</TabPanel>
      <TabPanel value={value} index={2}>Content for Tab Three</TabPanel>
    </Box>
  );
}

// ─── Demo: Icon tabs ──────────────────────────────────────────────────────────

function IconTabsDemo() {
  const [top, setTop] = useState(0);
  const [leading, setLeading] = useState(0);
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Icon top */}
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
          Icon Position: Top
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={top} onChange={(_, v) => setTop(v)} aria-label="icon top tabs">
            <Tab icon={<HomeIcon />} label="Home" iconPosition="top" />
            <Tab icon={<FavoriteIcon />} label="Favorites" iconPosition="top" />
            <Tab icon={<PersonPinIcon />} label="Profile" iconPosition="top" />
          </Tabs>
        </Box>
      </Box>
      {/* Icon leading */}
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
          Icon Position: Start
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={leading} onChange={(_, v) => setLeading(v)} aria-label="icon leading tabs">
            <Tab icon={<HomeIcon />} label="Home" iconPosition="start" />
            <Tab icon={<FavoriteIcon />} label="Favorites" iconPosition="start" />
            <Tab icon={<PersonPinIcon />} label="Profile" iconPosition="start" />
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Demo: States ──────────────────────────────────────────────────────────────

function StatesDemo() {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={(_, v) => setValue(v)} aria-label="states tabs demo">
        <Tab label="Default" id="state-tab-0" />
        <Tab label="Selected" id="state-tab-1" />
        <Tab label="Disabled" disabled id="state-tab-2" />
      </Tabs>
    </Box>
  );
}

// ─── Demo: Centered ───────────────────────────────────────────────────────────

function CenteredDemo() {
  const [value, setValue] = useState(0);
  return (
    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={(_, v) => setValue(v)} centered aria-label="centered tabs">
        <Tab label="Overview" />
        <Tab label="Analytics" />
        <Tab label="Reports" />
      </Tabs>
    </Box>
  );
}

// ─── Demo: Tabs_EDGE — vertical settings-style navigation ────────────────────

function VerticalEdgeTabsDemo() {
  const [value, setValue] = useState(0);

  const tabs = [
    { label: 'Plan', icon: <CreditCardIcon fontSize="small" /> },
    { label: 'Security', icon: <SecurityIcon fontSize="small" /> },
    { label: 'Notifications', icon: <NotificationsIcon fontSize="small" /> },
    { label: 'Settings', icon: <SettingsIcon fontSize="small" /> },
    { label: 'Help', icon: <HelpIcon fontSize="small" />, disabled: true },
  ];

  const content = [
    'Manage your plan, billing cycle, and payment information.',
    'Configure two-factor authentication and security preferences.',
    'Control email, push, and in-app notification settings.',
    'Adjust general application settings and preferences.',
    'This section is currently unavailable.',
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        minHeight: 280,
        width: '100%',
        bgcolor: 'background.paper',
      }}
    >
      {/* Vertical Tabs_EDGE */}
      <Tabs
        orientation="vertical"
        value={value}
        onChange={(_, v) => setValue(v)}
        aria-label="settings navigation"
        sx={{
          borderRight: '1px solid',
          borderColor: 'divider',
          minWidth: 200,
          '& .MuiTabs-indicator': {
            left: 0,
            right: 'auto',
            width: 3,
          },
          '& .MuiTab-root': {
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'flex-start',
            minHeight: 48,
            px: 2.5,
            py: 1.5,
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: 0.3,
            textTransform: 'none',
            color: 'text.secondary',
            gap: 1.5,
            '&.Mui-selected': {
              color: 'primary.main',
              fontWeight: 600,
              bgcolor: 'rgba(0,159,155,0.06)',
            },
            '&:hover:not(.Mui-selected)': {
              bgcolor: 'rgba(0,0,0,0.04)',
              color: 'text.primary',
            },
            '&.Mui-disabled': {
              color: 'text.disabled',
            },
          },
        }}
      >
        {tabs.map((tab, i) => (
          <Tab
            key={tab.label}
            label={tab.label}
            icon={tab.icon}
            iconPosition="start"
            disabled={tab.disabled}
            id={`vertical-tab-${i}`}
            aria-controls={`vertical-tabpanel-${i}`}
          />
        ))}
      </Tabs>

      {/* Tab content */}
      {tabs.map((tab, i) => (
        <Box
          key={tab.label}
          role="tabpanel"
          id={`vertical-tabpanel-${i}`}
          aria-labelledby={`vertical-tab-${i}`}
          hidden={value !== i}
          sx={{ p: 4, flex: 1 }}
        >
          {value === i && (
            <Box>
              <Typography
                sx={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 600,
                  fontSize: 18,
                  mb: 1.5,
                  color: 'text.primary',
                }}
              >
                {tab.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {content[i]}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

// ─── Code snippets ────────────────────────────────────────────────────────────

const basicCode = `import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const [value, setValue] = useState(0);

<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs value={value} onChange={(_, v) => setValue(v)}>
    <Tab label="Tab One" />
    <Tab label="Tab Two" />
    <Tab label="Tab Three" />
  </Tabs>
</Box>`;

const iconCode = `// Icon at the start (leading) — recommended for horizontal EDGE tabs
<Tabs value={value} onChange={(_, v) => setValue(v)}>
  <Tab icon={<HomeIcon />} label="Home" iconPosition="start" />
  <Tab icon={<FavoriteIcon />} label="Favorites" iconPosition="start" />
  <Tab icon={<PersonPinIcon />} label="Profile" iconPosition="start" />
</Tabs>`;

const verticalEdgeCode = `// Tabs_EDGE — Vertical settings-style navigation
// Apply custom sx overrides to reposition the indicator and align items left.

<Tabs
  orientation="vertical"
  value={value}
  onChange={(_, v) => setValue(v)}
  sx={{
    borderRight: '1px solid',
    borderColor: 'divider',
    minWidth: 200,
    // Move indicator from right to left
    '& .MuiTabs-indicator': {
      left: 0,
      right: 'auto',
      width: 3,
    },
    '& .MuiTab-root': {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: 0.3,
      color: 'text.secondary',
      gap: 1.5,
      '&.Mui-selected': {
        color: 'primary.main',
        fontWeight: 600,
        bgcolor: 'rgba(0,159,155,0.06)',
      },
      '&:hover:not(.Mui-selected)': {
        bgcolor: 'rgba(0,0,0,0.04)',
        color: 'text.primary',
      },
    },
  }}
>
  <Tab label="Plan" icon={<CreditCardIcon />} iconPosition="start" />
  <Tab label="Security" icon={<SecurityIcon />} iconPosition="start" />
  <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" />
</Tabs>`;

// ─── Props table ──────────────────────────────────────────────────────────────

const tabsPropRows: PropRow[] = [
  {
    prop: 'value',
    type: 'any',
    default: '—',
    description: "The value of the currently selected Tab. Must match a Tab's value prop.",
  },
  {
    prop: 'onChange',
    type: '(event, value) => void',
    default: '—',
    description: 'Callback fired when the value changes.',
  },
  {
    prop: 'orientation',
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: 'The component orientation. Use "vertical" for the Tabs_EDGE pattern.',
  },
  {
    prop: 'centered',
    type: 'boolean',
    default: 'false',
    description: 'If true, the tabs are centered. Only applies to the horizontal orientation.',
  },
  {
    prop: 'variant',
    type: '"standard" | "scrollable" | "fullWidth"',
    default: '"standard"',
    description: 'Determines additional display behavior of the tabs.',
  },
  {
    prop: 'scrollButtons',
    type: '"auto" | true | false',
    default: '"auto"',
    description: 'Determine behavior of scroll buttons when tabs are set to scroll.',
  },
  {
    prop: 'indicatorColor',
    type: '"primary" | "secondary"',
    default: '"primary"',
    description: 'Indicates the color of the indicator (active tab underline/bar).',
  },
  {
    prop: 'textColor',
    type: '"primary" | "secondary" | "inherit"',
    default: '"primary"',
    description: 'Determines the color of the Tab text.',
  },
];

const tabPropRows: PropRow[] = [
  {
    prop: 'label',
    type: 'React.ReactNode',
    default: '—',
    description: 'The label element of the Tab.',
  },
  {
    prop: 'value',
    type: 'any',
    default: '(auto index)',
    description: 'You can provide your own value. Otherwise, the index is used.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'If true, the component is disabled.',
  },
  {
    prop: 'icon',
    type: 'React.ReactElement',
    default: '—',
    description: 'The icon element.',
  },
  {
    prop: 'iconPosition',
    type: '"bottom" | "end" | "start" | "top"',
    default: '"top"',
    description: 'The position of the icon relative to the label. Use "start" for EDGE leading-icon tabs.',
  },
  {
    prop: 'wrapped',
    type: 'boolean',
    default: 'false',
    description: 'Tab labels appear in a single row. If false, the label may be wrapped.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TabsPage() {
  return (
    <Box>
      <PageHeader
        title="Tabs"
        description="Tabs organize content into multiple sections and allow users to navigate between them. The EDGE Design System extends MUI Tabs with a vertical Tabs_EDGE variant designed for settings-style navigation panels."
        muiLink="https://mui.com/material-ui/react-tabs/"
      />

      {/* Basic Tabs */}
      <DocSection title="Basic Tabs">
        <Stack spacing={2}>
          <PreviewCanvas>
            <BasicTabsDemo />
          </PreviewCanvas>
        </Stack>
      </DocSection>

      {/* Centered */}
      <DocSection title="Centered">
        <PreviewCanvas>
          <CenteredDemo />
        </PreviewCanvas>
      </DocSection>

      {/* States */}
      <DocSection title="States">
        <PreviewCanvas>
          <StatesDemo />
        </PreviewCanvas>
      </DocSection>

      {/* Tabs with Icons */}
      <DocSection title="Tabs with Icons">
        <PreviewCanvas>
          <IconTabsDemo />
        </PreviewCanvas>
      </DocSection>

      {/* Tabs_EDGE: Vertical Navigation */}
      <DocSection title="Tabs_EDGE — Vertical Navigation">
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: 14,
              color: '#5e6e7d',
              lineHeight: 1.6,
            }}
          >
            The <strong>Tabs_EDGE</strong> pattern is a vertical, settings-style navigation bar built
            on MUI's <code>orientation="vertical"</code> Tabs. Key EDGE customizations include: the
            active indicator repositioned to the <strong>left</strong> side, left-aligned labels,
            leading icons (<code>iconPosition="start"</code>), sentence-case text, and a subtle
            turquoise background highlight for the selected state.
          </Typography>
        </Box>
        <PreviewCanvas>
          <VerticalEdgeTabsDemo />
        </PreviewCanvas>
      </DocSection>

      {/* Props — Tabs */}
      <DocSection title="Key Props — Tabs">
        <PropsTable rows={tabsPropRows} />
      </DocSection>

      {/* Props — Tab */}
      <DocSection title="Key Props — Tab">
        <PropsTable rows={tabPropRows} />
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <Stack spacing={3}>
          <Box>
            <Typography
              sx={{
                fontFamily: '"Open Sans", sans-serif',
                fontSize: 12,
                fontWeight: 600,
                color: '#5e6e7d',
                mb: 1,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              Basic Tabs
            </Typography>
            <CodeBlock code={basicCode} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: '"Open Sans", sans-serif',
                fontSize: 12,
                fontWeight: 600,
                color: '#5e6e7d',
                mb: 1,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              Tabs with Icons
            </Typography>
            <CodeBlock code={iconCode} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: '"Open Sans", sans-serif',
                fontSize: 12,
                fontWeight: 600,
                color: '#5e6e7d',
                mb: 1,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              Tabs_EDGE — Vertical Navigation
            </Typography>
            <CodeBlock code={verticalEdgeCode} />
          </Box>
        </Stack>
      </DocSection>
    </Box>
  );
}
