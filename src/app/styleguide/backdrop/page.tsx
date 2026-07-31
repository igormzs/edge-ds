'use client';

import React, { useState } from 'react';
import { Backdrop, CircularProgress, Button, Box, Typography, Stack, Paper } from '@mui/material';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';
import { colors } from '@/theme/brandTheme';

// ─── Text formatting helpers ──────────────────────────────────────────────
// Anatomy & Token Architecture and Usage Guidelines & Accessibility render
// as short paragraphs and bulleted lists, matching the pattern ratified
// across Alert, Switcher, and Autocomplete (docs/web-component-page-pattern.md ss4).

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

const demoBoxSx = {
  position: 'relative' as const,
  height: 200,
  width: '100%',
  borderRadius: 1,
  border: '1px dashed rgba(0,0,0,0.15)',
  overflow: 'hidden',
  bgcolor: '#fafcfd',
};

const containedBackdropSx = {
  position: 'absolute' as const,
  inset: 0,
  color: '#fff',
};

// ─── Usage code snippets ──────────────────────────────────────────────────

const basicSnippet = `import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const [open, setOpen] = useState(false);

return (
  <div>
    <Button onClick={() => setOpen(true)}>Show Backdrop</Button>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => setOpen(false)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>
);`;

const customSnippet = `// Blur / Frost and Inverted / Light Scrim have no dedicated prop, so they
// are applied via sx. Both values now live as named constants in
// brandTheme.ts (colors.overlay.scrimBlur / invertedScrim), matching the
// Components/Backdrop/Fill/Blur and /Inverted tokens on the Figma side.
import { colors } from '@/theme/brandTheme';

<Backdrop
  open={open}
  sx={{ backgroundColor: colors.overlay.scrimBlur, backdropFilter: 'blur(6px)' }}
/>

// Transparent / click-catcher, dedicated MUI prop, closes on outside click
// without ever painting a visible scrim
<Backdrop
  open={open}
  invisible
  onClick={() => setOpen(false)}
/>

// Inverted / light scrim, for dark-surface contexts
<Backdrop
  open={open}
  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
/>`;

const modalSnippet = `// Backdrop rarely ships alone in production, Modal/Dialog/Drawer already
// compose it for you, and only THEY provide focus trapping, aria-hidden on
// the rest of the app, Escape-to-close, and scroll lock. Reach for a bare
// <Backdrop> only for non-modal use cases like a full-page loading state.
import Modal from '@mui/material/Modal';

<Modal
  open={open}
  onClose={() => setOpen(false)}
  slotProps={{
    backdrop: {
      // Omit entirely to use the theme default (MuiBackdrop.styleOverrides.root,
      // now sourced from colors.overlay.scrim), or override per usage here.
      sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    },
  }}
>
  <Box sx={{ /* positioned dialog content */ }}>
    ...
  </Box>
</Modal>`;

// ─── Key Props ────────────────────────────────────────────────────────────

const propRows: PropRow[] = [
  {
    prop: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Required. If true, the backdrop is mounted and fades in. Figma counterpart: the Visibility variant (Visible/Hidden) on the Backdrop component set.',
  },
  {
    prop: 'invisible',
    type: 'boolean',
    default: 'false',
    description: 'If true, the backdrop renders fully transparent while still capturing pointer events, the Transparent / click-catcher variant. Figma counterpart: the Style=Transparent variant.',
  },
  {
    prop: 'onClick',
    type: 'func',
    default: 'undefined',
    description: 'Callback fired on click. Presence of this handler is what makes a backdrop Dismissible; omit it to keep the backdrop Persistent.',
  },
  {
    prop: 'transitionDuration',
    type: 'number | { enter?: number, exit?: number }',
    default: '{ enter: 225, exit: 195 }',
    description: 'Fade transition duration, in milliseconds. Set at the theme level (MuiBackdrop.defaultProps) rather than per instance. No Figma equivalent, the canvas is static.',
  },
  {
    prop: 'children',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Content rendered centered inside the overlay, typically a CircularProgress, or nothing when used purely as a Modal/Drawer scrim.',
  },
  {
    prop: 'component',
    type: 'ElementType',
    default: '"div"',
    description: 'Root node override for the component.',
  },
  {
    prop: 'sx',
    type: 'SxProps<Theme>',
    default: 'undefined',
    description: 'System prop for overrides. Used to reach Blur/Frost and Inverted/Light Scrim, since neither has a first-class prop. Both now correspond to real Figma tokens (Components/Backdrop/Fill/Blur and /Inverted) and named code constants (colors.overlay.scrimBlur / invertedScrim in brandTheme.ts).',
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function BackdropPage() {
  const [openStates, setOpenStates] = useState({
    default: true,
    dismissible: false,
    persistent: false,
    blur: true,
    transparent: false,
    inverted: true,
  });

  const toggle = (key: keyof typeof openStates) =>
    setOpenStates((s) => ({ ...s, [key]: !s[key] }));

  return (
    <Box>
      <PageHeader
        title="Backdrop"
        description="Backdrop provides emphasis on a particular element or region by dimming everything behind it. It signals a state change in the application and is the layer that Modal, Dialog, and Drawer compose internally. It is also used standalone for full-screen loaders."
        muiLink="https://mui.com/material-ui/react-backdrop/"
        categoryBadge="Components"
        statusBadge="Migrated ✓"
      />

      {/* Visual Preview, matrix cards mirroring the Figma Component Gallery's
          Style rows (Default, Blur, Transparent, Inverted), with Dismissible
          vs Persistent folded in here rather than given its own top-level
          section, per docs/web-component-page-pattern.md ss3.2. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <MatrixCard title="Default Scrim">
            <Box sx={demoBoxSx}>
              <Backdrop open={openStates.default} sx={containedBackdropSx}>
                <CircularProgress color="inherit" />
              </Backdrop>
              <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                <Button size="small" variant="contained" onClick={() => toggle('default')}>
                  Toggle
                </Button>
              </Box>
            </Box>
          </MatrixCard>

          <MatrixCard title="Dismissible vs. Persistent">
            <Stack direction="row" spacing={4} flexWrap="wrap">
              <Box sx={{ width: 320 }}>
                <GroupLabel>Dismissible, has an onClick handler</GroupLabel>
                <Box sx={demoBoxSx}>
                  <Backdrop open={openStates.dismissible} onClick={() => toggle('dismissible')} sx={containedBackdropSx}>
                    <Typography sx={{ color: '#fff', fontFamily: '"Open Sans", sans-serif', fontSize: 13 }}>
                      Click to dismiss
                    </Typography>
                  </Backdrop>
                  <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                    <Button size="small" variant="contained" onClick={() => toggle('dismissible')}>
                      Show
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: 320 }}>
                <GroupLabel>Persistent, no onClick, needs an explicit action</GroupLabel>
                <Box sx={demoBoxSx}>
                  <Backdrop open={openStates.persistent} sx={containedBackdropSx}>
                    <Stack spacing={1.5} alignItems="center">
                      <CircularProgress color="inherit" size={28} />
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ color: '#fff', borderColor: '#fff' }}
                        onClick={() => toggle('persistent')}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Backdrop>
                  <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                    <Button size="small" variant="contained" onClick={() => toggle('persistent')}>
                      Show
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </MatrixCard>

          <MatrixCard title="Blur / Frost">
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 13, color: '#5e6e7d', mb: 2 }}>
              No dedicated prop, applied via <code>sx</code>. Content behind the frosted layer stays
              legible but softened.
            </Typography>
            <Box sx={demoBoxSx}>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  p: 2,
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: 13,
                  color: '#5e6e7d',
                }}
              >
                Content behind the frosted layer.
              </Box>
              <Backdrop
                open={openStates.blur}
                sx={{
                  ...containedBackdropSx,
                  backgroundColor: colors.overlay.scrimBlur,
                  backdropFilter: 'blur(6px)',
                }}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Box sx={{ position: 'absolute', bottom: 8, left: 8, zIndex: 1 }}>
                <Button size="small" variant="contained" onClick={() => toggle('blur')}>
                  Toggle
                </Button>
              </Box>
            </Box>
          </MatrixCard>

          <MatrixCard title="Transparent / Click-catcher">
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 13, color: '#5e6e7d', mb: 2 }}>
              The <code>invisible</code> prop, a fully transparent backdrop that still captures pointer
              events. Useful for click-outside-to-dismiss patterns that should not visually dim the page.
            </Typography>
            <Box sx={demoBoxSx}>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  p: 2,
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: 13,
                  color: '#5e6e7d',
                }}
              >
                No visible scrim, click anywhere in this box to close.
              </Box>
              <Backdrop
                open={openStates.transparent}
                invisible
                onClick={() => toggle('transparent')}
                sx={{ position: 'absolute', inset: 0 }}
              />
              <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                <Button size="small" variant="contained" onClick={() => toggle('transparent')}>
                  Toggle ({openStates.transparent ? 'armed' : 'off'})
                </Button>
              </Box>
            </Box>
          </MatrixCard>

          <MatrixCard title="Inverted / Light Scrim">
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 13, color: '#5e6e7d', mb: 2 }}>
              For dark-surface contexts, shown here against a dark preview box so the translucent
              white is actually visible, matching the dark-backing swatch used on the Figma canvas.
            </Typography>
            <Box sx={{ ...demoBoxSx, bgcolor: '#20262b' }}>
              <Backdrop
                open={openStates.inverted}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  color: '#212121',
                  backgroundColor: colors.overlay.invertedScrim,
                }}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
              <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                <Button size="small" variant="contained" onClick={() => toggle('inverted')}>
                  Toggle
                </Button>
              </Box>
            </Box>
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
                    <strong>App content</strong>, stays mounted in the DOM behind the scrim, dimmed
                    but (unless wrapped in a Modal) not made inert.
                  </Paragraph>
                  <Paragraph>
                    <strong>Scrim / blur container</strong>, a fixed, full-viewport layer positioned
                    above content via <code>z-index</code>. This is the actual{' '}
                    <code>&lt;Backdrop&gt;</code> element.
                  </Paragraph>
                  <Paragraph sx={{ mb: 0 }}>
                    <strong>Centered content slot</strong>, whatever is passed as <code>children</code>:
                    a spinner for a loader, or a Dialog&apos;s <code>&lt;Paper&gt;</code> when composed
                    inside Modal.
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
                      <strong>Default (Dark Scrim)</strong>: <code>MuiBackdrop.styleOverrides.root</code>{' '}
                      now reads <code>colors.overlay.scrim</code> in <code>brandTheme.ts</code>, matching
                      Figma&apos;s <code>Components/Backdrop/Fill/Default</code> (aliasing the new{' '}
                      <code>Semantic/Overlay/Scrim</code>). Previously this was MUI&apos;s stock
                      hardcoded default, coincidentally identical but not actually wired to any named
                      value.
                    </>,
                    <>
                      <strong>Blur / Frost</strong>: <code>colors.overlay.scrimBlur</code>, matching
                      Figma&apos;s <code>Components/Backdrop/Fill/Blur</code>. Both are literal values,
                      not aliases, since no Brand-tier black or neutral primitive exists yet to alias to
                      (the same class of gap flagged on Autocomplete&apos;s icon color).
                    </>,
                    <>
                      <strong>Inverted / Light Scrim</strong>: <code>colors.overlay.invertedScrim</code>,
                      matching Figma&apos;s <code>Components/Backdrop/Fill/Inverted</code>. Its RGB
                      matches <code>Brand/White</code> exactly, but the alpha differs, so it is a
                      distinct literal rather than a true alias.
                    </>,
                    <>
                      <strong>Transparent / Click-catcher</strong>: no fill on either side, the{' '}
                      <code>invisible</code> prop and Figma&apos;s <code>Style=Transparent</code> variant
                      both intentionally paint nothing.
                    </>,
                    <>
                      Still open: no token exists for the Blur effect&apos;s radius, or for the fade
                      transition timing / z-index stacking, on either side. These remain literal values
                      by explicit decision, not an oversight, since no reliable shared value exists yet
                      to standardize on.
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
                    'Use a standalone Backdrop only for non-modal cases like a full-page loader. When dimming behind a real Modal, Dialog, or Drawer, let that component compose Backdrop internally rather than instantiating your own.',
                    'Pass onClick to make a Backdrop Dismissible (click-to-close); omit it to keep it Persistent, requiring an explicit action to close.',
                    'Reach for the Transparent / invisible variant when you need a click-catcher (for example dismissing a menu) without visually dimming the page.',
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
                      A bare Backdrop does not trap focus inside its children or restore focus to the
                      trigger on close. <code>Modal</code> does both automatically; standalone usage is
                      responsible for its own focus handling.
                    </>,
                    <>
                      Backdrop carries no ARIA role itself (presentational). <code>Modal</code> applies{' '}
                      <code>aria-hidden</code> to sibling content and{' '}
                      <code>aria-modal=&quot;true&quot;</code> to the dialog element; a standalone
                      loading Backdrop should get its own <code>aria-live=&quot;polite&quot;</code>{' '}
                      region for the loading message.
                    </>,
                    <>
                      <strong>Keyboard</strong>: Escape-to-close is handled by <code>Modal</code>&apos;s{' '}
                      <code>onClose</code>, not by Backdrop itself. A standalone Dismissible Backdrop
                      only responds to pointer or touch via <code>onClick</code>.
                    </>,
                    <>
                      Backdrop does not lock body scroll on its own. <code>Modal</code> applies scroll
                      lock automatically (<code>disableScrollLock</code> to opt out); for a standalone
                      full-screen Backdrop, lock scroll manually for the duration it is open.
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
            <SnippetLabel>Customized backdrop, blur and inverted</SnippetLabel>
            <CodeBlock code={customSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Integration with Modal / Drawer</SnippetLabel>
            <CodeBlock code={modalSnippet} />
          </Box>
        </Stack>
      </DocSection>
    </Box>
  );
}
