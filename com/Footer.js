import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@ui-kitten/components';

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});

const Footer = ({action, disabled}) => (
  <View style={styles.footerContainer}>
    <Button
      disabled={disabled}
      style={styles.footerControl}
      size="small"
      onPress={() => action()}>
      Pull Credit Score
    </Button>
  </View>
);
export default Footer;
