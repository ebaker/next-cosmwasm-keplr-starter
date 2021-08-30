import { useSigningClient } from 'contexts/cosmwasm'
import Link from 'next/link'
import Image from 'next/image'

function Nav() {
  const { walletAddress, connectWallet, disconnect } = useSigningClient()
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet()
    } else {
      disconnect()
    }
  }

  const PUBLIC_SITE_ICON_URL = process.env.NEXT_PUBLIC_SITE_ICON_URL || ''

  return (
    <div className="border-b-2 w-screen px-2 md:px-16">
      <nav className="block text-center md:text-left md:flex flex-row w-full justify-between items-center py-4 ">
        <div>
          <Link href="/">
            <a>
              {PUBLIC_SITE_ICON_URL.length > 0 ? (
                <Image src={PUBLIC_SITE_ICON_URL} height={32} width={32} />
              ) : (
                <span className="text-2xl">⚛️ </span>
              )}
            </a>
          </Link>
          <Link href="/">
            <a className="ml-2 link link-hover font-semibold text-2xl align-top">
              {process.env.NEXT_PUBLIC_SITE_TITLE}
            </a>
          </Link>
        </div>
        <button
          className="btn btn-outline btn-primary max-w-full truncate"
          onClick={handleConnect}
        >
          {walletAddress || 'Connect Wallet'}
        </button>
      </nav>
    </div>
  )
}

export default Nav
