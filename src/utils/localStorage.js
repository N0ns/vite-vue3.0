const set = function(key, data) {
  return window.localStorage.setItem(key, window.JSON.stringify(data))
}
const set_s = function(key, data) {
  return window.sessionStorage.setItem(key, window.JSON.stringify(data))
}
const get = function(key) {
  return window.localStorage.getItem(key) ? window.JSON.parse(window.localStorage.getItem(key)) : ''
}
const get_s = function(key) {
  return window.JSON.parse(window.sessionStorage.getItem(key))
}
const remove = function(key) {
  return window.localStorage.removeItem(key)
}
const remove_s = function(key) {
  return window.sessionStorage.removeItem(key)
}

export default {
  set,
  get,
  remove,
  set_s,
  get_s,
  remove_s
}
