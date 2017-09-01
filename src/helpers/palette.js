export default {
  compare(newPalette, oldPalette) {
    if (!newPalette) {
      return false
    }
    if (oldPalette.length !== newPalette.length) {
      return false
    }
    const checkValues = Array.prototype.forEach((_, i) => {
      let pass = false
      if (oldPalette[i] instanceof Object && newPalette[i] instanceof Object) {
        pass = Object.keys(oldPalette[i]).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(oldPalette, key) !==
              Object.prototype.hasOwnProperty.call(newPalette, key)) {
            return false
          } else if (oldPalette[key] !== newPalette[key]) {
            return false
          }
          return true
        }) &&
          // prop might exist in other object
          Object.keys(newPalette[i]).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(newPalette, key) !==
              Object.prototype.hasOwnProperty.call(oldPalette, key)) {
              return false
            } else if (oldPalette[key] !== newPalette[key]) {
              return false
            }
            return true
          })
      } else if (oldPalette[i] !== newPalette[i]) {
        return false
      }
      return pass
    })
    return !!(checkValues)
  },
}
