import {NavigationActions} from 'react-navigation'
let _navigator

function setTopLevelNavigator(navigationRef) {
    _navigator = navigationRef
}

// function navigate(routerName,params) {
//     console.log('Navigator:' + _navigator + 'name: ' + routerName)
//     _navigator.dispatch(
//         NavigationActions.navigate({
//             routerName,
//             params
//         })
//     )
// }

function navigate(routerName,params){
    _navigator.navigate(routerName,params)
}

export default {
    setTopLevelNavigator,
    navigate
}