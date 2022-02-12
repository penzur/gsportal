import Head from 'next/head'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { parseLogs } from '../helpers/parser'

const Content = styled.div`
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
`

const Upload = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Drop = styled.div`
  cursor: pointer;
  width: 300px;
  height: 200px;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  background-color: white;
  border: 2px dashed #666;
  padding: 32px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 20px 32px 0px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
  }
`
const Nav = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
`

const Main = () => {
  const fileRef = useRef()
  const [logs, setLogs] = useState()

  const readFile = async ({ target }) => {
    const txt = await target?.files[0].text()
    setLogs(parseLogs(txt))
  }

  return (
    <>
      <Head>
        <title>GSParser - Home</title>
      </Head>

      {logs ? (
        <Content>
          <Nav>
            <button onClick={() => setLogs()}>BACK TO UPLOAD</button>
          </Nav>
          <ul>
            {logs.players.map((l) => (
              <li key={l.name}>
                {l.name} - {l.guild} [ {l.points} ]
              </li>
            ))}
          </ul>
        </Content>
      ) : (
        <Upload>
          <input
            type="file"
            ref={fileRef}
            accept="text/plain"
            onChange={readFile}
            style={{ display: 'none' }}
          />
          <Drop
            onClick={(e) => {
              e.preventDefault()
              fileRef?.current?.click()
            }}
          >
            <p>CLICK TO UPLOAD LOGS</p>
          </Drop>
        </Upload>
      )}
    </>
  )
}

export default Main
