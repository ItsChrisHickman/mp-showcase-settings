import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Item from '@mui/material/Item';
import Setting from './Setting';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  lineHeight: '40px',
}));

export default function SettingsList({ sdk }) {
  const [settings, setSettings] = useState([]);
  // The Effect Hook lets you perform side effects in function components:
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('settings.json');
      const responseJson = await response.json();
      setSettings(responseJson);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <>
      {settings.map((section, index) => (
        <Box
          key={'box' + index}
          sx={{
            width: '100%',
            p: 2,
            bgcolor: 'background.default',
          }}
        >
          <Item
            key={index}
            elevation={5}
            sx={{ width: '100%', padding: '1rem' }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              {section.section}
            </Typography>
            <ul id="settings">
              {section.settings.map((setting, index2) => (
                <Setting
                  key={index2}
                  setting={setting}
                  index={index}
                  sdk={sdk}
                />
              ))}
            </ul>
          </Item>
        </Box>
      ))}
    </>
  );
}
