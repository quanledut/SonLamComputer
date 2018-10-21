/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types'

class CustomTable extends React.Component {
    // componentWillReceiveProps(nextProps) {
    //     this.state.isOpened = nextProps.isOpened
    // }

    constructor(props) {
        super(props)

        this.gotoPage = this.gotoPage.bind(this)

        this.state = {
            tbody: [],
            thead: [],
            page: 1,
            pages: 1
        }
    }

    gotoPage = (i) => {
        let page = i
        if (page < 1) page = 1
        else if (page > this.state.pages) page = this.state.pages
        this.props.gotoPage(page)
    }

    componentWillReceiveProps(props) {
        console.log(props)
        this.setState({
            ...props
        })
    }


    render() {
        return (
            <div>
                <Table hover bordered striped responsive size="sm">
                    <thead>
                        {this.state.thead}
                    </thead>
                    <tbody>
                        {this.state.tbody}
                    </tbody>
                </Table>
                { this.props.hasPagination && (
                                    <nav>
                                    <Pagination>
                                        <PaginationItem onClick={() => this.gotoPage(this.state.page - 1)}><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                        {
                                            (this.state.page - 2 > 1) && <PaginationItem onClick={() => this.gotoPage(1)}><PaginationLink tag="button">1</PaginationLink></PaginationItem>
                                        }
                                        {
                                            [this.state.page - 3, this.state.page - 2, this.state.page - 1].map((e, id) => {
                                                if (id == 0 && e > 0) return <PaginationItem key={id}><PaginationLink>...</PaginationLink></PaginationItem>
                                                if (e > 0) return <PaginationItem onClick={() => this.gotoPage(e)} key={id}><PaginationLink tag="button">{e}</PaginationLink></PaginationItem>
                                            })
                                        }
                                        <PaginationItem active>
                                            <PaginationLink tag="button">{this.state.page}</PaginationLink>
                                        </PaginationItem>
                                        {
                                            [this.state.page + 1, this.state.page + 2, this.state.page + 3].filter(e => e <= this.state.pages).map((e, id) => {
                                                if (id == 2 && e < this.state.pages) return <PaginationItem key={id}><PaginationLink>...</PaginationLink></PaginationItem>
                                                return <PaginationItem onClick={() => this.gotoPage(e)} key={id}><PaginationLink tag="button">{e}</PaginationLink></PaginationItem>
                                            })
                                        }
                                        {
                                            (this.state.pages > this.state.page + 2) && <PaginationItem onClick={() => this.gotoPage(this.state.pages)}><PaginationLink tag="button">{this.state.pages}</PaginationLink></PaginationItem>
                                        }
                                        <PaginationItem><PaginationLink onClick={() => this.gotoPage(this.state.page + 1)} next tag="button">Next</PaginationLink></PaginationItem>
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
    hasPagination: PropTypes.bool,
    page: PropTypes.number,
    pages: PropTypes.number,
    gotoPage: PropTypes.func,
}

CustomTable.defaultProps = {
    hasPagination: true,
    page: 1,
    pages: 1,
    gotoPage: () => {},
}

export default CustomTable;