import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Card} from '@ui-kitten/components';

import Utils from '../utils/utils';

import Header from './Header';
import Footer from './Footer';

import FormField from './FormField';

const FormPrincipal = () => {
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

  const updateValues = (key, value) => {
    // console.log(key, value);
    let copy = {...formValues};

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
    //console.log(formValues);
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
        <FormField
          type="text"
          name="prefix"
          placeholder="Prefix i.e. Mr, Mrs"
          value={formValues.prefix}
          onChange={updateValues}
        />

        <FormField
          type="select"
          name="gender"
          placeholder="Choose Gender"
          options={['Choose Gender', 'Male', 'Female']}
          value={formValues.prefix}
          onChange={updateValues}
          status="danger"
          error="Gender was not selected"
          validation={Utils.validateGender}
        />

        <FormField
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formValues.firstName}
          onChange={updateValues}
          caption="Enter the first name"
          error="Must be greather than 3"
          status="danger"
          validation={Utils.validateLen}
        />

        <FormField
          type="text"
          name="middleName"
          placeholder="Middle Name"
          value={formValues.prefix}
          onChange={updateValues}
        />

        <FormField
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formValues.lastName}
          onChange={updateValues}
          caption="Enter the last name"
          error="Must be greather than 3"
          status="danger"
          validation={Utils.validateLen}
        />

        <FormField
          type="text"
          name="postfix"
          placeholder="Postfix i.e. Dr., Jr., II"
          value={formValues.postfix}
          onChange={updateValues}
        />

        <FormField
          type="date"
          name="dob"
          placeholder="mm/dd/yyyy"
          value={formValues.dob}
          onChange={updateValues}
          caption="Enter a date of birth or SSN."
          error="Must be older than 18"
          status="warning"
          validation={Utils.validateAge}
        />

        <FormField
          type="text"
          name="ssn"
          placeholder="SSN: (000-00-0000)"
          value={formValues.ssn}
          onChange={updateValues}
          caption="Enter a social security number or Dob."
          error="Must be 9 digits"
          status="warning"
          validation={Utils.validateSSN}
          formatter={Utils.getSSNFormat}
        />

        <FormField
          type="text"
          name="email"
          placeholder="your@email.com"
          value={formValues.email}
          onChange={updateValues}
          caption="Email"
          error="Email is not valid"
          status="danger"
          validation={Utils.validateEmail}
        />

        <FormField
          type="text"
          name="phone"
          placeholder="(949) 390-3036"
          value={formValues.phone}
          onChange={updateValues}
        />

        <FormField
          type="text"
          name="phoneAlt"
          placeholder="Alternate Phone (000) 000-0000 (EVC)"
          value={formValues.phoneAlt}
          onChange={updateValues}
          caption="Enter secondary EVC phone number (Not Required)."
        />
      </Card>
    </ScrollView>
  );
};

export default FormPrincipal;
