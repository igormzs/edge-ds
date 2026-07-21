'use client';

import React, { useState } from 'react';
import {
  Backdrop,
  CircularProgress,
  Button,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

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

const customSnippet = `// Blur / Frost - no dedicated design token yet, applied via sx
<Backdrop
  open={open}
  sx={{
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(6px)',
  }}
/>

// Transparent / click-catcher - dedicated MUI prop, closes on outside click
// without ever painting a visible scrim
<Backdrop
  open={open}
  invisible
  onClick={() => setOpen(false)}
/>

// Inverted / light scrim - for dark-surface contexts
<Backdrop
  open={open}
  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
/>`;

const modalSnippet = `// Backdrop rarely ships alone in production - Modal/Dialog/Drawer already
// compose it for you, and only THEY provide focus trapping, aria-hidden on
// the rest of the app, Escape-to-close, and scroll lock. Reach for a bare
// <Backdrop> only for non-modal use cases like a full-page loading state.
import Modal from '@mui/material/Modal';

<Modal
  open={open}
  onClose={() => setOpen(false)}
  slotProps={{
    backdrop: {
      sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    },
  }}
>
  <Box sx={{ /* positioned dialog content */ }}>
    ...
  </Box>
</Modal>`;

// ─── Props table ────────────────────────────────────────────────────────

const propRows: PropRow[] = [
  {
    prop: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Required. If true, the backdrop is mounted and fades in. Figma counterpart: none - the canvas has no Visible/Hidden variant today.',
  },
  {
    prop: 'invisible',
    type: 'boolean',
    default: 'false',
    description: 'If true, the backdrop renders fully transparent while still capturing pointer events - the Transparent / click-catcher variant. No Figma counterpart.',
  },
  {
    prop: 'onClick',
    type: 'func',
    default: 'N/A',
    description: 'Callback fired on click. Presence of this handler is what makes a backdrop Dismissible; omit it to keep the backdrop Persistent.',
  },
  {
    prop: 'transitionDuration',
    type: 'number | { enter?: number, exit?: number }',
    default: '{ enter: 225, exit: 195 }',
    description: 'Fade transition duration, in milliseconds. No Figma equivalent (static canvas).',
  },
  {
    prop: 'children',
    type: 'ReactNode',
    default: 'N/A',
    description: 'Content rendered centered inside the overlay - typically a CircularProgress, or nothing when used purely as a Modal/Drawer scrim.',
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
    default: 'N/A',
    description: 'System prop for overrides. Used today to reach Blur/Frost and Inverted/Light Scrim, since neither has a first-class prop or design token.',
  },
];

// ─── Token matrix (Figma <-> Web) ──────────────────────────────────────

const tokenRows: PropRow[] = [
  {
    prop: 'components/backdrop/fill',
    type: 'Figma variable (MUI palette, Light & Dark)',
    default: 'rgba(0,0,0,0.5)',
    description: 'Web renders the identical rgba(0,0,0,0.5) as MUI’s stock default, but brandTheme.ts has no MuiBackdrop override that actually reads this token - the match is coincidental, not wired. See docs/Backdrop_Figma_Web_Audit.md.',
  },
  {
    prop: 'backdrop-filter: blur()',
    type: 'No Figma token exists',
    default: 'sx-only, e.g. blur(6px)',
    description: 'Blur/Frost variant has no design-system-owned value on either side. Flagged as a future token candidate, not created in this pass.',
  },
  {
    prop: 'transitionDuration',
    type: 'N/A - static canvas',
    default: '{ enter: 225, exit: 195 }',
    description: 'Expected platform asymmetry, not a gap.',
  },
  {
    prop: 'z-index (modal stack)',
    type: 'N/A',
    default: 'theme.zIndex.modal / theme.zIndex.drawer + 1',
    description: 'Consumer sets this per usage via sx; no dedicated brandTheme.ts token for backdrop-specific stacking.',
  },
];

export default function BackdropPage() {
  const [openStates, setOpenStates] = useState({
    default: false,
    blur: false,
    transparent: false,
    inverted: false,
    dismissible: false,
    persistent: false,
  });

  const toggle = (key: keyof typeof openStates) =>
    setOpenStates((s) => ({ ...s, [key]: !s[key] }));

  const demoBoxSx = {
    position: 'relative' as const,
    height: 220,
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

  return (
    <Box>
      <PageHeader
        title="Backdrop"
        description="Backdrop provides emphasis on a particular element or region by dimming everything behind it. It signals a state change in the application and is the layer that Modal, Dialog, and Drawer compose internally - it's also used standalone for full-screen loaders."
        muiLink="https://mui.com/material-ui/react-backdrop/"
      />

      {/* Anatomy */}
      <DocSection title="Anatomy">
        <Typography variant="body2" sx={{ mb: 3, color: '#5e6e7d', maxWidth: 760 }}>
          A Backdrop is a single fixed-position layer that sits above the app content and below
          whatever it wraps. It has no internal structure of its own beyond a centered content
          slot - anatomy is best understood as a stack, not a composed component:
        </Typography>
        <PreviewCanvas>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {[
              { label: '1. App content (dimmed, still in the DOM behind the scrim)', bg: '#eef1f3' },
              { label: '2. Scrim / blur container - fixed, full-viewport, z-index stacked', bg: 'rgba(0,0,0,0.55)', color: '#fff' },
              { label: '3. Centered content slot - spinner, or a Modal/Dialog’s <Paper>', bg: '#009f9b', color: '#fff' },
            ].map((row) => (
              <Box
                key={row.label}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: row.bg,
                  color: row.color ?? '#212121',
                  fontFamily: '"Open Sans", sans-serif',
                  fontSize: 13,
                }}
              >
                {row.label}
              </Box>
            ))}
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Style Variants */}
      <DocSection title="Style Variants">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <PreviewGroup label="Default - Dark Scrim">
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
            </PreviewGroup>

            <PreviewGroup label="Blur / Frost (sx-only, no design token yet)">
              <Box sx={demoBoxSx}>
                <Box sx={{ position: 'absolute', inset: 0, p: 2, fontFamily: '"Open Sans", sans-serif', fontSize: 13, color: '#5e6e7d' }}>
                  Content behind the frosted layer stays legible but softened.
                </Box>
                <Backdrop
                  open={openStates.blur}
                  sx={{
                    ...containedBackdropSx,
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
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
            </PreviewGroup>

            <PreviewGroup label="Transparent / Click-catcher (invisible prop)">
              <Box sx={demoBoxSx}>
                <Box sx={{ position: 'absolute', inset: 0, p: 2, fontFamily: '"Open Sans", sans-serif', fontSize: 13, color: '#5e6e7d' }}>
                  No visible scrim - click anywhere in this box to close. Useful for
                  click-outside-to-dismiss patterns (menus, popovers) that shouldn’t dim the page.
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
            </PreviewGroup>

            <PreviewGroup label="Inverted / Light Scrim (sx-only, no design token yet)">
              <Box sx={{ ...demoBoxSx, bgcolor: '#20262b' }}>
                <Backdrop
                  open={openStates.inverted}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    color: '#212121',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Interactivity */}
      <DocSection title="Interactivity">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <PreviewGroup label="Dismissible - has an onClick handler">
              <Box sx={demoBoxSx}>
                <Backdrop open={openStates.dismissible} onClick={() => toggle('dismissible')} sx={containedBackdropSx}>
                  <Typography variant="body2" sx={{ color: '#fff' }}>Click to dismiss</Typography>
                </Backdrop>
                <Box sx={{ position: 'absolute', bottom: 8, left: 8 }}>
                  <Button size="small" variant="contained" onClick={() => toggle('dismissible')}>
                    Show
                  </Button>
                </Box>
              </Box>
            </PreviewGroup>

            <PreviewGroup label="Persistent - no onClick, requires an explicit close action">
              <Box sx={demoBoxSx}>
                <Backdrop open={openStates.persistent} sx={containedBackdropSx}>
                  <Stack spacing={1.5} alignItems="center">
                    <CircularProgress color="inherit" size={28} />
                    <Button size="small" variant="outlined" sx={{ color: '#fff', borderColor: '#fff' }} onClick={() => toggle('persistent')}>
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
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Key Props */}
      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
      </DocSection>

      {/* Figma & Code Tokens */}
      <DocSection title="Figma & Code Tokens">
        <Typography variant="body2" sx={{ mb: 2, color: '#5e6e7d' }}>
          Full gap analysis lives in <code>docs/Backdrop_Figma_Web_Audit.md</code>. Summary:
        </Typography>
        <PropsTable rows={tokenRows} />
      </DocSection>

      {/* Accessibility */}
      <DocSection title="Accessibility">
        <Stack spacing={2} sx={{ maxWidth: 780 }}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#009f9b', mb: 0.5 }}>
              Focus management
            </Typography>
            <Typography variant="body2" sx={{ color: '#5e6e7d' }}>
              A bare <code>&lt;Backdrop&gt;</code> does not trap or restore focus by itself. Trapping
              focus inside the child and restoring it to the trigger element on close is provided by
              <code> Modal</code> / <code>Dialog</code> / <code>Drawer</code>, all of which compose
              Backdrop internally. Reach for one of those instead of a bare Backdrop whenever the
              content behind it should become inert.
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#009f9b', mb: 0.5 }}>
              ARIA attributes
            </Typography>
            <Typography variant="body2" sx={{ color: '#5e6e7d' }}>
              Backdrop itself carries no ARIA role - it is presentational. <code>aria-hidden</code> on
              sibling app content and <code>aria-modal="true"</code> on the dialog element are applied
              by <code>Modal</code>, not by Backdrop. If you use Backdrop standalone (e.g. a full-page
              loader with no Modal), add <code>aria-hidden</code> to sibling content and an
              <code> aria-live="polite"</code> region for the loading message yourself.
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#009f9b', mb: 0.5 }}>
              Keyboard interaction
            </Typography>
            <Typography variant="body2" sx={{ color: '#5e6e7d' }}>
              Escape-to-close is a <code>Modal</code> behavior (<code>onClose</code> fires with
              reason <code>"escapeKeyDown"</code>), not a Backdrop one. A standalone Backdrop with an
              <code> onClick</code> handler is Dismissible only via pointer/touch; add your own
              keydown listener if Escape needs to close a non-Modal usage.
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#009f9b', mb: 0.5 }}>
              Scroll-lock mechanics
            </Typography>
            <Typography variant="body2" sx={{ color: '#5e6e7d' }}>
              Backdrop does not lock body scroll on its own. <code>Modal</code> applies scroll lock
              automatically (disable via <code>disableScrollLock</code>). If Backdrop is used outside
              a Modal for a persistent full-screen state, lock scroll manually, e.g. by toggling
              <code> overflow: hidden</code> on <code>document.body</code> for the duration.
            </Typography>
          </Box>
        </Stack>
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <Stack spacing={3}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#5e6e7d', mb: 1 }}>
              Basic usage
            </Typography>
            <CodeBlock code={basicSnippet} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#5e6e7d', mb: 1 }}>
              Customized backdrop - blur, transparent, inverted
            </Typography>
            <CodeBlock code={customSnippet} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#5e6e7d', mb: 1 }}>
              Integration with Modal / Drawer
            </Typography>
            <CodeBlock code={modalSnippet} />
          </Box>
        </Stack>
      </DocSection>
    </Box>
  );
}
