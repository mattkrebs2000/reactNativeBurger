import React from "react";
import {
  ImageBackground, Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };

    // Initialize firebase...
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <ImageBackground
          source={require('https://encrypted-tbn0.gstatic.com/images q=tbn%3AANd9GcTiKfZUOLmu1MErperX-wlbRWS6KFFSKIneIMEyPHWuJwdXBSTY')}
          style={{ width: "100%", height: "100%" }}
        >
          <Text>Inside</Text>

          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            {Platform.OS === "android" && (
              <View style={styles.statusBarUnderlay} />
            )}
            <Text> Hello there</Text>
          </View>
        </ImageBackground>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
   
       
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
       
      }),
    ]);
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
