import Header from './header'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div id="container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
