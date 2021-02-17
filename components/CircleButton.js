import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.fun} style={{
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 10,
                backgroundColor: "#F575D5",
                width: 70,
                borderRadius: 50,
                height: 70,
                justifyContent: "center",
                bottom: 5
            }}>
                <Image
                    style={{ position: "absolute", left: 2.5, width: 65, height: 65 }}
                    source={require('./../img/plus.png')}
                />
            </TouchableOpacity>
        );
    }
}

export default CircleButton;