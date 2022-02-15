import Head from 'next/head'

import LogView from '../../../components/logview'
import fetch from '../../../helpers/fetch'

import Content from '../../../components/styled/content'
import Nav from '../../../components/styled/nav'

// eslint-disable-next-line
export default ({ log, servers }) => {
  const server = servers.find((s) => s.slug === log.server)?.label
  const date = new Date(log.date).toLocaleDateString()
  return (
    <Content>
      <Head>
        <title>
          GS - {server} {date}
        </title>
      </Head>
      <Nav>
        <div></div>
        <div className="center">
          <h2>
            {server} <span className="mute">|</span> {date}
          </h2>
        </div>
        <div></div>
      </Nav>
      <LogView logs={log} />
    </Content>
  )
}

export async function getServerSideProps(ctx) {
  const { server = '', date = 0 } = ctx.params
  let res = await fetch(`/log?server=${server}&date=${parseInt(date)}`)
  const log = await res.json()
  res = await fetch('/servers')
  const servers = await res.json()
  return {
    props: { log, servers },
  }
}
