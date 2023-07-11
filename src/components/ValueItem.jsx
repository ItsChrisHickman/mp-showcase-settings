import * as React from 'react';
import { useEffect, useState } from 'react';

export function ValueItem({ setting, sdk }) {
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
      sdk.Settings.update(event.target.name, JSON.parse(event.target.value));
      console.log(
        "sdk.Settings.update('" +
          event.target.name +
          "', '" +
          JSON.parse(event.target.value) +
          "')"
      );
    } else {
      sdk.Settings.update(event.target.name, event.target.value);
      console.log(
        "sdk.Settings.update('" +
          event.target.name +
          "', '" +
          event.target.value +
          "')"
      );
    }
  };
  return (
    <label>
      <input
        type="text"
        name={setting.param}
        value={text}
        onChange={handleChange}
      />
      {setting.param}
    </label>
  );
}
