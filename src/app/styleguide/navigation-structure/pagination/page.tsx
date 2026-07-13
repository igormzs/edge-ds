'use client';

import { Pagination, Stack, Box, Typography } from '@mui/material';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

// Left-aligned example wrapper — mirrors the one used on the Breadcrumbs
// page. PreviewGroup (DocUI) centers its content/label, which doesn't suit a
// horizontal nav control like Pagination. Kept local to this page rather
// than changing the shared DocUI primitive used by other doc pages.
function Example({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
      {children}
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 11,
          color: '#9e9e9e',
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

const codeSnippet = `import Pagination from '@mui/material/Pagination';

// Basic
<Pagination count={10} />

// Controlled
const [page, setPage] = useState(1);
<Pagination count={10} page={page} onChange={(e, value) => setPage(value)} />

// Color
<Pagination count={10} color="primary" />
<Pagination count={10} color="secondary" />

// Variant + shape
<Pagination count={10} variant="outlined" shape="rounded" />

// Size
<Pagination count={10} size="small" />
<Pagination count={10} size="large" />

// First / last buttons
<Pagination count={10} showFirstButton showLastButton />

// Disabled
<Pagination count={10} disabled />

// Accessible labelling (screen readers)
<Pagination
  count={10}
  aria-label="pagination navigation"
  getItemAriaLabel={(type, page, selected) => {
    if (type === 'page') {
      return \`\${selected ? 'current page, ' : 'go to '}page \${page}\`;
    }
    return \`go to \${type} page\`;
  }}
/>`;

const paginationPropRows: PropRow[] = [
  {
    prop: 'count',
    type: 'number',
    default: '1',
    description: 'The total number of pages.',
  },
  {
    prop: 'page',
    type: 'number',
    default: '1',
    description: 'The current page, for controlled usage. Pair with onChange.',
  },
  {
    prop: 'onChange',
    type: '(event, page: number) => void',
    default: '—',
    description: 'Called when the user selects a page, or Previous/Next/First/Last.',
  },
  {
    prop: 'color',
    type: '"standard" | "primary" | "secondary"',
    default: '"standard"',
    description: 'Accent applied only to the currently selected page item.',
  },
  {
    prop: 'variant',
    type: '"text" | "outlined"',
    default: '"text"',
    description: 'Text is borderless; outlined draws a border around each item.',
  },
  {
    prop: 'shape',
    type: '"circular" | "rounded"',
    default: '"circular"',
    description: 'Corner treatment of each page item.',
  },
  {
    prop: 'size',
    type: '"small" | "medium" | "large"',
    default: '"medium"',
    description: 'Controls item diameter — 26px / 32px / 40px.',
  },
  {
    prop: 'showFirstButton / showLastButton',
    type: 'boolean',
    default: 'false',
    description: 'Show a jump-to-first / jump-to-last control at each end.',
  },
  {
    prop: 'hidePrevButton / hideNextButton',
    type: 'boolean',
    default: 'false',
    description: 'Hide the previous / next arrow controls.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables every item in the control.',
  },
  {
    prop: 'boundaryCount / siblingCount',
    type: 'number',
    default: '1',
    description: 'How many pages to show at the start/end, and around the current page, before collapsing the rest behind "…".',
  },
  {
    prop: 'getItemAriaLabel',
    type: '(type, page, selected) => string',
    default: 'built-in English labels',
    description: 'Override the accessible name announced for each item — required for i18n.',
  },
];

export default function PaginationPage() {
  return (
    <Box>
      <PageHeader
        title="Pagination"
        description="Pagination lets a user navigate between pages of content. It's built from a row of PaginationItem buttons — page numbers, Previous/Next arrows, and optional first/last jumps — with the current page marked via aria-current."
        muiLink="https://mui.com/material-ui/react-pagination/"
      />

      {/* Visual Variants */}
      <DocSection title="Visual Variants">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <Example label="Text variant (default)">
              <Pagination count={10} variant="text" />
            </Example>

            <Example label="Outlined variant">
              <Pagination count={10} variant="outlined" />
            </Example>

            <Example label="Rounded shape">
              <Pagination count={10} variant="outlined" shape="rounded" />
            </Example>

            <Example label="Color — primary">
              <Pagination count={10} color="primary" />
            </Example>

            <Example label="Color — secondary">
              <Pagination count={10} color="secondary" variant="outlined" />
            </Example>

            <Example label="Sizes — small, medium, large">
              <Stack direction="row" spacing={3} alignItems="center">
                <Pagination count={10} size="small" color="primary" />
                <Pagination count={10} size="medium" color="primary" />
                <Pagination count={10} size="large" color="primary" />
              </Stack>
            </Example>

            <Example label="With first / last jump buttons">
              <Pagination count={10} showFirstButton showLastButton color="primary" />
            </Example>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Interactive States */}
      <DocSection title="Interactive States">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <Example label="Selected page — hover the other items">
              <Pagination count={10} page={4} color="primary" />
            </Example>

            <Example label="Disabled">
              <Pagination count={10} page={4} color="primary" disabled />
            </Example>

            <Example label="Collapsed — many pages, boundaryCount/siblingCount trimmed">
              <Pagination count={20} page={10} siblingCount={1} boundaryCount={1} color="primary" />
            </Example>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Props */}
      <DocSection title="Key Props">
        <PropsTable rows={paginationPropRows} />
      </DocSection>

      {/* Code */}
      <DocSection title="Usage">
        <CodeBlock code={codeSnippet} />
      </DocSection>

      {/* Accessibility */}
      <DocSection title="Accessibility Notes">
        <PreviewCanvas>
          <Stack spacing={1.5} sx={{ width: '100%' }}>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Set <code>aria-label=&quot;pagination navigation&quot;</code> on the root — it renders a <code>&lt;nav&gt;</code> landmark, and a plain &quot;pagination&quot; label doesn&apos;t tell screen-reader users what is being paginated.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • The current page item automatically gets <code>aria-current=&quot;page&quot;</code> — don&apos;t rely on color alone (contrast/shape already reinforce it) to communicate which page is active.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Previous/Next/First/Last arrows are icon-only — MUI ships default English labels (&quot;Go to previous page&quot;, etc.) via <code>getItemAriaLabel</code>. Override it for any non-English locale.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Every item is a real, individually focusable button — keyboard users can Tab through pages and activate one with Enter/Space, no custom key handling needed.
            </Typography>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}>
              • Disabled items are removed from the tab order — confirm that a disabled Pagination still communicates why (e.g. a loading state) via surrounding page copy, not just dimmed buttons.
            </Typography>
          </Stack>
        </PreviewCanvas>
      </DocSection>
    </Box>
  );
}
