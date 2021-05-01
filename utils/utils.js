import moment from 'moment';

class Utils {
  validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  getNumbersOnly = text => {
    return text.replace(/[^0-9]/g, '');
  };

  getSSNFormat = value => {
    const patt = new RegExp('d{3}[-]d{2}[-]d{4}');
    let formattedValue;

    const res = patt.test(value);
    if (!res) {
      formattedValue = value
        .match(/\d*/g)
        .join('')
        .match(/(\d{0,3})(\d{0,2})(\d{0,4})/)
        .slice(1)
        .join('-')
        .replace(/-*$/g, '');
    } else {
      formattedValue = value;
    }
    return formattedValue;
  };

  validateSSN = value => {
    return value.length === 11;
  };

  validateLen = value => {
    return value.length >= 3;
  };

  validateAge = value => {
    return moment().diff(value, 'years') >= 18;
  };

  validateGender = value => {
    return value === 'Male' || value === 'Female';
  };
}
export default new Utils();
