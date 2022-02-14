import Head from 'next/head'

import LogView from '../../../components/logview'
import fetch from '../../../helpers/fetch'

import Content from '../../../components/styled/content'
import Nav from '../../../components/styled/nav'

export default function LogsByServerDate(log) {
  if (!log) return <p>loading...</p>
  return (
    <Content>
      <Head>
        <title>
          logs - {log.server}/{log.date}
        </title>
      </Head>
      <Nav>
        <div></div>
        <div className="center">
          {log.server} <span className="mute">|</span>{' '}
          {new Date(log.date).toLocaleDateString()}
        </div>
        <div></div>
      </Nav>
      <LogView logs={log} />
    </Content>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`/logs`)
  const logs = await res.json()
  return {
    paths: logs.map((l) => {
      return {
        params: {
          date: l.date.toString(),
          server: l.server,
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps(ctx) {
  const { server = '', date = 0 } = ctx.params
  const res = await fetch(`/log?server=${server}&date=${parseInt(date)}`)
  const log = await res.json()
  return {
    props: log,
  }
}
