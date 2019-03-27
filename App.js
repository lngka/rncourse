import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';



// registering screen...
Navigation.registerComponent('rncourse.AuthScreen', () => AuthScreen);
Navigation.registerComponent('rncourse.SharePlaceScreen', () => SharePlaceScreen);
Navigation.registerComponent('rncourse.FindPlaceScreen', () => FindPlaceScreen);



Navigation.startSingleScreenApp({
    screen: {
        screen: 'rncourse.AuthScreen',
        title: 'Login'
    }
});