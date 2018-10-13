import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {DeleteFrom} from '../../containers/user';
import {Link} from 'react-router-dom';
import {SearchFrom} from './../../containers/user';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class UserManager extends Component {

    componentDidMount(){
        this.props.findAll();
    }

    render() {
        var {keyword} = this.props;
        var userList = this.props.todos;
        userList = userList.filter((user) => {
            return user.username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        var userItem = userList.map((user, index) => {
            return (
                <tr key = {index}>
                    <td>{user.username}</td>
                    <td>{user.create_time}</td>
                    <td>{user.roles}</td>
                    <td>
                        <div className="btn-group">
                            <Link 
                                to = {`/usermanager/${user._id}/edit`}
                                className="btn btn-primary"
                            >
                                <i className="fa fa-edit"> Sửa </i>
                            </Link>
                            <DeleteFrom 
                                name={user.username} 
                                id={user._id}
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
                                <i className="fa fa-align-justify"></i> Danh sách người dùng
                            </CardHeader>
                            <CardBody>
                                <Link
                                    to = {'/usermanager/new'}
                                    className="btn" style={{ backgroundColor: '#17a2b8' }}>
                                    <i className="fa fa-plus text-white"> Tạo mới người dùng </i>
                                </Link>
                                <hr />

                                <SearchFrom/>
                                <hr />

                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>Tên người dùng</th>
                                            <th>Ngày tạo</th>
                                            <th>Quyền</th>
                                            <th style={{ width: '10%' }}>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userItem}
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

export default UserManager
