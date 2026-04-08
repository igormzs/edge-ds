'use client';

import {
  Badge,
  IconButton,
  Avatar,
  Button,
  Box,
  Stack,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

const codeSnippet = `import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

// Number badge
<Badge badgeContent={4} color="primary">
  <MailIcon />
</Badge>

// Dot (no number) — status indicator
<Badge variant="dot" color="error">
  <MailIcon />
</Badge>

// Max cap
<Badge badgeContent={1000} max={99} color="primary">
  <NotificationsIcon />
</Badge>

// Invisible (conditionally hide)
<Badge
  badgeContent={0}
  color="primary"
  showZero     // show even when 0
>
  <MailIcon />
</Badge>

// Custom anchor position
<Badge
  badgeContent={3}
  color="secondary"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
>
  <Avatar>U</Avatar>
</Badge>`;

const propRows: PropRow[] = [
  {
    prop: 'badgeContent',
    type: 'ReactNode',
    default: '—',
    description: 'Content rendered inside the badge (number, string, or element).',
  },
  {
    prop: 'color',
    type: '"default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"',
    default: '"default"',
    description: 'The theme colour applied to the badge pill.',
  },
  {
    prop: 'variant',
    type: '"standard" | "dot"',
    default: '"standard"',
    description: 'Dot shows a small indicator with no content — useful for status.',
  },
  {
    prop: 'max',
    type: 'number',
    default: '99',
    description: 'When badgeContent exceeds this value, it shows "99+" style text.',
  },
  {
    prop: 'invisible',
    type: 'boolean',
    default: 'false',
    description: 'When true, the badge is hidden regardless of its content.',
  },
  {
    prop: 'anchorOrigin',
    type: '{ vertical: "top"|"bottom", horizontal: "left"|"right" }',
    default: '{ vertical:"top", horizontal:"right" }',
    description: 'Controls which corner of the child element the badge anchors to.',
  },
];

export default function BadgePage() {
  return (
    <Box>
      <PageHeader
        title="Badge"
        description="Badges attach a small label or indicator to a child element — typically an icon. They're used to highlight counts (unread messages, cart items) or status (online, error)."
        muiLink="https://mui.com/material-ui/react-badge/"
      />

      {/* Basic */}
      <DocSection title="Colors">
        <PreviewCanvas>
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((c) => (
            <PreviewGroup key={c} label={c}>
              <Badge badgeContent={4} color={c}>
                <MailIcon />
              </Badge>
            </PreviewGroup>
          ))}
        </PreviewCanvas>
      </DocSection>

      {/* Variants */}
      <DocSection title="Variants">
        <PreviewCanvas>
          <PreviewGroup label="Standard (number)">
            <Badge badgeContent={4} color="primary">
              <MailIcon />
            </Badge>
          </PreviewGroup>
          <PreviewGroup label="Dot (status)">
            <Badge variant="dot" color="error">
              <MailIcon />
            </Badge>
          </PreviewGroup>
          <PreviewGroup label="Max cap (99+)">
            <Badge badgeContent={1000} max={99} color="primary">
              <NotificationsIcon />
            </Badge>
          </PreviewGroup>
          <PreviewGroup label="Show zero">
            <Badge badgeContent={0} color="primary" showZero>
              <MailIcon />
            </Badge>
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* States */}
      <DocSection title="States">
        <PreviewCanvas>
          <PreviewGroup label="Default">
            <Badge badgeContent={5} color="primary">
              <NotificationsIcon />
            </Badge>
          </PreviewGroup>
          <PreviewGroup label="Invisible">
            <Badge badgeContent={5} color="primary" invisible>
              <NotificationsIcon />
            </Badge>
          </PreviewGroup>
          <PreviewGroup label="On IconButton">
            <IconButton>
              <Badge badgeContent={12} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </PreviewGroup>
          <PreviewGroup label="On Avatar">
            <Badge
              variant="dot"
              color="success"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar sx={{ width: 40, height: 40, bgcolor: '#007f7c' }}>U</Avatar>
            </Badge>
          </PreviewGroup>
          <PreviewGroup label="On Button">
            <Badge badgeContent={3} color="secondary">
              <Button variant="outlined" startIcon={<ShoppingCartIcon />}>
                Cart
              </Button>
            </Badge>
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Anchor position */}
      <DocSection title="Anchor Origins">
        <PreviewCanvas>
          <PreviewGroup label="Top-right (default)">
            <Badge badgeContent={1} color="primary" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <MailIcon />
            </Badge>
          </PreviewGroup>
          <PreviewGroup label="Top-left">
            <Badge badgeContent={1} color="primary" anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
              <MailIcon />
            </Badge>
          </PreviewGroup>
          <PreviewGroup label="Bottom-right">
            <Badge badgeContent={1} color="primary" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <MailIcon />
            </Badge>
          </PreviewGroup>
          <PreviewGroup label="Bottom-left">
            <Badge badgeContent={1} color="primary" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
              <MailIcon />
            </Badge>
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
