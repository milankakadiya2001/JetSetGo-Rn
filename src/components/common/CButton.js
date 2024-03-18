//Library Imports
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

//Local Imports
import {getHeight} from '../../common/constants';
import {colors, styles} from '../../themes';
import CText from './CText';

export default function CButton({
  title,
  type = 'B16',
  color,
  onPress,
  containerStyle,
  style,
  children,
  bgColor = colors.primaryLight,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        localStyle.btnContainer,
        styles.rowCenter,
        containerStyle,
        bgColor && {backgroundColor: bgColor},
      ]}
      onPress={onPress}
      {...props}>
      <CText
        type={type}
        style={style}
        color={color ? color : colors.backgroundColor}>
        {title}
      </CText>
      {children}
    </TouchableOpacity>
  );
}

const localStyle = StyleSheet.create({
  btnContainer: {
    height: getHeight(52),
    borderRadius: getHeight(15),
    backgroundColor: colors.primaryDark,
  },
});
