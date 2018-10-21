import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DeleteFrom, SearchFrom} from '../../../../containers/devicename';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTable from '../../../utils/Table'

class DeviceNameUI extends Component {
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
            console.log(result)
        });

    }

    render() {
        var {keyword} = this.props;
        var mapList = this.state.docs;

        var listItem = mapList.map((item, index) => {
            return (
                <tr key = {index}>
                    <td>{item.computerName.name}</td>
                    <td>{item.deviceType.name}</td>
                    <td>
                        <div className="btn-group">
                            <Link 
                                to = {`devices/device/${item._id}/edit`}
                                className="btn btn-primary"
                            >
                                <i className="fa fa-edit"> Sửa </i>
                            </Link>
                            <DeleteFrom 
                                name={item.deviceType.name} 
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
                                <i className="fa fa-align-justify"></i> Danh sách thiết bị
                            </CardHeader>
                            <CardBody>
                                <Link
                                    to = {'/devices/device/new'}
                                    className="btn" style={{ backgroundColor: '#17a2b8' }}>
                                    <i className="fa fa-plus text-white"> Tạo mới thiết bị </i>
                                </Link>
                                <hr />

                                <SearchFrom onSearch={this.search}/>
                                <hr />
                                <CustomTable
                                    thead = {
                                        <tr>
                                            <th>Tên máy tính</th>
                                            <th>Loại thiết bị</th>
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

export default DeviceNameUI