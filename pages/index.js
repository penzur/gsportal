import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import { parseLogs } from '../helpers/parser'
import mvp from '../public/mvp.png'
import crown from '../public/crown.png'

const Content = styled.div`
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 20px;

  & > .split > ul {
    list-style: none;
    padding: 0;
    & > li {
      cursor: pointer;
      padding: 16px;
      background-color: #ffffff;
      margin-bottom: 5px;
      border-radius: 5px;
      border-bottom: 1px solid #dddddd;
      display: flex;
      align-items: center;
      transition: background-color 0.3s, color 0.3s;
      & > strong {
        display: flex;
        align-items: center;
      }
      .txt {
        flex: 1;
        .idx {
          position: relative;
          margin-right: 28px;
          left: 8px;
          font-family: 'D-DIN Condensed';
          font-weight: normal;
          opacity: 0.5;
        }
      }
      .numbers {
        display: inline-block;
        width: 88px;
        text-align: center;
      }
      &:hover,
      &.selected {
        background-color: #666;
        color: #ffffff;
      }
      &.head {
        background-color: #cccccc;
        color: #000000;
        padding: 8px 16px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 1px;
      }
      &.selected {
        margin-bottom: -1px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
      &.details {
        cursor: default;
        position: relative;
        background-color: #333;
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.7);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        font-weight: normal;
        padding: 32px;
        display: flex;
        align-items: baseline;
        & > div {
          flex: 1;
          &:not(:last-child) {
            &::before {
              content: ' ';
              box-sizing: border-box;
              position: absolute;
              display: block;
              width: 1px;
              height: 100%;
              top: 0;
              left: 50%;
              background-color: rgba(255, 255, 255, 0.1);
            }
          }
          h1,
          h2,
          h3,
          h4 {
            margin-top: 0;
          }

          ul {
            padding-left: 20px;
          }

          small {
            font-size: 13px;
            opacity: 0.5;
            letter-spacing: 1.5px;
          }

          &:last-child {
            padding-left: 64px;
          }
        }
        .code > li {
          margin-bottom: 8px;
        }
      }
    }
  }

  .split {
    display: flex;
    & > ul {
      flex: 1;
      &:first-child {
        margin-right: 16px;
      }
      &.guild > li.selected {
        border-radius: 5px;
        margin-bottom: 5px;
      }
    }
  }
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
  font-family: Inconsolata;
  text-align: center;

  &:hover {
    box-shadow: 0 20px 32px 0px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
  }
`
const Nav = styled.div`
  height: 64px;
  display: flex;
  align-items: center;

  button {
    cursor: pointer;
    padding: 20px;
    border-radius: 5px;
    outline: none;
    background-color: #fff;
    outline: none;
    border: 1px solid #999;
    color: #666;
    font-size: 12px;
    letter-spacing: 1px;
    &:hover {
      box-shadow: 0 20px 32px 0px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s;
    }
  }
`

const Main = () => {
  const fileRef = useRef()
  const [logs, setLogs] = useState()
  const [selected, setSelected] = useState()
  const [maxLives, setMaxLives] = useState(0)
  const [selectedGuild, setSelectedGuild] = useState()

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
                <span className="txt">Guild ( {logs.guilds.length} )</span>
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
                      <Image src={crown} alt="crown" key="icn" />
                    ) : (
                      <span className="idx">{i + 1}</span>
                    )}
                    &nbsp;&nbsp;
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
                  Player {!selectedGuild && `( ${logs.players.length} )`}
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
                    onClick={() => {
                      if (selected === i) setSelected()
                      else setSelected(i)
                    }}
                  >
                    <strong className="txt">
                      {l.name === logs.players[0].name ? (
                        <Image src={mvp} alt="mvp" />
                      ) : (
                        <span className="idx">{i + 1}</span>
                      )}
                      &nbsp;&nbsp;
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

export default Main
