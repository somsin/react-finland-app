import React from 'react'
import { SectionList, Dimensions } from 'react-native'
import styled from 'styled-components/native'

import TalkCard from './TalkCard'
import { Colors, Fonts, Metrics } from '../Themes'

const SectionHeaderText = styled.Text`
  color: ${Colors.snow};
  font-size: ${Fonts.size.regular};
  font-family: ${Fonts.type.base};
`

const SectionHeader = styled.View`
  padding: 10px;
  width: ${props => props.width}
  backgroundColor: ${Colors.reactFinlandBlue}
`

export default class TalkListing extends React.Component {
  renderSingleSession = ({ item: session }) => {
    return <TalkCard
      onPress={() => { this.props.onSessionSelected(session) }}
      session={session}
      begin={session.begin}
      end={session.end}
    />
  }

  render () {
    const dataWithSections = this.props.data.map((interval, index) => {
      const title = interval.sessions.length > 1
        ? interval.sessions[0].title
        : null
      const sessions = interval.sessions.length > 1
        ? interval.sessions.slice(1)
        : interval.sessions

      return {
        data: sessions.map(session => ({
          ...session,
          begin: interval.begin,
          end: interval.end
        })),
        title
      }
    })

    return (
      <SectionList
        sections={dataWithSections}
        renderItem={this.renderSingleSession}
        keyExtractor={(item, index) => `list-${index}`}
      />
    )
  }
}
