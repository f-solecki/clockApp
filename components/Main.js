import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyButton from "./MyButton"
import Database from "./Database";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        Database.createTable();
    }
    changeNavigate = () => {
        this.props.navigation.navigate("Alarms")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 60, textAlign: "center", color: 'white' }}>Clock App</Text>
                    <Text style={{ fontSize: 20, textAlign: "center", color: 'white' }}>manage sqlite</Text>
                    <Text style={{ fontSize: 20, textAlign: "center", color: 'white' }}>use animation</Text>
                    <Text style={{ fontSize: 20, textAlign: "center", color: 'white' }}>use ring</Text>
                    <MyButton name="Start" width="50%" fun={this.changeNavigate} />

                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        backgroundColor: "#513BFA",
        justifyContent: "center",
        flex: 1,
        alignItems: "center",

    }

})


export default Main;

