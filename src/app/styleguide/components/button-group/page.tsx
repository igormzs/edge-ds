'use client';

import { useRef, useState } from 'react';
import {
  ButtonGroup,
  Button,
  IconButton,
  Stack,
  Box,
  Divider,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StarIcon from '@mui/icons-material/Star';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

// Live split-button demo — mirrors MUI's own Split Button pattern: an
// anchored Popper + Grow + ClickAwayListener menu toggled by the small
// caret button, so the Interactive States example actually opens/closes
// instead of just being a static icon.
const saveOptions = ['Save', 'Save and continue', 'Save as draft'];

function SplitButtonDemo() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => setOpen((prev) => !prev);

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        color="primary"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={() => handleMenuItemClick(selectedIndex)}>
          {saveOptions[selectedIndex]}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="more save options"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon
            sx={{
              transition: 'transform 0.15s ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom',
            }}
          >
            <Paper elevation={3} sx={{ mt: 0.5 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {saveOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

// IconButton isn't part of ButtonGroup's built-in "grouped" styling contract
// (that mechanism only targets Button children), so when an IconButton sits
// at an edge or in the middle of a group, its own circular default has to be
// squared off by hand to match the position-aware corner rule established
// for the rest of the component: outward edge keeps theme.shape.borderRadius,
// every inward-facing corner is 0.
const edgeStartSx = {
  borderRadius: (theme: any) => `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
};
const edgeEndSx = {
  borderRadius: (theme: any) => `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
};
const middleSx = { borderRadius: 0 };

const codeSnippet = `import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

// Basic — Contained
<ButtonGroup variant="contained" color="primary">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>

// Outlined
<ButtonGroup variant="outlined" color="secondary">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>

// Vertical orientation
<ButtonGroup orientation="vertical" variant="contained" color="primary">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>

// Sizes
<ButtonGroup size="small" variant="contained">...</ButtonGroup>
<ButtonGroup size="medium" variant="contained">...</ButtonGroup>
<ButtonGroup size="large" variant="contained">...</ButtonGroup>

// Split button (main action + secondary dropdown trigger) —
// see MUI's "Split Button" recipe for the full open/close logic:
// https://mui.com/material-ui/react-button-group/#split-button
const anchorRef = useRef<HTMLDivElement>(null);
const [open, setOpen] = useState(false);

<ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
  <Button onClick={handleSave}>Save</Button>
  <Button
    size="small"
    aria-label="more save options"
    aria-haspopup="menu"
    aria-expanded={open ? 'true' : undefined}
    onClick={() => setOpen((prev) => !prev)}
  >
    <ArrowDropDownIcon />
  </Button>
</ButtonGroup>
// ...anchored Popper + MenuList renders the option list when open

// Disabled
<ButtonGroup variant="contained" disabled>
  <Button>One</Button>
  <Button>Two</Button>
</ButtonGroup>

// Hybrid composition — IconButton nested inside ButtonGroup.
// ButtonGroup's built-in "grouped" styling only targets Button children,
// so an IconButton's circular default has to be squared off by hand to
// match the group's position-aware corner rule (outward edge keeps
// theme.shape.borderRadius, every inward-facing corner is 0).
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';

const edgeStartSx = {
  borderRadius: (theme) => \`\${theme.shape.borderRadius}px 0 0 \${theme.shape.borderRadius}px\`,
};
const edgeEndSx = {
  borderRadius: (theme) => \`0 \${theme.shape.borderRadius}px \${theme.shape.borderRadius}px 0\`,
};

<ButtonGroup variant="contained" color="primary" aria-label="favorite and save actions">
  <IconButton color="inherit" sx={edgeStartSx} aria-label="add to favorites" title="Add to favorites">
    <StarIcon fontSize="small" />
  </IconButton>
  <Button sx={edgeEndSx}>Save</Button>
</ButtonGroup>`;

const propRows: PropRow[] = [
  {
    prop: 'variant',
    type: '"contained" | "outlined" | "text"',
    default: '"outlined"',
    description: 'Visual style, inherited by every Button child unless overridden individually.',
  },
  {
    prop: 'color',
    type: '"primary" | "secondary" | "error" | "warning" | "info" | "success"',
    default: '"primary"',
    description: 'Theme colour applied to all buttons and the divider between them.',
  },
  {
    prop: 'orientation',
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: 'Stacks buttons in a row or a column. Only the outer edge of the first and last button keep the standard corner radius — every edge where two buttons meet is squared off.',
  },
  {
    prop: 'size',
    type: '"small" | "medium" | "large"',
    default: '"medium"',
    description: 'Applied to every button in the group.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables every button in the group at once.',
  },
  {
    prop: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'Stretches the group (and each button equally) to fill its container width.',
  },
  {
    prop: 'disableElevation',
    type: 'boolean',
    default: 'false',
    description: 'Removes the drop shadow on the contained variant.',
  },
];

export default function ButtonGroupPage() {
  return (
    <Box>
      <PageHeader
        title="Button Group"
        description="Button Group wraps a set of related Button instances into a single, visually joined control. It shares the exact padding, typography, and colour tokens defined for the standalone Button — only the corner radius is position-aware, so the buttons read as one continuous shape rather than a row of separate pills."
        muiLink="https://mui.com/material-ui/react-button-group/"
      />

      {/* Visual Variants */}
      <DocSection title="Visual Variants">
        <PreviewCanvas>
          <PreviewGroup label="Contained">
            <ButtonGroup variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Outlined">
            <ButtonGroup variant="outlined" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Text">
            <ButtonGroup variant="text" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <PreviewGroup label="Secondary">
            <ButtonGroup variant="contained" color="secondary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Error">
            <ButtonGroup variant="contained" color="error">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Orientation */}
      <DocSection title="Orientation">
        <PreviewCanvas>
          <PreviewGroup label="Horizontal (default)">
            <ButtonGroup variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Vertical">
            <ButtonGroup orientation="vertical" variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Sizing */}
      <DocSection title="Sizing">
        <PreviewCanvas>
          <PreviewGroup label="Small">
            <ButtonGroup size="small" variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Medium (default)">
            <ButtonGroup size="medium" variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Large">
            <ButtonGroup size="large" variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Hybrid Compositions */}
      <DocSection title="Hybrid Compositions">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <PreviewGroup label="Icon + Button">
              <ButtonGroup variant="contained" color="primary" aria-label="favorite and save actions">
                <IconButton color="inherit" sx={edgeStartSx} aria-label="add to favorites" title="Add to favorites">
                  <StarIcon fontSize="small" />
                </IconButton>
                <Button sx={edgeEndSx}>Save</Button>
              </ButtonGroup>
            </PreviewGroup>

            <PreviewGroup label="Button + Icon">
              <ButtonGroup variant="contained" color="primary" aria-label="save and delete actions">
                <Button sx={edgeStartSx}>Save</Button>
                <IconButton color="inherit" sx={edgeEndSx} aria-label="delete item" title="Delete item">
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </ButtonGroup>
            </PreviewGroup>

            <PreviewGroup label="Icon + Button + Icon">
              <ButtonGroup variant="contained" color="primary" aria-label="copy, save, and delete actions">
                <IconButton color="inherit" sx={edgeStartSx} aria-label="copy item" title="Copy item">
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
                <Button sx={middleSx}>Save</Button>
                <IconButton color="inherit" sx={edgeEndSx} aria-label="delete item" title="Delete item">
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </ButtonGroup>
            </PreviewGroup>

            <Divider sx={{ my: 1 }} />

            <PreviewGroup label="Sizing alignment — Small / Medium / Large">
              <Stack direction="row" spacing={3} alignItems="center">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <ButtonGroup key={size} variant="contained" color="primary" size={size} aria-label={`${size} copy, save, and delete actions`}>
                    <IconButton color="inherit" size={size} sx={edgeStartSx} aria-label="copy item" title="Copy item">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                    <Button sx={middleSx}>Save</Button>
                    <IconButton color="inherit" size={size} sx={edgeEndSx} aria-label="delete item" title="Delete item">
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </ButtonGroup>
                ))}
              </Stack>
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Interactive States */}
      <DocSection title="Interactive States">
        <PreviewCanvas>
          <PreviewGroup label="Default — hover / focus the items">
            <ButtonGroup variant="contained" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Disabled">
            <ButtonGroup variant="contained" color="primary" disabled>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewGroup>
          <PreviewGroup label="Split button — click the caret to open/close">
            <SplitButtonDemo />
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

      {/* Accessibility */}
      <DocSection title="Accessibility Notes">
        <PreviewCanvas>
          <Stack spacing={1.5} sx={{ width: '100%' }}>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Set <code>role=&quot;group&quot;</code> together with a descriptive <code>aria-label</code> on the group root — MUI applies <code>role=&quot;group&quot;</code> automatically, but the <code>aria-label</code> (e.g. &quot;text alignment&quot;, &quot;split button&quot;) is on you, and it&apos;s what tells screen-reader users what the group of buttons is for.
            </Box>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Every button in the group is its own real, individually focusable <code>&lt;button&gt;</code> — keyboard users Tab through each one in sequence and activate with Enter/Space, no roving-tabindex or custom key handling required.
            </Box>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • For a split button, give the small dropdown-trigger button its own <code>aria-label</code> (e.g. &quot;more save options&quot;) — it renders no visible text, so without a label it announces only as an unlabeled button.
            </Box>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • The divider between buttons is a purely visual cue — don&apos;t rely on it as the only signal separating actions; button labels should stand on their own.
            </Box>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • <code>disabled</code> on the group disables every child button and removes them all from the tab order — make sure surrounding copy explains why, the same as a standalone disabled Button.
            </Box>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Every icon-only <code>IconButton</code> in a hybrid group must carry both an <code>aria-label</code> (for screen readers) and a <code>title</code> (for sighted mouse users hovering without a visible text label) — an icon alone communicates nothing to either audience without them.
            </Box>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • <code>ButtonGroup</code>'s automatic corner-radius and divider styling only applies to <code>Button</code> children — an <code>IconButton</code> sitting at an edge or in the middle needs its corners squared off by hand (see the Usage snippet) so it reads as part of the same continuous shape instead of a circular button bolted onto a rectangular one.
            </Box>
          </Stack>
        </PreviewCanvas>
      </DocSection>
    </Box>
  );
}
