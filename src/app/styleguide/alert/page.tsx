'use client';

import React, { useState } from 'react';
import { Alert, AlertTitle, Box, Typography, Stack, Paper, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
// short paragraphs + bulleted lists instead of one dense flowing block —
// matches the same restructure applied to the Figma Documentation frame
// (docs/figma-component-structure.md §2.3).

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

// ─── Shared severity row — matches the Figma <Alert> Severity axis's four
// true statuses. There is no "Neutral"/"Primary" severity on Alert (unlike
// Button/Chip's six-color axis) — MUI's own severity type is exactly these
// four, 1:1 with Components/Alert/{Status}/* in Figma.
const severityRow: Array<{ label: string; severity: 'error' | 'warning' | 'info' | 'success' }> = [
  { label: 'Error', severity: 'error' },
  { label: 'Warning', severity: 'warning' },
  { label: 'Info', severity: 'info' },
  { label: 'Success', severity: 'success' },
];

// ─── Usage code snippets ──────────────────────────────────────────────────

const basicSnippet = `import Alert from '@mui/material/Alert';

<Alert severity="success">This is a success alert.</Alert>
<Alert severity="info">This is an info alert.</Alert>
<Alert severity="warning">This is a warning alert.</Alert>
<Alert severity="error">This is an error alert.</Alert>`;

const variantSnippet = `// Standard (default) — light tint background, dark text/icon.
<Alert variant="standard" severity="info">Standard variant</Alert>

// Outlined — transparent background, colored 1px border.
<Alert variant="outlined" severity="info">Outlined variant</Alert>

// Filled — solid background, white text/icon. Components/Alert/{Status}/BG/Default
// and BG/OnFill/Text, aliasing Semantic/Status/{Status}/Icon and Brand/White
// respectively (see src/theme/brandTheme.ts MuiAlert override).
<Alert variant="filled" severity="info">Filled variant</Alert>`;

const titleSnippet = `import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

<Alert severity="warning">
  <AlertTitle>Action required</AlertTitle>
  Your session is about to expire.
</Alert>`;

const actionSnippet = `import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

<Alert
  severity="info"
  action={
    <Button color="inherit" size="small">
      UNDO
    </Button>
  }
>
  Archived the conversation.
</Alert>`;

const dismissibleSnippet = `import Alert from '@mui/material/Alert';
import { useState } from 'react';

const [open, setOpen] = useState(true);

{open && (
  <Alert severity="info" onClose={() => setOpen(false)}>
    This alert can be dismissed.
  </Alert>
)}`;

const iconSnippet = `// Override the default severity icon, or remove it entirely.
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

<Alert severity="success" icon={<CheckCircleOutlineIcon fontSize="inherit" />}>
  Custom icon.
</Alert>
<Alert severity="success" icon={false}>
  No icon at all.
</Alert>`;

// ─── Key Props ────────────────────────────────────────────────────────────

const alertPropRows: PropRow[] = [
  {
    prop: 'severity',
    type: "'error' | 'warning' | 'info' | 'success'",
    default: "'success'",
    description: 'The semantic severity of the alert; drives the default icon and the color tokens.',
  },
  {
    prop: 'variant',
    type: "'standard' | 'outlined' | 'filled'",
    default: "'standard'",
    description: 'The visual style of the alert container.',
  },
  {
    prop: 'icon',
    type: 'ReactNode | false',
    default: 'auto (per severity)',
    description: 'Overrides the default severity icon; pass false to hide it entirely.',
  },
  {
    prop: 'action',
    type: 'ReactNode',
    default: '—',
    description: 'An optional trailing action element (e.g. a text Button) rendered after the content.',
  },
  {
    prop: 'onClose',
    type: '() => void',
    default: '—',
    description: 'Fired when the close button is clicked; renders the close button automatically when provided.',
  },
  {
    prop: 'elevation',
    type: 'number',
    default: '0',
    description:
      'Technically inherited from the underlying Paper, but Alert hardcodes 0 internally and EDGE-DS keeps it flat by design — there is no real elevated Alert variant today, matching the Figma spec\'s "no drop shadow at any elevation" note.',
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AlertPage() {
  const [dismissed, setDismissed] = useState({ info: false, action: false });
  const resetDismissed = () => setDismissed({ info: false, action: false });

  return (
    <Box>
      <PageHeader
        title="Alert"
        description="Alerts display brief, important messages in a way that attracts attention without interrupting the user's task. They come in four semantic severities and three visual variants."
        muiLink="https://mui.com/material-ui/react-alert/"
        categoryBadge="Components"
        statusBadge="In Design / In Progress"
      />

      {/* Visual Preview — two matrix cards (Severity & Variant, Content &
          Actions). Every alert below is live and interactive; the
          Dismissible swatches actually remove themselves via onClose (with
          a small reset link once both are gone), rather than being static
          illustrations. The exhaustive 4 severity x 3 variant matrix (12
          real variants) lives in the Figma "Alert - Component Gallery"
          frame per docs/figma-component-structure.md §0 — the two rows
          below are a representative, fully-interactive preview of the same
          real Components/Alert/* tokens, not a duplicate of that grid. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <MatrixCard title="Severity & Variant">
            <Stack spacing={3}>
              {(['standard', 'outlined', 'filled'] as const).map((variant) => (
                <Box key={variant}>
                  <GroupLabel>{variant}</GroupLabel>
                  <Stack spacing={1.25}>
                    {severityRow.map(({ label, severity }) => (
                      <Alert key={severity} variant={variant} severity={severity}>
                        {label}: this is {variant === 'outlined' ? 'an' : 'a'} {variant} alert.
                      </Alert>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </MatrixCard>

          <MatrixCard title="Content & Actions">
            <Stack spacing={2}>
              <Box>
                <GroupLabel>Title only, no close</GroupLabel>
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Your profile has been updated.
                </Alert>
              </Box>
              <Box>
                <GroupLabel>With trailing action</GroupLabel>
                {dismissed.action ? (
                  <Typography sx={{ fontSize: 13, color: '#9e9e9e' }}>
                    Dismissed.{' '}
                    <Box
                      component="button"
                      onClick={resetDismissed}
                      sx={{
                        border: 'none',
                        background: 'none',
                        color: '#009f9b',
                        fontWeight: 600,
                        cursor: 'pointer',
                        p: 0,
                        font: 'inherit',
                      }}
                    >
                      Reset
                    </Box>
                  </Typography>
                ) : (
                  <Alert
                    severity="warning"
                    action={
                      <Button color="inherit" size="small" onClick={() => setDismissed((s) => ({ ...s, action: true }))}>
                        UNDO
                      </Button>
                    }
                  >
                    Archived the conversation.
                  </Alert>
                )}
              </Box>
              <Box>
                <GroupLabel>Dismissible — click the close icon</GroupLabel>
                {dismissed.info ? (
                  <Typography sx={{ fontSize: 13, color: '#9e9e9e' }}>
                    Dismissed.{' '}
                    <Box
                      component="button"
                      onClick={resetDismissed}
                      sx={{
                        border: 'none',
                        background: 'none',
                        color: '#009f9b',
                        fontWeight: 600,
                        cursor: 'pointer',
                        p: 0,
                        font: 'inherit',
                      }}
                    >
                      Reset
                    </Box>
                  </Typography>
                ) : (
                  <Alert severity="info" onClose={() => setDismissed((s) => ({ ...s, info: true }))}>
                    This alert can be dismissed.
                  </Alert>
                )}
              </Box>
              <Box>
                <GroupLabel>Custom / no icon</GroupLabel>
                <Stack spacing={1.25}>
                  <Alert severity="error" icon={<CloseIcon fontSize="inherit" />}>
                    Custom icon override.
                  </Alert>
                  <Alert severity="error" icon={false}>
                    No icon at all.
                  </Alert>
                </Stack>
              </Box>
            </Stack>
          </MatrixCard>
        </Stack>
      </DocSection>

      {/* Anatomy & Token Architecture — mirrors the Figma Documentation
          frame's Anatomy Paragraph Group + Token Architecture Bullet List
          content 1:1 (docs/figma-component-structure.md §2.3). */}
      <DocSection title="Anatomy & Token Architecture">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Anatomy"
              body={
                <>
                  <Paragraph>
                    <strong>Icon</strong> — a status glyph (severity-specific) leading the content,
                    sized 20×20, vertically centered against the first line of text.
                  </Paragraph>
                  <Paragraph>
                    <strong>Title and Description</strong> — stacked text block via{' '}
                    <code>AlertTitle</code>; Title is bold/medium weight, Description is regular
                    weight and optional.
                  </Paragraph>
                  <Paragraph>
                    <strong>Action</strong> — an optional trailing text button (e.g. &quot;UNDO&quot;)
                    for a single inline action.
                  </Paragraph>
                  <Paragraph>
                    <strong>Close Button</strong> — an optional trailing icon button that dismisses
                    the Alert, always the last element when present.
                  </Paragraph>
                  <Paragraph sx={{ mb: 0 }}>
                    <strong>Container</strong> — rounded corners (4px), 6–16px internal padding, no
                    drop shadow at any elevation, matching the site&apos;s flat{' '}
                    <code>Paper elevation=0</code> convention.
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
                      Text and Icon on Standard/Outlined:{' '}
                      <code>Components/Alert/{'{Status}'}/Text</code> and{' '}
                      <code>/Icon</code>, both aliasing{' '}
                      <code>Semantic/Status/{'{Status}'}/Text</code> and <code>/Icon</code>.
                    </>,
                    <>
                      Border on Outlined: <code>Components/Alert/{'{Status}'}/Border</code>, aliasing{' '}
                      <code>Semantic/Status/{'{Status}'}/Border</code>.
                    </>,
                    <>
                      Background on Standard:{' '}
                      <code>Components/Alert/{'{Status}'}/Background</code>, aliasing{' '}
                      <code>Semantic/Status/{'{Status}'}/Background</code>.
                    </>,
                    <>
                      On Filled: <code>Components/Alert/{'{Status}'}/BG/Default</code> (the solid
                      fill, aliasing <code>Semantic/Status/{'{Status}'}/Icon</code> to match
                      Chip&apos;s <code>Filled/BG/Default</code>) and{' '}
                      <code>Components/Alert/{'{Status}'}/BG/OnFill/Text</code> (white
                      text/icon/action on the solid fill, aliasing <code>Brand/White</code>, matching
                      Button&apos;s <code>OnFill/Text</code> pattern).
                    </>,
                    'All four Status families (Error, Warning, Info, Success) follow this identical structure — see src/theme/brandTheme.ts MuiAlert for the resolved hex values.',
                  ]}
                  sx={{ mb: 0 }}
                />
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Usage Guidelines & Accessibility — split into two SpecRows, each
          bulleted, mirroring the Figma Documentation frame 1:1. */}
      <DocSection title="Usage Guidelines & Accessibility">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Usage Guidelines"
              body={
                <BulletList
                  items={[
                    'Use Error for failed actions or blocking problems, Warning for risks that need attention but aren\'t blocking, Info for neutral contextual notices, and Success for confirmed completed actions.',
                    'Prefer Standard for inline page content, Outlined when the surrounding surface is already colored, and Filled for high-emphasis or system-level banners.',
                    'Keep Title short and put detail in Description; avoid stacking more than one Action.',
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
                      The Alert container should carry <code>role=&quot;alert&quot;</code> (or{' '}
                      <code>role=&quot;status&quot;</code> for non-urgent Success/Info messages) so
                      assistive tech announces it via an ARIA live region without requiring focus.
                    </>,
                    <>
                      The Close button needs an explicit <code>aria-label</code> (e.g.
                      &quot;Dismiss&quot;) since it carries only an icon, and must remain reachable
                      via <code>Tab</code> with a visible focus indicator.
                    </>,
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
        <PropsTable rows={alertPropRows} />
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <Stack spacing={3}>
          <Box>
            <SnippetLabel>Basic usage</SnippetLabel>
            <CodeBlock code={basicSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Variants</SnippetLabel>
            <CodeBlock code={variantSnippet} />
          </Box>
          <Box>
            <SnippetLabel>With title</SnippetLabel>
            <CodeBlock code={titleSnippet} />
          </Box>
          <Box>
            <SnippetLabel>With action</SnippetLabel>
            <CodeBlock code={actionSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Dismissible</SnippetLabel>
            <CodeBlock code={dismissibleSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Custom icon</SnippetLabel>
            <CodeBlock code={iconSnippet} />
          </Box>
        </Stack>
      </DocSection>
    </Box>
  );
}
