import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'

import Layout from '../components/layout'

function Main({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  )
}

export default Main
