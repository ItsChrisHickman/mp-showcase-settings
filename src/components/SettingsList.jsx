import * as React from 'react';
import { useEffect, useState } from 'react';
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
        <fieldset key={section.section}>
          <legend key={section.section}>{section.section}</legend>
          <ul id="settings">
            {section.settings.map((setting, index2) => (
              <Setting key={index2} setting={setting} index={index} sdk={sdk} />
            ))}
          </ul>
        </fieldset>
      ))}
    </>
  );
}
