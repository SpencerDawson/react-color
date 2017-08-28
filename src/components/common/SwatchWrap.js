import React, { Component, PureComponent } from 'react'
import color from '../../helpers/color'

export const SwatchWrap = (Palette) => {
  class SwatchPalette extends (PureComponent || Component) {
    
    constructor(props) {
      super()
      
      this.state = {
        colors: props.colors
      }
    }

    componentWillReceiveProps(nextProps) {
      this.setState(
        nextProps.colors,
      )
    }

    handleSwatchHover = (data, event) => {
      const isValidColor = color.simpleCheckForValidColor(data)
      if (isValidColor) {
        const colors = color.toState(data, data.h || this.state.oldHue)
        this.setState(colors)
        this.props.onSwatchHover && this.props.onSwatchHover(colors, event)
      }
    }
    
    handleSwatchRemove = (data, event) => {
      this.props.onSwatchRemove && this.props.onSwatchRemove(data, event)
    }

    render() {
      const optionalEvents = {}
      if (this.props.onSwatchHover) {
        optionalEvents.onSwatchHover = this.handleSwatchHover
      }
      if (this.props.onSwatchRemove) {
        optionalEvents.onSwatchRemove = this.handleSwatchRemove
      }
      return (
        <Palette
          { ...this.props }
          { ...this.state }
          { ...optionalEvents }
        />
      )
    }
  }

  SwatchPalette.propTypes = {
    ...Palette.propTypes,
  }

  SwatchPalette.defaultProps = {
    ...Palette.defaultProps,
    palette: [],
    presetPalette: ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
      '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000',
      '#4A4A4A', '#9B9B9B', '#FFFFFF'],
  }

  return SwatchPalette
}

export default SwatchWrap
