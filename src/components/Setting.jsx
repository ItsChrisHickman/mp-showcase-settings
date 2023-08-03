import * as React from 'react';
import { useEffect, useState } from 'react';
import RangeItem from './RangeItem';
import ValueItem from './ValueItem';
import OptionItem from './OptionItem';
import CheckBoxItem from './CheckBoxItem';

export default function Setting({ setting, sdk }) {
  const [settingType, setSettingType] = useState('');
  useEffect(() => {
    if (setting.rangeStart !== undefined) {
      setSettingType('range');
    } else if (setting.text !== undefined) {
      setSettingType('value');
    } else if (setting.options !== undefined) {
      setSettingType('option');
    } else {
      setSettingType('checkbox');
    }
  }, [setting]);

  return (
    <li>
      {settingType === 'range' && <RangeItem setting={setting} sdk={sdk} />}
      {settingType === 'value' && <ValueItem setting={setting} sdk={sdk} />}
      {settingType === 'option' && <OptionItem setting={setting} sdk={sdk} />}
      {settingType === 'checkbox' && (
        <CheckBoxItem setting={setting} sdk={sdk} />
      )}
    </li>
  );
}
