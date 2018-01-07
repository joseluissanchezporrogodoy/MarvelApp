import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Colors } from 'marvel_app/src/commons'
import { Input, Button } from 'marvel_app/src/widgets'
import ImagePicker from 'react-native-image-picker'

// Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'marvel_app/src/redux/actions/characters'


class CharacterNew extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            nameError: '',

            description: '',
            descriptionError: '',

            image: null,
        }
    }

    validateForm() {
        let valid = true
        let errors = {}

        if(!this.state.name) {
            errors.name = 'Elige un nombre válido'
            valid = false
        }

        if(!this.state.description) {
            errors.description = 'Elige una descripción válida'
            valid = false
        }

        this.setState({ 
            nameError: errors.name ? errors.name : '',
            descriptionError: errors.description ? errors.description : '',
        })

        return valid
    }

    onSubmit() {

        if( this.validateForm() ) {
            
            const characterData = {
                name: this.state.name,
                description: this.state.description,
                image: this.state.image ? { uri: this.state.image.uri } : null,
            
            }
            console.log('characterData',characterData)
            this.props.postCharacter(characterData)  
        } 
    }

    onSelectImageTapped() {
        const options = {
            title: 'Seleccionar imagen',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                //let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    image: response
                });
            }
        });

    }

    render() {        
        const imageUri = this.state.image ? { uri: this.state.image.uri } : null
        const imageButtonText = this.state.image ? this.state.image.fileName : 'Elegir imagen'

        return (
            <View style={styles.container}>

                <View style={styles.imageContainer}>

                    <Image source={imageUri} style={styles.imageContainerBackground} resizeMode={'cover'} />
                    
                    <TouchableOpacity style={styles.button} onPress={ () => this.onSelectImageTapped() } >
                        <Text style={styles.textButton}>{ imageButtonText }</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.inputContainer}>
                    <Input
                        onChangeText={(v) => this.setState({ name: v })}
                        value={this.state.name}
                        error={this.state.nameError}
                        label={'Nombre:'}
                        placeholder={'Torrente'}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        onChangeText={(v) => this.setState({ description: v })}
                        value={this.state.description}
                        error={this.state.description}
                        label={'Description:'}
                        placeholder={'En un lugar de la mancha...'}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        label={'Guardar'}
                        onPress={() => this.onSubmit()}
                        isFetching={this.props.isFetching}
                    />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.characters.isFetching,
        total: state.characters.total,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        postCharacter: (data) => {
            dispatch(CharactersActions.postCharacter(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterNew)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    imageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageContainerBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    button: {
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 6,
    },

    textButton: {
        color: 'white',
        fontWeight: '600',
    },

    inputContainer: {
        margin: 20,
    },

    buttonContainer: {
        margin: 20,
    },

})
