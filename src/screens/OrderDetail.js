import {FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BillService, StaticServiceImage} from '../services';
import {Separator} from '../components';
import {ApiContants, Colors, Images} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderDetail = ({navigation}) => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    BillService?.getBills().then(response => {
      setBills(response?.data);
    });
  }, [bills]);

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const renderItem = ({item}) => {
    const bill = item?.data?.cartItems;

    return (
      <View style={{marginVertical: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: Colors.DEFAULT_BLACK}}>
            Đơn hàng DON.{item?._id}
          </Text>
          <View
            style={{
              borderColor: Colors.DEFAULT_GREEN,
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}>
            <Text style={{color: Colors.DEFAULT_GREEN}}>Đang xử lý</Text>
          </View>
        </View>
        <View
          style={{backgroundColor: Colors.LIGHT_GREY2, height: 2, marginTop: 5}}
        />
        <View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <Image
              resizeMode="contain"
              style={{height: 90, width: 90, marginLeft: 10}}
              source={{
                uri: StaticServiceImage.getGalleryImage(
                  item?.data?.cartItems[0]?.food?.image,
                  ApiContants.STATIC_IMAGE.SIZE.SQUARE,
                ),
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                marginHorizontal: 15,
              }}>
              <Text>{item?.data?.cartItems[0]?.food?.name}</Text>
              <Text>
                {item?.data?.cartItems[0]?.count}{' '}
                {item?.data?.cartItems[0]?.food?.category}
              </Text>
              <Text>{VND.format(item?.data?.cartItems[0]?.food?.price)}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: Colors.LIGHT_GREY2,
              height: 2,
              marginTop: 5,
            }}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <Text>Xem tất cả sản phẩm trong đơn hàng</Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: Colors.LIGHT_GREY2,
              height: 2,
              marginTop: 5,
            }}
          />
          <View style={{marginLeft: 10, marginTop: 5, flexDirection: 'row'}}>
            <Text>Thành tiền: </Text>
            <Text style={{color: Colors.DEFAULT_BLACK, fontWeight: 'bold'}}>
              {VND.format(item?.data?.metaData?.itemsTotal)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Separator height={StatusBar.currentHeight} />
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-outline"
          color={Colors.DEFAULT_GREY}
          size={22}
          style={styles.removeIcon}
          onPress={() => navigation.navigate('Home')}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 15,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: Colors.DEFAULT_BLACK,
            }}>
            Đơn hàng của bạn
          </Text>
        </View>
      </View>
      <View style={{backgroundColor: Colors.LIGHT_GREY2, height: 1}} />
      <View>
        <FlatList
          data={bills}
          keyExtractor={item => item?._id}
          renderItem={({item}) => renderItem({item})}
        />
      </View>
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
  },
  header: {
    height: 50,
    // backgroundColor: 'red',
    // justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    // flex: 1
  },
});
