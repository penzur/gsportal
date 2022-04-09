import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'

import fetch from '../helpers/fetch'
import Content from '../components/styled/content'
import LogView from '../components/styled/logview'
import DropDown from '../components/ui/dropdown'

import crown from '../public/crown.png'
import mvp from '../public/mvp.png'

const List = styled.div`
  max-width: 720px;
  margin: 0 auto;
  & > div {
    flex-direction: column;
  }
  .txt > span {
    display: inline-block;
    width: 16px !important;
    height: 16px !important;
    border: 1px solid red;
    margin-right: 8px !important;
    img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
    }
  }
  .txtw {
    flex: 1;
  }
  @media screen and (max-width: 600px) {
    .txtw {
      text-overflow: ellipsis !important;
      white-space: nowrap;
      overflow: hidden;
    }
    img {
      display: none !important;
    }
  }
`

// eslint-disable-next-line
export default ({ logs = [], servers = {} }) => {
  const [selected, setSelected] = useState('all')

  return (
    <Content>
      <Head>
        <title>GS - Home</title>
      </Head>

      <List>
        <LogView>
          <h2 className="center">Siege Logs</h2>
          <DropDown
            data={[
              {
                label: 'All Servers',
                value: 'all',
              },
              ...servers?.map((s) => ({
                label: s.label,
                value: s.slug,
              })),
            ]}
            defaultValue="all"
            label="All Servers"
            onChange={setSelected}
          />
          <ul key="main" style={{ marginTop: 0 }}>
            <li className="head">
              <span className="txt">Date</span>
              <span className="txtw">Server</span>
              <span className="txt">CROWN</span>
              <span className="txt">MVP</span>
            </li>
            {logs
              .sort((a, b) => b.date - a.date)
              .filter((l) => {
                if (selected === 'all') return true
                return l.server === selected
              })
              .map((l) => (
                <li
                  key={l.date}
                  onClick={() => {
                    window.location.href = `/logs/${l.server}/${l.date}`
                  }}
                >
                  <span className="txt">
                    {new Date(l.date).toLocaleString().split(',')[0]}
                  </span>
                  <span className="txtw">
                    {servers.find((s) => s.slug === l.server)?.label}
                  </span>
                  <span className="txt">
                    <Image src={crown} alt="crown" />
                    {l.winner}
                  </span>
                  <span className="txt">
                    <Image src={mvp} alt="mvp" />
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

export async function getStaticProps() {
  let res = await fetch('/logs')
  const logs = await res.json()
  res = await fetch('/servers')
  const servers = await res.json()
  return {
    props: { logs, servers },
  }
}
