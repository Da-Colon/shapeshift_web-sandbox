/* eslint-disable no-console */
import { HDWallet } from '@shapeshiftoss/hdwallet-core'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

import { KeyManager } from '../../../context/WalletProvider/KeyManager'
import {
  getLocalWalletDeviceId,
  getLocalWalletType,
} from '../../../context/WalletProvider/local-wallet'
import { useWallet } from '../../../hooks/useWallet/useWallet'

export enum XDEFIProviderActions {
  XDEFI_CONNECTED = 'XDEFI_CONNECTED',
  XDEFI_DISCONNECTED = 'XDEFI_CONNECTED',
}

export type ActionTypes =
  | {
      type: XDEFIProviderActions.XDEFI_CONNECTED
      payload: {
        ethereumWallet: HDWallet
        xfiBitcoinProvider: any
        xfiLitecoinProvider: any
        xfiBitcoinWalletAddress: string
        xfiLItecoinWalletAddress: string
        isWalletLoading: boolean
      }
    }
  | {
      type: XDEFIProviderActions.XDEFI_DISCONNECTED
      payload: {
        ethereumWallet: HDWallet
        isWalletLoading: boolean
      }
    }

export interface InitialState {
  ethereumWallet: HDWallet | null
  xfiBitcoinProvider: any | null
  xfiLitecoinProvider: any | null
  isWalletLoading: boolean
  xfiBitcoinWalletAddress?: string
  xfiLItecoinWalletAddress?: string
}

const initialState: InitialState = {
  ethereumWallet: null,
  xfiBitcoinProvider: null,
  xfiLitecoinProvider: null,
  isWalletLoading: false,
}

export const reducer = (state: InitialState, action: ActionTypes) => {
  switch (action.type) {
    case XDEFIProviderActions.XDEFI_CONNECTED: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case XDEFIProviderActions.XDEFI_DISCONNECTED: {
      return {
        ...initialState,
        ...action.payload,
      }
    }
    default:
      return state
  }
}

export interface IXDEFIProviderContext {
  state: InitialState
  dispatch: React.Dispatch<ActionTypes>
}

export const XDEFIProviderContext = createContext<IXDEFIProviderContext | null>(null)

const getInitialState = () => {
  const localWalletType = getLocalWalletType()
  const localWalletDeviceId = getLocalWalletDeviceId()
  if (localWalletType && localWalletDeviceId) {
    return {
      ...initialState,
      isWalletLoading: true,
    }
  }
  return initialState
}

const injectedAccount = async (xfiProvider: any): Promise<string | undefined> => {
  return new Promise(resolve => {
    xfiProvider.request(
      { method: 'request_accounts', params: [] },
      (error: any, accounts: string[]) => {
        if (!error && accounts.length) {
          resolve(accounts[0])
        }
        if (error) {
          resolve(undefined)
        }
      },
    )
  })
}

export const XDEFIProviderProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  const {
    state: { wallet },
  } = useWallet()
  const localWalletType = getLocalWalletType()
  const localWalletDeviceId = getLocalWalletDeviceId()

  const load = useCallback(() => {
    if (localWalletType && localWalletDeviceId) {
      switch (localWalletType) {
        case KeyManager.XDefi: {
          ;(async () => {
            const xfi = (window as any).xfi
            const xfiBitcoinProvider = xfi['bitcoin']
            const xfiLitecoinProvider = xfi['litecoin']
            const xfiBitcoinWalletAddress = await injectedAccount(xfiBitcoinProvider)
            const xfiLItecoinWalletAddress = await injectedAccount(xfiLitecoinProvider)

            dispatch({
              type: XDEFIProviderActions.XDEFI_CONNECTED,
              payload: {
                ethereumWallet: wallet!,
                xfiBitcoinProvider,
                xfiLitecoinProvider,
                xfiBitcoinWalletAddress,
                xfiLItecoinWalletAddress,
                isWalletLoading: false,
              },
            })
          })()
          break
        }
        default: {
          dispatch({
            type: XDEFIProviderActions.XDEFI_DISCONNECTED,
            payload: {
              ethereumWallet: wallet!,
              isWalletLoading: false,
            },
          })
        }
      }
    }
  }, [localWalletType, localWalletDeviceId, wallet])

  useEffect(() => load(), [load])

  const value: IXDEFIProviderContext = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  )

  return <XDEFIProviderContext.Provider value={value}>{children}</XDEFIProviderContext.Provider>
}

export const useXDEFIProvider = (): IXDEFIProviderContext =>
  useContext(XDEFIProviderContext as React.Context<IXDEFIProviderContext>)
