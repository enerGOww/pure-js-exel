export function updateStorageByKeyAndState(key, state) {
  localStorage.setItem(key, JSON.stringify(state))
}

export function getStorageDataByKey(key) {
  return JSON.parse(localStorage.getItem(key))
}
