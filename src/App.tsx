import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Showcase } from './components/Showcase';
import { SettingsList } from './components/SettingsList';
export default function App() {
  const [sdk, setSdk] = useState(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.matterport.com/showcase-sdk/latest.js';
    document.body.appendChild(script);
    return () => {
      // clean up the script when the component in unmounted
      document.body.removeChild(script);
    };
  }, []);

  function handleConnect(mpSdk) {
    console.log('SDK Connected and Loaded', mpSdk);
    setSdk(mpSdk);
  }

  return (
    <div className="App">
      <header>
        <h1>Showcase Settings</h1>
        <a href="https://goshow.me">GoShow.me</a>
      </header>
      <Showcase onConnect={handleConnect} />
      <footer className="footer">
        <a name="about"></a>
        <p>
          The Settings Namespace is undefined and the any togglable settings are
          unsupported. This means that they are not guaranteed to always be
          there, nor to function properly at all times. This example is a
          playground to show and test all of the settings.
          <a href="showcase-settings.zip">Download</a>
        </p>
        <SettingsList sdk={sdk} />
        <p>
          <b>Changelog</b>
        </p>
        <ul>
          <li>2023/07/09 - Refactored with React.js</li>
          <li>
            2022/12/20 - Added deserialization for fill and stroke -- Cannot
            figure out how to get these values to update however...
          </li>
          <li>2022/10/27 - Text Inputs and Select Boxes are now active.</li>
        </ul>
        <p>
          <b>To-Do</b>
        </p>
        <ul>
          <li>Tooltips on settings to explain what the setting does.</li>
        </ul>
      </footer>
    </div>
  );
}
