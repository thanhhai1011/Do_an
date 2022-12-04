import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../contants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StaticServiceImage} from '../services';

const RestaurantCard = ({id, name, images: {poster}, tags, distance, time}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Image
        source={{uri: StaticServiceImage.getPoster(poster)}}
        style={styles.posterStyle}
      />
      <Text style={styles.titleText}>{name}</Text>
      <Text style={styles.tagText}>{tags?.join(' • ')}</Text>
      <View style={styles.footerContainer}>
        <View style={styles.rowAndCenter}>
          <Ionicons
            name="star-outline"
            size={14}
            color={Colors.DEFAULT_YELLOW}
          />
          <Text style={styles.ratingText}>4</Text>
          <Text style={styles.reviewsText}>(10)</Text>
        </View>
        <View style={styles.rowAndCenter}>
          <View style={styles.timeAndDistanceContainer}>
            <Ionicons
              name="location-outline"
              color={Colors.DEFAULT_YELLOW}
              size={15}
            />
            <Text style={styles.timeAndDistanceText}>{distance}</Text>
          </View>
          <View style={styles.timeAndDistanceContainer}>
            <Ionicons
              name="ios-time-outline"
              color={Colors.DEFAULT_YELLOW}
              size={15}
            />
            <Text style={styles.timeAndDistanceText}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 5,
  },
  titleText: {
    color: Colors.DEFAULT_BLACK,
    marginLeft: 8,
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
  },
  posterStyle: {
    width: 1920 * 0.15,
    height: 1080 * 0.15,
    borderRadius: 10,
    margin: 5,
  },
  tagText: {
    color: Colors.DEFAULT_GREY,
    marginLeft: 8,
    fontSize: 11,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 11 * 1.4,
    marginBottom: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeAndDistanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: Colors.LIGHT_YELLOW,
    borderRadius: 12,
    marginHorizontal: 3,
  },
  timeAndDistanceText: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 10,
    fontFamily: Fonts.POPPINS_BOLD,
    lineHeight: 10 * 1.4,
  },
  ratingText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 10,
    fontFamily: Fonts.POPPINS_BOLD,
    lineHeight: 10 * 1.4,
    marginLeft: 5,
  },
  reviewsText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 10,
    fontFamily: Fonts.POPPINS_BOLD,
    lineHeight: 10 * 1.4,
  },
});
