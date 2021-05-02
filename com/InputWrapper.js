import React, {useState} from 'react';

import {Input, Text} from '@ui-kitten/components';

const InputWrapper = ({
  placeholder,
  value,
  onChange,
  validation,
  formatter,
  error,
  caption,
  status,
}) => {
  const [isError, showError] = useState(false);

  const onChangeHandler = value => {
    if (formatter) {
      onChange(formatter(value));
    } else {
      onChange(value);
    }

    if (validation && validation(value)) {
      showError(false);
    } else {
      showError(true);
    }
  };

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={value => onChangeHandler(value)}
      status={isError ? status : 'basic'}
      caption={() =>
        isError ? (
          <Text status={status}>{error}</Text>
        ) : (
          <Text status="info">{caption}</Text>
        )
      }
    />
  );
};
export default InputWrapper;
