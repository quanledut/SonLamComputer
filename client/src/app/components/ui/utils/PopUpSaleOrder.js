import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { Col, Form, FormGroup, Label } from 'reactstrap';
import ReactTable from "react-table";
import "react-table/react-table.css";
import classnames from 'classnames';

const columns = [
    {
        Header: "Số series máy",
        //   id: "customer_no",
        //   accessor: d => d.customer_no
        accessor: "computerSeries"
    },
    {
        Header: "Loại linh kiện",
        accessor: "type"
    },
    {
        Header: "Thời gian bảo hành",
        accessor: "guaranteeDuration"
    },
    {
        Header: "Tổng giá tiền",
        accessor: "price"
    },
];

const columns2 = [
    {
        Header: "Tên thiết bị",
        accessor: "name"
    },
    {
        Header: "Loại thiết bị",
        accessor: "type"
    },
    {
        Header: "Thời gian bảo hành",
        accessor: "guaranteeDuration"
    },
    {
        Header: "Tổng giá tiền",
        accessor: "price"
    },
];

class PopUpSaleOrder extends Component {
    onClose = () => {
        this.props.isClose()
    }

    render() {
        var data = [];
        var column = columns;
        var fakedevices = [];
        var fakeaccessories = [];
        if(this.props.info.devices)
        {
            fakedevices = this.props.info.devices;
        }
        if (this.props.info.accessories)
        {
            fakeaccessories = this.props.info.accessories;
        }

        if(fakedevices.length > 0)
        {
            data = fakedevices;
            column = columns2;
        }
        else
        {
            data = fakeaccessories;
            column = columns;
        }
        
        return (
            <Popup open={this.props.isOpen} modal>
                {close => (
                    <div className="scrollspy" id="spy" data-spy="scroll" style={{ position: 'relative',height: '500px', overflow: 'auto', marginTop: '.5rem' }}>
                        <div className="modal1">
                            <a className="close" onClick={() => { this.onClose(); close() }}>
                                &times;
                        </a>
                            <div className="header"> Thông tin hóa đơn </div>
                            <div className="content" style={{ textAlign: 'left' }}>
                                <Form>
                                    <FormGroup row className="my-0">
                                        <Col xs="6">
                                            <FormGroup row className="my-0">
                                                <Col xs="5">
                                                    <Label>Mã khách hàng</Label>
                                                </Col>
                                                <Col xs="5">
                                                    <Label>{this.props.info.customer.code}</Label>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup row className="my-0">
                                                <Col xs="5">
                                                    <Label>Điện thoại</Label>
                                                </Col>
                                                <Col xs="5">
                                                    <Label>{this.props.info.customer.phone}</Label>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="6">
                                            <FormGroup row className="my-0">
                                                <Col xs="5">
                                                    <Label>Tên KH</Label>
                                                </Col>
                                                <Col xs="5">
                                                    <Label>{this.props.info.customer.fullname}</Label>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup row className="my-0">
                                                <Col xs="5">
                                                    <Label>Điạ chỉ</Label>
                                                </Col>
                                                <Col xs="5">
                                                    <Label>{this.props.info.customer.address}</Label>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="6">
                                            <FormGroup row className="my-0">
                                                <Col xs="5">
                                                    <Label>Giới tính</Label>
                                                </Col>
                                                <Col xs="5">
                                                    <Label>{this.props.info.customer.gender}</Label>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup row className="my-0">
                                                <Col xs="5">
                                                    <Label>Email</Label>
                                                </Col>
                                                <Col xs="5">
                                                    <Label>{this.props.info.customer.email}</Label>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row className="my-0">
                                        <Col xs="6">
                                            <FormGroup row className="my-0">
                                                <Col xs="5">
                                                    <Label>Người tạo</Label>
                                                </Col>
                                                <Col xs="5">
                                                    <Label>{this.props.info.staff.fullname}</Label>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup row className="my-0">
                                                <Col xs="5">
                                                    <Label>Ngày tạo</Label>
                                                </Col>
                                                <Col xs="5">
                                                    <Label>{this.props.info.date}</Label>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                </Form>
                                <ReactTable
                                    data={data}
                                    className="-striped -highlight"
                                    noDataText="Không có dữ liệu!"
                                    columns={column}
                                    defaultPageSize={5}
                                    filterable
                                    SubComponent={false}
                                />
                            </div>
                            <div className="actions">
                                <div className="btn btn-primary button" onClick={() => {
                                    console.log('modal closed ')
                                    this.onClose(); close()
                                }}>
                                    <i className="fa fa-ban"> Đóng lại </i>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Popup>
        );
    }
}

export default PopUpSaleOrder