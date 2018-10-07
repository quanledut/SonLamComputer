import React, { Component } from 'react';
import {Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import PopUpDelete from './PopUpDelete';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import {Redirect} from 'react-router-dom';
import SearchService from './SearchService';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as configvalue from './../../constants/ConfigValue';

class Exchange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRedirect: false
        };
    }

    EditActionService = (service) =>{
        this.props.editService(service);
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
                <Redirect to="/services/editService"/>
            )
        }
        var {keyword} = this.props;
        var serviceList = this.props.todos;
        serviceList = serviceList.filter((service) => {
            return service.nf_username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        var serviceItem = serviceList.map((service, index) => {
            return (
                <tr key = {index}>
                    <td>{service.nf_username}</td>
                    <td>
                        {(service.select === "1") ?
                            <Badge color="success">{configvalue.HOAT_DONG}</Badge>
                        :
                            <Badge color="warning">{configvalue.NGUNG_HOAT_DONG}</Badge>
                        }
                    </td>
                    <td>
                        <div className="btn-group">
                            <div className="btn btn-success">
                                <i className="fa fa-eye"> View Details </i>
                            </div>
                            <div className="btn btn-primary" onClick = {() => this.EditActionService(service)}>
                                <i className="fa fa-edit"> Edit </i>
                            </div>
                            <PopUpDelete service={service}/>
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
                                <i className="fa fa-align-justify"></i> Danh sách dịch vụ
                            </CardHeader>
                            <CardBody>
                                <div className="btn btn-primary" style={{ backgroundColor: '#17a2b8' }} onClick={this.onClear}>
                                    <a href="#/services/newService"><i className="fa fa-plus text-white"> Add new Service </i></a>
                                </div>
                                <hr />

                                <SearchService/>
                                <hr />

                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>ServiceName</th>
                                            <th style={{ width: '15%' }}>Status</th>
                                            <th style={{ width: '15%' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceItem}
                                    </tbody>
                                </Table>
                                <nav>
                                    <Pagination>
                                        <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink tag="button">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                        <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                                    </Pagination>
                                </nav>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <ToastContainer autoClose={2000} position={"bottom-right"} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.ServiceState,
        keyword : state.SearchService
    }
}

const mapDispatchToProps = (dispatch, props) =>
{
    return {
        editService: (service) =>
        {
            dispatch(actions.edit_service(service));
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
export default connect(mapStateToProps,mapDispatchToProps)(Exchange);
