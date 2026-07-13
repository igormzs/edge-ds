'use client';

import {
  Breadcrumbs,
  Link,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

// Left-aligned example wrapper — PreviewGroup (DocUI) centers its content and
// label, which doesn't suit Breadcrumbs (an inherently left-aligned,
// horizontal component). Kept local to this page rather than changing the
// shared DocUI primitive used by other component doc pages.
function Example({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
      {children}
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 11,
          color: '#9e9e9e',
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

const codeSnippet = `import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Basic — default "/" separator
<Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/">
    Home
  </Link>
  <Link underline="hover" color="inherit" href="/settings">
    Settings
  </Link>
  <Typography sx={{ color: 'text.primary' }}>Push Notifications</Typography>
</Breadcrumbs>

// Custom separator (icon)
<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/">Home</Link>
  <Link underline="hover" color="inherit" href="/settings">Settings</Link>
  <Typography sx={{ color: 'text.primary' }}>Push Notifications</Typography>
</Breadcrumbs>

// With leading icons
<Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/">
    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    Home
  </Link>
  <Typography sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
    <SettingsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
    Settings
  </Typography>
</Breadcrumbs>

// Collapsed — long paths auto-collapse behind a "…" affordance
<Breadcrumbs maxItems={3} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/">Home</Link>
  <Link underline="hover" color="inherit" href="/profile">Profile</Link>
  <Link underline="hover" color="inherit" href="/profile/settings">Settings</Link>
  <Link underline="hover" color="inherit" href="/profile/settings/communication">Communication</Link>
  <Typography sx={{ color: 'text.primary' }}>Push Notifications</Typography>
</Breadcrumbs>`;

const propRows: PropRow[] = [
  {
    prop: 'separator',
    type: 'ReactNode',
    default: '"/"',
    description: 'The separator rendered between each breadcrumb item.',
  },
  {
    prop: 'maxItems',
    type: 'number',
    default: '8',
    description: 'Max crumbs to show before collapsing the middle ones behind a "…" button.',
  },
  {
    prop: 'itemsBeforeCollapse',
    type: 'number',
    default: '1',
    description: 'How many crumbs to show at the start when collapsed.',
  },
  {
    prop: 'itemsAfterCollapse',
    type: 'number',
    default: '1',
    description: 'How many crumbs to show at the end when collapsed.',
  },
  {
    prop: 'expandText',
    type: 'string',
    default: '"Show path"',
    description: 'Accessible label for the collapse ("…") button, used by screen readers.',
  },
];

export default function BreadcrumbsPage() {
  return (
    <Box>
      <PageHeader
        title="Breadcrumbs"
        description="Breadcrumbs let a user quickly see their location within a hierarchy and navigate back to a parent level. The final crumb represents the current page and is rendered as plain text, never a link."
        muiLink="https://mui.com/material-ui/react-breadcrumbs/"
      />

      {/* Visual Variants */}
      <DocSection title="Visual Variants">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <Example label="Default separator">
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="#">
                  Home
                </Link>
                <Link underline="hover" color="inherit" href="#">
                  Settings
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Push Notifications</Typography>
              </Breadcrumbs>
            </Example>

            <Example label="Custom separator (icon)">
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="#">
                  Home
                </Link>
                <Link underline="hover" color="inherit" href="#">
                  Settings
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Push Notifications</Typography>
              </Breadcrumbs>
            </Example>

            <Example label="With leading icons">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  href="#"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Home
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="#"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <SettingsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Settings
                </Link>
                <Typography sx={{ display: 'flex', alignItems: 'center', color: 'text.primary' }}>
                  <NotificationsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Push Notifications
                </Typography>
              </Breadcrumbs>
            </Example>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Interactive States */}
      <DocSection title="Interactive States">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <Example label="Links vs. current page — hover the links">
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="#">
                  Home
                </Link>
                <Link underline="hover" color="inherit" href="#">
                  Profile
                </Link>
                <Link underline="hover" color="inherit" href="#">
                  Settings
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Push Notifications</Typography>
              </Breadcrumbs>
            </Example>

            <Example label="Collapsed — maxItems={3}, click “…” to expand">
              <Breadcrumbs maxItems={3} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="#">
                  Home
                </Link>
                <Link underline="hover" color="inherit" href="#">
                  Profile
                </Link>
                <Link underline="hover" color="inherit" href="#">
                  Settings
                </Link>
                <Link underline="hover" color="inherit" href="#">
                  Communication
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Push Notifications</Typography>
              </Breadcrumbs>
            </Example>
          </Stack>
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
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Wrap the root in <code>aria-label=&quot;breadcrumb&quot;</code> — it renders a <code>&lt;nav&gt;</code> landmark so screen readers can jump straight to it.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • The current page must be plain text (<code>Typography</code>), never a <code>Link</code> — a link to the page you&apos;re already on is a dead end for keyboard and screen-reader users.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • When collapsed, the &quot;…&quot; control needs an accessible name — set <code>expandText</code> to describe what expanding reveals (default: &quot;Show path&quot;).
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Separators are decorative and already hidden from assistive tech by MUI&apos;s implementation — no extra <code>aria-hidden</code> needed on custom separators.
            </Typography>
          </Stack>
        </PreviewCanvas>
      </DocSection>
    </Box>
  );
}
