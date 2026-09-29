import { EmpowerHeader, type HeaderPlatform } from './EmpowerHeader';
import figma from '@figma/code-connect';

/**
 * EmpowerHeader Connection
 * Maps the Figma `<EmpowerHeader>` component set (Header & Footer page,
 * node 3757:1798) to `<EmpowerHeader>`. Tabs are rendered by the component
 * itself, so `<EmpowerHeaderTab>` has no separate connection. The account
 * dropdown is `<EmpowerAccountMenu>` (see EmpowerAccountMenu.figma.tsx).
 */
figma.connect(
  EmpowerHeader,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=3757-1798',
  {
    props: {
      selected: figma.enum('Selected', {
        None: undefined,
        Insights: 'insights',
        Knowledge: 'knowledge',
        Connections: 'connections',
        Certifications: 'certifications',
        Compliance: 'compliance',
      }),
      company: figma.string('Company'),
      period: figma.string('Period'),
      defaultAccountMenuOpen: figma.enum('Account Menu', { Closed: undefined, Open: true }),
    },
    example: ({ selected, company, period, defaultAccountMenuOpen }) => (
      <EmpowerHeader
        selected={selected as HeaderPlatform | undefined}
        company={company}
        period={period}
        userName="Jane Doe"
        userRole="Admin"
        onFeedbackClick={() => {}}
        onResetPasswordClick={() => {}}
        onLogoutClick={() => {}}
        defaultAccountMenuOpen={defaultAccountMenuOpen}
      />
    ),
  }
);
