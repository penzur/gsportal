import { useState } from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 32px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 16px;
  cursor: pointer;
  outline: 1px solid blue;

  .label {
    color: blue;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    & > div {
      display: flex;
      align-items: center;
      flex: 1;
      &.right {
        justify-content: right;
      }
      .down {
        transform: rotate(90deg);
      }
    }
  }

  &:hover {
    outline: 1px solid blue;
    background-color: #efefef;
    .label {
      color: blue;
    }
  }

  ul.list {
    position: absolute;
    padding: 0;
    top: -16px;
    z-index: 10;
    border-radius: 5px;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    outline: 1px solid blue;
    box-sizing: border-box;
    box-shadow: 0 10px 10px 0 rgba(0, 0, 255, 0.1);

    li {
      position: relative;
      display: flex;
      width: 100%;
      align-items: center;
      color: blue;
      &:not(:last-child) {
        border-bottom: 1px solid #ccccff;
      }
      padding: 0 32px;
      height: 64px;
      &:hover {
        background-color: rgba(0, 0, 255, 0.05);
      }

      .checked {
        position: absolute;
        right: 32px;
        font-size: 16px;
      }
    }
  }
`

// eslint-disable-next-line
export default ({
  data = [],
  onChange,
  label = 'Pick an item',
  defaultValue,
}) => {
  const [selected, setSelected] = useState(defaultValue)
  const [open, setOpen] = useState()

  const close = () => {
    setOpen()
    document.body.removeEventListener('click', close)
  }

  return (
    <Wrap
      onClick={
        open
          ? undefined
          : (e) => {
              e.stopPropagation()
              if (open) document.body.removeEventListener('click', close)
              setOpen(!open)
              document.body.addEventListener('click', close)
            }
      }
    >
      <div className="label">
        <div>
          {selected ? data.find((d) => selected === d.value)?.label : label}
        </div>
        <div className="right">
          <span>↕</span>
        </div>
      </div>
      {open && data.length > 0 && (
        <ul className="list">
          {data.map((d) => (
            <li
              key={d.value}
              onClick={() => {
                setOpen()
                setSelected(d.value)
                onChange(d.value)
              }}
            >
              <span>{d.label}</span>
              {selected === d.value && <span className="checked">✔</span>}
            </li>
          ))}
        </ul>
      )}
    </Wrap>
  )
}
