import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors, Fonts, General} from '../contants';
import {Separator, WelcomeCard} from '../components';
import {Display} from '../utils';
import {useDispatch} from 'react-redux';
import {StorageService} from '../services';
import {GeneralAction} from '../actions';

const pageStyle = isActive =>
  isActive
    ? styles.page
    : {...styles.page, backgroundColor: Colors.DEFAULT_GREY};

const Pagination = ({index}) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        ),
      )}
    </View>
  );
};

const WelcomeScreen = ({navigation}) => {
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();
  const onViewRef = useRef(({changed}) => {
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
    });
  };

  const dispatch = useDispatch();

  const navigate = () => {
    StorageService.setFirstTimeUse().then(() => {
      dispatch(GeneralAction.setIsFirstTimeUse());
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <Separator height={Display.setHeight(8)} />
      <View style={styles.welcomeListContainer}>
        <FlatList
          ref={welcomeList}
          data={General.WELCOME_CONTENTS}
          keyExtractor={item => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          overScrollMode="never"
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({item}) => <WelcomeCard {...item} />}
        />
      </View>
      <Separator height={Display.setHeight(5)} />
      <Pagination index={welcomeListIndex} />
      <Separator height={Display.setHeight(8)} />
      {welcomeListIndex === 2 ? (
        <TouchableOpacity
          style={styles.gettingStartedButton}
          onPress={() => navigate()}
          activeOpacity={0.8}>
          <Text style={styles.gettingStartedButtonText}>Bắt đầu</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginLeft: 10}}
            onPress={() => welcomeList.current.scrollToEnd()}>
            <Text style={styles.buttonText}>Bỏ qua</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => pageScroll()}>
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageContainer: {
    flexDirection: 'row',
  },
  page: {
    height: 10,
    width: 18,
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  welcomeListContainer: {
    height: Display.setHeight(60),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Display.setWidth(90),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.POPPINS_BOLD,
    lineHeight: 16 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  button: {
    backgroundColor: Colors.LIGHT_GREEN,
    paddingVertical: 25,
    paddingHorizontal: 11,
    borderRadius: 30,
  },
  gettingStartedButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  gettingStartedButtonText: {
    fontSize: 20,
    color: Colors.DEFAULT_WHITE,
    fontWeight: 'bold',
    lineHeight: 20 * 1.4,
  },
});
