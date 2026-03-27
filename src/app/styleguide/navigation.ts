export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    group: 'Foundations',
    items: [{ label: 'Design Tokens', href: '/styleguide' }],
  },
  {
    group: 'Components',
    items: [
      { label: 'Button', href: '/styleguide/button' },
      { label: 'Chip', href: '/styleguide/chip' },
      { label: 'TextField', href: '/styleguide/textfield' },
      { label: 'Alert', href: '/styleguide/alert' },
      { label: 'Badge', href: '/styleguide/badge' },
    ],
  },
];
