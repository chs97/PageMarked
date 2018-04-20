const Required = () => {throw new Error('This parameter is required.')}
function MapToObj (src) {
  let obj = {}
  for(let [k, v] of src) {
    obj[k] = v
  }
  return obj
}
function ObjToMap(src) {
  let dis = new Map()
  for(let k of Object.keys(src)) {
    dis.set(k, src[k])
  }
  return dis
}
class PageMarked {
  constructor() {
    if (typeof window === 'undefined') {
      throw new Error('Please run in browser environment.')
    }
    if (typeof PageMarked.instance !== 'undefined') {
      return PageMarked.instance
    }
    this.positions = new Map()
    PageMarked.instance = this
  }
  
  marked(name = Required()) {
    let position = document.body.scrollTop + document.documentElement.scrollTop
    this.positions.set(name, position)
    if (this.positions.get(name) !== position) {
      throw new Error('Mark failed')
    }
  }

  goto(name = Required()) {
    let has = this.positions.has(name)
    if (has === false) {
      throw new Error(`No recorder of ${name}`)
    }
    if (typeof window.scrollTo === 'undefined') {
      throw new Error('This plugins doesn\'t work in this environment.')
    }
    let position = this.positions.get(name)
    window.scrollTo(0, position)
  }

  has(name) {
    return this.positions.has(name)
  }

  delete(name) {
    let result = this.positions.delete(name)
    if (result === false) {
      throw new Error(`Delete ${name} failed.`)
    }
  }

  clear() {
    try {
      this.positions.clear()
    } catch(err) {
      throw err
    }
  }

  saveToLS(url) {
    let key = url || window.location.href
    try {
      window.localStorage.setItem(key, MapToObj(this.positions))
    } catch(err) {
      throw err
    }
  }

  loadFromLS(url) {
    let key = url || window.location.href
    try {
      this.positions = window.localStorage.getItem(key)
    } catch(err) {
      throw err
    }
  }
}

export default PageMarked