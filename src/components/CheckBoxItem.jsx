import * as React from 'react';
import { useEffect, useState } from 'react';

export function CheckBoxItem({ setting, sdk }) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (sdk !== null) {
        await sdk.App.state.waitUntil(
          (appState) => appState.phase === 'appphase.playing'
        );
        await sdk.Settings.get(setting.param).then((data) => {
          setChecked(data);
        });
      }
    };
    fetchData().catch(console.error);
  }, [sdk]);
  const handleChange = (event) => {
    setChecked(!checked);
    sdk.Settings.update(event.target.name, event.target.checked);
    console.log(
      "sdk.Settings.update('" +
        event.target.name +
        "', '" +
        event.target.checked +
        "')"
    );
  };
  return (
    <label>
      <input
        type="checkbox"
        name={setting.param}
        checked={checked}
        onChange={handleChange}
      />
      {setting.param}
    </label>
  );
}
