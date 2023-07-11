import * as React from 'react';
import { useEffect, useState } from 'react';

export function OptionItem({ setting, sdk }) {
  const [value, setValue] = useState('');
  const [dropDownOptions, setDropDownOptions] = useState([]);
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
    const dropDownOptions = setting.options.map((x) => ({
      label: x,
      value: x,
    }));
    setDropDownOptions(dropDownOptions);
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
      <select
        id={setting.param}
        name={setting.param}
        onChange={handleChange}
        defaultValue={value}
        options={dropDownOptions}
      >
        {setting.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {setting.param}
    </label>
  );
}
