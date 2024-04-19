export const getItem = (name) => {
  return localStorage.getItem(name)
}

export const setItem = (name, item) => {
  return localStorage.setItem(name, item)
}

export const removeItem = name => {
  localStorage.removeItem(name)
}
