import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, LogBox } from 'react-native';
import CircleButton from "./CircleButton"
import Database from "./Database";
import ListItems from "./ListItems"

class Alarms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alarms: []
        };
        this.getData()
    }

    setAlarm = () => {
        this.props.navigation.navigate("AddAlarm", { fun: this.getData })
    }

    toSetting = (id) => {
        this.props.navigation.navigate("SetTime", { id: id, fun: this.changeTime })
    }

    getData = () => {
        Database.getAll().then((all) => {
            let temp = (JSON.parse(all).rows._array)
            this.setState({
                alarms: temp
            })
        })
    }


    changeTime = (id, time) => {
        Database.updateAlarmTime(id, time)
        let temp = this.state.alarms
        for (let x = 0; x < temp.length; x++) {
            if (temp[x].id == id) {
                temp[x].godzina = time
            }
        }
        this.setState({
            alarms: temp
        })
    }

    removeAlarm = (id) => {
        Database.remove(id)
        let temp = this.state.alarms
        let newTab = temp.filter(item => item.id != id)
        this.setState({
            alarms: newTab
        })
    }
    toggle = (id) => {
        let temp = this.state.alarms
        for (let x = 0; x < temp.length; x++) {
            if (temp[x].id == id) {
                if (temp[x].enable == "true") {
                    temp[x].enable = "false"
                    Database.updateSwitch(id, 'false')
                } else {
                    temp[x].enable = "true"
                    Database.updateSwitch(id, 'true')
                }
            }
        }
        this.setState({
            alarms: temp
        })
    }

    render() {
        LogBox.ignoreAllLogs();
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ScrollView >
                        <ListItems tab={this.state.alarms} del={this.removeAlarm} toggle={this.toggle} toSetting={this.toSetting} />
                    </ScrollView>
                </View>
                <View style={styles.down}>
                    <CircleButton fun={this.setAlarm} />
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


export default Alarms;

