import styled from 'styled-components'

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

export default Nav
