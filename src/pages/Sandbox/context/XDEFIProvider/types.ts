import { HDWallet } from '@shapeshiftoss/hdwallet-core'

export interface InitialState {
  ethereumWallet: HDWallet | null
  xfiBitcoinProvider: any | null
  xfiLitecoinProvider: any | null
  isWalletLoading: boolean
}
