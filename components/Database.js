import React, { Component } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("solecki_filip_4ib2.db");

class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static createTable() {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS alarmy (id integer primary key autoincrement, godzina text, dni text, enable text);"
            );
        });
    }

    static add() {
        db.transaction(
            tx => {
                tx.executeSql(`INSERT INTO alarmy (godzina, dni,enable) values ('00:00', '','false')`);
            })
    }

    static getAll() {
        var query = "SELECT * FROM alarmy";
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                resolve(JSON.stringify(results));
            }, function (tx, error) {
                reject(error);
            });
        }))
    }

    static getChosen(x) {
        var query = `SELECT * FROM alarmy WHERE (id = ${x})`;
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {
                resolve(JSON.stringify(results));
            }, function (tx, error) {
                reject(error);
            });
        }))
    }

    static updateAlarm(x, days) {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE alarmy SET dni='${days}' WHERE (id = ${x});`
            );
        });
    }
    static updateSwitch(x, enable) {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE alarmy SET enable='${enable}' WHERE (id = ${x});`
            );
        });
    }

    static updateAlarmTime(x, time) {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE alarmy SET godzina='${time}' WHERE (id = ${x});`
            );
        });
    }

    static remove(x) {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM alarmy WHERE (id = ${x});`
            );
        });

    }

    static removeAll() {

        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM alarmy ;"
            );
        });
    }


}



export default Database;

