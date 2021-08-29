import { useState, useEffect, MouseEvent } from 'react'
import type { NextPage } from 'next'
import { StdFee, Coin } from '@cosmjs/amino'

import WalletLoader from 'components/WalletLoader'
import { useSigningClient } from 'contexts/cosmwasm'
import {
  convertMicroDenomToDenom,
  convertFromMicroDenom,
  convertDenomToMicroDenom,
} from 'util/conversion'

const PUBLIC_CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME
const PUBLIC_STAKING_DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || 'ujuno'

const Send: NextPage = () => {
  const { walletAddress, signingClient } = useSigningClient()
  const [balance, setBalance] = useState('')
  const [loadedAt, setLoadedAt] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [sendAmount, setSendAmount] = useState('')

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }

    signingClient
      .getBalance(walletAddress, PUBLIC_STAKING_DENOM)
      .then((response: any) => {
        const { amount, denom }: { amount: number; denom: string } = response
        setBalance(
          `${convertMicroDenomToDenom(amount)} ${convertFromMicroDenom(denom)}`
        )
      })
      .catch((error) => {
        alert(`Error! ${error.message}`)
      })
  }, [signingClient, walletAddress, loadedAt])

  const handleSend = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setLoading(true)
    const amount: Coin[] = [
      {
        amount: convertDenomToMicroDenom(sendAmount),
        denom: PUBLIC_STAKING_DENOM,
      },
    ]
    const fee: StdFee = {
      amount,
      gas: '100000',
    }

    signingClient
      ?.sendTokens(walletAddress, recipientAddress, amount, fee)
      .then((resp) => {
        console.log('resp', resp)

        const message = `Success! Sent ${sendAmount}  ${convertFromMicroDenom(
          PUBLIC_STAKING_DENOM
        )} to ${recipientAddress}.`

        setLoadedAt(new Date())
        setLoading(false)
        setSendAmount('')
        alert(message)
      })
      .catch((error) => {
        setLoading(false)
        alert(`Error! ${error.message}`)
      })
  }
  return (
    <WalletLoader loading={loading}>
      <p className="text-2xl">Your wallet has {balance}</p>

      <h1 className="text-5xl font-bold my-8">
        Send to {PUBLIC_CHAIN_NAME} recipient wallet address:
      </h1>
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          id="recipient-address"
          className="form-input px-4 py-3 rounded-full flex-grow font-mono text-center text-lg"
          placeholder={`${PUBLIC_CHAIN_NAME} recipient wallet address...`}
          onChange={(event) => setRecipientAddress(event.target.value)}
          value={recipientAddress}
        />
      </div>
      <div className="flex mt-4 text-2xl w-full max-w-xl justify-between">
        <div className="flex rounded-full shadow-sm mr-2">
          <input
            type="number"
            id="send-amount"
            className="focus:border-indigo-500 py-3 flex-1 block w-full rounded-none rounded-l-full text-center font-mono text-lg "
            placeholder="Amount..."
            step="0.1"
            onChange={(event) => setSendAmount(event.target.value)}
            value={sendAmount}
          />
          <span className="inline-flex items-center px-4 py-3 rounded-r-full border border-r-0 border-black bg-gray-50 text-gray-500 text-sm">
            {convertFromMicroDenom(PUBLIC_STAKING_DENOM)}
          </span>
        </div>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full flex-grow"
          onClick={handleSend}
        >
          SEND
        </button>
      </div>
    </WalletLoader>
  )
}

export default Send
