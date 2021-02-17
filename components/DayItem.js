import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

class DayItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    click() {
        this.props.add(this.props.day)
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.click()} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: this.props.chosen ? 'white' : null }}>
                <Text style={{ color: this.props.chosen ? '#513BFA' : 'white' }}>{this.props.day}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})


export default DayItem;

