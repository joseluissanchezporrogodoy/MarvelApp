import React, { Component } from 'react'
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

import CharactersCell from './CharacterCell'
import {Actions} from 'react-native-router-flux'
//Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'marvel_app/src/redux/actions/characters'


class CharactersList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            selected: null,

        }
    }
    componentWillMount() {
        this.props.fetchCharactersList()
    }
    onSelect(character) {
        this.props.updateSelected(character)
    }
    renderFooter(){
        return <ActivityIndicator
                         animating= {this.props.isFetching} 
                         size="large" 
                         color = "white"
                         />
    }


    renderItem(item, index) {
        return (
            <CharactersCell
                item={item}
                onSelect={(v)=> this.onSelect(v)}
            />
        )
    }
    render() {
       
      
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.props.list}
                    ListFooterComponent ={() => this.renderFooter()}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => item.id}
                    extraData={this.state}
                    numColumns={1}
                />
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("ESTADO_GLOBAL:", state)
    return {
        list: state.characters.list,
        selected: state.characters.item,
        isFetching: state.characters.isFetching,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCharactersList: () => {
            dispatch(CharactersActions.fetchCharactersList())
        },
        updateSelected: (item) =>{
            dispatch(CharactersActions.updateCharacterSelected(item))
           
        },
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingTop:0,
    }
})