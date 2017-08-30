
export default {
  compare (newPalette, oldPalette) {
    if (!newPalette)
      return false;
    if (oldPalette.length !== newPalette.length)
      return false;
    for (let i = 0, l=oldPalette.length; i < l; i++) {
      if (oldPalette[i] instanceof Object && newPalette[i] instanceof Object) {
        for (let propName in oldPalette) {
          if (oldPalette.hasOwnProperty(propName) !== newPalette.hasOwnProperty(propName)) {
            return false;
          } else if (oldPalette[propName] !== newPalette[propName]) {
            return false;
          }
        }
        // prop might exist in other object
        for (let propName in newPalette) {
          if (newPalette.hasOwnProperty(propName) !== oldPalette.hasOwnProperty(propName)) {
            return false;
          }
        }
      }
      else if (oldPalette[i] !== newPalette[i]) {
        return false;
      }
    }
    return true;
  }
}