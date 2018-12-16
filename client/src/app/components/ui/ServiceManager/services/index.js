import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DeleteFrom, SearchFrom} from '../../../containers/services';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTable from '../../utils/Table'

class ServiceUI extends Component {

    constructor(props) {
        super(props)
        this.state = {
            docs: [],
            limit: 10,
            page: 1,
            pages: 1,
            total: 1,
            queryString: null
        }

        this.gotoPage = this.gotoPage.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount(){
        this.gotoPage()(1)
    }

    search = (queryString) => {
        this.setState({
            queryString
        })
        this.gotoPage(queryString)(1)
    }

    gotoPage = (queryString) => (page) => {
        this.props.findAll({
            string: queryString,
            limit: 10,
            page: page
        }, (result, err) => {
            this.setState({
                ...this.state,
                ...result
            })
            console.log(result)
        });

    }

    render() {
        var mapList = this.props.todos;
        
        var listItem = mapList.map((item, index) => {
            const date = new Date(item.date);
            return (
                <tr key = {index}>
                    <td>{item.staff.fullname}</td>
                    <td>{item.customer.fullname}</td>
                    <td>{item.customer.phone}</td>
                    <td>{item.accessories.reduce((array, item) => {
                        if (array.indexOf(item.computerSeries) == -1) {
                            array.push(item.computerSeries)
                        }
                        return array
                    }, []).map(i =>  <a>{i}</a>)}</td>
                    <td>{item.accessories.reduce((array, item) => {
                        if (array.indexOf(item.type) == -1) {
                            array.push(item.type)
                        }
                        return array
                    }, []).map(i =>  <a>{i}</a>)}</td>
                    <td>{`${date.getDay() + 1}-${date.getMonth() + 1}-${date.getFullYear()}`}</td>
                    <td>{item.totalPrice}</td>

                    <td>
                        <div className="btn-group">
                            <Link 
                                to = {`/services/service/${item._id}/edit`}
                                className="btn btn-primary"
                            >
                                <i className="fa fa-edit"> Xem chi tiết </i>
                            </Link>
                            <DeleteFrom 
                                name='đơn hàng này'
                                id={item._id}
                            />
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
                                <i className="fa fa-align-justify"></i> Danh sách hóa đơn
                            </CardHeader>
                            <CardBody>
                                <Link
                                    to = {'/services/service/new'}
                                    className="btn" style={{ backgroundColor: '#17a2b8' }}>
                                    <i className="fa fa-plus text-white"> Tạo mới </i>
                                </Link>
                                <hr />

                                <SearchFrom onSearch={this.search}/>
                                <hr />
                                <CustomTable
                                    thead = {
                                        <tr>
                                            <th>Người bán</th>
                                            <th>Khách hàng</th>
                                            <th>SDT</th>
                                            <th>Series máy</th>
                                            <th>Loại linh kiện</th>
                                            <th>Ngày dịch vụ</th>
                                            <th>Tổng tiền</th>
                                            <th style={{ width: '20%' }}>Hành động</th>
                                        </tr>
                                    }

                                    tbody = {listItem}
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

export default ServiceUI