'use client';

import React from 'react';
import {
  FormControlLabel as MuiFormControlLabel,
  type FormControlLabelProps as MuiFormControlLabelProps,
  styled,
} from '@mui/material';
import { edgeTypography } from '@/theme/brandTheme';

/**
 * EDGE-DS label placements for `<FormControlLabel>` (Switch variant).
 * Extends MUI's stock `end | start | top | bottom` with `dual`, which
 * renders a label on *both* sides of the control (e.g. "No" — Switch —
 * "Yes") instead of a single label on one side.
 */
export type EdgeLabelPlacement = 'end' | 'start' | 'top' | 'bottom' | 'dual';

export interface FormControlLabelProps
  extends Omit<MuiFormControlLabelProps, 'labelPlacement' | 'label'> {
  /** Standard MUI placements, plus `'dual'` for Left Label + Switch + Right Label. */
  labelPlacement?: EdgeLabelPlacement;
  /**
   * Legacy/standard single label. Used as-is for `end | start | top | bottom`.
   * When `labelPlacement="dual"` and only `label` is supplied (no
   * `leftLabel`/`rightLabel`), it is rendered on the right — preserving the
   * pre-`dual` "label after control" convention so existing call sites don't
   * break if `labelPlacement` is switched to `'dual'` without also adding
   * `leftLabel`/`rightLabel`.
   */
  label?: React.ReactNode;
  /** Text or element rendered to the left of the control. Only used in `dual` layout. */
  leftLabel?: React.ReactNode;
  /** Text or element rendered to the right of the control. Only used in `dual` layout. */
  rightLabel?: React.ReactNode;
}

// Root used only for the `dual` placement. Mirrors MuiFormControlLabel's own
// `display: inline-flex; align-items: center` root, but adds
// `justify-content: center` plus an explicit `gap` so
// [Left Label] [Switch] [Right Label] sit centered as one group rather than
// left-aligned like the single-label placements.
const DualRoot = styled('label', {
  shouldForwardProp: (prop) => prop !== 'controlDisabled',
})<{ controlDisabled?: boolean }>(({ theme, controlDisabled }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // theme.spacing(1) = 8px — the same gap MuiFormControlLabel reserves
  // around its control today; stands in for an `--edge-spacing-sm` token.
  gap: theme.spacing(1),
  cursor: controlDisabled ? 'default' : 'pointer',
  ...(controlDisabled && {
    pointerEvents: 'none',
  }),
}));

const DualLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'controlDisabled',
})<{ controlDisabled?: boolean }>(({ theme, controlDisabled }) => ({
  ...edgeTypography['body-sm'],
  color: controlDisabled ? theme.palette.text.disabled : theme.palette.text.primary,
  userSelect: 'none',
}));

/**
 * EDGE-DS `<FormControlLabel>` — drop-in wrapper around MUI's
 * `FormControlLabel` that adds a `dual` label placement for switches which
 * need labels on both sides (e.g. "No" / "Yes"), while remaining
 * source-compatible with every existing `end | start | top | bottom` usage.
 *
 * ```tsx
 * <FormControlLabel
 *   labelPlacement="dual"
 *   leftLabel="No"
 *   rightLabel="Yes"
 *   control={<Switch checked={checked} onChange={onChange} />}
 * />
 * ```
 */
export const FormControlLabel = React.forwardRef<HTMLLabelElement, FormControlLabelProps>(
  function FormControlLabel(props, ref) {
    const {
      labelPlacement,
      label,
      leftLabel,
      rightLabel,
      control,
      disabled,
      className,
      sx,
      ...rest
    } = props;

    const isDual = labelPlacement === 'dual' || (leftLabel != null && rightLabel != null);

    if (isDual) {
      const resolvedLeft = leftLabel;
      const resolvedRight = rightLabel ?? (leftLabel == null ? label : undefined);
      const controlDisabled = Boolean(disabled);

      return (
        <DualRoot
          ref={ref}
          controlDisabled={controlDisabled}
          className={className}
          sx={sx}
        >
          {resolvedLeft != null && (
            <DualLabel controlDisabled={controlDisabled}>{resolvedLeft}</DualLabel>
          )}
          {React.isValidElement(control)
            ? React.cloneElement(control as React.ReactElement<{ disabled?: boolean }>, {
                disabled: (control.props as { disabled?: boolean }).disabled ?? controlDisabled,
              })
            : control}
          {resolvedRight != null && (
            <DualLabel controlDisabled={controlDisabled}>{resolvedRight}</DualLabel>
          )}
        </DualRoot>
      );
    }

    // Standard single-label placements (`end` | `start` | `top` | `bottom`)
    // fall straight through to MUI's own FormControlLabel, unchanged.
    return (
      <MuiFormControlLabel
        ref={ref}
        control={control}
        label={label}
        labelPlacement={labelPlacement as MuiFormControlLabelProps['labelPlacement']}
        disabled={disabled}
        className={className}
        sx={sx}
        {...rest}
      />
    );
  }
);

export default FormControlLabel;
