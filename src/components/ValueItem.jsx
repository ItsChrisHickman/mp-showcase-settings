import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

export default function ValueItem({ setting, sdk }) {
  const [text, setText] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      if (sdk !== null) {
        await sdk.App.state.waitUntil(
          (appState) => appState.phase === 'appphase.playing'
        );
        await sdk.Settings.get(setting.param).then((data) => {
          if (setting.param === 'fill' || setting.param === 'stroke') {
            setText(JSON.stringify(data));
          } else {
            setText(data);
          }
        });
      }
    };
    fetchData().catch(console.error);
  }, [sdk]);
  const handleChange = (event) => {
    if (event.target.name === 'stroke' || event.target.name === 'fill') {
      sdk.Settings.update(setting.param, JSON.parse(event.target.value));
      console.log(
        "sdk.Settings.update('" +
          setting.param +
          "', '" +
          JSON.parse(event.target.value) +
          "')"
      );
    } else {
      sdk.Settings.update(event.target.name, event.target.value);
      console.log(
        "sdk.Settings.update('" +
          setting.param +
          "', '" +
          event.target.value +
          "')"
      );
    }
    setText(event.target.value);
  };
  return (
    <>
      <TextField
        fullWidth
        type="text"
        label={setting.param}
        value={text}
        onChange={handleChange}
      />
    </>
  );
}
