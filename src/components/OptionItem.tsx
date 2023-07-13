import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export function OptionItem({ setting, sdk }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      if (sdk !== null) {
        await sdk.App.state.waitUntil(
          (appState) => appState.phase == 'appphase.playing'
        );
        await sdk.Settings.get(setting.param).then((data) => {
          if (data === null) {
            data = '';
          }
          setValue(data);
        });
      }
    };
    fetchData().catch(console.error);
  }, [sdk]);
  const handleChange = (event) => {
    sdk.Settings.update(setting.param, event.value);
    console.log(
      "sdk.Settings.update('" + setting.param + "', '" + event.value + "')"
    );
  };
  const dropDownOptions = setting.options.map((x) => ({
    label: x,
    value: x,
  }));
  return (
    <>
      <TextField select fullWidth label={setting.param} value={value}>
        {dropDownOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
