import * as React from 'react';
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function OptionItem({ setting, sdk }) {
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
    setValue(event.target.value);
    sdk.Settings.update(setting.param, event.target.value);
    console.log(
      "sdk.Settings.update('" +
        setting.param +
        "', '" +
        event.target.value +
        "')"
    );
  };
  const dropDownOptions = setting.options.map((x) => ({
    label: x,
    value: x,
  }));
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{setting.param}</InputLabel>
        <Select label={setting.param} value={value} onChange={handleChange}>
          {dropDownOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
