import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {AcceptFrom, SearchFrom} from '../../containers/payments';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTable from '../utils/Table'

class PaymentUI extends Component {

    constructor(props) {
        super(props)
        this.state = {
            docs: [],
            limit: 10,
            page: 1,
            pages: 1,
            total: 1
        }

        this.gotoPage = this.gotoPage.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount(){
        this.gotoPage(1)
    }

    search = (queryString) => {
        this.gotoPage(1, queryString)
    }

    gotoPage = (page, queryString) => {
        this.props.findAll({
            string: queryString,
            limit: 10,
            page: page
        }, (result, err) => {
            this.setState({
                ...this.state,
                ...result
            })
        });

    }

    render() {
        var {keyword} = this.props;
        var mapList = this.props.todos;
        console.log(this.props)
        mapList = mapList.filter((item) => {
            return item.customer_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        var listItem = mapList.map((item, index) => {
            return (
                <tr key = {index}>
                    <td>{item.customer_name}</td>
                    <td>{item.serviceType}</td>
                    <td>{item.date}</td>
                    <td>{item.totalPrice}</td>

                    <td>
                        <div className="btn-group">
                            <Link 
                                to = {`/payments/${item._id}/view`}
                                className="btn btn-primary"
                            >
                                <i className="fa fa-edit"> Chi tiết </i>
                            </Link>
                            {
                                item.status ? null
                                : <AcceptFrom item = {item}/>
                            }
                        </div>
                    </td>
                </tr>
            )
        });

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Danh sách thanh toán dịch vụ
                            </CardHeader>
                            <CardBody>
                                <SearchFrom/>
                                <hr />
                                <CustomTable
                                    thead = {
                                        <tr>
                                            <th>Tên khách hàng</th>
                                            <th>Loại dịch vụ</th>
                                            <th>Ngày dịch vụ</th>
                                            <th>Tổng tiền</th>
                                            <th style={{ width: '20%' }}>Hành động</th>
                                        </tr>
                                    }

                                    tbody = {listItem}
                                    page = {this.state.page}
                                    pages = {this.state.pages}
                                    gotoPage = {this.gotoPage}
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

export default PaymentUI