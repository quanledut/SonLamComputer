import React, { Component } from 'react';
import Popup from 'reactjs-popup';

class PopupDelete extends Component {

    onDelete = (id, close) =>{
        this.props.onDelete(id, () => {
            close()
        });
    }

    render() {
        return (
            <Popup trigger={<div className="btn btn-danger">
                    <i className="fa fa-trash"> Xóa </i>
                </div>} modal>
                {close => (
                    <div className="modal1">
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        <div className="header"> Thông báo </div>
                        <div className="content">
                            {" "}
                            Bạn có chắc chắn muốn xóa {this.props.role.name} không?
                        </div>
                        <div className="actions">
                            <div className="btn btn-danger button" onClick = {() =>{this.onDelete(this.props.role._id, close)}}>
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

export default PopupDelete