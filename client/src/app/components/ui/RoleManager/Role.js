import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PopUpDelete from './PopUpDelete';
import {Link} from 'react-router-dom';
import SearchRole from './Search';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class RoleManager extends Component {

    componentDidMount(){
        this.props.findAllRole((roles, err) => {
            console.log(roles, err)
        });
    }

    render() {
        var {keyword} = this.props;
        console.log(this.props)
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
                            <div className="btn btn-success">
                                <i className="fa fa-eye"> Chi tiết </i>
                            </div>
                            <Link 
                                to = {`/roles/${role._id}/editrole`}
                                className="btn btn-primary"
                            >
                                <i className="fa fa-edit"> Sửa </i>
                            </Link>
                            <PopUpDelete role={role}/>
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

                                <SearchRole/>
                                <hr />

                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>Tên nhóm người dùng</th>
                                            <th style={{ width: '15%' }}>Trạng thái</th>
                                            <th style={{ width: '15%' }}>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roleItem}
                                    </tbody>
                                </Table>
                                <nav>
                                    <Pagination>
                                        <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink tag="button">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                                    </Pagination>
                                </nav>
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
