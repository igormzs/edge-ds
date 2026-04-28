import { StatusTag } from './StatusTag';
import figma from '@figma/code-connect';

/**
 * Status Tag Connection
 * Maps the Figma "Status Tag" component set to our themed StatusTag component.
 * Figma: https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=422:4087
 */
figma.connect(
  StatusTag,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=422:4087',
  {
    props: {
      type: figma.enum('type', {
        Success: 'success',
        Error: 'error',
        Info: 'info',
        Warning: 'warning',
        Neutral: 'neutral',
      }),
      size: figma.enum('size', {
        Large: 'large',
        Medium: 'medium',
        Small: 'small',
      }),
      showIcon: figma.boolean('icon'),
    },
    example: ({ type, size, showIcon }) => (
      <StatusTag 
        type={type} 
        size={size} 
        showIcon={showIcon} 
        label="STATUS" 
      />
    ),
  }
);
