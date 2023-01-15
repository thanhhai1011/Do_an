import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GeneralAction} from '../actions';
import {
  FoodScreen,
  ForgotPasswordScreen,
  HomeScreen,
  OrderDetail,
  OrderScreen,
  RegisterPhone,
  RestaurantScreen,
  SignInScreen,
  SignUpScreen,
  SplashScreen,
  VerificationScreen,
  WelcomeScreen,
} from '../screens';
import HomeTabs from "./BottomTabs"

const Stack = createNativeStackNavigator();

const Navigators = () => {
  const {isAppLoading, token, isFirstTimeUse} = useSelector(
    state => state?.generalState,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GeneralAction.appStart());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : !token || token === null || token === '' ? (
          <>
            {isFirstTimeUse && (
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
            )}
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="RegisterPhone" component={RegisterPhone} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Food" component={FoodScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
