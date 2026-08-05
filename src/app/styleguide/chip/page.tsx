'use client';

import React, { useState } from 'react';
import { Chip, Avatar, Box, Typography, Stack, Paper } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
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
// applied to Checkbox's, Alert's, and Badge's pages
// (docs/web-component-page-pattern.md §4).

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

// ─── Color axis: Chip's own established convention keeps Secondary as a
// real second brand color rather than renaming to "Neutral", the precedent
// Badge's own migration explicitly cited
// (docs/figma-component-structure.md §5.3 notwithstanding).
const COLORS = ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;

// ─── Usage code snippets ──────────────────────────────────────────────────

const basicSnippet = `import Chip from '@mui/material/Chip';

// Filled (default)
<Chip label="Filled" />

// Outlined
<Chip label="Outlined" variant="outlined" />`;

const colorsSnippet = `// "secondary" stays a real second brand color for Chip (Brand/Secondary/600)
// - unlike Checkbox/Switch/Alert, where "secondary" reads as "Neutral".
<Chip label="Default" color="default" />
<Chip label="Primary" color="primary" />
<Chip label="Secondary" color="secondary" />
<Chip label="Error" color="error" />
<Chip label="Warning" color="warning" />
<Chip label="Info" color="info" />
<Chip label="Success" color="success" />`;

const statesSnippet = `// Interactive states are driven by the browser (:hover, :focus-visible),
// not separate props - Enabled/Hovered/Focused/Disabled all resolve to the
// same Components/Chip/{Color}/{Variant}/* token set.
<Chip label="Enabled" color="primary" />
<Chip label="Disabled" color="primary" disabled />

// Clickable adds a hand cursor and a focus/hover ring; onDelete adds a
// trailing delete icon that fires independently of onClick.
<Chip label="Clickable" color="primary" onClick={() => console.log('clicked')} />
<Chip label="Deletable" color="primary" onDelete={() => console.log('deleted')} />`;

const avatarDeleteSnippet = `import Avatar from '@mui/material/Avatar';

// avatar renders at the start of the chip; onDelete adds a trailing
// delete icon bound to Components/Chip/{Color}/{Variant}/Text (reusing
// the label's own color rather than a separate token).
<Chip
  avatar={<Avatar>OP</Avatar>}
  label="Avatar"
  onDelete={() => console.log('deleted')}
/>

// icon is a lighter-weight alternative to avatar for a leading glyph.
<Chip icon={<DoneIcon />} label="Done" color="success" />`;

const sizesSnippet = `// Small and Medium (default) are the only two real sizes, in both code
// and Figma - no Large variant exists on either side.
<Chip label="Small" color="primary" size="small" />
<Chip label="Medium" color="primary" size="medium" />`;

// ─── Key Props ────────────────────────────────────────────────────────────

const propRows: PropRow[] = [
  {
    prop: 'label',
    type: 'ReactNode',
    default: 'None',
    description: 'The text content displayed inside the chip.',
  },
  {
    prop: 'variant',
    type: '"filled" | "outlined"',
    default: '"filled"',
    description: 'Sets the visual style of the chip.',
  },
  {
    prop: 'color',
    type: '"default" | "primary" | "secondary" | "error" | "warning" | "info" | "success"',
    default: '"default"',
    description: 'The token-driven color applied to the chip. "secondary" is a real second brand color for Chip, not renamed to "Neutral".',
  },
  {
    prop: 'size',
    type: '"small" | "medium"',
    default: '"medium"',
    description: 'Controls the height and padding of the chip. There is no "large" size in code or Figma.',
  },
  {
    prop: 'avatar',
    type: 'ReactElement',
    default: 'None',
    description: 'Avatar element rendered at the start of the chip, before the label.',
  },
  {
    prop: 'icon',
    type: 'ReactElement',
    default: 'None',
    description: 'Icon element rendered before the label, an alternative to avatar.',
  },
  {
    prop: 'onDelete',
    type: '() => void',
    default: 'None',
    description: 'When provided, renders a trailing delete icon and fires on click.',
  },
  {
    prop: 'onClick',
    type: '() => void',
    default: 'None',
    description: 'When provided, the whole chip becomes clickable with a hand cursor and focus/hover ring.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the component and suppresses all interaction states, fading via opacity.',
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ChipPage() {
  const [terms, setTerms] = useState(false);

  return (
    <Box>
      <PageHeader
        title="Chip"
        description="Chips are compact elements that represent an input, attribute, or action. They can display text, icons, and avatars, and can be made clickable or deletable."
        muiLink="https://mui.com/material-ui/react-chip/"
        categoryBadge="Components"
        statusBadge="Migrated ✓"
      />

      {/* Visual Preview: three matrix cards, Colors, Interactive States, and
          With Avatar & Delete. The exhaustive color x state x variant grid
          lives in the Figma "Chip - Component Gallery" frame; these cards
          are a representative, fully-interactive preview of the same real
          Components/Chip/* tokens, not a duplicate of that grid. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <MatrixCard title="Colors">
            <Stack spacing={2.5}>
              <Box>
                <GroupLabel>Filled</GroupLabel>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {COLORS.map((c) => (
                    <Swatch key={c} label={c}>
                      <Chip label={c.charAt(0).toUpperCase() + c.slice(1)} color={c} />
                    </Swatch>
                  ))}
                </Box>
              </Box>
              <Box>
                <GroupLabel>Outlined</GroupLabel>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {COLORS.map((c) => (
                    <Swatch key={c} label={c}>
                      <Chip label={c.charAt(0).toUpperCase() + c.slice(1)} color={c} variant="outlined" />
                    </Swatch>
                  ))}
                </Box>
              </Box>
            </Stack>
          </MatrixCard>

          <MatrixCard title="Interactive States">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <Swatch label="Enabled">
                <Chip label="Enabled" color="primary" />
              </Swatch>
              <Swatch label="Hover / Focus, hover or Tab to see the ring">
                <Chip label="Hover / Focus" color="primary" />
              </Swatch>
              <Swatch label="Clickable">
                <Chip label="Clickable" color="primary" onClick={() => undefined} />
              </Swatch>
              <Swatch label="Disabled">
                <Chip label="Disabled" color="primary" disabled />
              </Swatch>
            </Box>
          </MatrixCard>

          <MatrixCard title="With Avatar & Delete">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <Swatch label="With Avatar">
                <Chip
                  avatar={<Avatar>OP</Avatar>}
                  label="Avatar"
                  color="primary"
                  variant="outlined"
                />
              </Swatch>
              <Swatch label="With Icon">
                <Chip icon={<DoneIcon />} label="Done" color="success" />
              </Swatch>
              <Swatch label="Avatar + delete">
                <Chip avatar={<Avatar>OP</Avatar>} label="Avatar + delete" color="primary" onDelete={() => undefined} />
              </Swatch>
              <Swatch label="Deletable, click to toggle">
                {terms ? (
                  <Chip label="Terms accepted" color="primary" onDelete={() => setTerms(false)} />
                ) : (
                  <Chip label="Accept terms" color="default" onClick={() => setTerms(true)} variant="outlined" />
                )}
              </Swatch>
            </Box>
          </MatrixCard>
        </Stack>
      </DocSection>

      {/* Sizing */}
      <DocSection title="Sizing">
        <MatrixCard title="Small / Medium">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'flex-end' }}>
            <Swatch label="Small">
              <Chip label="Small" color="primary" size="small" />
            </Swatch>
            <Swatch label="Medium (default)">
              <Chip label="Medium" color="primary" size="medium" />
            </Swatch>
          </Box>
        </MatrixCard>
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
                    <strong>Container</strong> is a rounded pill (Filled) or 1px-bordered outline
                    (Outlined), sized by <code>size</code> (32px Medium, 24px Small).
                  </Paragraph>
                  <Paragraph>
                    <strong>Leading element</strong> is an optional <code>avatar</code> or{' '}
                    <code>icon</code>, mutually exclusive, sitting before the label. The real Figma
                    master exposes a single generic <code>Thumbnail</code> instance-swap slot rather
                    than two distinct properties, so <code>icon</code> has no dedicated Figma variant
                    of its own today, a Figma-side gap rather than a limitation of the code.
                  </Paragraph>
                  <Paragraph>
                    <strong>Label</strong> is the required text content, the only anatomy part every
                    chip variant shares.
                  </Paragraph>
                  <Paragraph sx={{ mb: 0 }}>
                    <strong>Delete icon</strong> is an optional trailing glyph, rendered only when{' '}
                    <code>onDelete</code> is provided, firing independently of the chip&apos;s own{' '}
                    <code>onClick</code>.
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
                      Every color: <code>Components/Chip/{'{Color}'}/{'{Filled,Outlined}'}/{'{BG/Default,BG/Hover,Text,Border}'}</code>,
                      aliasing <code>Brand/{'{Color}'}/600</code> for Primary/Secondary and{' '}
                      <code>Semantic/Status/{'{Status}'}/{'{Border,Icon}'}</code> for Error, Warning,
                      Info, Success. Secondary stays a real second brand color here, the precedent
                      Badge&apos;s own migration later reused.
                    </>,
                    <>
                      Avatar: <code>Components/Chip/{'{Color}'}/Avatar</code>, one per color, plus a
                      new <code>Semantic/Icon/Subtle</code> (aliasing <code>grey/400</code>) for the
                      colorless Default case, closing out a residual originally flagged as deferred
                      during Autocomplete&apos;s own migration.
                    </>,
                    <>
                      Delete icon: reuses each variant&apos;s own already-migrated <code>Text</code>{' '}
                      token directly rather than a dedicated icon token, reproducing the original
                      white-on-Filled / colored-on-Outlined behavior exactly.
                    </>,
                    <>
                      Disabled: <code>Components/Chip/Disabled/{'{BG,Text}'}</code> tokens exist in the
                      palette but the live variant currently fades the Enabled state via a uniform 38%
                      opacity instead of referencing them, flagged rather than silently rebound
                      either direction.
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
                    'Use Filled for the strongest visual weight (selected filters, active tags) and Outlined for a lighter-weight, secondary presence alongside other content.',
                    'Use avatar when representing a person or entity, icon for a lighter-weight leading glyph, and never both at once.',
                    'Provide onDelete only when removal is a real, reversible action; use onClick alone for a chip that simply selects or navigates.',
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
                      A clickable chip (<code>onClick</code>) renders as a real, focusable,
                      keyboard-activatable button under the hood, with no extra ARIA wiring needed.
                    </>,
                    <>
                      The delete icon is its own separately focusable control with an accessible name;
                      always confirm it reads as &quot;delete&quot; or similar via a screen reader, not
                      just the parent chip&apos;s label.
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
            <SnippetLabel>Colors</SnippetLabel>
            <CodeBlock code={colorsSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Interactive states</SnippetLabel>
            <CodeBlock code={statesSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Avatar and delete</SnippetLabel>
            <CodeBlock code={avatarDeleteSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Sizes</SnippetLabel>
            <CodeBlock code={sizesSnippet} />
          </Box>
        </Stack>
      </DocSection>
    </Box>
  );
}
