import React from "react";
import Realm from "realm";
import { Text, View, FlatList, Button, ActivityIndicator } from "react-native";

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

export default class RealmHome extends React.Component {
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
            list: [],
            isLoading: false
        }
    }

    componentDidMount() {
        const currentVersion = Realm.schemaVersion(REALM_PATH);
        console.log("currentVersion", currentVersion)
        // fetch data when app loaded
        Realm.open({ path: REALM_PATH })
            .then(realm => {
                //get Data         
                let Cars = realm.objects('Car')
                this.setState({ list: Cars })
            })
            .catch(error => {
                console.log(error);
            })
    }


    _bulkInsertCarData = () => {
        this.setState({ isLoading: true }, () => {
            Realm.open({ path: REALM_PATH })
                .then(realm => {
                    realm.write(() => {
                        for (let i = 0; i < 3; i++) {
                            realm.create("Car", {
                                make: 'Ford',
                                model: 'FordMostung',
                                miles: 4000,
                            })
                        }
                    })
                    let Cars = realm.objects('Car');
                    this.setState({ list: Cars, isLoading: false })
                })
                .catch(error => {
                    this.setState({ isLoading: false })
                    console.log(error);
                })
        })
    }

    _resetCarsData = () => {
        Realm.open({ path: REALM_PATH })
            .then(realm => {
                realm.write(() => {
                    let Cars = realm.objects('Car')
                    realm.delete(Cars)
                    this.setState({ list: realm.objects('Car') })
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentWillUnMount() {

    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    flexDirection: 'column',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{"No. Of Records:"}</Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 15 }}>{this.state.list.length}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {
                        this.state.isLoading ? <ActivityIndicator size="large" /> : null
                    }
                </View>
                <FlatList
                    data={this.state.list}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 20, borderBottomWidth: 1 }}>
                            <Text>Id: {item.make}</Text>
                            <Text>Name: {item.model}</Text>
                            <Text>Contact: {item.miles}</Text>
                        </View>
                    )}
                />
                <RButton
                    title="Bulk Insert Data"
                    onPress={this._bulkInsertCarData}
                />
                <RButton
                    title="Go to Double Visits"
                    onPress={() => this.props.navigation.navigate('DoubleVisits')}
                />
                <RButton
                    title="Reset All Cars Data"
                    onPress={this._resetCarsData}
                />
            </View>
        )
    }
}
const RButton = ({ title, onPress }) =>
    <Button
        style={{ marginVertical: 30 }}
        title={title}
        onPress={onPress}
    />