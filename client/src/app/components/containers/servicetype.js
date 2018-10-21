import { connect } from 'react-redux'
import ServiceTypeFormUI from '../ui/ServiceManager/serviceType/ServiceTypeForm'
import ServiceTypeUI from '../ui/ServiceManager/serviceType/index'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as serviceTypeActions from '../../actions/serviceType'

export const ServiceTypeForm = connect(
    null, 
    dispatch => ({
        create(serviceType, cb) {
            dispatch(serviceTypeActions.createRequest(serviceType, cb));
        },
        update(serviceType, cb) {
            dispatch(serviceTypeActions.updateRequest(serviceType, cb));
        },
        getById(id, cb) {
            dispatch(serviceTypeActions.findByIdRequest(id, cb));
        }
    })
)(ServiceTypeFormUI);

export const ServiceTypes = connect(
    state => { 
        console.log(state);
        return {
            todos: state.serviceTypes, 
            keyword: state.searchServiceType    
        }
    },
    dispatch => ({
        findAll(query, cb) {
            dispatch(serviceTypeActions.findAllRequest(query, cb));
        }
    })
)(ServiceTypeUI);

export const SearchFrom = connect(
    null,
    null
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(serviceTypeActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);