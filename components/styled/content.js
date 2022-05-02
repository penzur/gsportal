import styled from 'styled-components'

const Content = styled.div`
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  box-sizing: border-box;
  padding: 20px;
  & > .wrap {
    max-width: 1440px;
    margin: 0 auto;
  }
`

export default Content
