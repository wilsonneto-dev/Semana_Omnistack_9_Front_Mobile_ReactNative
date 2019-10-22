import { AsyncStorage } from 'react';
import Reactotron from 'reactotron-react-native';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'app' }) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

export default Reactotron;
