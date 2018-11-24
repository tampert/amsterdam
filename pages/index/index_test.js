// Libraries
import React, { Component } from 'react';

// API
import { BoatService } from '../../app/services';

class HomePage extends Component {

    static async getInitialProps() {
        const response = await BoatService.getAll();
        return { response }
    }
    constructor(props) {
        super(props);

        // Default States
        this.state = {
            results: props.response.items
        }
    }

    render(){
        const { results } = this.state;
        return (
            <div>
                <ul>
                {results.slice(0, 8).map((data) => {
                    // const { thumbnail, images, id, discount, type, brand, model } = data;                   
                    return (<li>
                        <label key={`boat-${data.id}`}>hey</label>
                        ${data.thumbnail}
                        {/* <span>{thumbnail}</span>
                        <span>{images}</span>
                        <span>{id}</span>
                        <span>{discount}</span>
                        <span>{type}</span>
                        <span>{brand}</span>
                        <span>{model}</span> */}
                        </li>
                    )
                })}
                </ul>
            
            </div>
        )
    }
}
export default HomePage;