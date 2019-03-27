import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

function startMainTabs() {
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30)    
    ]).then( sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    title: "Find Place",
                    label: "Find Place",
                    screen: "rncourse.FindPlaceScreen",
                    icon: sources[0]
                },
                {
                    title: "Share Place",
                    label: "Share Place",
                    screen: "rncourse.SharePlaceScreen",
                    icon: sources[1]
                }
            ]
        });
    });
    
    
        
    
}

export default startMainTabs;