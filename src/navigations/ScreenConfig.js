import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import ChartScreen from '../screens/ChartScreen'
 
export const ScreenConfig = {
    SplashScreen: {
        screen : SplashScreen,
        navigationOptions:{
            header:null
        }
    },
    LoginScreen: {
        screen : LoginScreen,
        navigationOptions:{
            header:null
        }
    },
    ChartScreen: {
        screen: ChartScreen,
        navigationOptions:{
            header:null
        }
    }
}