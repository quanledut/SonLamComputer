import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

class SearchUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChange = (event) =>{
        this.setState({
            keyword : event.target.value
        })
    }

    onSearch = () =>{
        this.props.onSearch(this.state.keyword);
    }
    render() {
        return (
            <div className="input-group col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{ paddingLeft: 0 }}>
                <input 
                    value = {this.state.keyword}
                    type="text" 
                    className="form-control" 
                    name = "keyword" 
                    id="exampleInputAmount" 
                    placeholder="Search" 
                    onChange = {this.onChange}
                />
                <span className="input-group-btn">
                    <button type="button" className="btn" style={{ backgroundColor: '#17a2b8' }} onClick = {this.onSearch}>
                        <i className="fa fa-search text-white"> Search</i>
                    </button>
                </span>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{}
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch : (keyword) =>{
            dispatch(actions.search_user(keyword));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchUser);