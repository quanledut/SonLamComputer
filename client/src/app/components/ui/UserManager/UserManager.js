import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PopUpDelete from './PopUpDelete';
import { connect } from 'react-redux';
import * as actions from '../../../actions/user';
import {Link} from 'react-router-dom';
import SearchUser from './Search';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class UserManager extends Component {

    componentDidMount(){
        this.props.listAllUser();
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
                        <Badge color="success">Alive</Badge>
                    </td>
                    <td>
                        <div className="btn-group">
                            <div className="btn btn-success">
                                <i className="fa fa-eye"> View Details </i>
                            </div>
                            <Link 
                                to = {`/usermanager/${user._id}/edituser`}
                                className="btn btn-primary"
                            >
                                <i className="fa fa-edit"> Edit </i>
                            </Link>
                            <PopUpDelete user={user}/>
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
                                    to = {'/usermanager/newuser'}
                                    className="btn" style={{ backgroundColor: '#17a2b8' }}>
                                    <i className="fa fa-plus text-white"> Add new User </i>
                                </Link>
                                <hr />

                                <SearchUser/>
                                <hr />

                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Date registered</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th style={{ width: '10%' }}>Actions</th>
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

const mapStateToProps = (state) => {
    return {
        todos: state.usermanager,
        keyword : state.searchUser
    }
}

const mapDispatchToProps = (dispatch, props) =>
{
    return {
        listAllUser : () => {
            dispatch(actions.findAllRequest())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserManager);
