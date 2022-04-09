import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { parseLogs } from '../../helpers/parser'

import Spinner from '../../components/spinner'
import Drop from '../../components/drop'
import DropDown from '../../components/ui/dropdown'

import sfetch from '../../helpers/fetch'

const Upload = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  text-align: center;
  padding: 20px;

  .wrap {
    margin: 0 auto;
    min-width: 320px;
    max-width: 400px;

    p {
      line-height: 1.3;
    }

    @media screen and (max-width: 600px) {
      margin: 32px;
    }
  }

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
    color: white;
    background-color: #0000ff;
    font-weight: bold;
    font-family: D-DIN;
    letter-spacing: 1.5px;
    border: 1px solid #0000ff;
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
      border: 1px solid #aaa;
      background-color: #ffffff;
      color: #aaa;
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
    if (!file || file.type !== 'text/plain') {
      setLogs()
      return
    }

    const txt = await file.text()
    const parsedLogs = parseLogs(txt)
    parsedLogs.server = server || 'playpark-rhisis'
    parsedLogs.date = new Date(
      new Date(file.lastModified).toDateString(),
    ).getTime()

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

      // trigger deployment
      await fetch(
        'https://api.vercel.com/v1/integrations/deploy/prj_4IYAFofplqWPpwWdMwFPRQtzFTdt/QlHPnSMUmn',
      )

      router.push(`/`)
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
        <div className="wrap">
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
          <p>
            <strong>NOTICE!</strong>
            <br /> Due to an increasing amount of random shit being uploaded by
            trolls on the page, all new entries will now go through an approval
            process.
          </p>
          <p>The process is automated, so it should be pretty quick.</p>
        </div>
      </Upload>
    </Spinner>
  )
}

export const getStaticProps = async () => {
  const res = await sfetch('/servers')
  const servers = await res.json()
  return {
    props: {
      servers,
    },
  }
}

export default New
