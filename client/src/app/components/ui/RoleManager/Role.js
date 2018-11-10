import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import {DeleteFrom} from '../../containers/roles';
import {Link} from 'react-router-dom';
import {SearchFrom} from '../../containers/roles';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTable from '../utils/Table'

class RoleManager extends Component {

    componentDidMount(){
        this.props.findAllRole((roles, err) => {
            console.log(roles, err)
        });
    }

    render() {
        var {keyword} = this.props;
        var roleList = this.props.todos;
        roleList = roleList.filter((role) => {
            return role.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        var roleItem = roleList.map((role, index) => {
            return (
                <tr key = {index}>
                    <td>{role.name}</td>
                    <td>
                        <Badge color="success">Alive</Badge>
                    </td>
                    <td>
                        <div className="btn-group">
                            {/* <div className="btn btn-success">
                                <i className="fa fa-eye"> Chi tiết </i>
                            </div> */}
                            <Link 
                                to = {`/roles/${role._id}/edit`}
                                className="btn btn-primary"
                            >
                                <i className="fa fa-edit"> Sửa </i>
                            </Link>
                            <DeleteFrom 
                                name={role.name} 
                                id={role._id}
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
                                <i className="fa fa-align-justify"></i> Danh sách phân quyền
                            </CardHeader>
                            <CardBody>  
                                <Link
                                    to = {'/roles/new'}
                                    className="btn" style={{ backgroundColor: '#17a2b8' }}>
                                    <i className="fa fa-plus text-white"> Tạo mới phân quyền </i>
                                </Link>
                                <hr />

                                <SearchFrom/>
                                <hr />
                                <CustomTable 
                                    thead = {
                                        <tr>
                                            <th>Tên nhóm người dùng</th>
                                            <th style={{ width: '15%' }}>Trạng thái</th>
                                            <th style={{ width: '15%' }}>Hành động</th>
                                        </tr>
                                    }

                                    tbody = {roleItem}
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

export default RoleManager;
