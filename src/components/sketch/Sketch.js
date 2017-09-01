import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'

import { ColorWrap, Saturation, Hue, Alpha, Checkboard, Palette } from '../common'
import SketchFields from './SketchFields'

export const Sketch = ({ width, rgb, hex, hsv, hsl, customColors, presetColors, onChange, onPaletteChange, onSwatchHover,
  disableAlpha, disablePalette, enableCustomPalette, renderers }) => {
  const padding = 10
  const styles = reactCSS({
    'default': {
      picker: {
        width,
        padding: `${padding}px ${padding}px 0`,
        boxSizing: 'initial',
        background: '#fff',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)',
      },
      saturation: {
        width: '100%',
        paddingBottom: '75%',
        position: 'relative',
        overflow: 'hidden',
      },
      Saturation: {
        radius: '3px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
      },
      controls: {
        display: 'flex',
      },
      sliders: {
        padding: '4px 0',
        flex: '1',
      },
      color: {
        width: '24px',
        height: '24px',
        position: 'relative',
        marginTop: '4px',
        marginLeft: '4px',
        borderRadius: '3px',
      },
      activeColor: {
        absolute: '0px 0px 0px 0px',
        borderRadius: '2px',
        background: `rgba(${ rgb.r },${ rgb.g },${ rgb.b },${ rgb.a })`,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
      },
      hue: {
        position: 'relative',
        height: '10px',
        overflow: 'hidden',
      },
      Hue: {
        radius: '2px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
      },
      alpha: {
        position: 'relative',
        height: '10px',
        marginTop: '4px',
        overflow: 'hidden',
      },
      Alpha: {
        radius: '2px',
        shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)',
      },
      colors: {
        borderTop: '1px solid #eee',
        margin: `0 -${padding}px`,
        padding: `${padding}px ${padding}px 0`,
      },
      swatch: {
        borderRadius: '3px',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)'
      }
    },
    'disableAlpha': {
      color: {
        height: '10px',
      },
      hue: {
        height: '10px',
      },
      alpha: {
        display: 'none',
      },
    },
  }, { disableAlpha })

  return (
    <div style={ styles.picker } className="sketch-picker">
      <div style={ styles.saturation }>
        <Saturation
          style={ styles.Saturation }
          hsl={ hsl }
          hsv={ hsv }
          onChange={ onChange }
        />
      </div>
      <div style={ styles.controls } className="flexbox-fix">
        <div style={ styles.sliders }>
          <div style={ styles.hue }>
            <Hue
              style={ styles.Hue }
              hsl={ hsl }
              onChange={ onChange }
            />
          </div>
          <div style={ styles.alpha }>
            <Alpha
              style={ styles.Alpha }
              rgb={ rgb }
              hsl={ hsl }
              renderers={ renderers }
              onChange={ onChange }
            />
          </div>
        </div>
        <div style={ styles.color }>
          <Checkboard />
          <div style={ styles.activeColor } />
        </div>
      </div>
      <SketchFields
        rgb={ rgb }
        hsl={ hsl }
        hex={ hex }
        onChange={ onChange }
        disableAlpha={ disableAlpha }
      />
      {!disablePalette &&
      <Palette
        color={ hex }
        colors={ customColors }
        presetColors={ presetColors }
        swatchesPerRow={ 8 }
        swatchSpacing={ 8 }
        colorsStyle={ styles.colors }
        swatchStyle={ styles.swatch }
        onClick={ onChange }
        onSwatchHover={ onSwatchHover }
        onPaletteChange={ onPaletteChange }
        enableCustomPalette={ enableCustomPalette }
      />
      }
    </div>
  )
}

Sketch.propTypes = {
  disableAlpha: PropTypes.bool,
  disablePalette: PropTypes.bool,
  width: PropTypes.number,
}

Sketch.defaultProps = {
  disableAlpha: false,
  disablePalette: false,
  width: 200,
}

export default ColorWrap(Sketch)
