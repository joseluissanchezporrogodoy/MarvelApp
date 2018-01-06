import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { connect } from 'react-redux'


class CharacterDetail extends Component {
  render() {
      const { character } = this.props



      const image = character.thumbnail && !character.thumbnail.path.endsWith('image_not_available') ?
          { uri: `${character.thumbnail.path.replace('http', 'https')}/landscape_large.${character.thumbnail.extension}` } :
          require('marvel_app/src/resources/unknown.jpg')

      const description = character && character.description ? character.description : 'No Description'
      const comics = character && character.comics && character.comics.items ? character.comics.items : null
      const events = character && character.events && character.events.items ? character.events.items : null
      const series = character && character.series && character.series.items ? character.series.items : null
      const stories = character && character.stories && character.stories.items ? character.stories.items : null
      console.log(image)
      return (
          <View style={styles.container}>
              <Image source={image} style={styles.image} resizeMode={'cover'} />
              <ScrollView>
                  <Text style={styles.description}>{description}</Text>
                  <View style={[styles.container, {padding: 8}]}>

                  </View>
              </ScrollView>
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

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },

    description: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
        alignItems: 'center',
        padding: 6
    },

    image: {
        width: '100%',
        height: 180,
    },

    buttonContainer: {
        margin: 20,
    },
});