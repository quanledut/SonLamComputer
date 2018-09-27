import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PopUpDelete from './../Extend/PopUpDelete';

class UserManager extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Danh sách người dùng
                            </CardHeader>
                            <CardBody>
                                <div className="btn" style={{ backgroundColor: '#17a2b8' }}>
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
                                        <tr>
                                            <td>Vishnu Serghei</td>
                                            <td>2012/01/01</td>
                                            <td>Member</td>
                                            <td>
                                                <Badge color="success">Active</Badge>
                                            </td>
                                            <td>
                                                <div className="btn-group">
                                                    <div className="btn btn-success">
                                                        <i className="fa fa-eye"> View Details </i>
                                                    </div>
                                                    <div className="btn btn-primary">
                                                        <i className="fa fa-edit"> Edit </i>
                                                    </div>
                                                    {/* <div className="btn btn-danger">
                                                        <i className="fa fa-trash"> Delete </i>
                                                    </div> */}
                                                    <PopUpDelete/>
                                                </div>
                                            </td>
                                        </tr>
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

export default UserManager;
