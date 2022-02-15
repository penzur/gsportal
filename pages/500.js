import Link from 'next/link'
import styled from 'styled-components'

const BadRequest = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 320px;
  margin: 0 auto;
  p {
    text-align: center;
    line-height: 1.5em;
  }

  .thin {
    display: inline-block;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.5);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 16px;
    margin-left: 8px;
  }
`
export default function Custom404() {
  return (
    <BadRequest>
      <h1>
        500 <span className="thin">Ooops!</span>
      </h1>
      <p>
        An error occured while processing your request. Please try again later.
      </p>
      <p>
        <Link href="/">
          <a href="">
            <small>GO BACK</small>
          </a>
        </Link>
      </p>
    </BadRequest>
  )
}
