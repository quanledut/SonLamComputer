import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Nav, NavItem, NavLink, TabPane, TabContent, Form, FormGroup, Label, Input } from 'reactstrap';
import { DeleteFrom, SaleOrder } from '../../containers/customer';
import { Link } from 'react-router-dom';
import { SearchFrom } from './../../containers/user';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTable from '../utils/Table';
import ReactTable from "react-table";
import "react-table/react-table.css";
import classnames from 'classnames';

const columns = [
    {
        Header: "Mã khách hàng",
        //   id: "customer_no",
        //   accessor: d => d.customer_no
        accessor: "user.code"
    },
    {
        Header: "Tên khách hàng",
        accessor: "user.fullname"
    },
    {
        Header: "Số điện thoại",
        accessor: "user.phone"
    },
    {
        Header: "Tổng bán",
        accessor: "totalSale"
    },
];

const columns2 = [
    {
        Header: "Mã hóa đơn",
        accessor: "_id"
    },
    {
        Header: "Thời gian",
        accessor: "date"
    },
    {
        Header: "Loại",
        accessor:'serviceType.name'
    },
    {
        Header: "Người bán",
        accessor: "staff.fullname"
    },
    {
        Header: "Tổng bán",
        accessor: "totalPrice"
    },
];

class Customers extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            isOpen: false,
            customers: [],
            services:[],
            rowInfo : {}
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    componentDidMount() {
        const isEmpty = (obj) => {
            return Object.keys(obj).length === 0 && obj.constructor === Object
        }
        this.props.findAll((result, err) => {
            console.log(result, err)
            this.setState({
                customers: result.map(item => {
                    item.totalSale = !isEmpty(item.services) ? item.services.reduce((sum, item1) => {
                        return sum + item1.totalPrice
                    }, 0) : 0;

                    return item;
                }),
            })
        });
    }

    showPopUp = (state) => {
        console.log('rowInfo',state)
        this.setState({
            ...this.state,
            isOpen : true,
            rowInfo : state.original
        }
        )
    }

    onClose ()
    {
        this.setState({
            ...this.state,
            isOpen: false
        })
    }

    render() {
        return (
            <div className="animated fadeIn">
            <SaleOrder 
                isOpen = {this.state.isOpen}
                isClose = {() => this.onClose()}
                info = {this.state.rowInfo}
            />
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Khách hàng
                            </CardHeader>
                            <CardBody>
                                <Link
                                    to={'/customers/new'}
                                    className="btn" style={{ backgroundColor: '#17a2b8' }}>
                                    <i className="fa fa-plus text-white"> Tạo mới khách hàng </i>
                                </Link>
                                <hr />

                                <SearchFrom />
                                <hr />

                                <ReactTable
                                    data={this.state.customers}
                                    className="-striped -highlight"
                                    noDataText="Không có dữ liệu!"
                                    columns={columns}
                                    defaultPageSize={10}
                                    filterable
                                    //showPagination={false}
                                    SubComponent={row => {
                                        console.log(row)
                                        console.log('aaaa',row.original.services)
                                        return (
                                            <div style={{ padding: "20px" }}>
                                                <Nav tabs>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => { this.toggle('1'); }}
                                                        >
                                                            <i className="icon-calculator"></i> <span className={this.state.activeTab === '1' ? '' : 'd-none'}> Thông tin chung</span>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('2'); }}
                                                        >
                                                            <i className="icon-basket-loaded"></i> <span
                                                                className={this.state.activeTab === '2' ? '' : 'd-none'}> Lịch sử giao dịch</span>
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav>
                                                <TabContent activeTab={this.state.activeTab}>
                                                    <TabPane tabId="1">
                                                        <Form>
                                                            <FormGroup row className="my-0">
                                                                <Col xs="6">
                                                                    <FormGroup row className="my-0">
                                                                        <Col xs="4">
                                                                            <Label>Mã khách hàng</Label>
                                                                        </Col>
                                                                        <Col xs="8">
                                                                            <Label>{row.original.user.code}</Label>
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="6">
                                                                    <FormGroup row className="my-0">
                                                                        <Col xs="4">
                                                                            <Label>Điện thoại</Label>
                                                                        </Col>
                                                                        <Col xs="8">
                                                                            <Label>{row.original.user.phone}</Label>
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>
                                                            </FormGroup>
                                                            <FormGroup row className="my-0">
                                                                <Col xs="6">
                                                                    <FormGroup row className="my-0">
                                                                        <Col xs="4">
                                                                            <Label>Tên khách hàng</Label>
                                                                        </Col>
                                                                        <Col xs="8">
                                                                            <Label>{row.original.user.fullname}</Label>
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="6">
                                                                    <FormGroup row className="my-0">
                                                                        <Col xs="4">
                                                                            <Label>Điạ chỉ</Label>
                                                                        </Col>
                                                                        <Col xs="8">
                                                                            <Label>{row.original.user.address}</Label>
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>
                                                            </FormGroup>
                                                            <FormGroup row className="my-0">
                                                                <Col xs="6">
                                                                    <FormGroup row className="my-0">
                                                                        <Col xs="4">
                                                                            <Label>Email</Label>
                                                                        </Col>
                                                                        <Col xs="8">
                                                                            <Label>{row.original.user.email}</Label>
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>
                                                            </FormGroup>
                                                            <FormGroup row className="my-0">
                                                                <Col xs="6">
                                                                    <FormGroup row className="my-0">
                                                                        <Col xs="4">
                                                                            <Label>Ngày tạo</Label>
                                                                        </Col>
                                                                        <Col xs="8">
                                                                            <Label>{row.original.user.created_time}</Label>
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>
                                                            </FormGroup>
                                                        </Form>
                                                        <div>
                                                            <Link
                                                                to={`/usermanager/${row.original.user._id}/edit/0`}
                                                                className="btn btn-primary"
                                                            >
                                                                <i className="fa fa-edit"> Sửa </i>
                                                            </Link>
                                                            &nbsp;
                                                            {/* <Link
                                                                to={`/usermanager/${row.original.user._id}/edit/0`}
                                                                className="btn btn-success"
                                                            >
                                                                <i className="fa fa-edit"> Ngưng hoạt động </i>
                                                            </Link> */}
                                                        </div>
                                                    </TabPane>
                                                    <TabPane tabId="2">
                                                        <ReactTable
                                                            data={row.original.services}
                                                            className="-striped -highlight"
                                                            noDataText="Không có dữ liệu!"
                                                            columns={columns2}
                                                            defaultPageSize={5}
                                                            filterable
                                                            getTrProps={(state, rowInfo) => ({
                                                                onClick: () => {this.showPopUp(rowInfo)}
                                                              })}
                                                        />
                                                    </TabPane>
                                                </TabContent>
                                            </div>
                                        );
                                    }}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000} position={"bottom-right"} />
            </div>
        );
    }
}

export default Customers
