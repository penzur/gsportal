import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div>
        <Link href="/">
          <a className="logo">
            GS
            <span className="mute">
              <small
                style={{
                  fontSize: 16,
                  position: 'relative',
                  fontFamily: 'Inconsolata',
                  top: -5,
                  left: 2,
                }}
              ></small>
            </span>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/logs/new">
          <a>&uarr; UPLOAD</a>
        </Link>
        <Link href="/calculator">
          <a>λ CALC</a>
        </Link>
      </div>
    </header>
  )
}
