import * as React from 'react';
import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBoxItem({ setting, sdk }) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (sdk !== null) {
        await sdk.App.state.waitUntil(
          (appState) => appState.phase === 'appphase.playing'
        );
        await sdk.Settings.get(setting.param).then((data) => {
          if (data === null) {
            console.log('Warning - ' + setting.param + ' returned NULL');
            data = false;
          }
          setChecked(data);
        });
      }
    };
    fetchData().catch(console.error);
  }, [sdk]);
  const handleChange = (event) => {
    setChecked(!checked);
    sdk.Settings.update(setting.param, event.target.checked);
    console.log(
      "sdk.Settings.update('" +
        setting.param +
        "', '" +
        event.target.checked +
        "')"
    );
  };
  const label = { inputProps: { 'aria-label': setting.param } };
  return (
    <>
      <FormControlLabel
        control={
          <Switch {...label} checked={checked} onChange={handleChange} />
        }
        label={setting.param}
      />
    </>
  );
}
