import React from 'react'
import PropTypes from 'prop-types'
import reactCSS, { loop } from 'reactcss'

import SwatchWrap from './SwatchWrap'
import Swatch from './Swatch'

export const Palette = ({ color, colors, presetColors, swatchesPerRow, swatchSpacing, colorsStyle, swatchStyle, onClick = () => {}, onPaletteChange, onSwatchHover, enableCustomPalette }) => {
  const styles = reactCSS({
    'default': {
      colors: {
        display: 'flex',
        flexWrap: 'wrap',
        ...colorsStyle
      },
      swatchContainer: {
        display: 'inline-flex',
        position: 'relative',
        width: `calc((100% - ${swatchSpacing*swatchesPerRow}px) / ${swatchesPerRow})`,
        margin: `0 ${swatchSpacing}px ${swatchSpacing}px 0`,
      },
      after: {
        content: '',
        display: 'flex',
        marginTop: '100%',
      },
      swatch: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        ...swatchStyle
      }
    }
  }, {})
  
  const handleClick = (hex, e) => {
    onClick({
      hex,
      source: 'hex',
    }, e)
  }
  
  const handleRemove = (index, e) => {
    e.preventDefault()
    let newPalette = colors
    newPalette.splice(index, 1)
    onPaletteChange && onPaletteChange(newPalette, e)
  }
  
  const handleAdd = (e) => {
    const newColor = color
    let newPalette = colors
    newPalette.push(newColor)
    onPaletteChange && onPaletteChange(newPalette, e)
  }
  
  const PaletteItem = (index, c, count, allowRemove=false) => {
    return (
      <div
        key={`item-${index}`}
        style={ styles.swatchContainer }
        onContextMenu={ allowRemove ? (e) => handleRemove(index, e) : () => {} }
      >
        <Swatch
          { ...c }
          style={ styles.swatch }
          onClick={ handleClick }
          onHover={ onSwatchHover }
          focusStyle={{
            boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${ c.color }`,
          }}
          { ...loop(index, count) }
        />
        <div style={ styles.after } />
      </div>
    )
  }
  
  const PaletteElement = (colors, isCustom=false) => {
    const showPalette = (!isCustom && (!presetColors || !presetColors.length))?{display: 'none'}:{}
    return (
      <div style={showPalette}>
        <div style={ styles.colors }>
          {colors.map((colorObjOrString, index, items) => {
            const c = typeof colorObjOrString === 'string'
              ? { color: colorObjOrString }
              : colorObjOrString
            return (PaletteItem(index, c, items.length, isCustom))
          })}
          { isCustom &&
          <div
            style={{ ...styles.swatchContainer, cursor: 'pointer' }}
            onClick={ handleAdd }>
            <svg style={ styles.swatch } viewBox="0 0 24 24">
              <path d="m23,10h-8.5c-0.3,0-0.5-0.2-0.5-0.5v-8.5c0-0.6-0.4-1-1-1h-2c-0.6,0-1,0.4-1,1v8.5c0,0.3-0.2,0.5-0.5,0.5h-8.5c-0.6,0-1,0.4-1,1v2c0,0.6 0.4,1 1,1h8.5c0.3,0 0.5,0.2 0.5,0.5v8.5c0,0.6 0.4,1 1,1h2c0.6,0 1-0.4 1-1v-8.5c0-0.3 0.2-0.5 0.5-0.5h8.5c0.6,0 1-0.4 1-1v-2c0-0.6-0.4-1-1-1z"
                    fill="#ddd"/>
            </svg>
            <div style={ styles.after } />
          </div>
          }
        </div>
      </div>
    )
  }
  
  return (
    <div>
      {PaletteElement(presetColors)}
      {enableCustomPalette && PaletteElement(colors, enableCustomPalette)}
    </div>
  )
}
Palette.propTypes = {
  enableCustomPalette: PropTypes.bool,
  swatchesPerRow: PropTypes.number,
  swatchSpacing: PropTypes.number,
  colorsStyle: PropTypes.object,
  swatchStyle: PropTypes.object,
}
Palette.defaultProps = {
  enableCustomPalette: false,
  swatchesPerRow: 8,
  swatchSpacing: 0
}

export default SwatchWrap(Palette)