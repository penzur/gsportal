import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'

import Content from '../components/styled/content'

const Calc = styled.div`
  margin: 0 auto;
  min-width: 320px;
  max-width: 400px;

  main {
    width: 100%;
    margin: 32px 0;
    padding: 32px;
    background-color: #ffffff;

    .outputs {
      margin: 16px 0 32px;
      .output {
        text-align: center;
        margin-bottom: 16px;
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
          font-size: 32px;
          font-family: Inconsolata;
          font-weight: bold;
        }
      }
    }
  }
`

export default () => {
  const [stats, setStats] = useState({
    atk: 0,
    str: 0,
    mp: 0,
  })

  return (
    <Content>
      <Head>
        <title>GS - </title>
      </Head>
      <Calc>
        <h1 className="center">Asal &amp; Hop Calculator</h1>

        <main>
          <div className="outputs">
            <div className="output">
              <p className="type">PVP</p>
              <p className="total">100,000</p>
            </div>
            <div className="output">
              <p className="type">PVE</p>
              <p className="total">1,000,000</p>
            </div>
          </div>
          <div className="inputs">
            <div className="input">
              <label htmlFor="atk"></label>
              <input name="atk" type="number" />
            </div>

            <div className="input">
              <label htmlFor="str"></label>
              <input name="str" type="number" />
            </div>

            <div className="input">
              <label htmlFor="mp"></label>
              <input name="mp" type="number" />
            </div>
          </div>
        </main>
      </Calc>
    </Content>
  )
}
