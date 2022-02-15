import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { parseLogs } from '../../helpers/parser'

import Spinner from '../../components/spinner'
import Drop from '../../components/drop'
import DropDown from '../../components/ui/dropdown'

import fetch from '../../helpers/fetch'

const Upload = styled.div`
  height: 100%;
  margin: 0 auto;
  min-width: 320px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button.save {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    outline: 0;
    border: 0;
    cursor: pointer;
    background-color: transparent;
    color: #0000ff;
    font-weight: bold;
    letter-spacing: 1.5px;
    border: 1px solid #0000ff;
    background-color: #ffffff;
    margin-top: 16px;
    border-radius: 5px;
    font-size: 16px;
    text-transform: uppercase;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
      background-color: #0000ff;
      color: #ffffff;
    }
    &:disabled {
      opacity: 0.5;
      border: 1px solid #0000ff;
      background-color: #ffffff;
      color: #0000ff;
      cursor: default;
    }
  }
`

const New = ({ servers }) => {
  const router = useRouter()

  const [logs, setLogs] = useState()
  const [server, setServer] = useState()
  const [isLoading, setLoading] = useState()

  const readFile = async (file) => {
    if (!file) return

    const txt = await file.text()
    const parsedLogs = parseLogs(txt)
    parsedLogs.server = 'playpark-rhisis'
    parsedLogs.date = file.lastModified

    setLogs(parsedLogs)
  }

  const reset = () => {
    setLogs()
  }

  const save = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await fetch('/api/create-logs', {
        method: 'POST',
        body: JSON.stringify(logs),
      })

      router.push(`/logs/${logs.server}/${logs.date}`)
    } catch (_) {
      reset()
    }
  }

  return (
    <Spinner spin={isLoading}>
      <Head key="k-head">
        <title>GS - New Entry</title>
      </Head>

      <Upload key="k-upload">
        <h2>Add New Entry</h2>
        <br />

        <DropDown
          data={servers?.map((s) => ({
            label: s.label,
            value: s.slug,
          }))}
          onChange={setServer}
        />

        <Drop onFile={readFile} disabled={!server} />

        <button className="save" disabled={!logs} onClick={save}>
          UPLOAD NOW
        </button>
      </Upload>
    </Spinner>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('/servers')
  const servers = await res.json()
  return {
    props: {
      servers,
    },
  }
}

export default New
