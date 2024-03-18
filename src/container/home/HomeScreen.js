import {FlatList, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';

// Local Imports
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CKeyBoardAvoidWrapper from '../../components/common/CKeyBoardAvoidWrapper';
import {colors, styles} from '../../themes';
import images from '../../assets/images';
import {getHeight, moderateScale, screenWidth} from '../../common/constants';
import CText from '../../components/common/CText';
import CInput from '../../components/common/CInput';
import {getFlightData} from '../../api/homeAPI';
import {FlightIcon} from '../../assets/svgs';
import strings from '../../i18n/strings';
import FilterModal from '../../components/modal/FilterModal';
import CLoader from '../../components/common/CLoader';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [flightData, setFlightData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const filterSheetRef = useRef();

  // Get Flight Data
  useEffect(() => {
    const getData = async () => {
      setIsLoader(true);
      const data = await getFlightData();
      setFlightData(data);
      setFilteredData(data);
      setIsLoader(false);
    };
    getData();
  }, []);

  // Filter Flight Data
  const flightFilter = (price, airLine) => {
    setIsLoader(true);
    if (price === '' && airLine === '') {
      setFilteredData(flightData);
    } else {
      let data = [...flightData];

      if (!!price) {
        if (price === strings.lowToHigh) {
          data = data.sort((a, b) => a.price - b.price);
        } else if (price === strings.highToLow) {
          data = data.sort((a, b) => b.price - a.price);
        }
      }

      if (!!airLine) {
        data = data.filter(itm => itm.airline === airLine);
      }

      setFilteredData(data);
    }
    setIsLoader(false);
  };

  const onChangeSearch = val => setSearch(val);

  // Open Filter Modal
  const onPressRightIcon = () => filterSheetRef.current?.show();

  // Render Info
  const RenderInfo = ({title, text, textAlign = 'left', type = 'B20'}) => {
    return (
      <View style={localStyles.topContentStyle}>
        <CText
          align={textAlign}
          style={styles.flex}
          type={type}
          numberOfLines={1}>
          {title}
        </CText>
        {text && (
          <CText
            type={'S14'}
            align={textAlign}
            color={colors.textTertiary}
            style={styles.mt5}
            numberOfLines={1}>
            {text}
          </CText>
        )}
      </View>
    );
  };

  // Render Description
  const RenderDescription = ({title, desc}) => {
    return (
      <View style={localStyles.descRowStyle}>
        <CText type={'B18'}>
          {title}
          {': '}
        </CText>
        <CText type={'M16'}>{desc}</CText>
      </View>
    );
  };

  // Render Item
  const renderItem = ({item}) => {
    return (
      <View style={localStyles.topContainerStyle}>
        <View style={localStyles.locationContainer}>
          <RenderInfo title={item?.origin} />
          <View style={[styles.center, styles.ph10]}>
            <FlightIcon />
            <CText type={'M12'} style={styles.mt5} numberOfLines={1}>
              {item?.displayData?.totalDuration}
            </CText>
          </View>
          <RenderInfo title={item?.destination} textAlign={'right'} />
        </View>
        <View style={localStyles.locationContainer}>
          <RenderInfo
            title={moment(item?.departureTime).format('h:mm A')}
            text={moment(item?.departureTime).format('MMMM D, YYYY')}
            type="S18"
          />
          <RenderInfo
            title={moment(item?.arrivalTime).format('h:mm A')}
            text={moment(item?.arrivalTime).format('MMMM D, YYYY')}
            type="S18"
            textAlign={'right'}
          />
        </View>
        <RenderDescription
          title={strings.availableSeats}
          desc={item?.seatsAvailable}
        />
        <RenderDescription title={strings.gateNo} desc={item?.gate} />
        <RenderDescription title={strings.price} desc={item?.price} />
        <RenderDescription
          title={strings.flightNumber}
          desc={item?.flightNumber}
        />
        <View style={localStyles.middleLineSTyle}>
          <View style={localStyles.leftCircleContainer} />
          <View style={localStyles.dividerStyle} />
          <View style={localStyles.rightCircleContainer} />
        </View>
        <CText type={'B22'} align={'center'} style={styles.ph20}>
          {item?.airline}
        </CText>
      </View>
    );
  };

  // Render Empty Component
  const renderEmptyComponent = () => {
    return (
      <CText
        type={'B18'}
        align={'center'}
        color={colors.backgroundColor}
        style={styles.mt50}>
        {strings.noDataFound}
      </CText>
    );
  };

  return (
    <CSafeAreaView>
      <CKeyBoardAvoidWrapper contentContainerStyle={styles.ph20}>
        <View style={localStyles.userContainer}>
          <Image source={images.userImg} style={localStyles.userImgStyle} />
          <View style={localStyles.userDetailStyle}>
            <CText type={'M14'} color={colors.backgroundColor}>
              {'Welcome!'}
            </CText>
            <CText
              type={'B18'}
              color={colors.backgroundColor}
              numberOfLines={1}
              style={styles.flex}>
              {'Hamza Tariq'}
            </CText>
          </View>
        </View>
        <CInput
          placeholder={'Search'}
          _value={search}
          toGetTextFieldValue={onChangeSearch}
          inputContainerStyle={styles.mt15}
          onPressRightIcon={onPressRightIcon}
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
          ListEmptyComponent={renderEmptyComponent}
        />
      </CKeyBoardAvoidWrapper>
      <FilterModal sheetRef={filterSheetRef} filter={flightFilter} />
      {isLoader && <CLoader />}
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  userContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mt20,
  },
  userImgStyle: {
    width: moderateScale(46),
    height: moderateScale(46),
    borderRadius: moderateScale(23),
  },
  userDetailStyle: {
    ...styles.ml10,
    ...styles.flex,
  },
  topContainerStyle: {
    borderWidth: moderateScale(1),
    ...styles.mt30,
    borderRadius: moderateScale(20),
    ...styles.pv10,
    borderColor: colors.backgroundColor,
    backgroundColor: colors.backgroundColor,
  },
  dividerStyle: {
    borderWidth: moderateScale(1),
    borderStyle: 'dashed',
    borderColor: colors.primaryMain,
    width: '100%',
  },
  topContentStyle: {
    ...styles.mb15,
    ...styles.flex,
  },
  leftCircleContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    backgroundColor: colors.primaryMain,
    position: 'absolute',
    left: moderateScale(-10),
  },
  rightCircleContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    backgroundColor: colors.primaryMain,
    position: 'absolute',
    right: moderateScale(-10),
  },
  middleLineSTyle: {
    ...styles.rowSpaceBetween,
    ...styles.mv15,
  },
  locationContainer: {
    ...styles.flex,
    ...styles.rowSpaceBetween,
    ...styles.ph20,
  },
  descRowStyle: {
    ...styles.mt10,
    ...styles.ph20,
    ...styles.rowStart,
  },
});
