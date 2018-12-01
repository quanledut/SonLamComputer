import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import {Col, Form, FormGroup, Label} from 'reactstrap';

class PopUpSaleOrder extends Component {

    onDelete = (id) => {
        // this.props.onDelete(id, (res, error) => {
        //     if (error !== null) {
        //         console.log(error)
        //         toast.success(notifications.ERROR_DELETE);
        //     }
        // });
    }

    onClose = () => {
        this.props.isClose()
    }

    render() {
        return (
            <Popup open = {this.props.isOpen} modal>
                {close => (
                    <div className="modal1">
                        <a className="close" onClick={()=>{this.onClose();close()}}>
                            &times;
                        </a>
                        <div className="header"> Thông tin hóa đơn </div>
                        <div className="content">
                            <Form>
                                <FormGroup row className="my-0">
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Mã khách hàng</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>xin chào</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Điện thoại</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>xin chào</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Tên khách hàng</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>Hello</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Điạ chỉ</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>Hello</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Ngày sinh</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>xin chào</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Email</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>Hello</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Người tạo</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>xin chào</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Ngày tạo</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>Hello</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Mã khách hàng</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>xin chào</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Điện thoại</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>xin chào</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Tên khách hàng</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>Hello</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Điạ chỉ</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>Hello</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Ngày sinh</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>xin chào</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Email</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>Hello</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Người tạo</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>xin chào</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="5">
                                        <FormGroup row className="my-0">
                                            <Col xs="5">
                                                <Label>Ngày tạo</Label>
                                            </Col>
                                            <Col xs="5">
                                                <Label>Hello</Label>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                        <div className="actions">
                            <div className="btn btn-primary button" onClick={() => {
                                console.log('modal closed ')
                                this.onClose();close()
                            }}>
                                <i className="fa fa-ban"> Đóng lại </i>
                            </div>
                        </div>
                    </div>
                )}
            </Popup>
        );
    }
}

export default PopUpSaleOrder