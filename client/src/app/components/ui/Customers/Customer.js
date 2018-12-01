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
        accessor: "customer_no"
    },
    {
        Header: "Tên khách hàng",
        accessor: "fullname"
    },
    {
        Header: "Số điện thoại",
        accessor: "phone"
    },
    {
        Header: "Tổng bán",
        accessor: "totalSale"
    },
];

const columns2 = [
    {
        Header: "Mã hóa đơn",
        //   id: "customer_no",
        //   accessor: d => d.customer_no
        accessor: "saleorder_no"
    },
    {
        Header: "Thời gian",
        accessor: "saleOrderDate"
    },
    {
        Header: "Loại",
        accessor:'saleOrderType'
    },
    {
        Header: "Người bán",
        accessor: "employeeSale"
    },
    {
        Header: "Tổng bán",
        accessor: "totalSale"
    },
];

const data = [
    {
        customer_no: 'KH-00001.18',
        fullname: 'Nguyễn Khánh Huy',
        phone: '0354522248',
        totalSale: '100.000.000đ'
    },
    {
        customer_no: 'KH-00002.18',
        fullname: 'Huy',
        phone: '0354522248',
        totalSale: '100.000.000đ'
    }
]

const data2 = [
    {
        saleorder_no: 'ĐBH-00001.18',
        saleOrderDate: '20/11/2018',
        saleOrderType:'Mua bán',
        employeeSale: 'Lê Phước Thành Sơn',
        totalSale: '100.000.000đ'
    },
    {
        saleorder_no: 'ĐBH-00002.18',
        saleOrderDate: '21/11/2018',
        saleOrderType:'Sửa chữa',
        employeeSale: 'Nguyễn Khánh Huy',
        totalSale: '100.000.000đ'
    }
]

class Customers extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            isOpen: false,
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
        this.props.findAll((result, err) => {
            console.log(result, err)
        });
    }

    showPopUp = (state) => {
        console.log(state)
        this.setState({
            ...this.state,
            isOpen : true
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
                                    data={data}
                                    className="-striped -highlight"
                                    noDataText="Không có dữ liệu!"
                                    columns={columns}
                                    defaultPageSize={10}
                                    filterable
                                    //showPagination={false}
                                    SubComponent={row => {
                                        console.log(row)
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
                                                                <Col xs="5">
                                                                    <FormGroup row className="my-0">
                                                                        <Col xs="5">
                                                                            <Label>Mã khách hàng</Label>
                                                                        </Col>
                                                                        <Col xs="5">
                                                                            <Label>{row.row.customer_no}</Label>
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="5">
                                                                    <FormGroup row className="my-0">
                                                                        <Col xs="5">
                                                                            <Label>Điện thoại</Label>
                                                                        </Col>
                                                                        <Col xs="5">
                                                                            <Label>{row.row.customer_no}</Label>
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
                                                                            <Label>{row.row.fullname}</Label>
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="5">
                                                                    <FormGroup row className="my-0">
                                                                        <Col xs="5">
                                                                            <Label>Điạ chỉ</Label>
                                                                        </Col>
                                                                        <Col xs="5">
                                                                            <Label>{row.row.fullname}</Label>
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
                                                                            <Label>{row.row.customer_no}</Label>
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="5">
                                                                    <FormGroup row className="my-0">
                                                                        <Col xs="5">
                                                                            <Label>Email</Label>
                                                                        </Col>
                                                                        <Col xs="5">
                                                                            <Label>{row.row.fullname}</Label>
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
                                                                            <Label>{row.row.customer_no}</Label>
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="5">
                                                                    <FormGroup row className="my-0">
                                                                        <Col xs="5">
                                                                            <Label>Ngày tạo</Label>
                                                                        </Col>
                                                                        <Col xs="5">
                                                                            <Label>{row.row.fullname}</Label>
                                                                        </Col>
                                                                    </FormGroup>
                                                                </Col>
                                                            </FormGroup>
                                                        </Form>
                                                        <div>
                                                            <Link
                                                                to={`/customers/${row.row.customer_no}/edit`}
                                                                className="btn btn-primary"
                                                            >
                                                                <i className="fa fa-edit"> Sửa </i>
                                                            </Link>
                                                            &nbsp;
                                                            <Link
                                                                to={`/customers/${row.row.customer_no}/edit`}
                                                                className="btn btn-success"
                                                            >
                                                                <i className="fa fa-edit"> Ngưng hoạt động </i>
                                                            </Link>

                                                            {/* <DeleteFrom 
                                                    name={user.username} 
                                                    id={user._id}
                                                    /> */}
                                                        </div>
                                                    </TabPane>
                                                    <TabPane tabId="2">
                                                        <ReactTable
                                                            data={data2}
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
