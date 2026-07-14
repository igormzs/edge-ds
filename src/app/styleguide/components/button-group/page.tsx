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
import { alpha, type Theme } from '@mui/material/styles';
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

// IconButton isn't part of ButtonGroup's built-in "grouped" styling contract —
// that mechanism (color/variant/size context + the .MuiButtonGroup-grouped
// divider and corner-reset CSS) only recognizes Button children. Dropped in
// unstyled, an IconButton renders with its own defaults: transparent
// background, no border, icon-only color — which is exactly the "white bg /
// generic stroke" breakage reported after testing.
//
// Two follow-up bugs surfaced once that fix shipped, both rooted in the same
// cause: native ButtonGroup CSS quietly assumes every child is a Button.
// 1. The divider is drawn as a border-right that ButtonGroup/Button applies
//    to itself — it never reaches an IconButton, so a [Icon | Button | Icon]
//    row got a divider on the Button→Icon joint (Button drew its own) but
//    NOT on the Icon→Button joint (the Icon has no such CSS at all). Fixed by
//    making the divider a property of *position*, applied identically to
//    both Button and IconButton via the shared getJointSx below, instead of
//    leaving it to whichever component happens to support it.
// 2. IconButton's native small/medium/large padding scale (34/40/48px) is
//    its own independent size system — it doesn't line up with Button's real
//    per-size height (28/36/44px), so an icon slot rendered visibly taller
//    than its text neighbour. Fixed by overriding IconButton's padding to
//    the exact value needed to land on Button's real height around its
//    fixed 24px glyph.
type HybridPosition = 'start' | 'middle' | 'end';
type HybridColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
type HybridVariant = 'contained' | 'outlined' | 'text';
type HybridSize = 'small' | 'medium' | 'large';

const ICON_PADDING_BY_SIZE: Record<HybridSize, number> = {
  small: 2,
  medium: 6,
  large: 10,
};

// Shared by every child in a hybrid row — Button and IconButton alike —
// so both joints in a multi-item composition are guaranteed identical
// regardless of which component type sits on either side of them.
function getJointSx(position: HybridPosition, variant: HybridVariant, color: HybridColor) {
  return (theme: Theme) => {
    const radiusMap: Record<HybridPosition, string | number> = {
      start: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
      end: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
      middle: 0,
    };
    const pal = theme.palette[color];

    if (variant === 'outlined') {
      // Outlined items already carry a full border on every side (Button
      // natively, IconButton via getHybridIconSx below) — collapse the
      // touching edge into a single 1px seam instead of a doubled line by
      // overlapping every non-first item by exactly its own border width.
      return {
        borderRadius: radiusMap[position],
        ...(position !== 'start' && { marginLeft: '-1px' }),
      };
    }
    // Contained/Text: no native border to double up against, so the divider
    // is simply an explicit border-right on every item except the last.
    const dividerColor = variant === 'contained' ? pal.dark ?? pal.main : pal.main;
    return {
      borderRadius: radiusMap[position],
      ...(position !== 'end' && { borderRight: `1px solid ${dividerColor}` }),
    };
  };
}

// IconButton-only: layers the Contained/Outlined/Text background/border/
// colour on top of the shared joint treatment above (ButtonGroup's context
// never reaches IconButton, so this has to be rebuilt from the theme
// palette by hand), plus the size-matched padding described above.
function getHybridIconSx(variant: HybridVariant, color: HybridColor, position: HybridPosition, size: HybridSize = 'medium') {
  return (theme: Theme) => {
    const pal = theme.palette[color];
    const joint = getJointSx(position, variant, color)(theme);
    const padding = `${ICON_PADDING_BY_SIZE[size]}px`;
    const hoverTint = (pal as any).subtle ?? alpha(pal.main, 0.08);

    if (variant === 'contained') {
      return {
        ...joint,
        padding,
        backgroundColor: pal.main,
        color: pal.contrastText,
        '&:hover': { backgroundColor: pal.dark ?? pal.main },
      };
    }
    if (variant === 'outlined') {
      return {
        ...joint,
        padding,
        border: `1px solid ${pal.main}`,
        color: pal.main,
        '&:hover': { backgroundColor: hoverTint },
      };
    }
    return {
      ...joint,
      padding,
      color: pal.main,
      '&:hover': { backgroundColor: hoverTint },
    };
  };
}

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
// ButtonGroup's "grouped" context (color/variant/size + corner-reset +
// divider CSS) only recognizes Button children. Two things break as a
// result if left unstyled: (1) IconButton renders transparent, borderless,
// unmatched to the group's colour/variant, and (2) the divider — drawn by
// Button/ButtonGroup as a border-right on itself — never reaches an
// IconButton, so a [Icon | Button | Icon] row gets a divider on the
// Button→Icon joint but NOT the Icon→Button one. getJointSx fixes the
// second problem by making the divider a property of *position*, applied
// identically to Button and IconButton. getHybridIconSx layers the
// Contained/Outlined/Text look on top for IconButton specifically, plus
// padding matched to Button's real per-size height (IconButton's own
// small/medium/large padding scale is a different, unrelated size system).
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { alpha } from '@mui/material/styles';

const ICON_PADDING_BY_SIZE = { small: 2, medium: 6, large: 10 }; // px, around IconButton's fixed 24px glyph

function getJointSx(position, variant, color) {
  return (theme) => {
    const radiusMap = {
      start: \`\${theme.shape.borderRadius}px 0 0 \${theme.shape.borderRadius}px\`,
      end: \`0 \${theme.shape.borderRadius}px \${theme.shape.borderRadius}px 0\`,
      middle: 0,
    };
    const pal = theme.palette[color];
    if (variant === 'outlined') {
      // Both items already carry a full border — collapse the touching
      // edge into one 1px seam by overlapping every non-first item.
      return { borderRadius: radiusMap[position], ...(position !== 'start' && { marginLeft: '-1px' }) };
    }
    const dividerColor = variant === 'contained' ? pal.dark ?? pal.main : pal.main;
    return {
      borderRadius: radiusMap[position],
      ...(position !== 'end' && { borderRight: \`1px solid \${dividerColor}\` }),
    };
  };
}

function getHybridIconSx(variant, color, position, size = 'medium') {
  return (theme) => {
    const pal = theme.palette[color];
    const joint = getJointSx(position, variant, color)(theme);
    const padding = \`\${ICON_PADDING_BY_SIZE[size]}px\`;
    if (variant === 'contained') {
      return { ...joint, padding, backgroundColor: pal.main, color: pal.contrastText, '&:hover': { backgroundColor: pal.dark ?? pal.main } };
    }
    if (variant === 'outlined') {
      return { ...joint, padding, border: \`1px solid \${pal.main}\`, color: pal.main, '&:hover': { backgroundColor: pal.subtle ?? alpha(pal.main, 0.08) } };
    }
    return { ...joint, padding, color: pal.main };
  };
}

<ButtonGroup variant="contained" color="primary" aria-label="copy, save, and delete actions">
  <IconButton color="inherit" sx={getHybridIconSx('contained', 'primary', 'start')} aria-label="copy item" title="Copy item">
    <ContentCopyIcon fontSize="small" />
  </IconButton>
  <Button sx={getJointSx('middle', 'contained', 'primary')}>Save</Button>
  <IconButton color="inherit" sx={getHybridIconSx('contained', 'primary', 'end')} aria-label="delete item" title="Delete item">
    <DeleteOutlineIcon fontSize="small" />
  </IconButton>
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

        {/* Hybrid layouts — nesting IconButton inside ButtonGroup. Lives here,
            not as its own section, because this is a structural layout
            variation of the group itself, on the same footing as the plain
            text groupings above. */}
        <Box sx={{ mt: 2 }}>
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 12, fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Hybrid layouts — Icon + Button
            </Box>
            <Stack direction="row" spacing={4} flexWrap="wrap">
              <PreviewGroup label="Icon + Button (Contained)">
                <ButtonGroup variant="contained" color="primary" aria-label="favorite and save actions">
                  <IconButton color="inherit" sx={getHybridIconSx('contained', 'primary', 'start')} aria-label="add to favorites" title="Add to favorites">
                    <StarIcon fontSize="small" />
                  </IconButton>
                  <Button sx={getJointSx('end', 'contained', 'primary')}>Save</Button>
                </ButtonGroup>
              </PreviewGroup>

              <PreviewGroup label="Button + Icon (Contained)">
                <ButtonGroup variant="contained" color="primary" aria-label="save and delete actions">
                  <Button sx={getJointSx('start', 'contained', 'primary')}>Save</Button>
                  <IconButton color="inherit" sx={getHybridIconSx('contained', 'primary', 'end')} aria-label="delete item" title="Delete item">
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </ButtonGroup>
              </PreviewGroup>

              <PreviewGroup label="Icon + Button + Icon (Contained)">
                <ButtonGroup variant="contained" color="primary" aria-label="copy, save, and delete actions">
                  <IconButton color="inherit" sx={getHybridIconSx('contained', 'primary', 'start')} aria-label="copy item" title="Copy item">
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                  <Button sx={getJointSx('middle', 'contained', 'primary')}>Save</Button>
                  <IconButton color="inherit" sx={getHybridIconSx('contained', 'primary', 'end')} aria-label="delete item" title="Delete item">
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </ButtonGroup>
              </PreviewGroup>
            </Stack>

            <Stack direction="row" spacing={4} flexWrap="wrap">
              <PreviewGroup label="Icon + Button (Outlined)">
                <ButtonGroup variant="outlined" color="secondary" aria-label="favorite and save actions">
                  <IconButton color="inherit" sx={getHybridIconSx('outlined', 'secondary', 'start')} aria-label="add to favorites" title="Add to favorites">
                    <StarIcon fontSize="small" />
                  </IconButton>
                  <Button sx={getJointSx('end', 'outlined', 'secondary')}>Save</Button>
                </ButtonGroup>
              </PreviewGroup>

              <PreviewGroup label="Icon + Button + Icon (Outlined)">
                <ButtonGroup variant="outlined" color="secondary" aria-label="copy, save, and delete actions">
                  <IconButton color="inherit" sx={getHybridIconSx('outlined', 'secondary', 'start')} aria-label="copy item" title="Copy item">
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                  <Button sx={getJointSx('middle', 'outlined', 'secondary')}>Save</Button>
                  <IconButton color="inherit" sx={getHybridIconSx('outlined', 'secondary', 'end')} aria-label="delete item" title="Delete item">
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </ButtonGroup>
              </PreviewGroup>

              <PreviewGroup label="Icon + Button + Icon (Error)">
                <ButtonGroup variant="contained" color="error" aria-label="copy, save, and delete actions">
                  <IconButton color="inherit" sx={getHybridIconSx('contained', 'error', 'start')} aria-label="copy item" title="Copy item">
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                  <Button sx={getJointSx('middle', 'contained', 'error')}>Delete</Button>
                  <IconButton color="inherit" sx={getHybridIconSx('contained', 'error', 'end')} aria-label="delete item" title="Delete item">
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </ButtonGroup>
              </PreviewGroup>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <PreviewGroup label="Sizing alignment — Small / Medium / Large">
              <Stack direction="row" spacing={3} alignItems="center">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <ButtonGroup key={size} variant="contained" color="primary" size={size} aria-label={`${size} copy, save, and delete actions`}>
                    <IconButton color="inherit" sx={getHybridIconSx('contained', 'primary', 'start', size)} aria-label="copy item" title="Copy item">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                    <Button sx={getJointSx('middle', 'contained', 'primary')}>Save</Button>
                    <IconButton color="inherit" sx={getHybridIconSx('contained', 'primary', 'end', size)} aria-label="delete item" title="Delete item">
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </ButtonGroup>
                ))}
              </Stack>
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
        </Box>
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
              • <code>ButtonGroup</code> only passes its color/variant/size context to <code>Button</code> children — an <code>IconButton</code> gets none of it automatically. Left unstyled it renders transparent with no border, which reads as a visual bug, not a different button. Use the <code>getHybridIconSx</code> helper (see Usage) to rebuild the exact Contained/Outlined/Text look — background, text colour, hover state, and position-aware corner radius — from the same theme palette every other button in the group already uses.
            </Box>
            <Box sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • The divider between items is drawn by <code>Button</code>/<code>ButtonGroup</code> as a border the component applies to itself — it never reaches an <code>IconButton</code>, so a three-item row can end up with a divider on one joint and not the other. <code>getJointSx</code> makes the divider a property of position instead, applied the same way to every child regardless of type, so both joints always match.
            </Box>
          </Stack>
        </PreviewCanvas>
      </DocSection>
    </Box>
  );
}
