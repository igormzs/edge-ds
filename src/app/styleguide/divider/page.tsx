'use client';

import React from 'react';
import { Divider, Box, Typography, Paper, Stack } from '@mui/material';
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
// applied to Checkbox's, Chip's, Dialog's, and Badge's pages
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

// ─── Usage code snippets ──────────────────────────────────────────────────

const basicSnippet = `import Divider from '@mui/material/Divider';

// Horizontal (default) - spans the full width of its container
<Divider />

// Vertical - needs flexItem to get the correct height inside a flex row,
// otherwise it collapses to zero height
<Box sx={{ display: 'flex' }}>
  <Typography>Left</Typography>
  <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
  <Typography>Right</Typography>
</Box>`;

const childrenSnippet = `// children renders centered text inline on the line itself. Real, working
// MUI usage with no matching Figma variant today - this snippet is the
// source of truth for this pattern until a Figma master exists.
<Divider>CENTERED TEXT</Divider>`;

// ─── Key Props ────────────────────────────────────────────────────────────

const propRows: PropRow[] = [
  {
    prop: 'orientation',
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: 'The component orientation. No matching Figma variant property; these are two separate masters.',
  },
  {
    prop: 'variant',
    type: '"fullWidth" | "inset" | "middle"',
    default: '"fullWidth"',
    description: 'The variant to use.',
  },
  {
    prop: 'flexItem',
    type: 'boolean',
    default: 'false',
    description: 'If true, a vertical divider has the correct height when used inside a flex container.',
  },
  {
    prop: 'children',
    type: 'React.ReactNode',
    default: 'undefined',
    description: 'Optional centered text rendered on the line itself. Real, working MUI usage with no matching Figma variant today.',
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function DividerPage() {
  return (
    <Box>
      <PageHeader
        title="Divider"
        description="A thin, 1px line that separates content into distinct groups without a full container boundary. Renders as a real semantic break (<hr>) when horizontal, or a separator role when used inline as a flex item."
        muiLink="https://mui.com/material-ui/react-divider/"
        categoryBadge="Components"
        statusBadge="Migrated ✓"
      />

      {/* Visual Preview: first card is untitled (in-context Horizontal/
          Vertical usage), matching the established "first card has no
          floating title" convention; the Toolbar and With Text cards below
          each get their own floating title, mirroring the Figma
          "Divider - Documentation" frame's now-3-card Visual Preview. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(0,0,0,0.08)', bgcolor: '#ffffff' }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <Box sx={{ width: 280 }}>
                <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, py: 1 }}>
                  Section above
                </Typography>
                <Divider />
                <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, py: 1 }}>
                  Section below
                </Typography>
                <GroupLabel>Horizontal</GroupLabel>
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', height: 71, gap: 3 }}>
                  <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14 }}>Left</Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14 }}>Right</Typography>
                </Box>
                <GroupLabel>Vertical (flexItem)</GroupLabel>
              </Box>
            </Box>
          </Paper>

          <Box>
            <GroupLabel>Toolbar / multiple dividers</GroupLabel>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(0,0,0,0.08)', bgcolor: '#ffffff' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14 }}>Item 1</Typography>
                <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14 }}>Item 2</Typography>
                <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
                <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14 }}>Item 3</Typography>
              </Box>
            </Paper>
          </Box>

          <Box>
            <GroupLabel>With text (children)</GroupLabel>
            <Paper
              elevation={0}
              sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(0,0,0,0.08)', bgcolor: '#ffffff' }}
            >
              <Divider>OR</Divider>
              <Box sx={{ py: 2 }} />
              <Divider textAlign="left">LEFT ALIGNED</Divider>
              <Box sx={{ py: 2 }} />
              <Divider textAlign="right">RIGHT ALIGNED</Divider>
            </Paper>
          </Box>
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
                    <strong>Line</strong>{' '}
                    is a single 1px stroke, no fill, no radius. Horizontal spans the
                    container&apos;s full width at a fixed 1px height; Vertical spans the full height at a
                    fixed 1px width.
                  </Paragraph>
                  <Paragraph>
                    <strong>Orientation</strong> is a real, separate Figma master per direction (
                    <code>&lt;Divider&gt; | Horizontal</code> and <code>&lt;Divider&gt; | Vertical</code>),
                    not a single component with an Orientation variant property the way code&apos;s{' '}
                    <code>orientation</code> prop works, a Figma-side gap, not a limitation of the code.
                  </Paragraph>
                  <Paragraph>
                    The line carries <strong>no padding or margin</strong>{' '}
                    of its own; spacing around it
                    comes entirely from the surrounding layout (list item padding, a flex row&apos;s gap).
                  </Paragraph>
                  <Paragraph>
                    MUI&apos;s real Divider also accepts <code>children</code>{' '}
                    (rendering centered text
                    inline on the line itself, or left/right-aligned via <code>textAlign</code>). No
                    dedicated Figma variant or property exists for this, so the &quot;With text&quot;
                    example above is hand-composed from two real Horizontal instances with a text label
                    between them, rather than a single instance-swap component.
                  </Paragraph>
                  <Paragraph sx={{ mb: 0 }}>
                    There is <strong>no Size prop or variant</strong> on either master, the line is always
                    exactly 1px thick in both Figma and code.
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
                      Line color: <code>Semantic/Border/Divider</code> (black at 12% opacity), rebound this
                      pass from a raw MUI <code>divider</code>{' '}
                      binding shared with Dialog&apos;s own content
                      divider, Divider is this token&apos;s true origin; Dialog reused it when its own
                      migration hit the same gap first.
                    </>,
                    'No fill or background token exists or is needed - Divider has no surface, only the one stroke.',
                    'Both real masters (Horizontal and Vertical) share the identical token; there is no per-orientation color difference.',
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
                    "Reach for Divider when the boundary itself needs to be seen (separating unrelated list sections, splitting a toolbar's action groups); prefer spacing alone when the grouping is already clear from layout.",
                    <>
                      Use <code>orientation=&quot;vertical&quot;</code> together with <code>flexItem</code>{' '}
                      whenever the divider sits inside a flex row (a toolbar, an inline breadcrumb-adjacent
                      group), without <code>flexItem</code> a vertical divider collapses to zero height in a
                      flex container.
                    </>,
                    'A Divider with children (centered or aligned text on the line) is real, working MUI usage; the Visual Preview above hand-composes it from two real Horizontal instances since no dedicated Figma variant exists, but the Usage code snippet below remains the source of truth for the exact prop API.',
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
                      A horizontal Divider renders a real semantic <code>&lt;hr&gt;</code> by default,
                      announced by screen readers as a thematic break with zero extra ARIA needed.
                    </>,
                    <>
                      A vertical Divider (or one with children) renders{' '}
                      <code>role=&quot;separator&quot;</code> instead, since neither case can use a real{' '}
                      <code>&lt;hr&gt;</code>; still fully presentational, and needs no label of its own.
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <SnippetLabel>Horizontal and vertical</SnippetLabel>
            <CodeBlock code={basicSnippet} />
          </Box>
          <Box>
            <SnippetLabel>With centered text (children)</SnippetLabel>
            <CodeBlock code={childrenSnippet} />
          </Box>
        </Box>
      </DocSection>
    </Box>
  );
}
