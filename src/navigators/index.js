import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';
import {
  ForgotPasswordScreen,
  HomeScreen,
  RegisterPhone,
  SignInScreen,
  SignUpScreen,
  SplashScreen,
  VerificationScreen,
  WelcomeScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

const Navigators = ({token}) => {
  console.log(token);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!token ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
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
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    token: state.generalState.token,
  };
};

export default connect(mapStateToProps)(Navigators);
