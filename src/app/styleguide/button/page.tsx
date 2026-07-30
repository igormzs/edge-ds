'use client';

import React, { useState } from 'react';
import { Button, Box, Typography, Stack, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

// ─── Text formatting helpers ──────────────────────────────────────────────
// Anatomy & Token Architecture, Usage Guidelines, and Accessibility render as
// short paragraphs + bulleted lists instead of one dense flowing block.

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

function Swatch({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
      {children}
      <Typography
        sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, color: '#9e9e9e', letterSpacing: 0.3, textAlign: 'left' }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// ─── Color status row — matches the Figma <Button> Color axis's five true
// statuses plus Primary (Inherit/Inherit (white) are shown separately below,
// since they depend on the surrounding background rather than being a
// status color). "Neutral" is EDGE-DS's name for MUI's "secondary" — same
// prop, renamed per the status vocabulary in
// docs/figma-component-structure.md §5.3.
const statusColorRow: Array<{ label: string; color: any }> = [
  { label: 'Primary', color: 'primary' },
  { label: 'Neutral', color: 'secondary' },
  { label: 'Error', color: 'error' },
  { label: 'Warning', color: 'warning' },
  { label: 'Info', color: 'info' },
  { label: 'Success', color: 'success' },
];

// ─── Usage code snippets ──────────────────────────────────────────────────

const basicSnippet = `import Button from '@mui/material/Button';

<Button variant="contained" color="primary">Contained</Button>
<Button variant="outlined" color="primary">Outlined</Button>
<Button variant="text" color="primary">Text</Button>`;

const colorSnippet = `// "secondary" reads as EDGE-DS's "Neutral" status — same prop,
// design-system-level rename only. All five true statuses plus
// Primary share the same containedX/outlinedX/textX theme overrides
// (src/theme/brandTheme.ts).
<Button variant="contained" color="primary">Primary</Button>
<Button variant="contained" color="secondary">Neutral</Button>
<Button variant="contained" color="error">Error</Button>
<Button variant="contained" color="warning">Warning</Button>
<Button variant="contained" color="info">Info</Button>
<Button variant="contained" color="success">Success</Button>

// Inherits currentColor instead of a fixed status — for placing a
// Button inside text or a differently-colored surface.
<Button variant="text" color="inherit">Inherit</Button>`;

const iconSnippet = `import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';

<Button variant="contained" startIcon={<SendIcon />}>
  Send
</Button>
<Button variant="outlined" endIcon={<DownloadIcon />}>
  Download
</Button>`;

const loadingSnippet = `// Native MUI v7 Button loading state — no custom wrapper needed.
// loadingPosition matches the Figma component's "Loading Start" /
// "Loading End" boolean properties 1:1 ("center" replaces the label
// entirely and has no Figma-side equivalent yet).
<Button variant="contained" loading loadingPosition="start">
  Submit
</Button>
<Button variant="contained" loading loadingPosition="end">
  Submit
</Button>
<Button variant="contained" loading loadingPosition="center" />`;

const disabledSnippet = `<Button variant="contained" disabled>Contained</Button>
<Button variant="outlined" disabled>Outlined</Button>
<Button variant="text" disabled>Text</Button>`;

// ─── Key Props ────────────────────────────────────────────────────────────

const buttonPropRows: PropRow[] = [
  {
    prop: 'variant',
    type: "'contained' | 'outlined' | 'text'",
    default: "'text'",
    description: 'The visual hierarchy level: Contained (primary action), Outlined (secondary), Text (tertiary).',
  },
  {
    prop: 'color',
    type: "'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit'",
    default: "'primary'",
    description:
      'The semantic color role. "secondary" reads as EDGE-DS\'s "Neutral" status. "inherit" uses currentColor instead of a fixed status.',
  },
  {
    prop: 'size',
    type: "'small' | 'medium' | 'large'",
    default: "'medium'",
    description: 'Adjusts padding, font size, and icon size.',
  },
  {
    prop: 'startIcon / endIcon',
    type: 'ReactNode',
    default: '—',
    description: 'Icon placed before or after the label text.',
  },
  {
    prop: 'loading',
    type: 'boolean | null',
    default: 'null',
    description: 'Shows a loading indicator and disables the button. Native MUI v7 prop, not a custom addition.',
  },
  {
    prop: 'loadingPosition',
    type: "'start' | 'end' | 'center'",
    default: "'center'",
    description: 'Where the loading indicator sits. Only takes effect while loading is true.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'When true, the button is non-interactive and visually muted.',
  },
  {
    prop: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'Stretches the button to fill its container width.',
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ButtonPage() {
  const [loadingDemo, setLoadingDemo] = useState({ start: false, end: false, center: false });
  const fireLoading = (key: keyof typeof loadingDemo) => {
    setLoadingDemo((s) => ({ ...s, [key]: true }));
    setTimeout(() => setLoadingDemo((s) => ({ ...s, [key]: false })), 1500);
  };

  return (
    <Box>
      <PageHeader
        title="Button"
        description="Buttons let users trigger an action with a single tap. EDGE-DS provides three hierarchy levels (Contained, Outlined, Text) across three sizes and six semantic color statuses."
        muiLink="https://mui.com/material-ui/react-button/"
        categoryBadge="Components"
        statusBadge="In Design / In Progress"
      />

      {/* Visual Preview — four matrix cards (Variants, Sizes, Color Status,
          States). Interactive States is folded in here rather than living as
          its own section, per docs/web-component-page-pattern.md §3.2 — every
          button below is a real, live MUI <Button>, so Hover/Focus/Active are
          already testable by interacting with it directly; only Loading
          needs its own click handler since it's a transient state. The
          exhaustive per-variant x per-color x per-state matrix (297 real
          variants) lives in the Figma "Button - Component Gallery" frame per
          docs/figma-component-structure.md §0 — this stays a representative
          preview, not a full variant dump. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <MatrixCard title="Variants">
            <Stack direction="row" spacing={3} flexWrap="wrap" alignItems="flex-start">
              <Swatch label="Contained">
                <Button variant="contained" color="primary">Contained</Button>
              </Swatch>
              <Swatch label="Outlined">
                <Button variant="outlined" color="primary">Outlined</Button>
              </Swatch>
              <Swatch label="Text">
                <Button variant="text" color="primary">Text</Button>
              </Swatch>
            </Stack>
          </MatrixCard>

          <MatrixCard title="Sizes">
            <Stack direction="row" spacing={3} alignItems="flex-end" flexWrap="wrap">
              <Swatch label="Small">
                <Button variant="contained" size="small">Small</Button>
              </Swatch>
              <Swatch label="Medium (default)">
                <Button variant="contained" size="medium">Medium</Button>
              </Swatch>
              <Swatch label="Large">
                <Button variant="contained" size="large">Large</Button>
              </Swatch>
            </Stack>
          </MatrixCard>

          <MatrixCard title="Color Status">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, minmax(0, 1fr))',
                  sm: 'repeat(3, minmax(0, 1fr))',
                  md: 'repeat(6, minmax(0, 1fr))',
                },
                columnGap: 3,
                rowGap: 3,
                mb: 3,
              }}
            >
              {statusColorRow.map(({ label, color }) => (
                <Box key={label}>
                  <GroupLabel>{label}</GroupLabel>
                  <Button variant="contained" color={color}>{label}</Button>
                </Box>
              ))}
            </Box>
            <GroupLabel>Inherit — depends on the surrounding surface</GroupLabel>
            <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
              <Swatch label="Inherit (on light surface)">
                <Button variant="outlined" color="inherit">Inherit</Button>
              </Swatch>
              <Swatch label="Inherit (white) — on a dark surface">
                <Box sx={{ bgcolor: '#262d33', p: 1.5, borderRadius: 1 }}>
                  <Button variant="outlined" color="inherit" sx={{ color: '#ffffff', borderColor: '#ffffff' }}>
                    Inherit
                  </Button>
                </Box>
              </Swatch>
            </Stack>
          </MatrixCard>

          <MatrixCard title="States">
            <Stack spacing={3.5}>
              <Box>
                <GroupLabel>Hover / Focus / Active</GroupLabel>
                <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
                  <Button variant="contained" color="primary">Contained</Button>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      px: 1.5,
                      py: 1,
                      borderRadius: 1.5,
                      bgcolor: 'rgba(0,159,155,0.06)',
                      border: '1px solid rgba(0,159,155,0.25)',
                      maxWidth: 360,
                    }}
                  >
                    <Typography sx={{ fontSize: 11.5, lineHeight: 1.5, color: '#5e6e7d' }}>
                      Hover, Tab to focus, or press and hold to see Active — all real, live CSS states already wired in the theme.
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Box>
                <GroupLabel>Disabled</GroupLabel>
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  <Button variant="contained" disabled>Contained</Button>
                  <Button variant="outlined" disabled>Outlined</Button>
                  <Button variant="text" disabled>Text</Button>
                </Stack>
              </Box>

              <Box>
                <GroupLabel>Loading — click to trigger</GroupLabel>
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  <Swatch label="loadingPosition=&quot;start&quot;">
                    <Button
                      variant="contained"
                      loading={loadingDemo.start}
                      loadingPosition="start"
                      onClick={() => fireLoading('start')}
                    >
                      Submit
                    </Button>
                  </Swatch>
                  <Swatch label="loadingPosition=&quot;end&quot;">
                    <Button
                      variant="contained"
                      loading={loadingDemo.end}
                      loadingPosition="end"
                      onClick={() => fireLoading('end')}
                    >
                      Submit
                    </Button>
                  </Swatch>
                  <Swatch label="loadingPosition=&quot;center&quot;">
                    <Button
                      variant="contained"
                      loading={loadingDemo.center}
                      loadingPosition="center"
                      onClick={() => fireLoading('center')}
                    >
                      Submit
                    </Button>
                  </Swatch>
                </Stack>
              </Box>

              <Box>
                <GroupLabel>Icons</GroupLabel>
                <Stack direction="row" spacing={3} flexWrap="wrap">
                  <Button variant="contained" startIcon={<SendIcon />}>Send</Button>
                  <Button variant="outlined" endIcon={<DownloadIcon />}>Download</Button>
                </Stack>
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
                    <strong>Container</strong> — the clickable surface. Contained fills it solid,
                    Outlined traces a 1px border around it, Text renders no fill or border at rest.
                  </Paragraph>
                  <Paragraph>
                    <strong>Label</strong> — the button&apos;s text content, always present even when
                    icons are shown alongside it.
                  </Paragraph>
                  <Paragraph sx={{ mb: 0 }}>
                    <strong>Start Icon / End Icon</strong> — optional icon slots exposed as boolean +
                    instance-swap component properties in Figma (not separate variants), so any icon
                    can be swapped in without multiplying the variant count.
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
                      <strong>Contained</strong>: <code>Components/Button/{'{Status}'}/BG/Default</code>,{' '}
                      <code>BG/Hover</code>, and either <code>Primary/Text</code> or{' '}
                      <code>{'{Status}'}/BG/OnFill/Text</code> for the label — Primary keeps its own
                      dedicated label token, the other five statuses share the OnFill/Text pattern.
                    </>,
                    <>
                      <strong>Outlined / Text</strong>: <code>Components/Button/Primary/Outlined/*</code>{' '}
                      and <code>Primary/Text/*</code> cover Primary&apos;s label/border/hover-tint per
                      style; the five true statuses (Neutral, Error, Warning, Info, Success) share one{' '}
                      <code>{'{Status}'}/Text</code> token across both Outlined and Text, plus a
                      dedicated <code>{'{Status}'}/Outlined/BG/Hover</code> tint.
                    </>,
                    <>
                      <strong>Inherit / Inherit (white)</strong>: Outlined/Text hover backgrounds alias{' '}
                      <code>Components/Button/Inherit/Outlined/BG/Hover</code> and{' '}
                      <code>Inherit/Text/BG/Hover</code> — both currently resolve to the same{' '}
                      <code>Semantic/State/Hover</code> value regardless of color, confirmed genuinely
                      shared rather than a copy-paste gap.
                    </>,
                    <>
                      <strong>Disabled</strong> is shared across every color:{' '}
                      <code>Components/Button/Disabled/BG</code> and <code>Disabled/Text</code>.
                    </>,
                    <>
                      <strong>Focus ring</strong>: a ripple layer bound to{' '}
                      <code>Semantic/Border/Focus</code> (as a fill, not a stroke) plus a{' '}
                      <code>Brand/White</code> backing container — the white backing was found
                      hardcoded (unbound) on every color/size/variant combination during this pass and
                      has been rebound to the existing <code>Brand/White</code> token.
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
                    'Use Contained for the single primary action on a screen or within a section.',
                    'Use Outlined for a secondary action alongside a Contained primary action.',
                    'Use Text for the lowest-emphasis action, e.g. inline or inside a dense toolbar.',
                    'Prefer semantic colors (Error, Warning, Info, Success) only when the action itself carries that meaning (e.g. Error for a destructive action) — default to Primary otherwise.',
                    <>
                      Use <code>loading</code> instead of manually swapping the label to a spinner —
                      it disables the button and preserves its size automatically.
                    </>,
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
                    'Maintain a 44×44px minimum touch target even at Small size by padding the hit area in layout, not resizing the visual control.',
                    <>
                      <strong>Keyboard</strong>: <code>Tab</code> focuses, <code>Space</code>/
                      <code>Enter</code> activates.
                    </>,
                    'Icon-only buttons need an aria-label since there is no visible text label — for a dedicated icon-only control, use IconButton instead of an icon-only Button.',
                    'A loading button is automatically disabled, so it is removed from the tab order\'s interactive state without extra ARIA wiring.',
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
        <PropsTable rows={buttonPropRows} />
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <Stack spacing={3}>
          <Box>
            <SnippetLabel>Basic usage</SnippetLabel>
            <CodeBlock code={basicSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Color statuses</SnippetLabel>
            <CodeBlock code={colorSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Icons</SnippetLabel>
            <CodeBlock code={iconSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Loading</SnippetLabel>
            <CodeBlock code={loadingSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Disabled</SnippetLabel>
            <CodeBlock code={disabledSnippet} />
          </Box>
        </Stack>
      </DocSection>
    </Box>
  );
}
