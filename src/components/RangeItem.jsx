import * as React from 'react';
import { useEffect, useState } from 'react';

export function RangeItem({ setting, sdk }) {
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
    sdk.Settings.update(event.target.name, event.target.value);
    console.log(
      "sdk.Settings.update('" +
        event.target.name +
        "', '" +
        event.target.value +
        "')"
    );
  };
  return (
    <label>
      <input
        type="text"
        id={setting.param}
        name={setting.param}
        onChange={handleChange}
        value={value}
      />
      {setting.param}
    </label>
  );
}
