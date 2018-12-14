import {NavigationActions} from 'react-navigation'
let _navigator

function setTopLevelNavigator(navigationRef) {
    _navigator = navigationRef
}

function navigate(routerName,params){
    _navigator.navigate(routerName,params)
}

export default {
    setTopLevelNavigator,
    navigate
}