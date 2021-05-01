import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';

const styles = StyleSheet.create({
  title: {
    color: '#333',
    fontWeight: '700',
  },
});

const Header = props => (
  <View {...props}>
    <Text style={styles.title}>Principal</Text>
  </View>
);
export default Header;
