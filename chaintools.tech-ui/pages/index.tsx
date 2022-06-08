import type { NextPage } from 'next'
import Link from 'next/link'
import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'

const Home: NextPage = () => {
  const { walletAddress } = useSigningClient()

  return (
    <WalletLoader>
      <h1 className="text-6xl font-bold">Select network</h1>

      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 max-w-full sm:w-full">
        <Link href="https://explorer.chaintools.tech/" passHref>
          <a className="p-6 mt-6 text-left border border-secondary hover:border-primary w-96 rounded-xl hover:text-primary focus:text-primary-focus">
            <h3 className="text-2xl font-bold">Stake &rarr;</h3>
            <p className="mt-4 text-xl">Stake you tokens to earn APR yield.</p>
          </a>
        </Link>
      </div>
    </WalletLoader>
  )
}

export default Home
