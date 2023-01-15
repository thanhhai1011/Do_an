import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Separator} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Colors, Images} from '../contants';
import {Display} from '../utils';
import {AuthenicationService} from '../services';
import Lottie from 'lottie-react-native';

const inputState = state => {
  switch (state) {
    case 'valid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: Colors.SECONDARY_GREEN,
      };
    case 'invalid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_RED,
      };
    default:
      return styles.inputContainer;
  }
};

const showMaker = state => {
  switch (state) {
    case 'valid':
      return (
        <AntDesign
          name="checkcircleo"
          color={Colors.SECONDARY_GREEN}
          size={18}
          style={{marginLeft: 5}}
        />
      );
    case 'invalid':
      return (
        <AntDesign
          name="closecircleo"
          color={Colors.DEFAULT_RED}
          size={18}
          style={{marginLeft: 5}}
        />
      );
    default:
      return null;
  }
};

const SignUpScreen = ({navigation}) => {
  const [isPassword, setIsPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [emailState, setEmailState] = useState('default');
  const [usernameState, setUsernameState] = useState('default');

  const register = async () => {
    let user = {
      username,
      email,
      password,
    };
    setIsLoading(true);
    AuthenicationService.register(user).then(response => {
      setIsLoading(false);
      console.log(response);
      if (!response.status) {
        setErrorMessage(response?.message);
      } else {
        navigation.navigate('SignIn');
      }
    });
  };

  const checkUserExist = async (type, value) => {
    if (value?.length > 0) {
      AuthenicationService.checkUserExist(type, value).then(response => {
        if (response?.status) {
          type === 'email' && emailErrorMessage
            ? setEmailErrorMessage('')
            : null;

          type === 'username' && usernameErrorMessage
            ? setUsernameErrorMessage('')
            : null;
          type === 'email' ? setEmailState('valid') : null;
          type === 'username' ? setUsernameState('valid') : null;
        } else {
          type === 'email' ? setEmailErrorMessage(response?.message) : null;
          type === 'username'
            ? setUsernameErrorMessage(response?.message)
            : null;
          type === 'email' ? setEmailState('invalid') : null;
          type === 'username' ? setUsernameState('invalid') : null;
        }
      });
    }
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
        <Text style={styles.headerTitle}>Đăng ký</Text>
      </View>
      <Text style={styles.title}>Tạo tài khoản</Text>
      <Text style={styles.content}>
        Nhập email của bạn, chọn tên người dùng và mật khẩu
      </Text>
      <View style={inputState(usernameState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Tên đăng nhập"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setUsername(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('username', text)
            }
          />
          {showMaker(usernameState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{usernameErrorMessage}</Text>
      <View style={inputState(usernameState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setEmail(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('email', text)
            }
          />
          {showMaker(emailState)}
        </View>
      </View>
      <Text style={styles.errorMessage}>{emailErrorMessage}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Mật khẩu"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            secureTextEntry={isPassword ? false : true}
            onChangeText={text => setPassword(text)}
          />
          <Feather
            name={isPassword ? 'eye' : 'eye-off'}
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
            onPress={() => setIsPassword(!isPassword)}
          />
        </View>
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity
        style={styles.signInButton}
        activeOpacity={0.8}
        onPress={() => register()}>
        {isLoading ? (
          <Lottie source={Images.LOADING} autoPlay />
        ) : (
          <Text style={styles.signInButtonText}>Tạo tài khoản</Text>
        )}
      </TouchableOpacity>
      <Separator height={15} />
      <Text style={styles.orText}>hoặc</Text>
      <TouchableOpacity style={styles.facebookButton}>
        <View style={styles.socialButtonContainer}>
          <View style={styles.signInButtonLogoContainer}>
            <Image source={Images.FACEBOOK} style={styles.SignInButtonLogo} />
          </View>
          <Text style={styles.signInButtonText}>Kết nối với Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.socialButtonContainer}>
          <View style={styles.signInButtonLogoContainer}>
            <Image source={Images.GOOGLE} style={styles.SignInButtonLogo} />
          </View>
          <Text style={styles.signInButtonText}>Kết nối với Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.DEFAULT_BLACK,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    color: Colors.DEFAULT_BLACK,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 17,
    color: Colors.DEFAULT_BLACK,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY,
    justifyContent: 'center',
    shadowColor: Colors.DEFAULT_GREY,
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  signInButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontWeight: '600',
    alignSelf: 'center',
  },
  facebookButton: {
    backgroundColor: Colors.FABEBOOK_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: Colors.GOOGLE_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignInButtonLogo: {
    width: 18,
    height: 18,
  },
  signInButtonLogoContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 2,
    borderRadius: 3,
    position: 'absolute',
    left: 25,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  signInButtonText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_RED,
    fontWeight: '400',
    marginHorizontal: 20,
    marginTop: 5,
  },
});
