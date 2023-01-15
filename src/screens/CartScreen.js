import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors, Fonts, Images} from '../contants';
import {FoodCard, Separator} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Display} from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import {BillService} from '../services';
import {CartAction} from '../actions';

const CartScreen = ({navigation}) => {
  const cart = useSelector(state => state?.cartState?.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CartAction.getCartItems());
  }, [cart]);

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const handleCheckout = () => {
    BillService.addBill(cart).then(response => {
      console.log('BillService: ', response);
      if (response?.status) {
        BillService.removeAllCart();
        navigation.navigate('Order', {response});
      }
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
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>
      {cart?.cartItems?.length > 0 ? (
        <>
          <ScrollView>
            <View style={styles.foodList}>
              {cart?.cartItems?.map(item => (
                <FoodCard
                  {...item?.food}
                  key={item?.food?._id}
                  navigate={() =>
                    navigation.navigate('Food', {foodId: item?.food?._id})
                  }
                />
              ))}
            </View>
            <View style={styles.promoCodeContainer}>
              <View style={styles.rowAndCenter}>
                <Entypo name="ticket" size={30} color={Colors.DEFAULT_YELLOW} />
                <Text style={styles.promoCodeText}>Thêm mã khuyến mãi</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={Colors.DEFAULT_BLACK}
              />
            </View>
            <View style={styles.amountContainer}>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Tổng cộng</Text>
                <Text style={styles.amountText}>
                  {VND.format(cart?.metaData?.grandTotal)}
                </Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Giảm giá</Text>
                <Text style={styles.amountText}>
                  {VND.format(cart?.metaData?.discount)}
                </Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Giao hàng miễn phí</Text>
                <Text
                  style={{...styles.amountText, color: Colors.DEFAULT_GREEN}}>
                  Miễn phí
                </Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Tổng cộng</Text>
              <Text style={styles.totalText}>
                {VND.format(cart?.metaData?.grandTotal)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => handleCheckout()}>
              <View style={styles.rowAndCenter}>
                <Ionicons
                  name="cart-outline"
                  color={Colors.DEFAULT_WHITE}
                  size={20}
                />
                <Text style={styles.checkoutText}>Tính tiền</Text>
              </View>
              <Text style={styles.checkoutText}>
                {VND.format(cart?.metaData?.grandTotal)}
              </Text>
            </TouchableOpacity>
            <Separator height={Display.setHeight(9)} />
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            style={styles.emptyCartImage}
            source={Images.EMPTY_CART}
            resizeMode="contain"
          />
          <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
          <Text style={styles.emptyCartSubText}>Đặt một số món ăn ngon</Text>
          <TouchableOpacity style={styles.addButtonEmpty}>
            <AntDesign name="plus" color={Colors.DEFAULT_WHITE} size={20} />
            <Text style={styles.addButtonEmptyText}>Thêm thức ăn</Text>
          </TouchableOpacity>
          <Separator height={Display.setHeight(15)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  foodList: {
    marginHorizontal: Display.setWidth(4),
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 15,
    marginTop: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
  promoCodeText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 10,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountContainer: {
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  amountSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  amountLabelText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  amountText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  totalContainer: {
    marginHorizontal: Display.setWidth(4),
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  checkoutButton: {
    flexDirection: 'row',
    width: Display.setWidth(80),
    backgroundColor: Colors.DEFAULT_GREEN,
    alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: Display.setHeight(7),
    marginTop: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 16 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 30,
    fontFamily: Fonts.POPPINS_LIGHT,
    lineHeight: 30 * 1.4,
    color: Colors.DEFAULT_GREEN,
  },
  emptyCartSubText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.INACTIVE_GREY,
  },
  addButtonEmpty: {
    flexDirection: 'row',
    backgroundColor: Colors.DEFAULT_YELLOW,
    borderRadius: 8,
    paddingHorizontal: Display.setWidth(4),
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: 'space-evenly',
    elevation: 3,
    alignItems: 'center',
  },
  addButtonEmptyText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_WHITE,
    marginLeft: 10,
  },
  emptyCartImage: {
    height: Display.setWidth(60),
    width: Display.setWidth(60),
  },
});

export default CartScreen;
