import React, {useState} from 'react';

import {IndexPath, Select, SelectItem, Text} from '@ui-kitten/components';

const SelectWrapper = ({
  options,
  onChange,
  placeholder,
  validation,
  error,
  status,
  caption,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  const [isError, showError] = useState(false);

  const onChangeHandler = value => {
    onChange(value);
    if (validation(value)) {
      showError(false);
    } else {
      showError(true);
    }
  };

  const renderOption = title => <SelectItem key={title} title={title} />;

  return (
    <Select
      placeholder={placeholder}
      selectedIndex={selectedIndex}
      value={options[selectedIndex.row]}
      status={isError ? status : 'basic'}
      caption={() =>
        isError ? (
          <Text status="danger">{error}</Text>
        ) : (
          <Text status="info">{caption}</Text>
        )
      }
      onSelect={index => {
        const value = options[index.row];
        onChangeHandler(value);
        setSelectedIndex(index);
      }}>
      {options.map(renderOption)}
    </Select>
  );
};
export default SelectWrapper;
