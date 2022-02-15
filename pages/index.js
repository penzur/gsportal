import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'

import fetch from '../helpers/fetch'
import Content from '../components/styled/content'
import LogView from '../components/styled/logview'

import crown from '../public/crown.png'
import mvp from '../public/mvp.png'

const List = styled.div`
  padding-top: 50px;
  max-width: 720px;
  margin: 0 auto;
  & > div {
    flex-direction: column;
  }
  img {
    width: 16px !important;
    height: 16px !important;
  }
`

// eslint-disable-next-line
export default ({ logs = [], servers = {} }) => {
  return (
    <Content>
      <Head>
        <title>GS - Home</title>
      </Head>

      <List>
        <LogView>
          <h1 className="center">Recent Sieges</h1>
          <ul>
            <li className="head">
              <span className="numbers">Date</span>
              <span className="numbers"></span>
              <span className="txt center">Server</span>
              <span className="txt center">
                <Image src={crown} alt="crown" />
              </span>
              <span className="txt center">
                <Image src={mvp} alt="mvp" />
              </span>
            </li>
            {logs
              .sort((a, b) => b.date - a.date)
              .map((l) => (
                <li
                  key={l.date}
                  onClick={() => {
                    window.location.href = `/logs/${l.server}/${l.date}`
                  }}
                >
                  <span className="numbers">
                    {new Date(l.date).toLocaleString().split(',')[0]}
                  </span>
                  <span className="numbers"></span>
                  <span className="txt center">
                    {servers.find((s) => s.slug === l.server)?.label}
                  </span>
                  <span className="txt center">&nbsp; {l.winner}</span>
                  <span className="txt center">
                    &nbsp;
                    {l.mvp}
                  </span>
                </li>
              ))}
          </ul>
        </LogView>
      </List>
    </Content>
  )
}

export async function getServerSideProps() {
  let res = await fetch('/logs')
  const logs = await res.json()
  res = await fetch('/servers')
  const servers = await res.json()
  return {
    props: { logs, servers },
  }
}
