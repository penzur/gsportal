import { useRef } from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  width: 400px;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  line-height: 1.5em;
  align-items: center;
  color: #aaa;
  background-color: #fff;
  padding: 32px;
  transition: box-shadow 0.3s;
  box-shadow: 0 20px 32px 0px rgba(0, 0, 0, 0.1);

  p {
    margin: 8px 0;
    padding: 0;
    width: 100%;
  }

  small {
    display: inline-block;
    letter-spacing: 1px;
    padding-top: 10px;
  }

  p.icon {
    font-size: 32px;
  }

  p > button {
    cursor: pointer;
    width: 100%;
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
      transition: background-color 0.3s;
      color: #ffffff;
    }
  }
`

const Target = styled.div`
  width: 340px;
  height: 160px;
  border: 2px dashed #aaa;
  background-color: #efefef;
  display: flex;
  font-family: Inconsolata;
  font-weight: normal;
  justify-content: center;
  align-items: center;
  &.dragover {
    background-color: #dfdfdf;
  }
`

export default function Drop({ onFile }) {
  const inputRef = useRef()

  const onChange = ({ target }) => {
    onFile(target?.files[0])
    inputRef.current.value = ''
  }

  const clickFile = () => {
    inputRef.current.click()
  }

  return (
    <Wrap>
      <input
        ref={inputRef}
        type="file"
        name="file"
        onChange={onChange}
        accept="text/plain"
        style={{ display: 'none' }}
      />
      <Target
        onDragOver={(e) => {
          e.preventDefault()
          e.target.classList.add('dragover')
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          e.target.classList.remove('dragover')
        }}
        onDragEnter={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const file = e.dataTransfer?.files[0]
          if (file.name.split('.').pop().match(/txt/i)) {
            onFile(file)
          }
          inputRef.current.value = ''
          e.target.classList.remove('dragover')
        }}
      >
        Drag &amp; Drop File
      </Target>
      <p className="center code">
        <small>OR</small>
      </p>
      <p>
        <button onClick={clickFile}>BROWSE FILES</button>
      </p>
    </Wrap>
  )
}
