import React, {useState} from 'react';
import {View} from 'react-native';

import InputWrapper from './InputWrapper';
import SelectWrapper from './SelectWrapper';
import DatePickerWrapper from './DatePickerWrapper';

const FormField = ({
  placeholder,
  name,
  value,
  onChange,
  caption,
  error = '',
  status = 'basic',
  validation = null,
  type,
  options = [],
  formatter = null,
}) => {
  const dynamicHeight = () => {
    const noCaptionHeightGap = 58;
    const withCaptionHeightGap = 72;
    let h;
    if (caption) {
      h = withCaptionHeightGap;
    } else {
      h = noCaptionHeightGap;
    }
    return h;
  };

  // render
  let node;
  switch (type) {
    case 'text':
      node = (
        <View style={{height: dynamicHeight()}}>
          <InputWrapper
            placeholder={placeholder}
            value={value}
            onChange={value => {
              onChange(name, value);
            }}
            caption={caption}
            error={error}
            status={status}
            validation={validation}
            formatter={formatter}
          />
        </View>
      );
      break;
    case 'select':
      node = (
        <View style={{height: dynamicHeight()}}>
          <SelectWrapper
            placeholder={placeholder}
            options={options}
            onChange={value => onChange(name, value)}
            caption={caption}
            status={status}
            error={error}
            validation={validation}
          />
        </View>
      );
      break;
    case 'date':
      node = (
        <View style={{height: dynamicHeight()}}>
          <DatePickerWrapper
            placeholder={placeholder}
            onChange={value => onChange(name, value)}
            caption={caption}
            status={status}
            error={error}
            validation={validation}
          />
        </View>
      );
      break;
  }

  return node;
};
export default FormField;
