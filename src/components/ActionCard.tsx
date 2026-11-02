'use client';

import React from 'react';
import { Box, Button, ButtonBase, Collapse, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { colors } from '@/theme/brandTheme';
import { StatusTag } from './StatusTag';

/**
 * EDGE-DS `<ActionCard>` — one action in an Action plan. Figma: Card page ›
 * `<Card> | Action`.
 *   type="proposed": title + Add action to plan / Added button, Rationale and Proposed actions.
 *   type="selected": Assigned tag + Edit, category, title, columns, Implementation details
 *                    (collapsible; `editing` swaps the values for Standard text fields + Confirm).
 *   type="summary":  compact row for the <TrayDrawer> list, with a delete button.
 *
 * Token map (Figma → code):
 *   Components/Card/Action/BG          → Semantic/Surface/Paper   → background.paper
 *   Components/Card/Action/Border      → Semantic/Border/Divider  → divider
 *   Components/Card/Action/Eyebrow     → Semantic/Text/Primary    → text.primary (body-sm)
 *   Components/Card/Action/Title       → Semantic/Text/Primary    → text.primary (heading-xs)
 *   Components/Card/Action/Label       → Semantic/Text/Secondary  → text.secondary (body-sm-bold)
 *   Components/Card/Action/Body        → Semantic/Text/Secondary  → text.secondary (body-sm)
 *   Components/Card/Action/Body Strong → Semantic/Text/Primary    → text.primary (summary text, detail values)
 *   Components/Card/Action/Link        → Brand/Primary/700        → edgeTurquoise 700 (body-md-bold)
 * Card: 24px padding, 8px radius, Semantic/Elevation/4. Summary row: 24px padding, no border.
 */

export interface ActionDetailField {
  label: string;
  value: string;
}

export interface ActionDetailGroup {
  /** e.g. "1. Ownership". */
  title: string;
  fields: ActionDetailField[];
}

export interface ActionCardProps {
  type: 'proposed' | 'selected' | 'summary';
  title: string;
  /** e.g. "2. Recruitment and promotion" (selected + summary). */
  category?: string;
  rationale?: string;
  proposedAction: string;
  /** proposed: the action is already in the plan. */
  added?: boolean;
  onToggleAdd?: () => void;
  /** selected/summary: shows the Assigned tag. Defaults to true for selected. */
  assigned?: boolean;
  /** selected: Implementation details content. */
  details?: ActionDetailGroup[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  editing?: boolean;
  onEdit?: () => void;
  onConfirm?: () => void;
  onFieldChange?: (groupIndex: number, fieldIndex: number, value: string) => void;
  /** summary: removes the action from the plan. */
  onDelete?: () => void;
}

function Heading({ category, title }: { category?: string; title: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
      {category && (
        <Typography variant="body-sm" sx={{ color: 'text.primary' }}>
          {category}
        </Typography>
      )}
      <Typography variant="heading-xs" component="h3" sx={{ color: 'text.primary' }}>
        {title}
      </Typography>
    </Box>
  );
}

function Columns({ rationale, proposedAction }: { rationale?: string; proposedAction: string }) {
  const column = (label: string, text: string) => (
    <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="body-sm-bold" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography variant="body-sm" sx={{ color: 'text.secondary' }}>
        {text}
      </Typography>
    </Box>
  );
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      {rationale != null && column('Rationale', rationale)}
      {column('Proposed actions', proposedAction)}
    </Box>
  );
}

export function ActionCard({
  type,
  title,
  category,
  rationale,
  proposedAction,
  added = false,
  onToggleAdd,
  assigned,
  details = [],
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  editing = false,
  onEdit,
  onConfirm,
  onFieldChange,
  onDelete,
}: ActionCardProps) {
  const [expandedState, setExpandedState] = React.useState(defaultExpanded);
  const expanded = expandedProp ?? (editing || expandedState);
  const toggle = () => {
    setExpandedState(!expanded);
    onExpandedChange?.(!expanded);
  };
  const detailsId = React.useId();

  if (type === 'summary') {
    return (
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'background.paper' }}>
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {assigned && <StatusTag type="success" size="medium" label="Assigned" sx={{ alignSelf: 'flex-start' }} />}
          <Heading category={category} title={title} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body-sm-bold" sx={{ color: 'text.secondary' }}>
              Proposed action
            </Typography>
            <Typography variant="body-sm" sx={{ color: 'text.primary' }}>
              {proposedAction}
            </Typography>
          </Box>
        </Box>
        <IconButton color="error" onClick={onDelete} aria-label={`Remove ${title} from the action plan`}>
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box
      component="article"
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: type === 'proposed' ? 3 : 2,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: '8px',
        boxShadow: 4,
      }}
    >
      {type === 'proposed' ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Heading title={title} />
            </Box>
            <Button
              size="small"
              variant={added ? 'contained' : 'outlined'}
              endIcon={added ? <CheckIcon /> : <AddIcon />}
              onClick={onToggleAdd}
              aria-pressed={added}
            >
              {added ? 'Added' : 'Add action to plan'}
            </Button>
          </Box>
          <Columns rationale={rationale} proposedAction={proposedAction} />
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
            {(assigned ?? true) ? <StatusTag type="success" size="medium" label="Assigned" /> : <span />}
            <Button
              size="small"
              variant="outlined"
              endIcon={editing ? <CheckCircleIcon /> : <EditIcon />}
              onClick={editing ? onConfirm : onEdit}
            >
              {editing ? 'Confirm' : 'Edit'}
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Heading category={category} title={title} />
            <Columns rationale={rationale} proposedAction={proposedAction} />
          </Box>
          <Box sx={{ borderTop: 1, borderColor: 'divider' }} />
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: expanded ? 2 : 0 }}>
            <ButtonBase
              onClick={toggle}
              aria-expanded={expanded}
              aria-controls={detailsId}
              sx={{
                justifyContent: 'space-between',
                gap: 3,
                borderRadius: '4px',
                '&.Mui-focusVisible': { outline: `2px solid ${colors.edgeTurquoise[500]}`, outlineOffset: 2 },
              }}
            >
              <Typography variant="body-md-bold" component="span" sx={{ color: colors.edgeTurquoise[700] }}>
                Implementation details
              </Typography>
              {expanded ? <ExpandLessIcon color="primary" /> : <ExpandMoreIcon color="primary" />}
            </ButtonBase>
            <Collapse in={expanded} id={detailsId}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {details.map((group, g) => (
                  <Box key={group.title} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="body-sm-bold" sx={{ color: 'text.primary' }}>
                      {group.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 5, alignItems: 'flex-start' }}>
                      {group.fields.map((field, f) =>
                        editing ? (
                          <TextField
                            key={field.label}
                            variant="standard"
                            label={field.label}
                            value={field.value}
                            onChange={(e) => onFieldChange?.(g, f, e.target.value)}
                            multiline
                            fullWidth
                          />
                        ) : (
                          <Box key={field.label} sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Typography variant="body-xs-regular" sx={{ color: 'text.secondary' }}>
                              {field.label}
                            </Typography>
                            <Typography variant="body-md" sx={{ color: 'text.primary' }}>
                              {field.value}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Box>
        </>
      )}
    </Box>
  );
}

export default ActionCard;
