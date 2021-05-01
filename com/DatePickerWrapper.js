import React, {useState} from 'react';
import {Datepicker, Icon, Text} from '@ui-kitten/components';

const CalendarIcon = props => <Icon {...props} name="calendar" />;
const DatePickerWrapper = ({
  placeholder,
  onChange,
  validation,
  error,
  status,
  caption,
}) => {
  const [date, setDate] = useState(new Date());
  const [isError, showError] = useState(false);

  const onChangeHandler = value => {
    onChange(value);
    setDate(value);

    if (validation(value)) {
      showError(false);
    } else {
      showError(true);
    }
  };

  return (
    <Datepicker
      placeholder={placeholder}
      date={date}
      onSelect={value => {
        onChangeHandler(value);
      }}
      min={new Date('1850-12-17T03:24:00')}
      accessoryRight={CalendarIcon}
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
export default DatePickerWrapper;
