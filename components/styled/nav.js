import styled from 'styled-components'

const Nav = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  & > * {
    flex: 1;
  }

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
    transition: background-color 0.3s;
    &:hover {
      background-color: #000000;
      color: #ffffff;
      transition: background-color 0.3s;
    }
  }
`

export default Nav
