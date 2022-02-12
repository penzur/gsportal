import styled from 'styled-components'

const NotFound = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

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
    <NotFound>
      <h1>
        404 <span className="thin">Page Not Found</span>
      </h1>
    </NotFound>
  )
}
