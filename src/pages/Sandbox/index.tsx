/* eslint-disable no-console */
import { useXDEFIProvider } from './context/XDEFIProvider/hooks/useXDEFIProvider'
import { XDEFIProviderProvider } from './context/XDEFIProvider/XDEFIProvider'

const OGPage = () => {
  const providers = useXDEFIProvider()
  console.log('🚀 ~ file: index.tsx ~ line 6 ~ providers', providers)
  return <div></div>
}

export const Sandbox = () => {
  return (
    <div>
      <XDEFIProviderProvider>
        <OGPage />
      </XDEFIProviderProvider>
    </div>
  )
}
