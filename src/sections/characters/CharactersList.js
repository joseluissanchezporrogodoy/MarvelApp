import React, { Component } from 'react'
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

import CharactersCell from './CharacterCell'
import {Actions} from 'react-native-router-flux'
//Redux
import { connect } from 'react-redux'
import * as CharactersActions from 'marvel_app/src/redux/actions/characters'
import Spinner from 'react-native-spinkit';

class CharactersList extends Component {

    constructor(props) {
        super(props)
        this.renderItem = this.renderItem.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
        this.state = {
            //list: [],
            selected: null,
        }

    }
    componentWillMount() {
        this.props.initCharactersList()
    }
    onSelect(character) {
        this.props.updateSelected(character)
    }
    renderFooter(){
        return (
            <View style={styles.containerSpinner}>
            <Spinner isVisible={this.state.isFetching}  size={50}  type={'Pulse'} color= {'black'} />
            </View>
        )
    }


    renderItem(item, index) {
        return (
            <CharactersCell
                item={item}
                onSelect={(v)=> this.onSelect(v)}
            />
        )
    }
    onEndReached(){
        console.log("On END REACHED")
        if(this.props.list.length < this.props.total && !this.props.isFetching){
            let newOffset = this.props.offset + 10
            this.props.fetchCharactersList(newOffset)
        }
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
                    onEndReached ={this.onEndReached}
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
        offset: state.characters.offset,
        total: state.characters.total,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        initCharactersList: ()=>{
            dispatch(CharactersActions.initCharactersList())
        },
        fetchCharactersList: (offset) => {
            dispatch(CharactersActions.updateCharactersListOffset(offset))
            dispatch(CharactersActions.fetchCharactersList())
        },
        updateSelected: (character) =>{
            dispatch(CharactersActions.updateCharacterSelected(character))
            Actions.CharacterDetail({ title: character.name })
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
    },
    containerSpinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
})