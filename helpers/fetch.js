// eslint-disable-next-line
export default (path, ...args) => {
  return fetch(`${process.env.API_ENDPOINT}${path}`, ...args)
}
