import { Switch } from '@mui/material';
import { FormControlLabel } from './FormControlLabel';
import figma from '@figma/code-connect';

/**
 * FormControlLabel (Switch variant) Connection
 * Maps the Figma `<FormControlLabel> | Switch` component set — variants
 * `Label Placement` (End | Bottom | Start | Top | Dual), `Disabled`
 * (False | True) and `Size` (Medium | Small) — to the EDGE-DS
 * FormControlLabel wrapper.
 *
 * `Dual` was added to the live component set on the "     Switch ✅" page
 * (node 642:114423) on 2026-07-24: a 5th `Label Placement` value laid out as
 * `[Left Label] [Switch] [Right Label]` (HORIZONTAL auto-layout, centered,
 * itemSpacing bound to the `sizing/1` variable — 8px). Its two labels are
 * exposed as independent `Label Left` / `Label Right` TEXT properties
 * (defaults "No"/"Yes"), distinct from the single `<FormLabel>` instance the
 * other four placements share — see the component's Figma description for
 * why (a Plugin API limitation on re-exposing nested-instance properties).
 * Figma: https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=642-114423
 */
figma.connect(
  FormControlLabel,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=642-114423',
  {
    props: {
      disabled: figma.boolean('Disabled'),
      labelPlacement: figma.enum('Label Placement', {
        End: 'end',
        Bottom: 'bottom',
        Start: 'start',
        Top: 'top',
        Dual: 'dual',
      }),
      // Only present on the `Dual` variant; undefined (and unused) on
      // End | Bottom | Start | Top.
      leftLabel: figma.textContent('Label Left#854:0'),
      rightLabel: figma.textContent('Label Right#854:17'),
    },
    example: ({ disabled, labelPlacement, leftLabel, rightLabel }) => (
      <FormControlLabel
        disabled={disabled}
        labelPlacement={labelPlacement}
        label={labelPlacement === 'dual' ? undefined : 'Label'}
        leftLabel={labelPlacement === 'dual' ? leftLabel : undefined}
        rightLabel={labelPlacement === 'dual' ? rightLabel : undefined}
        control={<Switch checked={labelPlacement === 'dual'} />}
      />
    ),
  }
);
