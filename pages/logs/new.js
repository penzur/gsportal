import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { parseLogs } from '../../helpers/parser'

import Content from '../../components/styled/content'
import Nav from '../../components/styled/nav'
import Spinner from '../../components/spinner'
import LogView from '../../components/logview'
import Drop from '../../components/drop'

const Upload = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const New = () => {
  const router = useRouter()

  const [logs, setLogs] = useState()
  const [isLoading, setLoading] = useState()

  const readFile = async (file) => {
    if (!file) return

    const txt = await file.text()
    const parsedLogs = parseLogs(txt)
    parsedLogs.server = 'playpark-rhisis'
    parsedLogs.date = file.lastModified

    setLogs(parsedLogs)
  }

  const reset = (e) => {
    e.preventDefault()
    setLogs()
  }

  const save = async (e) => {
    e.preventDefault()
    setLoading(true)

    await fetch('/api/create-logs', {
      method: 'POST',
      body: JSON.stringify(logs),
    })

    router.push(`/logs/${logs.server}/${logs.date}`)
  }

  return (
    <Spinner spin={isLoading}>
      <Head key="k-head">
        <title>gs - new</title>
      </Head>

      {logs ? (
        <Content key="k-content">
          <Nav>
            <div>
              <h4>REVIEW ENTRIES BEFORE SAVING</h4>
            </div>
            <div className="center">
              {logs.server} <span className="mute"> | </span>{' '}
              {new Date(logs.date).toLocaleDateString()}
            </div>
            <div>
              <button className="right" onClick={save}>
                ✔ SAVE
              </button>
              <button
                className="right"
                onClick={reset}
                style={{
                  marginRight: 5,
                }}
              >
                ✖ CANCEL
              </button>
            </div>
          </Nav>
          <LogView logs={logs} />
        </Content>
      ) : (
        <Upload key="k-upload">
          <h2>NEW ENTRY</h2>
          <br />

          <Drop onFile={readFile} />
        </Upload>
      )}
    </Spinner>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      a: 123,
    },
  }
}

export default New
