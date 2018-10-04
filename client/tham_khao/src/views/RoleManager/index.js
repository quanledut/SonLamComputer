import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PopUpDelete from './PopUpDelete';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import {Redirect} from 'react-router-dom';
import Search from './SearchRole';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Role extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRedirect: false
        };
    }

    EditActionRole = (role) =>{
        this.props.editRole(role);
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
                <Redirect to="/roles/editRole"/>
            )
        }
        var {keyword} = this.props;
        var roleList = this.props.todos;
        roleList = roleList.filter((role) => {
            return role.nf_grouprole.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        var roleItem = roleList.map((role, index) => {
            return (
                <tr key = {index}>
                    <td>{role.nf_grouprole}</td>
                    <td>{role.date_input}</td>
                    <td>{role.select}</td>
                    <td>
                        <Badge color="success">Alive</Badge>
                    </td>
                    <td>
                        <div className="btn-group">
                            <div className="btn btn-success">
                                <i className="fa fa-eye"> View Details </i>
                            </div>
                            <div className="btn btn-primary" onClick = {() => this.EditActionRole(role)}>
                                <i className="fa fa-edit"> Edit </i>
                            </div>
                            {/* <div className="btn btn-danger">
                                                        <i className="fa fa-trash"> Delete </i>
                                                    </div> */}
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
                                <i className="fa fa-align-justify"></i> Danh sách quyền
                            </CardHeader>
                            <CardBody>
                                <div className="btn" style={{ backgroundColor: '#17a2b8' }} onClick={this.onClear}>
                                    <a href="#/roles/NewRole"><i className="fa fa-plus text-white"> Add new Group Role </i></a>
                                </div>
                                <hr />

                                <Search/>
                                <hr />

                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>Group Role Name</th>
                                            <th>Date registered</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th style={{ width: '10%' }}>Actions</th>
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

const mapStateToProps = (state) => {
    return {
        todos: state.RoleGroup,
        keyword : state.SearchRole
    }
}

const mapDispatchToProps = (dispatch, props) =>
{
    return {
        editRole: (role) =>
        {
            dispatch(actions.edit_role(role));
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
export default connect(mapStateToProps,mapDispatchToProps)(Role);
