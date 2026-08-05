'use client';

import React, { useState } from 'react';
import { Badge, IconButton, Avatar, Button, Box, Typography, Stack, Paper } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

// ─── Text formatting helpers ──────────────────────────────────────────────
// Anatomy & Token Architecture and Usage Guidelines & Accessibility render as
// short paragraphs + bulleted lists, matching the same restructure already
// applied to Alert's and Backdrop's pages (docs/web-component-page-pattern.md §4).

function Paragraph({ children, sx }: { children: React.ReactNode; sx?: any }) {
  return (
    <Typography
      sx={{
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 14,
        lineHeight: 1.6,
        color: '#5e6e7d',
        mb: 1.5,
        '&:last-child': { mb: 0 },
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

function BulletList({ items, sx }: { items: React.ReactNode[]; sx?: any }) {
  return (
    <Box
      component="ul"
      sx={{
        m: 0,
        mb: 1.5,
        pl: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
        '&:last-child': { mb: 0 },
        ...sx,
      }}
    >
      {items.map((item, i) => (
        <Typography
          key={i}
          component="li"
          sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, lineHeight: 1.6, color: '#5e6e7d' }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );
}

function SpecRow({ heading, body }: { heading: string; body: React.ReactNode }) {
  return (
    <Box sx={{ mb: 3, '&:last-of-type': { mb: 0 } }}>
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: '#009f9b',
          mb: 1,
        }}
      >
        {heading}
      </Typography>
      <Box sx={{ maxWidth: 780 }}>{body}</Box>
    </Box>
  );
}

function SnippetLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#5e6e7d', mb: 1 }}>{children}</Typography>
  );
}

// ─── Visual Preview matrix helpers ────────────────────────────────────────

function MatrixCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Paper
      elevation={0}
      sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(0,0,0,0.08)', bgcolor: '#ffffff' }}
    >
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: '#009f9b',
          mb: 2.5,
          textAlign: 'left',
        }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 11,
        fontWeight: 600,
        color: '#5e6e7d',
        letterSpacing: 0.4,
        textTransform: 'uppercase',
        textAlign: 'left',
        mb: 1,
      }}
    >
      {children}
    </Typography>
  );
}

// Left-aligned control + caption pair, replacing the legacy centered
// PreviewGroup for Visual Preview swatches per the ratified pattern.
function Swatch({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
      <Box sx={{ minHeight: 32, display: 'flex', alignItems: 'center' }}>{children}</Box>
      <Typography
        sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, color: '#9e9e9e', letterSpacing: 0.4, textAlign: 'left' }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// Generic neutral anchor used for the color-matrix swatches, so the badge
// itself (not the anchor) stays the visual focus.
function AnchorSquare() {
  return <Box sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: '#eceff1' }} />;
}

// ─── Color axes: matches the real Figma <Badge> component set. There is
// no "Default" dot variant in the master (confirmed live against the file),
// only Standard has a Default color, so the two lists intentionally differ.
const STANDARD_COLORS = ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
const DOT_COLORS = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;

type CornerKey = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
const CORNERS: Record<CornerKey, { label: string; anchorOrigin: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' } }> = {
  topRight: { label: 'Top right', anchorOrigin: { vertical: 'top', horizontal: 'right' } },
  topLeft: { label: 'Top left', anchorOrigin: { vertical: 'top', horizontal: 'left' } },
  bottomRight: { label: 'Bottom right', anchorOrigin: { vertical: 'bottom', horizontal: 'right' } },
  bottomLeft: { label: 'Bottom left', anchorOrigin: { vertical: 'bottom', horizontal: 'left' } },
};

// ─── Usage code snippets ──────────────────────────────────────────────────

const basicSnippet = `import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

<Badge badgeContent={4} color="primary">
  <MailIcon />
</Badge>`;

const dotSnippet = `// Dot variant: a small status indicator with no content, useful for
// presence/status signaling rather than counts.
<Badge variant="dot" color="success">
  <MailIcon />
</Badge>`;

const maxSnippet = `// When badgeContent exceeds max, the badge renders "{max}+" instead of
// the literal number.
<Badge badgeContent={1000} max={99} color="error">
  <NotificationsIcon />
</Badge>`;

const zeroAndInvisibleSnippet = `// showZero keeps a literal "0" visible instead of the default behavior of
// hiding the badge when badgeContent is falsy.
<Badge badgeContent={0} color="secondary" showZero>
  <MailIcon />
</Badge>

// invisible force-hides the badge regardless of its content, useful for a
// single boolean toggle (e.g. read/unread) without unmounting the Badge.
<Badge badgeContent={5} color="primary" invisible={isRead}>
  <NotificationsIcon />
</Badge>`;

const anchorSnippet = `// anchorOrigin controls which corner of the child the badge attaches to.
<Badge
  badgeContent={3}
  color="secondary"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
>
  <Avatar>U</Avatar>
</Badge>`;

// ─── Key Props ────────────────────────────────────────────────────────────

const propRows: PropRow[] = [
  {
    prop: 'badgeContent',
    type: 'ReactNode',
    default: 'None',
    description: 'Content rendered inside the badge (number, string, or element).',
  },
  {
    prop: 'color',
    type: '"default" | "primary" | "secondary" | "error" | "warning" | "info" | "success"',
    default: '"default"',
    description: 'The token-driven color applied to the badge pill or dot.',
  },
  {
    prop: 'variant',
    type: '"standard" | "dot"',
    default: '"standard"',
    description: 'Standard shows badgeContent; dot shows a small indicator with no content.',
  },
  {
    prop: 'max',
    type: 'number',
    default: '99',
    description: 'When badgeContent exceeds this value, it renders as "{max}+" instead.',
  },
  {
    prop: 'showZero',
    type: 'boolean',
    default: 'false',
    description: 'When true, a badgeContent of 0 still renders instead of being hidden.',
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

// ─── Page ───────────────────────────────────────────────────────────────────

export default function BadgePage() {
  const [notifCount, setNotifCount] = useState(3);
  const [mailCount, setMailCount] = useState(7);
  const [maxDemoCount, setMaxDemoCount] = useState(90);
  const [showZero, setShowZero] = useState(true);
  const [invisible, setInvisible] = useState(false);
  const [corner, setCorner] = useState<CornerKey>('topRight');

  return (
    <Box>
      <PageHeader
        title="Badge"
        description="Badges attach a small label or indicator to a child element, typically an icon, avatar, or button. They highlight counts (unread messages, cart items) or status (online, error) without interrupting the surrounding layout."
        muiLink="https://mui.com/material-ui/react-badge/"
        categoryBadge="Components"
        statusBadge="Migrated ✓"
      />

      {/* Visual Preview: four matrix cards, Standalone Standards, Dot
          Indicators, Anchored Icon Buttons, and Complex & Special States.
          The exhaustive color x variant grid lives in the Figma "Badge -
          Component Gallery" frame; these cards are a representative,
          fully-interactive preview of the same real Components/Badge/*
          tokens, not a duplicate of that grid. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <MatrixCard title="Standalone Standards">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {STANDARD_COLORS.map((c) => (
                <Swatch key={c} label={c}>
                  <Badge badgeContent={4} color={c}>
                    <AnchorSquare />
                  </Badge>
                </Swatch>
              ))}
            </Box>
          </MatrixCard>

          <MatrixCard title="Dot Indicators">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {DOT_COLORS.map((c) => (
                <Swatch key={c} label={c}>
                  <Badge variant="dot" color={c}>
                    <AnchorSquare />
                  </Badge>
                </Swatch>
              ))}
            </Box>
          </MatrixCard>

          <MatrixCard title="Anchored Icon Buttons">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <Swatch label="Notifications, click to increment">
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton>
                    <Badge badgeContent={notifCount} color="primary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Button size="small" variant="outlined" onClick={() => setNotifCount((n) => n + 1)}>
                    +1
                  </Button>
                </Stack>
              </Swatch>
              <Swatch label="Unread mail, click to mark read">
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton>
                    <Badge badgeContent={mailCount} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <Button size="small" variant="outlined" onClick={() => setMailCount(0)} disabled={mailCount === 0}>
                    Mark read
                  </Button>
                </Stack>
              </Swatch>
            </Box>
          </MatrixCard>

          <MatrixCard title="Complex & Special States">
            <Stack spacing={3}>
              <Box>
                <GroupLabel>Max cap (max=99)</GroupLabel>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Badge badgeContent={maxDemoCount} max={99} color="error">
                    <NotificationsIcon />
                  </Badge>
                  <Button size="small" variant="outlined" onClick={() => setMaxDemoCount((n) => n + 10)}>
                    +10
                  </Button>
                  <Button size="small" variant="text" onClick={() => setMaxDemoCount(90)} disabled={maxDemoCount === 90}>
                    Reset
                  </Button>
                </Stack>
              </Box>

              <Box>
                <GroupLabel>Show zero</GroupLabel>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Badge badgeContent={0} color="secondary" showZero={showZero}>
                    <MailIcon />
                  </Badge>
                  <Button size="small" variant="outlined" onClick={() => setShowZero((v) => !v)}>
                    {showZero ? 'Hide zero' : 'Show zero'}
                  </Button>
                </Stack>
              </Box>

              <Box>
                <GroupLabel>Invisible</GroupLabel>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Badge badgeContent={5} color="primary" invisible={invisible}>
                    <NotificationsIcon />
                  </Badge>
                  <Button size="small" variant="outlined" onClick={() => setInvisible((v) => !v)}>
                    {invisible ? 'Show badge' : 'Hide badge'}
                  </Button>
                </Stack>
              </Box>

              <Box>
                <GroupLabel>Anchor origin, click a corner</GroupLabel>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Badge badgeContent={1} color="primary" anchorOrigin={CORNERS[corner].anchorOrigin}>
                    <AnchorSquare />
                  </Badge>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
                    {(Object.keys(CORNERS) as CornerKey[]).map((key) => (
                      <Button
                        key={key}
                        size="small"
                        variant={corner === key ? 'contained' : 'outlined'}
                        onClick={() => setCorner(key)}
                      >
                        {CORNERS[key].label}
                      </Button>
                    ))}
                  </Box>
                </Stack>
              </Box>

              <Box>
                <GroupLabel>On avatar</GroupLabel>
                <Badge variant="dot" color="success" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: '#007f7c' }}>U</Avatar>
                </Badge>
              </Box>

              <Box>
                <GroupLabel>On button</GroupLabel>
                <Badge badgeContent={3} color="secondary">
                  <Button variant="outlined" startIcon={<ShoppingCartIcon />}>
                    Cart
                  </Button>
                </Badge>
              </Box>
            </Stack>
          </MatrixCard>
        </Stack>
      </DocSection>

      {/* Anatomy & Token Architecture */}
      <DocSection title="Anatomy & Token Architecture">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Anatomy"
              body={
                <>
                  <Paragraph>
                    <strong>Pill (Standard)</strong> is a rounded badge that renders <code>badgeContent</code>,
                    minimum 20px diameter, anchored to a corner of its child.
                  </Paragraph>
                  <Paragraph>
                    <strong>Dot</strong> is a small 8px circle with no content, used for presence or status
                    signaling rather than counts.
                  </Paragraph>
                  <Paragraph>
                    <strong>Anchor</strong> is any child element the badge attaches to (icon, avatar, button),
                    with <code>anchorOrigin</code> controlling which corner.
                  </Paragraph>
                  <Paragraph sx={{ mb: 0 }}>
                    <strong>Border</strong> is a 2px white ring on every colored badge, separating it visually
                    from the anchor content behind it.
                  </Paragraph>
                </>
              }
            />
            <SpecRow
              heading="Token Architecture"
              body={
                <BulletList
                  items={[
                    <>
                      Primary and Secondary: <code>Components/Badge/Primary/BG/Default</code> and{' '}
                      <code>Components/Badge/Secondary/BG/Default</code>, aliasing{' '}
                      <code>Brand/Primary/500</code> and <code>Brand/Secondary/500</code> directly, the same
                      brand-pair pattern used by Chip rather than collapsing into a single Neutral tone.
                    </>,
                    <>
                      Error, Warning, Info, Success: <code>Components/Badge/{'{Status}'}/BG/Default</code>,
                      aliasing <code>Semantic/Status/{'{Status}'}/Icon</code>, the same ramp-800 tier already
                      consumed by Alert&apos;s filled variant and Chip&apos;s Filled/BG/Default.
                    </>,
                    <>
                      Text on every colored badge: <code>Components/Badge/{'{Color}'}/Text</code>, aliasing{' '}
                      <code>Semantic/Text/Inverse</code> (white).
                    </>,
                    <>
                      Default (no color): <code>Components/Badge/Default/Text</code> aliases{' '}
                      <code>Semantic/Text/Primary</code>, deliberately with no background token at all, an
                      explicit decision from the Figma migration rather than a fabricated grey pill.
                    </>,
                    <>
                      Border: <code>Components/Badge/Border</code>, aliasing <code>Brand/White</code>. See
                      src/theme/brandTheme.ts MuiBadge for the resolved hex values.
                    </>,
                  ]}
                  sx={{ mb: 0 }}
                />
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Usage Guidelines & Accessibility */}
      <DocSection title="Usage Guidelines & Accessibility">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Usage Guidelines"
              body={
                <BulletList
                  items={[
                    'Use Standard for counts (unread messages, cart items) and Dot for simple presence or status signaling with no number.',
                    'Use Error for counts that need attention, Primary or Secondary for general-purpose counts, and Warning, Info, or Success for status-oriented dots.',
                    'Prefer max to cap large counts rather than letting an arbitrarily large number stretch the pill; reach for showZero only when zero itself is meaningful information, not as a default.',
                  ]}
                  sx={{ mb: 0 }}
                />
              }
            />
            <SpecRow
              heading="Accessibility"
              body={
                <BulletList
                  items={[
                    <>
                      Badge content is visual only by default and is not announced on its own by assistive
                      tech. When the count is meaningful, pair the anchor element with an explicit{' '}
                      <code>aria-label</code> (e.g. &quot;3 unread messages&quot;) rather than relying on the
                      numeral alone.
                    </>,
                    'Dot-variant badges convey status by color alone; pair them with a text label or tooltip somewhere in reach so the state is not lost on colorblind users.',
                  ]}
                  sx={{ mb: 0 }}
                />
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Key Props */}
      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <Stack spacing={3}>
          <Box>
            <SnippetLabel>Basic usage</SnippetLabel>
            <CodeBlock code={basicSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Dot variant</SnippetLabel>
            <CodeBlock code={dotSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Max cap</SnippetLabel>
            <CodeBlock code={maxSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Show zero and invisible</SnippetLabel>
            <CodeBlock code={zeroAndInvisibleSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Custom anchor position</SnippetLabel>
            <CodeBlock code={anchorSnippet} />
          </Box>
        </Stack>
      </DocSection>
    </Box>
  );
}
