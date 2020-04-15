import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
// ui
import AppNavigator from "./src/router";
import { ActivityIndicator, View } from "react-native";
import { colors } from "@styles";
// redux-saga
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import reducers from "./src/store/reducer";
import saga from "./src/store/saga";
import { PersistGate } from "redux-persist/integration/react";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);
sagaMiddleware.run(saga);
export default class App extends React.Component {
  state = {
    fontLoaded: false
  };
  componentDidMount = async () => {
    await Font.loadAsync({
      "SFPro-Display": require("./assets/fonts/SF-UI-Display-Bold.otf"),
      "SFPro-Text-Regular": require("./assets/fonts/SF-UI-Text-Regular.otf"),
      "SFPro-Text-Medium": require("./assets/fonts/SF-UI-Text-Medium.otf"),
      "SFPro-Text-Semibold": require("./assets/fonts/SF-UI-Text-Semibold.otf")
    });
    this.setState({ fontLoaded: true });
  };

  render() {
    if (!this.state.fontLoaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      );
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}
