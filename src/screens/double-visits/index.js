import React from "react";
import Realm from "realm";
import { Text, View, FlatList } from "react-native";

const REALM_PATH = "UserDatabase.realm";

export default class DoubleVisits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carsList: [],
        }
    }

    componentDidMount() {
        Realm.open({ path: REALM_PATH })
            .then(
                realm => {
                    let Cars = realm.objects('Car')
                    this.setState({ carsList: Cars })
                }
            )
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    flexDirection: 'column',
                }}>
                <FlatList
                    data={this.state.carsList}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <Text>Make: {item.make}</Text>
                            <Text>Model: {item.model}</Text>
                            <Text>Miles: {item.miles}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}