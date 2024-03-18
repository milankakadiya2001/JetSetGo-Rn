import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ActionSheet from 'react-native-actions-sheet';

// Local Imports
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import CText from '../common/CText';
import strings from '../../i18n/strings';
import CButton from '../common/CButton';
import {airLineData} from '../../api/constant';

export default function FilterModal({sheetRef, filter}) {
  const [priceFilter, setPriceFilter] = React.useState('');
  const [airLineFilter, setAirLineFilter] = React.useState('');

  // Filter Price
  const onPresPrice = itm => {
    if (priceFilter !== itm) {
      setPriceFilter(itm);
    } else {
      setPriceFilter('');
    }
  };

  // Filter AirLine
  const onPressAirLine = itm => {
    if (airLineFilter !== itm) {
      setAirLineFilter(itm);
    } else {
      setAirLineFilter('');
    }
  };

  // Apply Filter
  const onPressApply = () => {
    filter(priceFilter, airLineFilter);
    sheetRef.current?.hide();
  };

  // Clear Filter
  const onPresClear = () => {
    setPriceFilter('');
    setAirLineFilter('');
    filter('', '');
    sheetRef.current?.hide();
  };

  // Price Component
  const PriceComponent = ({title}) => {
    return (
      <TouchableOpacity
        onPress={() => onPresPrice(title)}
        style={[
          localStyles.priceContainer,
          {
            backgroundColor:
              priceFilter === title
                ? colors.primaryMain
                : colors.backgroundColor,
          },
        ]}>
        <CText
          type={'S14'}
          color={
            priceFilter === title ? colors.backgroundColor : colors.textColor
          }>
          {title}
        </CText>
      </TouchableOpacity>
    );
  };

  // AirLine Component
  const AirLineComponent = ({title}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressAirLine(title)}
        style={[
          localStyles.priceContainer,
          {
            backgroundColor:
              airLineFilter === title
                ? colors.primaryMain
                : colors.backgroundColor,
          },
        ]}>
        <CText
          type={'S14'}
          color={
            airLineFilter === title ? colors.backgroundColor : colors.textColor
          }>
          {title}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <ActionSheet containerStyle={localStyles.containerStyle} ref={sheetRef}>
      <CText type={'B20'}>{strings.filter}</CText>
      <CText type={'S18'} style={styles.mt20}>
        {strings.price}
      </CText>
      <View style={localStyles.priceChipsContainer}>
        <PriceComponent title={strings.lowToHigh} />
        <PriceComponent title={strings.highToLow} />
      </View>
      <CText type={'S18'} style={styles.mt20}>
        {strings.airLine}
      </CText>
      <View style={localStyles.priceChipsContainer}>
        {airLineData.map((itm, index) => (
          <AirLineComponent key={index} title={itm} />
        ))}
      </View>
      <CButton
        title={strings.apply}
        containerStyle={styles.mt40}
        onPress={onPressApply}
      />
      <CButton
        title={strings.clear}
        containerStyle={styles.mt5}
        bgColor={colors.backgroundColor}
        color={colors.primaryMain}
        onPress={onPresClear}
      />
    </ActionSheet>
  );
}

const localStyles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.backgroundColor,
    ...styles.p20,
  },
  priceContainer: {
    ...styles.pv10,
    ...styles.ph15,
    borderColor: colors.textPlaceholder,
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
  },
  priceChipsContainer: {
    ...styles.flexRow,
    ...styles.wrap,
    ...styles.mt15,
    gap: moderateScale(10),
  },
});
