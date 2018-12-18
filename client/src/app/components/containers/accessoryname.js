import { connect } from 'react-redux'
import AccessoryNameFormUI from '../ui/DeviceManager/Accessory/AccessoryName/AccessoryNameForm'
import AccessoryNameUI from '../ui/DeviceManager/Accessory/AccessoryName'
import Search from '../ui/utils/Search'
import PopUpDelete from '../ui/utils/PopUpDelete'
import * as accessoryNameActions from '../../actions/accessoryName'
import * as computerNameActions from '../../actions/computerName'
import * as accessoryTypeActions from '../../actions/accessoryType'

export const AccessoryNameForm = connect(
    null,
    dispatch => ({
        create(accessoryName, cb) {
            dispatch(accessoryNameActions.createRequest(accessoryName, cb));
        },
        update(accessoryName, cb) {
            dispatch(accessoryNameActions.updateRequest(accessoryName, cb));
        },
        getById(id, cb) {
            dispatch(accessoryNameActions.findByIdRequest(id, cb));
        },
        getImportById(id, cb) {
          dispatch(accessoryNameActions.findImportByIdRequest(id, cb));
        },
        getExportById(id, cb) {
            dispatch(accessoryNameActions.findExportByIdRequest(id, cb));
        },
        findAllComputerName(query, cb){
            dispatch(computerNameActions.findAllRequest(query, cb));
        },
        findAllaccessoryType(query, cb){
            dispatch(accessoryTypeActions.findAllRequest(query, cb));
        }
    })
)(AccessoryNameFormUI);

export const AccessoryNames = connect(
    state => {
        return {
            todos: state.accessorys,
            keyword: state.searchAccessorys
        }
    },
    dispatch => ({
        findAll(query, cb) {
            dispatch(accessoryNameActions.findAllRequest(query, cb));
        }
    })
)(AccessoryNameUI);

export const SearchFrom = connect(
    null,
    null
)(Search);

export const DeleteFrom = connect(
    null,
    dispatch => ({
        onDelete : (id, cb) =>{
            dispatch(accessoryNameActions.deleteRequest(id, cb));
        }
    })
)(PopUpDelete);