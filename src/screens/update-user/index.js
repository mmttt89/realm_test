import React from 'react';
import Realm from 'realm';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import MTextInput from '@Components/M-TextInput';
import MButton from '@Components/M-Button';
let realm;

export default class UpdateUserScreen extends React.Component {
    constructor(props) {
        super(props);
        realm = new Realm({ path: 'UserDatabase.realm' });
        this.state = {
            input_user_id: '',
            user_name: '',
            user_contact: '',
            user_address: '',
        };
    }
    searchUser = () => {
        const { input_user_id } = this.state;
        if (input_user_id == "") {
            alert('Error,userID is empty')
            return;
        }
        var user_details = realm
            .objects('user_details')
            .filtered('user_id =' + input_user_id);
        //user_details is an object        
        if (user_details.length > 0) {
            this.setState({
                user_name: user_details[0].user_name,
                user_contact: user_details[0].user_contact,
                user_address: user_details[0].user_address,
            })
        } else {
            alert('No user found')
            this.setState({ user_name: "", user_contact: "", user_address: "" })
        }
    };
    updateUser = () => {        
        const { input_user_id, user_name, user_contact, user_address } = this.state;
        if (input_user_id) {
            if (user_name) {
                if (user_contact) {
                    if (user_address) {
                        realm.write(() => {
                            var ID = this.state.input_user_id;                            
                            var obj = realm
                                .objects('user_details')
                                .filtered('user_id =' + ID);
                            console.log('obj', obj);
                            if (obj.length > 0) {
                                obj[0].user_name = this.state.user_name;
                                obj[0].user_contact = this.state.user_contact;
                                obj[0].user_address = this.state.user_address;
                                Alert.alert(
                                    'Success',
                                    'User updated successfully',
                                    [
                                        {
                                            text: 'Ok',
                                            onPress: () =>
                                                this.props.navigation.navigate('Home'),
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            } else {
                                alert('User Updation Failed');
                            }
                        });
                    } else {
                        alert('Please fill Address');
                    }
                } else {
                    alert('Please fill Contact Number');
                }
            } else {
                alert('Please fill Name');
            }
        } else {
            alert('Please fill User Id');
        }
    };

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={{ flex: 1, justifyContent: 'space-between' }}>
                        <MTextInput
                            placeholder="Enter User Id"
                            onChangeText={input_user_id => this.setState({ input_user_id })}
                        />
                        <MButton
                            title="Search User"
                            customClick={this.searchUser.bind(this)}
                        />
                        <MTextInput
                            placeholder="Enter Name"
                            value={this.state.user_name}
                            onChangeText={user_name => this.setState({ user_name })}
                        />
                        <MTextInput
                            placeholder="Enter Contact No"
                            value={'' + this.state.user_contact}
                            onChangeText={user_contact => this.setState({ user_contact })}
                            maxLength={10}
                            keyboardType="numeric"
                        />
                        <MTextInput
                            value={this.state.user_address}
                            placeholder="Enter Address"
                            onChangeText={user_address => this.setState({ user_address })}
                            maxLength={225}
                            numberOfLines={5}
                            multiline={true}
                            style={{ textAlignVertical: 'top' }}
                        />
                        <MButton
                            title="Update User"
                            customClick={this.updateUser}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}

