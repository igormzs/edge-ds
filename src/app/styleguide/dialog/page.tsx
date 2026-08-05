'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  Paper,
} from '@mui/material';
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
// applied to Checkbox's, Chip's, Alert's, and Badge's pages
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

// ─── Demo dialog content ───────────────────────────────────────────────────
// A Dialog renders through a portal, so unlike Chip/Badge's swatches, every
// variant here can't just sit inline and visible at once - only one real
// <Dialog> is ever mounted, and each trigger configures the same shared
// instance. This mirrors how the component is actually used (one controlled
// Dialog, not five simultaneous ones) rather than faking a static grid.

type DemoKey =
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen'
  | 'no-dividers' | 'with-dividers'
  | 'actions-1' | 'actions-2' | 'actions-3';

const MAX_WIDTH_DEMOS: { key: DemoKey; label: string; maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }[] = [
  { key: 'xs', label: 'Extra small', maxWidth: 'xs' },
  { key: 'sm', label: 'Small', maxWidth: 'sm' },
  { key: 'md', label: 'Medium (default)', maxWidth: 'md' },
  { key: 'lg', label: 'Large', maxWidth: 'lg' },
  { key: 'xl', label: 'Extra large', maxWidth: 'xl' },
];

const longBody =
  'Scroll region content: this paragraph is here to give DialogContent enough height to demonstrate its own scrolling independently of the fixed Title and Actions above and below it. Resize the window smaller to see the divider rules separate the scrolling body from the anchored header and footer.';

function DemoDialog({ activeDemo, onClose }: { activeDemo: DemoKey | null; onClose: () => void }) {
  if (!activeDemo) return null;

  const maxWidthDemo = MAX_WIDTH_DEMOS.find((d) => d.key === activeDemo);
  const isFullScreen = activeDemo === 'fullscreen';
  const isDividersDemo = activeDemo === 'no-dividers' || activeDemo === 'with-dividers';
  const actionsCount = activeDemo === 'actions-1' ? 1 : activeDemo === 'actions-2' ? 2 : activeDemo === 'actions-3' ? 3 : 2;

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth={maxWidthDemo ? maxWidthDemo.maxWidth : 'sm'}
      fullWidth={!!maxWidthDemo || isFullScreen}
      fullScreen={isFullScreen}
    >
      <DialogTitle>
        {isFullScreen && 'Full screen'}
        {maxWidthDemo && `Max width: ${maxWidthDemo.label}`}
        {activeDemo === 'no-dividers' && 'No dividers'}
        {activeDemo === 'with-dividers' && 'With dividers'}
        {activeDemo === 'actions-1' && '1 action'}
        {activeDemo === 'actions-2' && '2 actions'}
        {activeDemo === 'actions-3' && '3 actions'}
      </DialogTitle>
      <DialogContent dividers={activeDemo === 'with-dividers'}>
        <DialogContentText>
          {isDividersDemo ? longBody : 'Real, controlled Dialog content for this demo. Close it to try another variant.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {actionsCount >= 3 && <Button onClick={onClose}>Learn more</Button>}
        {actionsCount >= 2 && <Button onClick={onClose}>Cancel</Button>}
        <Button onClick={onClose} variant="contained" autoFocus>
          {actionsCount === 1 ? 'OK' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Usage code snippets ──────────────────────────────────────────────────

const basicSnippet = `import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const [open, setOpen] = useState(false);

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>Confirm account deletion?</DialogTitle>
  <DialogContent>
    <DialogContentText>
      This action cannot be undone and all your data will be
      permanently removed.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={() => setOpen(false)} variant="contained" color="error" autoFocus>
      Delete
    </Button>
  </DialogActions>
</Dialog>`;

const maxWidthSnippet = `// maxWidth caps how wide the dialog grows to fit its content; fullWidth
// stretches it to that cap instead of hugging the content. There is no
// "large" size beyond "xl" - xs/sm/md/lg/xl (or false, to remove the cap)
// are the only real options.
<Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
  ...
</Dialog>

// fullScreen ignores maxWidth entirely and fills the viewport - matches
// the "open as screen" real-world example in the Figma Gallery.
<Dialog open={open} onClose={handleClose} fullScreen>
  ...
</Dialog>`;

const dividersSnippet = `// dividers adds a top and bottom rule to DialogContent so a tall,
// independently-scrolling body stays visually separated from the fixed
// Title and Actions around it.
<DialogContent dividers>
  <DialogContentText>...</DialogContentText>
</DialogContent>`;

const actionsSnippet = `// DialogActions right-aligns its children automatically. Real Figma
// variants exist for 1, 2, and 3 actions - more than that usually means
// the decision itself needs to be simplified, not the row.
<DialogActions>
  <Button onClick={handleClose}>Cancel</Button>
  <Button onClick={handleClose} variant="contained" autoFocus>
    Confirm
  </Button>
</DialogActions>`;

// ─── Key Props ────────────────────────────────────────────────────────────

const propRows: PropRow[] = [
  {
    prop: 'open',
    type: 'boolean',
    default: 'required',
    description: 'If true, the Dialog is shown.',
  },
  {
    prop: 'onClose',
    type: '(event, reason) => void',
    default: 'undefined',
    description: 'Fired when the Dialog requests to close: backdrop click, Escape key, or an explicit close action.',
  },
  {
    prop: 'maxWidth',
    type: '"xs" | "sm" | "md" | "lg" | "xl" | false',
    default: '"sm"',
    description: 'The dialog grows with its content up to this width. false removes the cap entirely.',
  },
  {
    prop: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'If true, the dialog stretches to the full available width up to maxWidth.',
  },
  {
    prop: 'fullScreen',
    type: 'boolean',
    default: 'false',
    description: 'If true, the dialog fills the screen, matching the "open as screen" Gallery example.',
  },
  {
    prop: 'scroll',
    type: '"body" | "paper"',
    default: '"paper"',
    description: 'Determines which container scrolls when the content overflows.',
  },
  {
    prop: 'disableEscapeKeyDown',
    type: 'boolean',
    default: 'false',
    description: 'If true, pressing Escape does not fire onClose.',
  },
  {
    prop: 'keepMounted',
    type: 'boolean',
    default: 'false',
    description: 'If true, the Dialog stays mounted in the DOM even while closed.',
  },
  {
    prop: 'children',
    type: 'React.ReactNode',
    default: 'undefined',
    description: 'Typically a DialogTitle, DialogContent, and DialogActions, in that order.',
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function DialogPage() {
  const [activeDemo, setActiveDemo] = useState<DemoKey | null>(null);
  const close = () => setActiveDemo(null);

  return (
    <Box>
      <PageHeader
        title="Dialog"
        description="Dialogs interrupt the current screen to request a decision or additional information, composed from DialogTitle, DialogContent, and DialogActions. They render as a modal overlay backed by a scrim (mobile can present them as a full-screen takeover instead)."
        muiLink="https://mui.com/material-ui/react-dialog/"
        categoryBadge="Components"
        statusBadge="Migrated ✓"
      />

      {/* Visual Preview: three matrix cards, Sizes, Content & Dividers,
          and Actions, mirroring the same three real component pieces shown
          in the Figma "Dialog - Documentation" frame. A Dialog renders
          through a portal, so only one real instance is ever mounted here -
          each button below configures and opens that same shared Dialog,
          rather than faking five simultaneous open modals. The exhaustive
          per-piece variant grid (all 5 Max Width sizes, both Dividers
          states, all 3 Actions counts, plus real-world composed examples)
          lives in the Figma "Dialog - Component Gallery" frame. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <MatrixCard title="Sizes">
            <GroupLabel>Click to open</GroupLabel>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {MAX_WIDTH_DEMOS.map((d) => (
                <Button key={d.key} variant="outlined" size="small" onClick={() => setActiveDemo(d.key)}>
                  {d.label}
                </Button>
              ))}
              <Button variant="outlined" size="small" onClick={() => setActiveDemo('fullscreen')}>
                Full screen
              </Button>
            </Box>
          </MatrixCard>

          <MatrixCard title="Content & Dividers">
            <Box>
              <GroupLabel>Click to open</GroupLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                <Button variant="outlined" size="small" onClick={() => setActiveDemo('no-dividers')}>
                  No dividers
                </Button>
                <Button variant="outlined" size="small" onClick={() => setActiveDemo('with-dividers')}>
                  With dividers
                </Button>
              </Box>
            </Box>
          </MatrixCard>

          <MatrixCard title="Actions">
            <Box>
              <GroupLabel>Click to open</GroupLabel>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                <Button variant="outlined" size="small" onClick={() => setActiveDemo('actions-1')}>
                  1 action
                </Button>
                <Button variant="outlined" size="small" onClick={() => setActiveDemo('actions-2')}>
                  2 actions
                </Button>
                <Button variant="outlined" size="small" onClick={() => setActiveDemo('actions-3')}>
                  3 actions
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
                    <strong>Container</strong> is a <code>&lt;Paper&gt;</code> surface (elevation 24,
                    the deepest shadow in the system) that stacks DialogTitle, DialogContent, and
                    DialogActions vertically inside a fixed Max Width.
                  </Paragraph>
                  <Paragraph>
                    <strong>DialogTitle</strong> is a single text heading. The real Figma master has
                    no built-in close icon; an app that needs one composes its own IconButton
                    alongside the title.
                  </Paragraph>
                  <Paragraph>
                    <strong>DialogContent</strong> holds the main body. Its <code>dividers</code> prop
                    adds a top and bottom rule so a tall, independently-scrolling body stays visually
                    separated from the fixed Title and Actions above and below it.
                  </Paragraph>
                  <Paragraph>
                    <strong>DialogActions</strong> is a right-aligned row holding 1 to 3 action
                    controls, real variants for each count rather than a single flexible container.
                  </Paragraph>
                  <Paragraph sx={{ mb: 0 }}>
                    <strong>Backdrop / scrim</strong> (<code>Semantic/Overlay/Scrim</code>) dims the page
                    behind the modal; the two real-world Gallery mockups show the same Dialog presented
                    both as a centered modal and as a full-screen takeover.
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
                      Paper background: <code>Semantic/Surface/Paper</code>, rebound this pass from a
                      raw MUI <code>background/paper-elevation-24</code> binding. The shadow itself was
                      already correctly linked to the <code>elevation/24</code> effect style, so only
                      the fill needed a fix.
                    </>,
                    <>
                      Title text: <code>Semantic/Text/Primary</code>, also rebound this pass, on both
                      the shared master and its already-placed instances, which had drifted to their
                      own local override.
                    </>,
                    <>
                      Content divider: <code>Semantic/Border/Divider</code> (black at 12% opacity),
                      created during this migration pass. The standalone{' '}
                      <code>&lt;Divider&gt;</code> component now reuses this exact same token, migrated
                      in a later pass.
                    </>,
                    <>
                      Actions row: reuses Button&apos;s own already-migrated text-button tokens
                      directly, confirmed already fully EDGE-bound with no new tokens needed for this
                      pass.
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
                    'Use Dialog when a decision or piece of information must be acknowledged before the user can return to the page behind it; reach for a lighter pattern (a Backdrop-only overlay, an inline message) when nothing actually needs confirming.',
                    'Pick Max Width to fit the real content, not by default; the smallest width that avoids cramped wrapping is usually correct, and Extra Large should stay rare.',
                    "Turn on DialogContent's dividers once the body is tall enough to scroll on its own, so Title and Actions stay visually anchored while only the middle region scrolls.",
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
                      A real MUI Dialog renders <code>role=&quot;dialog&quot;</code> with{' '}
                      <code>aria-modal</code>, traps keyboard focus inside it while open, and returns
                      focus to the element that opened it on close.
                    </>,
                    <>
                      Pass DialogTitle&apos;s own <code>id</code> to the Dialog&apos;s{' '}
                      <code>aria-labelledby</code>{' '}
                      so a screen reader announces the dialog&apos;s
                      purpose immediately on open.
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
            <SnippetLabel>Max width and full screen</SnippetLabel>
            <CodeBlock code={maxWidthSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Dividers</SnippetLabel>
            <CodeBlock code={dividersSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Actions</SnippetLabel>
            <CodeBlock code={actionsSnippet} />
          </Box>
        </Stack>
      </DocSection>

      <DemoDialog activeDemo={activeDemo} onClose={close} />
    </Box>
  );
}
