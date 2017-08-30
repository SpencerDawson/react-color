import React, { Component, PureComponent } from 'react'
import palette from '../../helpers/palette'

export const SwatchWrap = (Palette) => {
  class SwatchPalette extends (PureComponent || Component) {
    
    constructor(props) {
      super()
      
      this.state = {
        colors: props.colors,
      }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        colors: nextProps.colors,
      })
    }

    handlePaletteChange = (data, event) => {
      const paletteChanged = palette.compare(data, this.props.colors)
      console.log(data)
      this.setState({colors: data})
      this.props.onPaletteChange && this.props.onPaletteChange(data, event)
      if (paletteChanged) {
      }
    }

    render() {
      const optionalEvents = {}
      if (this.props.onPaletteChange) {
        optionalEvents.onPaletteChange = this.handlePaletteChange
      }
      return (
        <div ref='paletteRef'>
          <Palette
            { ...this.props }
            { ...this.state }
            { ...optionalEvents }
          />
        </div>
      )
    }
  }

  SwatchPalette.propTypes = {
    ...Palette.propTypes,
  }

  SwatchPalette.defaultProps = {
    ...Palette.defaultProps,
    colors: [],
    presetColors: ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
      '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000',
      '#4A4A4A', '#9B9B9B', '#FFFFFF'],
  }

  return SwatchPalette
}

export default SwatchWrap
