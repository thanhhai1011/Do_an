import {
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Separator} from '../components';
import {Colors, Images} from '../contants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderScreen = ({navigation, route}) => {
  const data = route?.params?.response;
  console.log('data OrderScreen: ', data?.data?.cartItems);

  const phoneNumber = '0363945505';
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.header}>
        <Ionicons
          name="close"
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
          }}>
          <Text style={styles.textHeader}>Đặt hàng thành công</Text>
        </View>
      </View>
      <View style={{height: 1, backgroundColor: Colors.DEFAULT_GREY}} />
      <View
        style={{
          height: 120,
          justifyContent: 'space-around',
        }}>
        <Text
          style={{
            marginBottom: 10,
            fontSize: 16,
            color: Colors.DEFAULT_BLACK,
            fontWeight: 'bold',
          }}>
          Cảm ơn bạn đã đặt đơn tại Food Delivery
        </Text>
        <View>
          <Text
            style={{
              marginBottom: 10,
              fontSize: 16,
              color: Colors.FABEBOOK_BLUE,
              fontWeight: 'bold',
            }}>
            Lưu ý:{' '}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              fontSize: 13,
              color: Colors.DEFAULT_BLACK,
            }}>
            Food Delivery chỉ giải quyết khiếu nại khi khách hàng có video mở
            hàng và liên hệ Tổng đài CSKH 19002142 cung cấp đầy đủ thông tin đơn
            hàng
          </Text>
        </View>
      </View>
      <Separator height={StatusBar.currentHeight} />
      <View style={{height: 1, backgroundColor: Colors.DEFAULT_GREY}} />
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <Text style={{color: Colors.DEFAULT_BLACK}}>Mã đơn hàng </Text>
        <Text
          style={{color: Colors.DEFAULT_RED, fontWeight: 'bold', fontSize: 15}}>
          DON.{data?.data?.cartItems?.[0]?._id}
        </Text>
      </View>
      <View
        style={{
          // backgroundColor: 'red',
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={Images.DELIVER}
          resizeMode="contain"
          style={{width: 250, height: 250}}
        />
      </View>
      <Separator height={StatusBar.currentHeight} />
      <View
        style={{
          // backgroundColor: 'red',
          flex: 1,
          paddingHorizontal: 20,
          // alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            numberOfLines={2}
            style={{
              color: Colors.DEFAULT_BLACK,
            }}>
            Vui lòng thông báo với chúng tôi về bất kỳ
          </Text>
          <Text
            style={{
              marginBottom: 15,
              color: Colors.DEFAULT_BLACK,
            }}>
            thay đổi nào về đơn hàng của bạn bằng cách gọi
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: 70,
            backgroundColor: Colors.DEFAULT_RED,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            // flex: 1
          }} onPress={()=>Linking.openURL(`tel:${phoneNumber}`)}>
          <Text
            style={{
              color: Colors.DEFAULT_WHITE,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Gọi Hotline: 0363945505
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    height: 50,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
    paddingLeft: 10,
  },
  textHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  removeIcon: {
    // justifyContent: 'flex-end',
    // flex: 1,
    // marginRight: 200,
    // marginLeft: 20
  },
});
