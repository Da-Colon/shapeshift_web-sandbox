import { HDWallet } from '@shapeshiftoss/hdwallet-core'

import { AnyFunction } from '../../../../types/common'

export interface InitialState {
  ethereumWallet: HDWallet | null
  xfiBitcoinProvider: any | null
  xfiLitecoinProvider: any | null
  isWalletLoading: boolean
}

export interface IXfiBitcoinProvider {
  accounts: string[]
  msgStream: any
  callBacksMap: Map<any, any>
  chainId: string
  network: string
  request: (e: { method: string; params: any[] }, cb: AnyFunction) => void
  signTransaction: (e: any) => void
  transfer: (e: any) => void
}
export interface IXfiLitecoinProvider {
  accounts: string[]
  msgStream: any
  callBacksMap: Map<any, any>
  chainId: string
  network: string
  request: (e: { method: string; params: any[] }, cb: AnyFunction) => void
  transfer: (e: any) => void
}
