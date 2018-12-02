import {createContext,Component} from 'react'
import {} from 'react-native'

const AppContext = createContext();
export default class AppProvider extends Component{
    state = {

    }
    render(){
        return(
            <AppContext.Provider  value = {this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}