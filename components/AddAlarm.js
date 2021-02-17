import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircleButton from "./CircleButton"
import Database from "./Database";


class AddAlarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };


    }

    newAlarm = () => {
        Database.add()
        this.props.route.params.fun()
        this.props.navigation.navigate("Alarms")

    }


    render() {
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 40, textAlign: "center", color: 'white' }}>Kliknij "+" aby dodać do bazy budzik z godziną 00:00</Text>
                </View>
                <View style={styles.down}>
                    <CircleButton fun={this.newAlarm} />
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
        flex: 7,
        alignItems: "center",
    },
    down: {
        backgroundColor: "#513BFA",
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
    }
})


export default AddAlarm;

