import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

// Local Imports
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CText from '../../components/common/CText';
import {colors, styles} from '../../themes';
import images from '../../assets/images';
import {APP_OPEN_FIRST_TIME, moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
import CButton from '../../components/common/CButton';
import {StackNav} from '../../navigation/NavigationKeys';
import {setAsyncStorageData} from '../../utils/helpers';

export default function Onboarding({navigation}) {
  // navigate to HomeScreen
  const onPressGetStarted = async () => {
    await setAsyncStorageData(APP_OPEN_FIRST_TIME, APP_OPEN_FIRST_TIME);
    navigation.reset({
      index: 0,
      routes: [{name: StackNav.HomeScreen}],
    });
  };

  return (
    <CSafeAreaView>
      <View style={localStyles.root}>
        <Image
          source={images.onboardingImg}
          style={localStyles.onboardingImgSTyle}
        />
        <View style={localStyles.bottomStyle}>
          <CText
            type={'S24'}
            align={'center'}
            color={colors.primaryMain}
            style={styles.mv20}>
            {strings.onboardingTitle}
          </CText>
          <CText type={'M16'} align={'center'} color={colors.primaryMain}>
            {strings.onboardingDesc}
          </CText>
          <CButton
            title={strings.getStarted}
            containerStyle={styles.mt20}
            onPress={onPressGetStarted}
          />
        </View>
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.justifyBetween,
    backgroundColor: colors.primaryMain,
  },
  onboardingImgSTyle: {
    width: '100%',
    height: moderateScale(300),
    resizeMode: 'cover',
    ...styles.mt50,
  },
  bottomStyle: {
    backgroundColor: colors.backgroundColor,
    ...styles.p20,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
});
