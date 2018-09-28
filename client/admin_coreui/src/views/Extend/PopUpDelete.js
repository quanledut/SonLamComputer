import React, { Component } from 'react';
import Popup from 'reactjs-popup';

class PopupDelete extends Component {
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
                            Bạn có chắc chắn muốn xóa không?
                        </div>
                        <div className="actions">
                            <Popup
                                trigger={<div className="btn btn-danger button">
                                    <i className="fa fa-check"> Có </i>
                                </div>}
                                position="top center"
                                closeOnDocumentClick
                            >
                                <span>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis delectus
                                    nemo, maxime molestiae dolorem numquam mollitia, voluptate ea, accusamus excepturi
                                    deleniti ratione sapiente! Laudantium, aperiam doloribus. Odit, aut.
                                </span>
                            </Popup>
                            <div className="btn btn-primary button" onClick={() => {
                                    console.log('modal closed ')
                                    close()
                                }}>
                                <i className="fa fa-ban"> Không </i>
                            </div>
                            {/* <button
                                className="button"
                                onClick={() => {
                                    console.log('modal closed ')
                                    close()
                                }}
                            >
                                Không
                            </button> */}
                        </div>
                    </div>
                )}
            </Popup>
        );
    }
}
export default PopupDelete;