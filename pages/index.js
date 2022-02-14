import Head from 'next/head'
import styled from 'styled-components'

import fetch from '../helpers/fetch'
import Content from '../components/styled/content'
import LogView from '../components/styled/logview'

const List = styled.div`
  width: 720px;
  margin: 0 auto;
  & > div {
    flex-direction: column;
  }
`

// eslint-disable-next-line
export default ({ logs }) => {
  return (
    <Content>
      <Head>
        <title>logs - home</title>
      </Head>

      <List>
        <LogView>
          <h1 className="center">Recently Uploaded Logs</h1>
          <ul>
            <li className="head">
              <span className="numbers">Date</span>
              <span className="numbers"></span>
              <span className="txt">Server</span>
              <span className="txt">Winner</span>
              <span className="numbers">MVP</span>
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
                  <span className="txt">{l.server}</span>
                  <span className="txt">{l.winner}</span>
                  <span className="numbers">{l.mvp}</span>
                </li>
              ))}
          </ul>
        </LogView>
      </List>
    </Content>
  )
}

export async function getStaticProps() {
  const res = await fetch('/logs')
  const logs = await res.json()
  return {
    props: { logs },
  }
}
