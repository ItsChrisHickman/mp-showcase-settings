import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Setting } from './Setting';

export function SettingsList({ sdk }) {
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
          component="fieldset"
          key={section.section}
          sx={{
            backgroundColor: '#000',
            '&:hover': {
              backgroundColor: '#111',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <legend>{section.section}</legend>
          <ul id="settings">
            {section.settings.map((setting, index2) => (
              <Setting key={index2} setting={setting} index={index} sdk={sdk} />
            ))}
          </ul>
        </Box>
      ))}
    </>
  );
}
