import React, {Component} from 'react';

class Error extends Component {
    render() {
        return(
            <div>
                <h1>An error occurred</h1>
                <p>{this.props.error}</p>
            </div>
        )
    }
}

export default Error;