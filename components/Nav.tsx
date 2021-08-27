function Button({ children }) {
  return (
    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      {children}
    </button>
  )
}

function Nav() {
  return (
    <div className="border-b-2 w-screen px-16">
      <nav className="flex flex-row w-full justify-between items-center py-2">
        <div className="font-semibold text-2xl">
          ⚛️ <span className="pl-2">Next Cosmos Keplr Starter</span>
        </div>
        <Button>Connect Wallet</Button>
      </nav>
    </div>
  )
}

export default Nav
