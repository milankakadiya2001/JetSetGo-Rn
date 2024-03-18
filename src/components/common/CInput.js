import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Local Imports
import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import typography from '../../themes/typography';

export default CInput = props => {
  let {
    _value,
    inputContainerStyle,
    toGetTextFieldValue,
    placeHolder,
    inputBoxStyle,
    onPressRightIcon,
  } = props;

  // Change Text Input Value
  const onChangeText = val => {
    toGetTextFieldValue(val);
  };

  return (
    <View style={styles.mv10}>
      <View style={[localStyle.inputContainer, inputContainerStyle]}>
        <Ionicons
          name={'search-outline'}
          size={moderateScale(20)}
          color={colors.textPlaceholder}
          style={styles.pr10}
        />
        <TextInput
          value={_value}
          defaultValue={_value}
          placeholderTextColor={colors.textPlaceholder}
          onChangeText={onChangeText}
          placeholder={placeHolder}
          style={[localStyle.inputBox, inputBoxStyle]}
          {...props}
        />
        {/* Right Icon And Content Inside TextInput */}
        <TouchableOpacity onPress={onPressRightIcon} style={styles.pl10}>
          <Ionicons
            name={'filter-outline'}
            size={moderateScale(20)}
            color={colors.textPlaceholder}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const localStyle = StyleSheet.create({
  inputBox: {
    ...typography.fontSizes.f14,
    ...typography.fontWeights.Medium,
    ...styles.flex,
    color: colors.backgroundColor,
    height: getHeight(52),
    textAlign: 'left',
  },
  inputContainer: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    ...styles.rowSpaceBetween,
    ...styles.ph15,
    width: '100%',
    borderColor: colors.bColor,
    height: getHeight(52),
  },
});
