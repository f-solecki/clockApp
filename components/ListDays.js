import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import DayItem from "./DayItem"

class ListDays extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    add = (day) => {
        this.props.add(day)
    }

    render() {
        return (
            <View>
                <FlatList
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
                    data={this.props.days}
                    renderItem={({ item }) => <DayItem day={item.day} chosen={item.chosen} add={this.add} />}
                    keyExtractor={item => item.day.toString()}
                    key={item => item.day.toString()}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})


export default ListDays;

