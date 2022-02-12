import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <Link href="/">
        <a style={{ fontSize: 32, fontWeight: 'bold' }}>GSParser</a>
      </Link>
    </header>
  )
}
