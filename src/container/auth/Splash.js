// Library Imports
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

// Local Imports
import {StackNav} from '../../navigation/NavigationKeys';
import {APP_OPEN_FIRST_TIME} from '../../common/constants';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import {colors, styles} from '../../themes';
import {getAsyncStorageData} from '../../utils/helpers';

const Splash = ({navigation}) => {
  // Check if app is opened first time or not
  const asyncProcess = async () => {
    try {
      const appOpenFirstTime = await getAsyncStorageData(APP_OPEN_FIRST_TIME);
      if (!!appOpenFirstTime) {
        navigation.reset({
          index: 0,
          routes: [{name: StackNav.HomeScreen}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: StackNav.Onboarding}],
        });
      }
    } catch (e) {
      console.log('error ', e);
    }
  };

  useEffect(() => {
    asyncProcess();
  }, []);

  return (
    <CSafeAreaView style={{backgroundColor: colors.backgroundColor}}>
      <View style={localStyles.root}>
        <ActivityIndicator size="large" color={colors.primaryDark} />
      </View>
    </CSafeAreaView>
  );
};

export default Splash;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flexCenter,
  },
});
