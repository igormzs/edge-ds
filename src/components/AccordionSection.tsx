'use client';

import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, LinearProgress, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { colors, edgeTypography } from '@/theme/brandTheme';

/**
 * EDGE-DS `<AccordionSection>` — the card-style section accordion used on
 * product pages (Inputs › Statistics, Policies and practices, …).
 * Figma: Accordion page › `<Accordion> | Section` (State Default / Expanded,
 * Title, Progress?, Actions? + ↳ Actions, ↳ Content).
 *
 * Token map (Figma → code):
 *   Components/Accordion/Section/BG     → Semantic/Surface/Paper  → background.paper
 *   Components/Accordion/Section/Border → Semantic/Border/Default → grey 300
 *   Components/Accordion/Section/Title  → Semantic/Text/Brand     → edgeTurquoise 500
 *     (large text only — heading-sm 24px, where 3.3:1 passes)
 *
 * The theme's MuiAccordion/MuiAccordionSummary overrides (8px radius, grey
 * surface, body-md labels) are for the standard row, so this component
 * overrides them locally with higher-specificity selectors.
 */

export interface AccordionSectionProps {
  title: string;
  /** 0–100. Omit to hide the progress bar (Figma: Progress? off). */
  progress?: number;
  /** Header actions, e.g. <ViewSwitcher />. Omit to hide (Figma: Actions? off). */
  actions?: React.ReactNode;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
}

export function AccordionSection({
  title,
  progress,
  actions,
  children,
  defaultExpanded,
  expanded,
  onChange,
}: AccordionSectionProps) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      defaultExpanded={defaultExpanded}
      expanded={expanded}
      onChange={onChange}
      sx={{
        bgcolor: 'background.paper',
        border: `1px solid ${colors.grey[300]}`,
        borderRadius: '16px',
        px: 4,
        pt: 3,
        pb: 3,
        '&.Mui-expanded': { pb: 4 },
      }}
    >
      <AccordionSummary
        // A div (role="button", keyboard-operable via ButtonBase) instead of a
        // <button>, so interactive Actions (e.g. the view switcher) aren't
        // nested inside another button — invalid HTML.
        component="div"
        expandIcon={
          <Box sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'primary.main' }}>
            <ExpandMoreIcon />
          </Box>
        }
        sx={{
          minHeight: 48,
          '&.Mui-expanded': { minHeight: 48 },
          '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 3 },
          '& .MuiAccordionSummary-content .edge-section-title': {
            ...edgeTypography['heading-sm'],
            color: colors.edgeTurquoise[500],
          },
          '& .MuiAccordionSummary-content .edge-section-progress': {
            ...edgeTypography['body-sm'],
            color: 'text.secondary',
          },
        }}
      >
        <Typography component="h3" className="edge-section-title">
          {title}
        </Typography>
        {progress !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              aria-label={`${title} progress`}
              sx={{ width: 200, height: 4, borderRadius: 2 }}
            />
            <Typography component="span" className="edge-section-progress">
              {Math.round(progress)}%
            </Typography>
          </Box>
        )}
        {actions && (
          // Actions sit inside the clickable header: stop clicks/keys from toggling the section.
          <Box
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            {actions}
          </Box>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Divider sx={{ mt: 2 }} />
        <Box sx={{ pt: 3 }}>{children}</Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionSection;
