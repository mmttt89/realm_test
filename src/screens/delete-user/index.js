import React from 'react';
import { View, Alert } from 'react-native';
import MTextInput from '@Components/M-TextInput';
import MButton from '@Components/M-Button';
import Realm from 'realm';
let realm;

export default class DeleteUserScreen extends React.Component {
    constructor(props) {
        super(props);
        realm = new Realm({ path: 'UserDatabase.realm' });
        this.state = {
            input_user_id: '',
        };
    }
    deleteUser = () => {
        const { input_user_id } = this.state;
        if (input_user_id == "") {
            alert("user id is empty")
            return;
        }
        realm.write(() => {
            var ID = this.state.input_user_id;
            if (
                realm.objects('user_details').filtered('user_id =' + ID)
                    .length > 0
            ) {
                realm.delete(
                    realm.objects('user_details').filtered('user_id =' + ID)
                );
                var user_details = realm.objects('user_details');
                console.log(user_details);
                Alert.alert(
                    'Success',
                    'User deleted successfully',
                    [
                        {
                            text: 'Ok',
                            onPress: () => this.props.navigation.navigate('Home'),
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                alert('Please insert a valid User Id');
            }
        });
    };

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <MTextInput
                    placeholder="Enter User Id"
                    onChangeText={input_user_id => this.setState({ input_user_id })}
                />
                <MButton
                    title="Delete User"
                    customClick={this.deleteUser}
                />
            </View>
        )
    }
}

