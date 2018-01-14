import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import * as Animatable from 'react-native-animatable'
import styled from 'styled-components/native'
import { Fonts, Colors, Metrics } from '../../Themes'
import R from 'ramda'

const Row = styled.View`
  border-radius: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  justifyContent: flex-start;
  alignItems: flex-start;
  margin: ${Metrics.smallMargin}px;
  backgroundColor: ${Colors.snow};
`
const Headline = styled.Text`
  text-align: left;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: ${Fonts.size.h4};
  color: ${Colors.facebook};
`
const Desc = styled.Text`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 15px;
  color: ${Colors.facebook};
`
const ImageContainer = styled.View`
  position: absolute;
  right: 5px;
  top: 5px;
`
const RoundedImage = styled.Image`
  width: 50;
  height: 50;
  border-radius: 25px;
  border-width: 1px;
  border-color: ${Colors.grey}
`
const getImage = (speakers) => (
  speakers && speakers.length > 0
  ? <RoundedImage source={{uri: `https://api.react-finland.fi/graphql-2018/images/${speakers[0].image}`}} />
  : null
)

const StyledRow = Animatable.createAnimatableComponent(Row)
class WorkshopTile extends React.Component {
  onPress = () => {
    const { onPress } = this.props
    this.refs.view.pulse(300).then((endState) => onPress && onPress())
  }
  render () {
    const {item} = this.props
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <StyledRow ref='view'>
          <Headline numberOfLines={2}>{item && item.title}</Headline>
          <Desc numberOfLines={3}>{item && item.description}</Desc>
          <ImageContainer>
            {getImage(R.pathOr([], ['speakers'], item))}
          </ImageContainer>
        </StyledRow>
      </TouchableWithoutFeedback>
    )
  }
}

export default WorkshopTile
