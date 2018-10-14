/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types'

class CustomTable extends React.Component {
    // componentWillReceiveProps(nextProps) {
    //     this.state.isOpened = nextProps.isOpened
    // }

    render() {
        return (
            <div>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        {this.props.thead}
                    </thead>
                    <tbody>
                        {this.props.tbody}
                    </tbody>
                </Table>
                { this.props.hasPagination && (
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
                
                )}
            </div>
        );  
    }
}

CustomTable.propTypes = {
    thead: PropTypes.object.isRequired,
    tbody: PropTypes.array.isRequired,
    hasPagination: PropTypes.bool
}

CustomTable.defaultProps = {
    hasPagination: true
}

export default CustomTable;