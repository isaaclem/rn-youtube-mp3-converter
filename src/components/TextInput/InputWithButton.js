import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, TextInput, Platform } from 'react-native';
import color from 'color';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#f5f5f5';
const ICON_SIZE = 23;

const InputWithButton = (props) => {
  const { onPress, editable = true, textColor } = props;

  const underlayColor = color('#ff0000').darken(0.1);

  const containerStyle = [styles.container];
  const buttonTextStyles = [styles.buttonText];

  if (textColor) {
    buttonTextStyles.push({ color: textColor });
  }
  if (editable === false) {
    containerStyle.push(styles.containerDisabled);
  }

  return (
    <View style={containerStyle}>
      <TextInput 
        style={styles.input} 
        underlineColorAndroid='transparent' 
        editable={editable} 
        {...props} 
      />
      <View style={styles.border} />
      <TouchableHighlight 
        underlayColor={underlayColor} 
        style={styles.buttonContainer} 
        onPress={onPress}
      >
        <View style={{ paddingHorizontal: 16 }}>
          <Ionicons name={`${ICON_PREFIX}-search`} color={ICON_COLOR} size={ICON_SIZE} />
        </View>
      </TouchableHighlight>
    </View>
  );
};

InputWithButton.propTypes = {
  onPress: PropTypes.func,
  buttonText: PropTypes.string,
  editable: PropTypes.bool
};

export default InputWithButton;
