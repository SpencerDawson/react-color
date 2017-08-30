import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'

import SwatchWrap from './SwatchWrap'
import Swatch from './Swatch'

export const Palette = ({ color, colors, presetColors, swatchesPerRow, colorsStyle, swatchStyle, onClick = () => {}, onPaletteChange, onSwatchHover, enableCustomPalette }) => {
  const styles = reactCSS({
    'default': {
      colors: {
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
        ...colorsStyle
      },
      swatch: {
        height: '100%',
        width: '100%',
        margin: '0 3px 3px 0',
        borderRadius: '3px',
        ...swatchStyle
      },
      swatchAdd: {
        height: swatchStyle.height || '100%',
        width: swatchStyle.width || '100%',
        margin: swatchStyle.margin || '0 3px 3px 0',
      }
    },
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
  
  const PaletteItem = (index, c, allowRemove=false) => {
    return (
      <div
        key={`item-${index}`}
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
        />
      </div>
    )
  }
  
  const PaletteElement = (colors, isCustom=false) => {
    const showPalette = (!isCustom && (!presetColors || !presetColors.length))?{display: none}:{}
    return (
      <div className="flexbox-fix" style={showPalette}>
        <div style={ styles.colors }>
          {colors.map((colorObjOrString, index) => {
            const c = typeof colorObjOrString === 'string'
              ? { color: colorObjOrString }
              : colorObjOrString
            return (PaletteItem(index, c, isCustom))
          })}
          { isCustom &&
          <div
            style={ styles.swatchAdd }
            onClick={ handleAdd }>
            <svg viewBox="0 0 24 24">
              <path d="m23,10h-8.5c-0.3,0-0.5-0.2-0.5-0.5v-8.5c0-0.6-0.4-1-1-1h-2c-0.6,0-1,0.4-1,1v8.5c0,0.3-0.2,0.5-0.5,0.5h-8.5c-0.6,0-1,0.4-1,1v2c0,0.6 0.4,1 1,1h8.5c0.3,0 0.5,0.2 0.5,0.5v8.5c0,0.6 0.4,1 1,1h2c0.6,0 1-0.4 1-1v-8.5c0-0.3 0.2-0.5 0.5-0.5h8.5c0.6,0 1-0.4 1-1v-2c0-0.6-0.4-1-1-1z"
                    fill="#555"/>
            </svg>
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
  colorsStyle: PropTypes.object,
  swatchStyle: PropTypes.object,
  colors: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      color: PropTypes.string,
      title: PropTypes.string,
    })]
  )),
}
Palette.defaultProps = {
  enableCustomPalette: false,
  swatchesPerRow: 8
}

export default SwatchWrap(Palette)