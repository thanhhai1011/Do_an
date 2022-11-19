import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../contants';
import {StaticServiceImage} from '../services';

const FlagItem = ({name, code, dial_code, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress({code, name, dial_code})}>
      <Image
        style={styles.flagItem}
        source={{uri: StaticServiceImage.getFlagIcon(code)}}
      />
      <Text style={styles.flagText}>{dial_code}</Text>
      <Text style={styles.flagText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default FlagItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  flagItem: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  flagText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontWeight: '500',
    marginRight: 10,
  },
});
