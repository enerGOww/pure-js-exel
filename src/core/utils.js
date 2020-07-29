export function updateStorageByKeyAndState(key, state) {
  localStorage.setItem(key, JSON.stringify(state))
}

export function getStorageDataByKey(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}
