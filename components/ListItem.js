import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Switch, Image, TouchableNativeFeedback, Animated, TouchableOpacity } from 'react-native';
import ListDays from "./ListDays"
import Database from "./Database";


class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: new Animated.Value(150), // początkowa wartość wysokości itema
            expanded: false, // zwinięty
            days: [
                { day: "Nd.", chosen: false },
                { day: "Pn.", chosen: false },
                { day: "Wt.", chosen: false },
                { day: "Śr.", chosen: false },
                { day: "Cz.", chosen: false },
                { day: "Pt.", chosen: false },
                { day: "Sb.", chosen: false },
            ],
            chosenDays: [],
            newTime: '',
            settingTime: false,
            showText: ""
        };

        this.toValue = 0  // przechowanie wartości animowanej, tutaj wysokości
    }

    componentDidMount = () => {
        Database.getChosen(this.props.id).then((one) => {
            let temp = (JSON.parse(one).rows._array)
            let tempDays = this.state.days
            for (let x = 0; x < tempDays.length; x++) {
                if (temp[0].dni.includes(tempDays[x].day)) {
                    tempDays[x].chosen = true
                }
            }
            this.setState({
                days: tempDays
            })
            this.change()
        })
    }

    toggle() {
        if (!this.state.expanded) this.toValue = 200
        else this.toValue = 150

        Animated.spring(this.state.height, {
            toValue: this.toValue,
            useNativeDriver: false,
        }).start();

        this.setState({
            expanded: !this.state.expanded,
        })
    }

    delete = () => {
        this.props.del(this.props.id)
    }

    change = () => {
        let temp = []
        for (let x = 0; x < this.state.days.length; x++) {
            if (this.state.days[x].chosen == true) {
                temp.push(this.state.days[x].day)
            }
        }
        let tempDays = ''
        for (let x = 0; x < temp.length; x++) {
            switch (temp[x]) {
                case "Pn.":
                    tempDays += "Pon."
                    break
                case "Wt.":
                    tempDays += "Wto."
                    break
                case "Śr.":
                    tempDays += "Śro."
                    break
                case "Cz.":
                    tempDays += "Czw."
                    break
                case "Pt.":
                    tempDays += "Pt."
                    break
                case "Sb.":
                    tempDays += "Sob."
                    break
                case "Nd.":
                    tempDays += "Niedz."
                    break
            }
            if (x == temp.length - 1) {
                console.log("Mam")
            } else {
                tempDays += ", "
            }
        }
        this.setState({
            chosenDays: temp,
            showText: tempDays
        })
        let toSave = ""
        for (let x = 0; x < temp.length; x++) {
            toSave += temp[x]
        }
        Database.updateAlarm(this.props.id, toSave)
    }

    add = (day) => {
        let temp = this.state.days
        for (let x = 0; x < temp.length; x++) {
            if (temp[x].day == day) {
                if (temp[x].chosen == false) {
                    temp[x].chosen = true
                } else {
                    temp[x].chosen = false

                }
            }
        }
        this.change()
    }

    changeTime = () => {
        this.props.toSetting(this.props.id)
    }

    toggleSwitch = () => {
        this.props.toggle(this.props.id)
    }

    render() {

        return (
            <View style={styles.container}>
                <Animated.View style={{ width: Dimensions.get("window").width - 20, left: 10, top: 5, height: this.state.height, borderBottomWidth: 1, borderBottomColor: 'white' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={() => this.changeTime()}>
                            <Text style={{ fontSize: 50, color: 'white' }}>{this.props.godzina}</Text>
                        </TouchableOpacity>
                        {this.props.enable == "true" ?
                            <Switch style={{ left: -10 }} trackColor={{ false: "#767577", true: "#fff" }}
                                value={true} onValueChange={this.toggleSwitch} />
                            :
                            <Switch style={{ left: -10 }} trackColor={{ false: "#767577", true: "#81b0ff" }}
                                value={false} onValueChange={this.toggleSwitch} />
                        }
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", top: 10 }}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                            onPress={() => this.delete()}
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        >
                            <View style={{ width: 30, height: 30 }}>
                                <Image
                                    style={{ position: "absolute", left: 2.5, top: 2.5, width: 25, height: 25 }}
                                    source={require('./../img/trash.png')}
                                />
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                            onPress={() => this.toggle()}
                            style={{
                                width: 100,
                                height: 100,
                            }}
                        >
                            <View style={{ width: 25, height: 25, right: 20 }}>
                                {this.state.expanded ?
                                    <Image
                                        style={{ width: 25, height: 25 }}
                                        source={require('./../img/up.png')}
                                    /> : <Image
                                        style={{ width: 25, height: 25 }}
                                        source={require('./../img/down.png')}
                                    />
                                }
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{ top: this.state.expanded ? 70 : 25 }}>
                        {!this.state.expanded ?
                            <Text style={{ color: 'white', fontSize: 20 }}>{this.state.showText}</Text> : <ListDays days={this.state.days} add={this.add} />}
                    </View>
                </Animated.View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    alarm: {
        backgroundColor: 'yellow'
    }
})


export default ListItem;

