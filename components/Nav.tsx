import { useSigningClient } from 'contexts/cosmwasm'
import Link from 'next/link'

function Nav() {
  const { walletAddress, connectWallet, disconnect } = useSigningClient()
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet()
    } else {
      disconnect()
    }
  }

  return (
    <div className="border-b-2 w-screen px-16">
      <nav className="flex flex-row w-full justify-between items-center py-4">
        <Link href="/">
          <a className="font-semibold text-2xl">
            ⚛️{' '}
            <span className="pl-2">{process.env.NEXT_PUBLIC_SITE_TITLE}</span>
          </a>
        </Link>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded truncate"
          onClick={handleConnect}
        >
          {walletAddress || 'Connect Wallet'}
        </button>
      </nav>
    </div>
  )
}

export default Nav
