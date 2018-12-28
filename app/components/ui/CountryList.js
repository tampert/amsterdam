import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo';

const getAllCountriesQuery = gql`
query { 
    country { 
        country_name 
    }
}
`

class CountryList extends Component {
    render(){
        console.log(this.props)
        return (
            <div>
                <ul id="country-list">
                    <li>Country name</li>
                </ul>
            </div>
        );
    }
}

export default graphql(getAllCountriesQuery)(CountryList);