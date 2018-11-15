import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DeleteFrom, SearchFrom} from '../../../../containers/devicetype';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTable from '../../../utils/Table'

class DeviceType extends Component {
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
            return (
                <tr key = {index}>
                    <td>{item.name}</td>
                    <td>
                        <div className="btn-group">
                            <Link 
                                to = {`/devices/deviceType/${item._id}/edit`}
                                className="btn btn-primary"
                            >
                                <i className="fa fa-edit"> Sửa </i>
                            </Link>
                            <DeleteFrom 
                                name={item.name} 
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
                                <i className="fa fa-align-justify"></i> Danh sách loại thiết bị
                            </CardHeader>
                            <CardBody>
                                <Link
                                    to = {'/devices/deviceType/new'}
                                    className="btn" style={{ backgroundColor: '#17a2b8' }}>
                                    <i className="fa fa-plus text-white"> Tạo mới loại thiết bị </i>
                                </Link>
                                <hr />

                                <SearchFrom onSearch={this.search}/>
                                <hr />
                                <CustomTable
                                    thead = {
                                        <tr>
                                            <th>Tên loại thiết bị</th>
                                            <th style={{ width: '20%' }}>Hành động</th>
                                        </tr>
                                    }

                                    tbody = {listItem}
                                    page = {this.state.page}
                                    pages = {this.state.pages}
                                    gotoPage = {this.gotoPage(this.state.queryString)}
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

export default DeviceType