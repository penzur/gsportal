import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { parseLogs } from '../helpers/parser'
import { isVisible } from '../helpers/utils'
import mvp from '../public/mvp.png'
import crown from '../public/crown.png'

import Content from '../components/styled/content'
import Drop from '../components/styled/drop'
import Nav from '../components/styled/nav'

const Upload = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Main = () => {
  const fileRef = useRef()
  const [logs, setLogs] = useState()
  const [selected, setSelected] = useState()
  const [maxLives, setMaxLives] = useState(0)
  const [toFunc, setToFunc] = useState()
  const [selectedGuild, setSelectedGuild] = useState()

  const debounce = (fn, to = 500) => {
    if (toFunc) clearTimeout(toFunc)
    setToFunc(setTimeout(fn, to))
  }

  const readFile = async ({ target }) => {
    const txt = await target?.files[0].text()
    const parsedLogs = parseLogs(txt)

    setMaxLives(
      Math.max(
        ...parsedLogs.players
          .filter((p) => p.name.trim())
          .map((p) => {
            return p.deaths.length
          }),
      ),
    )
    setLogs(parsedLogs)
  }

  const reset = (e) => {
    e.preventDefault()
    setLogs()
    setSelected()
    setSelectedGuild()
  }

  return (
    <>
      <Head key="k-head">
        <title>GSParser - Home</title>
      </Head>

      {logs ? (
        <Content key="k-content">
          <Nav>
            <button onClick={reset}>&larr; BACK</button>
          </Nav>
          <div className="split">
            <ul className="guild">
              <li className="head" key="g-head">
                <span className="txt">Rank / Guild ({logs.guilds.length})</span>
                <span className="numbers">Players</span>
                <span className="numbers">Kills</span>
                <span className="numbers">Points</span>
              </li>
              {logs.guilds.map((g, i) => (
                <li
                  key={`g-${g.name}-${i}`}
                  className={selectedGuild === g.name ? 'selected' : ''}
                  onClick={() => {
                    if (selectedGuild === g.name) setSelectedGuild()
                    else setSelectedGuild(g.name)
                    setSelected()
                  }}
                >
                  <strong className="txt">
                    {i === 0 ? (
                      <span>
                        <Image src={crown} alt="crown" key="icn" />
                        &nbsp;&nbsp;
                      </span>
                    ) : (
                      <span className="idx">{i + 1}</span>
                    )}
                    {g.name}
                  </strong>
                  <span className="numbers">{g.players.length}</span>
                  <span className="numbers">{g.kills}</span>
                  <span className="numbers">{g.points}</span>
                </li>
              ))}
            </ul>
            <ul>
              <li className="head" key="p-head">
                <span className="txt">
                  Rank / Player (
                  {(() => {
                    if (selectedGuild)
                      return logs.guilds.find((g) => g.name === selectedGuild)
                        .players.length
                    return logs.players.length
                  })()}
                  )
                </span>
                <span className="numbers">Guild</span>
                <span className="numbers">Kills</span>
                <span className="numbers">Points</span>
              </li>
              {(() => {
                if (selectedGuild)
                  return logs.players.filter((p) => p.guild === selectedGuild)
                return logs.players
              })().map((l, i) => (
                <>
                  <li
                    key={`p-${l.name}-${i}`}
                    className={selected === i ? 'selected' : ''}
                    onClick={(e) => {
                      e.preventDefault()
                      if (selected === i) setSelected()
                      else setSelected(i)

                      debounce(() => {
                        if (!isVisible(e.target))
                          debounce(() =>
                            e.target.scrollIntoView({
                              behavior: 'smooth',
                            }),
                          )
                      }, 100)
                    }}
                  >
                    <strong className="txt">
                      {l.name === logs.players[0].name ? (
                        <span>
                          <Image src={mvp} alt="mvp" />
                          &nbsp;&nbsp;
                        </span>
                      ) : (
                        <span className="idx">{i + 1}</span>
                      )}
                      {l.name.trim() || '-'}
                    </strong>
                    <span className="numbers">{l.guild}</span>
                    <span className="numbers">
                      {l.kills.reduce((v, n) => [...v, ...n], []).length}
                    </span>
                    <span className="numbers">{l.points}</span>
                  </li>
                  {selected === i ? (
                    <li className="details" key={`k-details-${i}`}>
                      <div>
                        <h4>
                          {l.points === 0 ? 'BETTER LUCK NEXT TIME' : 'KILLS'}
                        </h4>
                        <ul>
                          {l.points !== 0 &&
                            (() => {
                              // fill empty lives
                              if (l.kills.length < maxLives) {
                                const diff = maxLives - l.kills.length
                                l.kills.push(...Array(diff).fill([]))
                              }
                              return l.kills.slice(0, maxLives)
                            })().map((l, i) => (
                              <li key={`k-${i}`}>
                                <small>LIFE {i + 1}</small>
                                <ul className="code">
                                  {l.map((k, x) => (
                                    <li
                                      key={`kills-${
                                        k.name.trim() || '-'
                                      }-${i}${x}`}
                                    >
                                      {k.name.trim() || '-'}
                                      <small className="right">{k.guild}</small>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div>
                        <h4>
                          {l.deaths.length === 0
                            ? 'FLAWLESS VICTORY!'
                            : 'DEATHS'}
                        </h4>
                        <ul>
                          {l.deaths.map((d, i) => (
                            <li key={`deaths-${d.name.trim() || '-'}-${i}`}>
                              <small>LIFE {i + 1}</small>
                              <ul className="code">
                                <li>
                                  {d.name.trim() || '-'}
                                  <small className="right">{d.guild}</small>
                                </li>
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ) : (
                    <span key="spc2"></span>
                  )}
                </>
              ))}
            </ul>
          </div>
        </Content>
      ) : (
        <Upload key="k-upload">
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
            <p>CLICK TO SELECT LOGS FROM YOUR PC</p>
          </Drop>
        </Upload>
      )}
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      a: 123,
    },
  }
}

export default Main
