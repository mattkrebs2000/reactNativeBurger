import React from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
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
        <View style={styles.container}>
          <ImageBackground
            source={require("./images/images.jpeg")}
            style={styles.container2}
          >
            <View style={styles.container3}>
              <View style={styles.headerText}>
                <text>Hello</text>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([]),
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
    flexDirection: "column",
    flex: 1,
  },

  container2: {
    flex: 1,
    alignItems: "center",
    width: null,
    height: null,
  },

  container3: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: 0.5,
    marginBottom: 15,
  },
  headerText: {
    marginTop: 100,
  },
});
