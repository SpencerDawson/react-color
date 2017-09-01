import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
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
      if(this.props.enableCustomPalette){
        this.setState({
          colors: nextProps.colors,
        })
      }
    }

    handlePaletteChange = (data, event) => {
      const paletteChanged = !palette.compare(data, this.props.colors)
      if (paletteChanged) {
        this.setState({colors: data})
        this.props.onPaletteChange && this.props.onPaletteChange(data, event)
      }
    }

    render() {
      const optionalEvents = {}
      if (this.props.onPaletteChange) {
        optionalEvents.onPaletteChange = this.handlePaletteChange
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
    colors: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        title: PropTypes.string,
      })]
    )),
    presetColors: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        title: PropTypes.string,
      })
    ])),
  }

  SwatchPalette.defaultProps = {
    ...Palette.defaultProps,
    colors: [],
    presetColors: [],
  }

  return SwatchPalette
}

export default SwatchWrap
