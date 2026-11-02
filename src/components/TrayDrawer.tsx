'use client';

import React from 'react';
import { Box, Button, ButtonBase, Collapse, Divider, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { colors } from '@/theme/brandTheme';

/**
 * EDGE-DS `<TrayDrawer>` — bottom tray that collects what the user picked on the
 * page and holds the page-level submit action (e.g. Action plan: selected
 * actions). Figma: Drawer page › `<Drawer> | Tray` (Expanded False/True).
 * Not a modal: no backdrop by itself, the page stays scrollable. Sticks to the
 * bottom of its scroll container; the handle toggles the list.
 *
 * Token map (Figma → code):
 *   Components/Drawer/Tray/BG     → Semantic/Surface/Paper   → background.paper
 *   Components/Drawer/Tray/Border → Semantic/Border/Divider  → divider (list border + row dividers)
 *   Components/Drawer/Tray/Title  → Semantic/Text/Primary    → text.primary (heading-xs)
 *   Components/Drawer/Tray/Count  → Semantic/Text/Primary    → text.primary (body-md)
 * Layout: panel 16/24px padding, 16px gap, 8px radius, Semantic/Elevation/6;
 * 60×40 handle overlapping the panel by 10px; list 16px radius.
 */

export interface TrayDrawerProps {
  title?: string;
  /** e.g. "3 actions selected". */
  count?: React.ReactNode;
  actionLabel: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** Max height of the expanded list before it scrolls. */
  maxListHeight?: number | string;
  /** List rows, usually <ActionCard type="summary" />. Dividers are added between rows. */
  children?: React.ReactNode;
}

export function TrayDrawer({
  title = 'Selected actions to your action plan',
  count,
  actionLabel,
  actionIcon = <CheckCircleIcon />,
  onAction,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  maxListHeight = 'calc(100vh - 320px)',
  children,
}: TrayDrawerProps) {
  const [expandedState, setExpandedState] = React.useState(defaultExpanded);
  const expanded = expandedProp ?? expandedState;
  const listId = React.useId();
  const toggle = () => {
    setExpandedState(!expanded);
    onExpandedChange?.(!expanded);
  };
  const rows = React.Children.toArray(children);

  return (
    <Box
      component="section"
      aria-label={title}
      sx={{ position: 'sticky', bottom: 0, zIndex: 'appBar', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ButtonBase
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls={listId}
        aria-label={expanded ? 'Collapse selected actions' : 'Expand selected actions'}
        sx={{
          width: 60,
          height: 40,
          mb: '-10px',
          pt: 0.5,
          alignItems: 'flex-start',
          bgcolor: 'background.paper',
          borderRadius: '8px 8px 0 0',
          boxShadow: 6,
          color: 'rgba(0, 0, 0, 0.70)',
          '&.Mui-focusVisible': { outline: `2px solid ${colors.edgeTurquoise[500]}`, outlineOffset: 2 },
        }}
      >
        {expanded ? <ExpandMoreIcon sx={{ fontSize: 32 }} /> : <ExpandLessIcon sx={{ fontSize: 32 }} />}
      </ButtonBase>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          px: 3,
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: expanded ? 2 : 0,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 6,
        }}
      >
        <Collapse in={expanded} id={listId}>
          <Box
            sx={{ maxHeight: maxListHeight, overflowY: 'auto', border: 1, borderColor: 'divider', borderRadius: '16px' }}
          >
            {rows.map((row, i) => (
              <React.Fragment key={i}>
                {i > 0 && <Divider />}
                {row}
              </React.Fragment>
            ))}
          </Box>
        </Collapse>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
            <Typography variant="heading-xs" component="h2" sx={{ color: 'text.primary' }}>
              {title}
            </Typography>
            {count != null && (
              <Typography variant="body-md" sx={{ color: 'text.primary' }} aria-live="polite">
                {count}
              </Typography>
            )}
          </Box>
          <Button variant="contained" size="medium" endIcon={actionIcon} onClick={onAction}>
            {actionLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TrayDrawer;
