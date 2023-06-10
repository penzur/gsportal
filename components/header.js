import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div>
        <div>
          <Link href="/">
            <a className="logo">
              GS
              <span className="mute">
                <small
                  style={{
                    fontSize: 16,
                    position: 'relative',
                    top: -5,
                    left: 2,
                  }}
                >
                  PARSER
                </small>
              </span>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/logs/new">
            <a>&uarr; UPLOAD</a>
          </Link>
        </div>
      </div>
    </header>
  )
}
