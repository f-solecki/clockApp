import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Database from './Database';

class SetTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alarm: {},
            hours: 0,
            minutes: 0
        };
    }

    componentDidMount = () => {
        Database.getChosen(this.props.route.params.id)
            .then((one) => {
                let temp = (JSON.parse(one).rows._array)
                this.setState({
                    alarm: temp[0]
                })
            })
            .then(() => {
                let czas = this.state.alarm.godzina
                let godzina = Number(czas.toString().substring(0, 2))
                let minuta = Number(czas.toString().substring(3, 5))
                this.setState({
                    hours: godzina,
                    minutes: minuta
                })
            })
    }

    addHour = () => {
        let hours = this.state.hours
        if (hours != 23)
            hours++
        else
            hours = 0
        this.setState({
            hours: hours
        })
    }

    subHour = () => {
        let hours = this.state.hours
        if (hours != 0)
            hours--
        else
            hours = 23
        this.setState({
            hours: hours
        })
    }

    addMinute = () => {
        let minute = this.state.minutes
        if (minute != 59)
            minute++
        else
            minute = 0
        this.setState({
            minutes: minute
        })
    }

    subMinute = () => {
        let minute = this.state.minutes
        if (minute != 0)
            minute--
        else
            minute = 59
        this.setState({
            minutes: minute
        })
    }

    saveTime = () => {
        let hour = this.state.hours.toString()
        let minute = this.state.minutes.toString()
        if (hour.length == 1) {
            hour = "0" + hour
        }
        if (minute.length == 1) {
            minute = "0" + minute
        }
        let time = hour + ":" + minute
        this.props.route.params.fun(this.props.route.params.id, time)
        this.props.navigation.navigate("Alarms")
    }

    render() {
        return (<View style={{ backgroundColor: '#513BFA', flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View>
                    <TouchableOpacity onPress={this.addHour}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('./../img/up.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 100, textAlign: 'center' }}>{this.state.hours}</Text>
                    <TouchableOpacity onPress={this.subHour}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('./../img/down.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={this.addMinute}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('./../img/up.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 100, textAlign: 'center' }}>{this.state.minutes}</Text>
                    <TouchableOpacity onPress={this.subMinute}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={require('./../img/down.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={{ marginTop: 100 }} onPress={this.saveTime}>
                <Text style={{ color: 'white', fontSize: 100, textAlign: 'center' }}>Zapisz</Text>
            </TouchableOpacity>
        </View>
        );
    }
}


export default SetTime;