import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { connect } from 'react-redux'


class CharacterDetail extends Component {
  render() {
      const { character } = this.props
      return(
          <View>
              <Text> Estoy en la segunda pantalla</Text>
          </View>
      )
  }

}

const mapStateToProps = (state) => {
    return {
        character: state.characters.item,
    }
}

export default connect(mapStateToProps, null)(CharacterDetail)