import React, { createContext } from "react";
import Realm from "realm";
const REALM_PATH = "UserDatabase.realm";

const CarSchema = {
    name: 'Car',
    properties: {
        make: 'string',
        model: 'string',
        miles: { type: 'int', default: 0 },
    }
};
const PersonSchema = {
    name: 'Person',
    properties: {
        name: 'string',
        birthday: { type: 'date', default: new Date() },
        cars: 'Car[]', // a list of Cars
        picture: 'string',  // optional property,
        age: 'int',
        nickname: 'string',
        gender: 'string'
    }
};

export const RealmContext = createContext();

export default class RealmContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.realmDB = new Realm({
            path: REALM_PATH,
            schema: [PersonSchema, CarSchema],
            schemaVersion: 3,
            migration: (oldRealm, newRealm) => {
                console.log("migration needed")
            },
            // deleteRealmIfMigrationNeeded: true
        });
        this.state = {
            realm: null
        }
    }

    render() {
        return (
            <RealmContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </RealmContext.Provider>
        )
    }
}