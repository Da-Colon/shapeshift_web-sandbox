/* eslint-disable no-console */
import { useXDEFIProvider } from './context/XDEFIProvider/hooks/useXDEFIProvider'
import { XDEFIWalletProvider } from './context/XDEFIProvider/XDEFIWalletProvider'

const OGPage = () => {
  const {
    state: { xfiBitcoinProvider, xfiLitecoinProvider, ethereumWallet, isWalletLoading },
  } = useXDEFIProvider()
  console.log('🚀 ~ file: index.tsx ~ line 6 ~ providers', {
    xfiBitcoinProvider,
    xfiLitecoinProvider,
    ethereumWallet,
    isWalletLoading,
  })
  return <div></div>
}

export const Sandbox = () => {
  return (
    <div>
      <XDEFIWalletProvider>
        <OGPage />
      </XDEFIWalletProvider>
    </div>
  )
}
