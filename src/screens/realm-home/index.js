import React from "react";
import { Text, View, FlatList, Button, ActivityIndicator } from "react-native";
import { RealmContext } from "@Context/Realm-Context";
import Realm from "realm";
const REALM_PATH = "UserDatabase.realm";

class RealmHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isLoading: false
        }
    }

    componentDidMount() {
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

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'teal',
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

const RealmHomeWrapper = (props) => {
    return (
        <RealmContext.Consumer>{(realmContext) => {
            return (
                <RealmHome realmContext={realmContext}{...props} />
            )
        }}
        </RealmContext.Consumer>
    )
}

export default RealmHomeWrapper;

const RButton = ({ title, onPress }) =>
    <Button
        style={{ marginVertical: 30 }}
        title={title}
        onPress={onPress}
    />