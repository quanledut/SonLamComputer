import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DeleteFrom, SearchFrom} from '../../../../containers/computername';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTable from '../../../utils/Table'

class ComputerNameUI extends Component {

    componentDidMount(){
        this.props.findAll((result, err) => {
            console.log(result, err)
        });
    }

    render() {
        var {keyword} = this.props;
        var mapList = this.props.todos;
        mapList = mapList.filter((item) => {
            return item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        var listItem = mapList.map((item, index) => {
            return (
                <tr key = {index}>
                    <td>{item.name}</td>
                    <td>{item.type.name}</td>
                    <td>
                        <div className="btn-group">
                            <Link 
                                to = {`/devices/computerName/${item._id}/edit`}
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
                                <i className="fa fa-align-justify"></i> Danh sách máy tính
                            </CardHeader>
                            <CardBody>
                                <Link
                                    to = {'/devices/computerName/new'}
                                    className="btn" style={{ backgroundColor: '#17a2b8' }}>
                                    <i className="fa fa-plus text-white"> Tạo mới máy tính </i>
                                </Link>
                                <hr />

                                <SearchFrom/>
                                <hr />
                                <CustomTable
                                    thead = {
                                        <tr>
                                            <th>Tên máy tính</th>
                                            <th>Loại máy tính</th>
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

export default ComputerNameUI