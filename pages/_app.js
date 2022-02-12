import '../styles/globals.css'

import Layout from '../components/layout'

function Main({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default Main
