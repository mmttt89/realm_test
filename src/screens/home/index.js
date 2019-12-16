import React from 'react';
import Realm from "realm";
import { View } from 'react-native';
import MButton from '@Components/M-Button';
import MText from '@Components/M-Text';
import pkg from "../../../package.json";

let realm;

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        realm = new Realm({
            path: 'UserDatabase.realm',
            schema: [
                {
                    name: 'user_details',
                    properties: {
                        user_id: { type: 'int', default: 0 },
                        user_name: 'string',
                        user_contact: 'string',
                        user_address: 'string',
                    },
                },
            ],
        });
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    flexDirection: 'column',
                }}>
                <MText text={`Realm: ${pkg.dependencies.realm}`}></MText>
                <MText text={`React: ${pkg.dependencies.react}`}></MText>
                <MText text={`React-Native: 0.61.5`}></MText>
                <MText text="CRUD Realm Example" />
                <MButton
                    title="Register"
                    customClick={() => this.props.navigation.navigate('Register')}
                />
                <MButton
                    title="Update"
                    customClick={() => this.props.navigation.navigate('Update')}
                />
                <MButton
                    title="View"
                    customClick={() => this.props.navigation.navigate('ViewUser')}
                />
                <MButton
                    title="View All"
                    customClick={() => this.props.navigation.navigate('ViewAll')}
                />
                <MButton
                    title="Delete"
                    customClick={() => this.props.navigation.navigate('Delete')}
                />
            </View>
        )
    }
}