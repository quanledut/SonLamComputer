import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { toast } from "react-toastify";
import * as notifications from '../../../constants/Notifications';

class PopUpPayment extends Component {

    onAccept = (item) =>{
        this.props.onAccept(item, (res, error) => {
            if (error !== null) {
                console.log(error)
                toast.success(notifications.ACCEPT_ERORR);     
            }      
        });
    }

    render() {
        return (
            <Popup trigger={<div className="btn btn-success">
                    <i className="fa fa-trash"> Thanh toán </i>
                </div>} modal>
                {close => (
                    <div className="modal1">
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        <div className="header"> Thông báo </div>
                        <div className="content">
                            {" "}
                            Chấp nhận thanh toán của: {this.props.item.customer_name} 
                            với số tiền: {this.props.item.totalPrice} ?
                        </div>
                        <div className="actions">
                            <div className="btn btn-danger button" onClick = {() =>{this.onAccept(this.props.item); close()}}>
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

export default PopUpPayment