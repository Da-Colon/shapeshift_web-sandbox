import { HDWallet } from '@shapeshiftoss/hdwallet-core'

import { IXfiBitcoinProvider, IXfiLitecoinProvider } from './types'

export enum XDEFIProviderActions {
  XDEFI_CONNECTED = 'XDEFI_CONNECTED',
  XDEFI_NOT_DISCONNECTED = 'XDEFI_NOT_DISCONNECTED',
  RESET_STATE = 'RESET_STATE',
}

export type ActionTypes =
  | {
      type: XDEFIProviderActions.XDEFI_CONNECTED
      payload: {
        ethereumWallet: HDWallet
        xfiBitcoinProvider: IXfiBitcoinProvider
        xfiLitecoinProvider: IXfiLitecoinProvider
      }
    }
  | {
      type: XDEFIProviderActions.XDEFI_NOT_DISCONNECTED
      payload: {
        ethereumWallet: HDWallet
      }
    }
  | {
      type: XDEFIProviderActions.RESET_STATE
    }
