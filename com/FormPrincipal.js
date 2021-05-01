import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Card, Input} from '@ui-kitten/components';

import Utils from '../utils/utils';
import SelectWrapper from './SelectWrapper';
import DatePickerWrapper from './DatePickerWrapper';

import Header from './Header';
import Footer from './Footer';
import ErrorMessageCaption from './ErrorMessageCaption';
import InputWrapper from './InputWrapper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    color: '#333',
    fontWeight: '700',
  },
  likeButton: {
    marginVertical: 16,
  },
});

const FormPrincipal = props => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formValues, setformValues] = useState({
    prefix: '',
    gender: '',
    firstName: '',
    middleName: '',
    lastName: '',
    postfix: '',
    dob: null,
    ssn: '',
    email: '',
    phone: '',
    phoneAlt: '',
  });

  const noCaptionHeightGap = 58;
  const withCaptionHeightGap = 72;

  const updateValues = (key, value) => {
    let copy = {...formValues};
    //console.log(copy);
    copy[key] = value;

    let formIsValid,
      checkGender,
      checkEmail,
      checkFirstName,
      checkLastName,
      chekDob,
      checkSsn = false;
    //rules
    for (let key in copy) {
      //console.log(key, formValues[key]);
      switch (key) {
        case 'gender':
          checkGender = Utils.validateGender(copy.gender);
          break;
        case 'email':
          checkEmail = Utils.validateEmail(copy.email);
          break;
        case 'firstName':
          checkFirstName = Utils.validateLen(copy.firstName);
          break;
        case 'lastName':
          checkLastName = Utils.validateLen(copy.lastName);
          break;
        case 'dob':
          chekDob = Utils.validateAge(copy.dob);
          break;
        case 'ssn':
          checkSsn = Utils.validateSSN(copy.ssn);
          break;
      }
    }

    if (
      checkGender &&
      checkEmail &&
      checkFirstName &&
      checkLastName &&
      (chekDob || checkSsn)
    ) {
      console.log('OK');
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }

    setformValues(copy);
  };

  const postData = () => {
    console.log('=====[ POST ]=======');
    console.log(formValues);
    console.log('============');
  };

  return (
    <ScrollView>
      <Card
        appearance="outline"
        header={Header}
        footer={() => (
          <Footer action={() => postData()} disabled={!formIsValid} />
        )}>
        <View style={{height: noCaptionHeightGap}}>
          <Input
            placeholder="Prefix i.e. Mr, Mrs"
            value={formValues.prefix}
            onChangeText={value => updateValues('prefix', value)}
          />
        </View>
        <View style={{height: withCaptionHeightGap}}>
          <SelectWrapper
            placeholder="Choose Gender"
            options={['Choose Gender', 'Male', 'Female']}
            onChange={value => updateValues('gender', value)}
            caption=""
            status="danger"
            error="Gender was not selected"
            validation={Utils.validateGender}
          />
        </View>

        <View style={{height: withCaptionHeightGap}}>
          <InputWrapper
            placeholder="First Name"
            value={formValues.firstName}
            onChange={value => {
              updateValues('firstName', value);
            }}
            caption="Enter the first name"
            error="Must be greather than 3"
            status="danger"
            validation={Utils.validateLen}
          />
        </View>
        <View style={{height: noCaptionHeightGap}}>
          <Input
            placeholder="Middle Name"
            onChangeText={value => updateValues('middleName', value)}
          />
        </View>
        <View style={{height: withCaptionHeightGap}}>
          <InputWrapper
            placeholder="Last Name"
            value={formValues.lastName}
            onChange={value => {
              updateValues('lastName', value);
            }}
            caption="Enter the last name"
            error="Must be greather than 3"
            status="danger"
            validation={Utils.validateLen}
          />
        </View>
        <View style={{height: noCaptionHeightGap}}>
          <Input
            placeholder="Postfix i.e. Dr., Jr., II"
            onChangeText={value => updateValues('postfix', value)}
          />
        </View>
        <View style={{height: withCaptionHeightGap}}>
          <DatePickerWrapper
            placeholder="mm/dd/yyyy"
            onChange={value => updateValues('dob', value)}
            caption="Enter a date of birth or SSN."
            error="Must be older than 18"
            status="warning"
            validation={Utils.validateAge}
          />
        </View>
        <View style={{height: withCaptionHeightGap}}>
          <InputWrapper
            placeholder="SSN: (000-00-0000)"
            value={formValues.ssn}
            onChange={value => {
              updateValues('ssn', value);
            }}
            caption="Enter a social security number or Dob."
            error="Must be 9 digits"
            status="warning"
            validation={Utils.validateSSN}
            formatter={Utils.getSSNFormat}
          />
        </View>
        <View style={{height: withCaptionHeightGap}}>
          <InputWrapper
            placeholder="your@email.com"
            value={formValues.email}
            onChange={value => {
              updateValues('email', value);
            }}
            caption="Email"
            error="Email is not valid"
            status="danger"
            validation={Utils.validateEmail}
          />
        </View>
        <View style={{height: noCaptionHeightGap}}>
          <Input
            placeholder="(949) 390-3036"
            onChangeText={value => updateValues('phone', value)}
          />
        </View>
        <View style={{height: withCaptionHeightGap}}>
          <Input
            placeholder="Alternate Phone (000) 000-0000 (EVC)"
            onChangeText={value => updateValues('phoneAlt', value)}
            caption="Enter secondary EVC phone number (Not Required)."
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default FormPrincipal;
