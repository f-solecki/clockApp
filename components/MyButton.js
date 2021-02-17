import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <TouchableOpacity onPress={this.props.fun} style={{
                marginTop: 10,
                // borderColor: "green",
                // borderWidth: 3,
                borderRadius: 10,
                // backgroundColor: "lightgreen",
                width: 150,
                alignSelf: "center"

            }}>
                <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold', fontSize: 25 }}>{this.props.name}</Text>
            </TouchableOpacity>
        );
    }
}
MyButton.propTypes = {
    name: PropTypes.string.isRequired,
    fun: PropTypes.func.isRequired,
};


export default MyButton;