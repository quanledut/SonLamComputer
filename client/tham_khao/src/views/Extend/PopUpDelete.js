import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

class PopupDelete extends Component {

    onDelete = (id) =>{
        this.props.onDelete(id);
    }

    render() {
        return (
            <Popup trigger={<div className="btn btn-danger">
                    <i className="fa fa-trash"> Delete </i>
                </div>} modal>
                {close => (
                    <div className="modal1">
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        <div className="header"> Thông báo </div>
                        <div className="content">
                            {" "}
                            Bạn có chắc chắn muốn xóa {this.props.user.nf_username} không?
                        </div>
                        <div className="actions">
                            <div className="btn btn-danger button" onClick = {() =>{this.onDelete(this.props.user.nf_id)}}>
                                <i className="fa fa-check"> Có </i>
                            </div>
                            <div className="btn btn-primary button" onClick={() => {
                                    console.log('modal closed ')
                                    close()
                                }}>
                                <i className="fa fa-ban"> Không </i>
                            </div>
                        </div>
                    </div>
                )}
            </Popup>
        );
    }
}
const mapStateToProps = (state) =>{
    return{}
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onDelete : (id) =>{
            dispatch(actions.delete_user(id));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PopupDelete);