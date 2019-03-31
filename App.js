import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import configureStore from './src/store/configureStore';

const store = configureStore();

// registering screen...
Navigation.registerComponent('rncourse.AuthScreen', () => AuthScreen, store, Provider);
Navigation.registerComponent('rncourse.SharePlaceScreen', () => SharePlaceScreen, store, Provider);
Navigation.registerComponent('rncourse.FindPlaceScreen', () => FindPlaceScreen, store, Provider);
Navigation.registerComponent('rncourse.PlaceDetailScreen', () => PlaceDetailScreen, store, Provider);
Navigation.registerComponent('rncourse.SideDrawer', () => SideDrawer);

// starting app
Navigation.startSingleScreenApp({
    screen: {
        screen: 'rncourse.AuthScreen',
        title: 'Login'
    }
});