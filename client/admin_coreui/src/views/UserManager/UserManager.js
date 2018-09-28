import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PopUpDelete from './../Extend/PopUpDelete';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import {Redirect} from 'react-router-dom';

class UserManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRedirect: false
        };
    }

    EditActionUser = (user) =>{
        this.props.editUser(user);
        this.setState({
            isRedirect: true
        });
        this.props.isEditUser();
    }

    onClear = () =>
    {
        this.props.isAddUser();
    }

    render() {
        if(this.state.isRedirect)
        {
            return(
                <Redirect to="/edituser"/>
            )
        }
        var userList = this.props.todos;
        var userItem = userList.map((user, index) => {
            return (
                <tr key = {index}>
                    <td>{user.nf_username}</td>
                    <td>{user.date_input}</td>
                    <td>{user.select}</td>
                    <td>
                        <Badge color="success">Alive</Badge>
                    </td>
                    <td>
                        <div className="btn-group">
                            <div className="btn btn-success">
                                <i className="fa fa-eye"> View Details </i>
                            </div>
                            <div className="btn btn-primary" onClick = {() => this.EditActionUser(user)}>
                                <i className="fa fa-edit"> Edit </i>
                            </div>
                            {/* <div className="btn btn-danger">
                                                        <i className="fa fa-trash"> Delete </i>
                                                    </div> */}
                            <PopUpDelete />
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
                                <div className="btn" style={{ backgroundColor: '#17a2b8' }} onClick={this.onClear}>
                                    <a href="#/newuser"><i className="fa fa-plus text-white"> Add new User </i></a>
                                </div>
                                <hr />

                                <div className="input-group col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{ paddingLeft: 0 }}>
                                    <input type="text" className="form-control" id="exampleInputAmount" placeholder="Search" />
                                    <span className="input-group-btn">
                                        <button type="button" className="btn" style={{ backgroundColor: '#17a2b8' }}>
                                            <i className="fa fa-search text-white"> Search</i>
                                        </button>
                                    </span>
                                </div>
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
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.usermanager
    }
}

const mapDispatchToProps = (dispatch, props) =>
{
    return {
        editUser: (user) =>
        {
            dispatch(actions.edit_user(user));
        },
        isAddUser: () =>
        {
            dispatch(actions.is_add_user());
        },
        isEditUser :() =>
        {
            dispatch(actions.is_edit_user());
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserManager);
