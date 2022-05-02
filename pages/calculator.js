import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'

import Content from '../components/styled/content'

const Calc = styled.div`
  margin: 0 auto;
  min-width: 320px;
  max-width: 400px;

  h2 {
    margin-top: 2rem;
  }

  .switch,
  main {
    width: 100%;
    margin: 32px 0;
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
  }

  .switch {
    border: 1px solid #0000ff;
    display: flex;
    align-items: center;
    height: 64px;
    & > span {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #0000ff;
      font-weight: bold;
      font-size: 16px;
      letter-spacing: 1.5px;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */

      &.selected {
        color: #ffffff;
        background-color: rgba(0, 0, 255, 0.75);
      }
      &:not(.selected) {
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
        &:hover {
          background-color: rgba(0, 0, 255, 0.1);
          color: #0000aa;
        }
      }
    }
  }

  main {
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.05);
    .outputs {
      padding: 64px 32px;
      .output {
        text-align: center;
        &:first-child {
          margin-bottom: 16px;
        }
        & > * {
          margin: 0;
          padding: 0;
        }
        .type {
          font-size: 12px;
          text-transform: uppercase;
          opacity: 0.75;
        }
        .total {
          color: #333333;
          font-size: 44px;
          font-weight: bold;
        }
      }
    }

    .inputs {
      background-color: #eeeeeecc;
      width: 100%;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      border-top: 1px solid #dddddd;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      & > div {
        position: relative;
        flex: 1;
        box-sizing: border-box;
        &:not(:last-child) {
          border-right: 1px solid #dddddd;
        }
        &:before {
          content: attr(stat);
          text-transform: uppercase;
          position: absolute;
          font-size: 12px;
          opacity: 0.5;
          top: 16px;
          left: 16px;
        }
        & > input {
          padding: 44px 16px 16px;
          font-family: Inconsolata;
          width: 100%;
          height: 100%;
          display: inline-block;
          border: 0;
          font-size: 24px;
          background-color: transparent;
          color: #666666;
          &:focus {
            outline: none;
            background-color: rgba(0, 0, 0, 0.03);
          }
        }
      }
    }
  }
`

// eslint-disable-next-line
export default () => {
  const [isHop, setHop] = useState()
  const [stats, setStats] = useState({ atk: 0, str: 0, mp: 0 })

  const getStats = (pvp) => {
    const { atk, str, mp } = stats
    let total = 0
    if ((!isHop && mp === 0) || atk === 0 || str === 0) {
      return total
    }

    if (isHop) total = str * 11 + atk * 2.1949 + 1238.3
    else total = (str / 10) * mp + atk + 3000
    return Math.round(pvp ? total * 0.6 : total).toLocaleString()
  }

  const updateStats = (e) => {
    const key = e.target.name
    setStats({
      ...stats,
      [key]: parseInt(e.target.value || 0),
    })
  }

  const toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setHop(!isHop)
  }

  return (
    <Content>
      <Head>
        <title>GS - Calculator</title>
      </Head>
      <Calc>
        <h2 className="center">Calculator</h2>

        <main>
          <div className="outputs">
            <div className="output">
              <p className="type">PVP</p>
              <p className="total">{getStats(true)}</p>
            </div>
            <div className="output">
              <p className="type">PVE</p>
              <p className="total">{getStats()}</p>
            </div>
          </div>
          <div className="inputs">
            <div className="input" stat="atk">
              <label htmlFor="atk"></label>
              <input
                name="atk"
                type="number"
                min="0"
                onChange={updateStats}
                placeholder="0"
              />
            </div>

            <div className="input" stat="str">
              <label htmlFor="str"></label>
              <input
                name="str"
                type="number"
                min="0"
                onChange={updateStats}
                placeholder="0"
              />
            </div>

            {!isHop && (
              <div className="input" stat="mp">
                <label htmlFor="mp"></label>
                <input
                  name="mp"
                  type="number"
                  min="0"
                  onChange={updateStats}
                  placeholder="0"
                />
              </div>
            )}
          </div>
        </main>

        <div className="switch">
          <span
            className={isHop ? '' : 'selected'}
            onClick={isHop ? toggle : undefined}
          >
            ASAL
          </span>
          <span
            className={isHop ? 'selected' : ''}
            onClick={isHop ? undefined : toggle}
          >
            HOP
          </span>
        </div>
      </Calc>
    </Content>
  )
}
