'use client';

import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { colors } from '@/theme/brandTheme';

/**
 * EDGE-DS `<StepperCard>` — card-style stepper where every step is a
 * clickable card. Figma: Stepper page › `Step | Card` (State Inactive / Hover /
 * Active / Complete, optional Caption) and `Stepper | Card` (3–9 steps with
 * connectors; inside the stepper each card flexes between 108 and 120px).
 *
 * Token map (Figma `Components/Stepper/Card/*` → code):
 *   BG/Active     → Brand/Primary/100 → edgeTurquoise 100
 *   BG/Hover      → Brand/Primary/50  → edgeTurquoise 50
 *   Icon/Filled   → Brand/Primary/500 → edgeTurquoise 500 (Active + Complete circle)
 *   Icon/OnFilled → Semantic/Text/Inverse → white
 *   Icon/Outline  → Brand/Primary/500 → edgeTurquoise 500 (Inactive circle ring)
 *   Icon/Number   → Brand/Primary/700 → edgeTurquoise 700 (4.6:1, AA at 12px)
 *   Label         → Semantic/Text/Primary → text.primary
 *   Connector     → Neutral/Grey/400 → grey 400
 *   Caption       → Semantic/Text/Secondary → text.secondary (body-xs-regular)
 */

export type StepCardState = 'inactive' | 'active' | 'complete';

const CARD_WIDTH = 120;
// Inside <StepperCard> each card flexes down to this width so up to 9 steps fit.
const CARD_MIN_WIDTH = 108;
const CIRCLE = 24;
// Connector line sits on the circle's centre: 16px card padding + 12px half circle, minus half the 1px line.
const CONNECTOR_OFFSET = 27.5;

export interface StepCardProps {
  number: number | string;
  label: string;
  /** Optional secondary line under the label, e.g. "5 articles" (Figma `Caption?`). */
  caption?: React.ReactNode;
  state?: StepCardState;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  /** Set by <StepperCard>: lets the card shrink from 120 to 108px. */
  flexible?: boolean;
}

/** One step — `Step | Card`. Hover is the live interaction state. */
export function StepCard({ number, label, caption, state = 'inactive', onClick, disabled, flexible }: StepCardProps) {
  const filled = state !== 'inactive';
  return (
    <ButtonBase
      onClick={onClick}
      disabled={disabled}
      aria-current={state === 'active' ? 'step' : undefined}
      sx={{
        ...(flexible
          ? { flex: `1 1 ${CARD_WIDTH}px`, minWidth: CARD_MIN_WIDTH, maxWidth: CARD_WIDTH }
          : { width: CARD_WIDTH, flexShrink: 0 }),
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 2,
        px: 1,
        py: 2,
        borderRadius: '8px',
        bgcolor: state === 'active' ? colors.edgeTurquoise[100] : 'transparent',
        transition: 'background-color 150ms',
        '&:hover': { bgcolor: state === 'active' ? colors.edgeTurquoise[100] : colors.edgeTurquoise[50] },
        '&.Mui-focusVisible': { outline: `2px solid ${colors.edgeTurquoise[500]}`, outlineOffset: -2 },
      }}
    >
      <Box
        aria-hidden
        sx={{
          width: CIRCLE,
          height: CIRCLE,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: filled ? colors.edgeTurquoise[500] : 'transparent',
          boxShadow: filled ? 'none' : `inset 0 0 0 1px ${colors.edgeTurquoise[500]}`,
        }}
      >
        {state === 'complete' ? (
          <CheckIcon sx={{ fontSize: 16, color: '#ffffff' }} />
        ) : (
          <Typography variant="caption" component="span" sx={{ color: filled ? '#ffffff' : colors.edgeTurquoise[700] }}>
            {number}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="body-xs" component="span" sx={{ color: 'text.primary', textAlign: 'center' }}>
          {label}
        </Typography>
        {caption != null && (
          <Typography variant="body-xs-regular" component="span" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            {caption}
          </Typography>
        )}
      </Box>
    </ButtonBase>
  );
}

export interface StepperCardStep {
  label: string;
  /** Optional secondary line under the label, e.g. "5 articles". */
  caption?: React.ReactNode;
  completed?: boolean;
}

export interface StepperCardProps {
  /** 3–9 steps, per the Figma component. */
  steps: StepperCardStep[];
  /** Index of the current step (Active). */
  activeStep: number;
  onStepClick?: (index: number) => void;
}

/** A row of step cards joined by connector lines — `Stepper | Card`. */
export function StepperCard({ steps, activeStep, onStepClick }: StepperCardProps) {
  return (
    <Box component="nav" aria-label="Progress" sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <Box aria-hidden sx={{ flex: 1, minWidth: 16, height: '1px', mt: `${CONNECTOR_OFFSET}px`, bgcolor: colors.grey[400] }} />
          )}
          <StepCard
            number={i + 1}
            label={step.label}
            caption={step.caption}
            flexible
            state={i === activeStep ? 'active' : step.completed ? 'complete' : 'inactive'}
            onClick={onStepClick ? () => onStepClick(i) : undefined}
          />
        </React.Fragment>
      ))}
    </Box>
  );
}

export default StepperCard;
