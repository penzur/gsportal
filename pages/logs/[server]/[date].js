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
      <div className="wrap">
        <Head>
          <title>
            GS - {server} {date}
          </title>
        </Head>
        <Nav>
          <h2>
            {server} <span className="mute">|</span> {date}
          </h2>
        </Nav>
        <LogView logs={log} />
      </div>
    </Content>
  )
}

export async function getStaticProps(ctx) {
  const { server = '', date = '' } = ctx.params
  let res = await fetch(`/log?server=${server}&date=${date}`)
  const log = await res.json()
  res = await fetch('/servers')
  const servers = await res.json()
  return {
    props: { log, servers },
  }
}

export async function getStaticPaths() {
  const res = await fetch('/logs')
  const logs = await res.json()
  const paths = logs.map((l) => ({
    params: {
      server: l.server,
      date: l.date.toString(),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}
