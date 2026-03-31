'use client';

import { ThemeProvider, CssBaseline, Box, Drawer, List, ListItem, ListSubheader, Typography, Divider } from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import brandTheme from '@/theme/brandTheme';
import { navigation } from './navigation';

const SIDEBAR_WIDTH = 260;

export default function StyleguideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ThemeProvider theme={brandTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              boxSizing: 'border-box',
              bgcolor: '#0e1a1f',
              color: '#ffffff',
              borderRight: '1px solid rgba(255,255,255,0.08)',
            },
          }}
        >
          {/* Logo / Brand header */}
          <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 700,
                color: '#009f9b',
                letterSpacing: 1,
                fontSize: 18,
              }}
            >
              EDGE Design System
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
              Component Library
            </Typography>
          </Box>

          {/* Navigation groups */}
          <Box sx={{ overflowY: 'auto', flex: 1, py: 1 }}>
            {navigation.map((group) => (
              <Box key={group.group}>
                <List
                  subheader={
                    <ListSubheader
                      sx={{
                        bgcolor: 'transparent',
                        color: 'rgba(255,255,255,0.35)',
                        fontFamily: '"Open Sans", sans-serif',
                        fontWeight: 600,
                        fontSize: 10,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        lineHeight: '32px',
                        px: 3,
                        mt: 1,
                      }}
                    >
                      {group.group}
                    </ListSubheader>
                  }
                  disablePadding
                >
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <ListItem key={item.href} disablePadding>
                        <Box
                          component={NextLink}
                          href={item.href}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            px: 3,
                            py: 1,
                            textDecoration: 'none',
                            color: active ? '#009f9b' : 'rgba(255,255,255,0.75)',
                            bgcolor: active ? 'rgba(0,159,155,0.1)' : 'transparent',
                            borderLeft: active ? '3px solid #009f9b' : '3px solid transparent',
                            fontFamily: '"Open Sans", sans-serif',
                            fontWeight: active ? 600 : 400,
                            fontSize: 14,
                            transition: 'all 0.15s ease',
                            '&:hover': {
                              color: '#ffffff',
                              bgcolor: 'rgba(255,255,255,0.06)',
                            },
                          }}
                        >
                          {item.label}
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: 2, my: 0.5 }} />
              </Box>
            ))}
          </Box>
        </Drawer>

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: '100vh',
            bgcolor: 'surface.default', // Using Semantic/Surface/Default token
            p: { xs: 3, md: 6 },
            width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
