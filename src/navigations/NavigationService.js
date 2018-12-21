import {NavigationActions} from 'react-navigation'
let _navigator

function setTopLevelNavigator(navigationRef) {
    _navigator = navigationRef
}

function navigate(routerName,params){
    _navigator.navigate(routerName,params)
}

function showNavigator(){
    console.log("Navigator: "+_navigator)
}
export default {
    setTopLevelNavigator,
    navigate,
    showNavigator
}