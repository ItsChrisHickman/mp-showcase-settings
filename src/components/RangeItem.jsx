import * as React from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';

export default function RangeItem({ setting, sdk }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if (sdk !== null) {
        await sdk.App.state.waitUntil(
          (appState) => appState.phase == 'appphase.playing'
        );
        await sdk.Settings.get(setting.param).then((data) => {
          if (data === null) {
            console.log('Warning - ' + setting.param + ' returned NULL');
            data = 0;
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
  return (
    <>
      <Typography gutterBottom>{setting.param}</Typography>
      <Slider
        value={value}
        aria-label={setting.param}
        min={setting.rangeStart}
        max={setting.rangeEnd}
        step={setting.rangeStep || 1}
        valueLabelDisplay="auto"
        onChange={handleChange}
      />
    </>
  );
}
