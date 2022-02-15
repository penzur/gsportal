const ep = process.env.API_ENDPOINT

// eslint-disable-next-line
export default (path, ...args) => {
  return fetch(`${ep}${path}`, ...args)
}
