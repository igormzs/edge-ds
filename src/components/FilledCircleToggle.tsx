'use client';

import React from 'react';
import { Box, ToggleButton, ToggleButtonProps } from '@mui/material';
import { alpha } from '@mui/material/styles';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { colors } from '@/theme/brandTheme';

/**
 * EDGE-DS Filled Circle toggle — Figma: Toggle Button page ›
 * `<ToggleButton> | Filled Circle` (Size L/M/S × State) and
 * `<ToggleButtonGroup> | Filled Circle` (List + Divider + Grid view switcher).
 *
 * Token map (Figma `Components/ToggleButton/FilledCircle/*` → code):
 *   BG/Hover         → #07bebe @ 4% (raw, as in Figma)  → alpha(edgeTurquoise 300, 0.04)
 *   BG/Selected      → Brand/Primary/500 → edgeTurquoise 500
 *   BG/SelectedHover → Brand/Primary/700 → edgeTurquoise 700
 *   Icon/Default     → Brand/Primary/500 → edgeTurquoise 500
 *   Icon/Selected    → Semantic/Text/Inverse → white
 *   Icon/Disabled    → Components/ToggleButton/Icon/Disabled → rgba(0,0,0,0.38)
 *   Divider          → Semantic/Border/Divider → palette.divider
 */

export type FilledCircleSize = 'small' | 'medium' | 'large';

// Figma: 34 / 40 / 48 circles with a 24px icon (padding 5 / 8 / 12).
const SIZE: Record<FilledCircleSize, { box: number; divider: number }> = {
  small: { box: 34, divider: 18 },
  medium: { box: 40, divider: 24 },
  large: { box: 48, divider: 32 },
};

export interface FilledCircleToggleButtonProps extends Omit<ToggleButtonProps, 'size'> {
  size?: FilledCircleSize;
}

export function FilledCircleToggleButton({ size = 'medium', sx, ...props }: FilledCircleToggleButtonProps) {
  const box = SIZE[size].box;
  return (
    <ToggleButton
      {...props}
      sx={[
        {
          width: box,
          height: box,
          p: 0,
          border: 0,
          borderRadius: '50%',
          color: colors.edgeTurquoise[500],
          '& .MuiSvgIcon-root': { fontSize: 24 },
          '&:hover': { bgcolor: alpha(colors.edgeTurquoise[300], 0.04) },
          '&.Mui-selected': {
            bgcolor: colors.edgeTurquoise[500],
            color: '#ffffff',
            '&:hover': { bgcolor: colors.edgeTurquoise[700] },
          },
          '&.Mui-disabled': { border: 0, color: 'rgba(0, 0, 0, 0.38)' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

export interface FilledCircleOption<T extends string> {
  value: T;
  icon: React.ReactNode;
  label: string;
}

export interface FilledCircleToggleGroupProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: FilledCircleOption<T>[];
  size?: FilledCircleSize;
  /** Vertical rule between options. Figma default: on. */
  divider?: boolean;
  'aria-label'?: string;
}

/** Exclusive group (one option always selected) — `<ToggleButtonGroup> | Filled Circle`. */
export function FilledCircleToggleGroup<T extends string>({
  value,
  onChange,
  options,
  size = 'medium',
  divider = true,
  'aria-label': ariaLabel,
}: FilledCircleToggleGroupProps<T>) {
  return (
    <Box role="group" aria-label={ariaLabel} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
      {options.map((opt, i) => (
        <React.Fragment key={opt.value}>
          {divider && i > 0 && <Box aria-hidden sx={{ width: '1px', height: SIZE[size].divider, bgcolor: 'divider' }} />}
          <FilledCircleToggleButton
            size={size}
            value={opt.value}
            selected={opt.value === value}
            aria-label={opt.label}
            onChange={() => {
              if (opt.value !== value) onChange(opt.value);
            }}
          >
            {opt.icon}
          </FilledCircleToggleButton>
        </React.Fragment>
      ))}
    </Box>
  );
}

export type ViewMode = 'list' | 'grid';

/** The Figma default: List / Grid view switcher. */
export function ViewSwitcher({
  value,
  onChange,
  size = 'medium',
  divider = true,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
  size?: FilledCircleSize;
  divider?: boolean;
}) {
  return (
    <FilledCircleToggleGroup<ViewMode>
      aria-label="View"
      value={value}
      onChange={onChange}
      size={size}
      divider={divider}
      options={[
        { value: 'list', icon: <ViewHeadlineIcon />, label: 'List view' },
        { value: 'grid', icon: <ViewModuleIcon />, label: 'Grid view' },
      ]}
    />
  );
}

export default FilledCircleToggleGroup;
