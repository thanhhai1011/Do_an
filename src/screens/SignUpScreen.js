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
import Feather from 'react-native-vector-icons/Feather';
import {Colors, Images} from '../contants';
import {Display} from '../utils';
import {AuthenicationService} from '../services';
import axios from 'axios';

const SignUpScreen = ({navigation}) => {
  const [isPassword, setIsPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const register = async () => {
    let user = {
      username,
      email,
      password,
    };
    AuthenicationService.register(user).then(response => {
      console.log(response);
    });
    // navigation.navigate('RegisterPhone')
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
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.content}>
        Enter your email, choose a username and password
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setUsername(text)}
          />
        </View>
      </View>
      <Separator height={15} />
      <View style={styles.inputContainer}>
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
          />
        </View>
      </View>
      <Separator height={15} />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Password"
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
        <Text style={styles.signInButtonText}>Create Account</Text>
      </TouchableOpacity>
      <Separator height={15} />
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.facebookButton}>
        <View style={styles.socialButtonContainer}>
          <View style={styles.signInButtonLogoContainer}>
            <Image source={Images.FACEBOOK} style={styles.SignInButtonLogo} />
          </View>
          <Text style={styles.signInButtonText}>Connect with Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.socialButtonContainer}>
          <View style={styles.signInButtonLogoContainer}>
            <Image source={Images.GOOGLE} style={styles.SignInButtonLogo} />
          </View>
          <Text style={styles.signInButtonText}>Connect with Google</Text>
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
});
