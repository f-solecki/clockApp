import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ListItem from "./ListItem"

class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    delete = (id) => {
        this.props.del(id)
    }
    changeTime = (id, time) => {
        this.props.time(id, time)
    }
    toSetting = (id) => {
        this.props.toSetting(id)
    }

    toggle = (id) => {
        this.props.toggle(id)
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={StyleSheet.alarm}
                    data={this.props.tab}
                    renderItem={({ item }) => <ListItem id={item.id} enable={item.enable} godzina={item.godzina} toggle={this.toggle} del={this.delete} toSetting={this.toSetting} />}
                    keyExtractor={item => item.id.toString()}
                    key={item => item.id.toString()}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    alarm: {
        backgroundColor: 'red'
    }
})


export default ListItems;

