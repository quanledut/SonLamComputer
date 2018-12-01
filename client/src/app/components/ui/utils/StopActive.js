import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { toast } from "react-toastify";
import * as notifications from '../../../constants/Notifications';

class StopActive extends Component {

    onDelete = (id) =>{
        this.props.onDelete(id, (res, error) => {
            if (error !== null) {
                console.log(error)
                toast.success(notifications.ERROR_DELETE);     
            }      
        });
    }

    render() {
        return (
            <Popup trigger={<div className="btn btn-danger">
                    <i className="fa fa-trash"> Ngưng hoạt động </i>
                </div>} modal>
                {close => (
                    <div className="modal1">
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        <div className="header"> Thông báo </div>
                        <div className="content">
                            {" "}
                            Bạn có chắc chắn muốn ngưng hoạt động {this.props.name} không?
                        </div>
                        <div className="actions">
                            <div className="btn btn-danger button" onClick = {() =>{this.onDelete(this.props.id); close()}}>
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

export default StopActive