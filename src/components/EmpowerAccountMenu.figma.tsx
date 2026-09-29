import { EmpowerAccountMenu } from './EmpowerAccountMenu';
import figma from '@figma/code-connect';

/**
 * EmpowerAccountMenu Connection
 * Maps the Figma `<EmpowerAccountMenu>` component (Header & Footer page,
 * node 3870:1522) to `<EmpowerAccountMenu>`. Inside `<EmpowerHeader>` the
 * menu is wired up by the header itself (userName/userRole/on*Click props).
 */
figma.connect(
  EmpowerAccountMenu,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=3870-1522',
  {
    example: () => (
      <EmpowerAccountMenu
        anchorEl={null /* the element the menu opens from */}
        open
        onClose={() => {}}
        name="Jane Doe"
        role="Admin"
        onFeedbackClick={() => {}}
        onResetPasswordClick={() => {}}
        onLogoutClick={() => {}}
      />
    ),
  }
);
