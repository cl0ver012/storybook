import { Transaction as WSTransaction } from '@near-wallet-selector/core'
import BN from 'bn.js'
import { keyStores, Near, providers, utils } from 'near-api-js'
import { JsonRpcProvider } from 'near-api-js/lib/providers'
import getConfig from './config'
import SpecialWallet from './SpecialWallet'
// import { getCurrentWallet, senderWallet } from './sender-wallet';
import { TRANSACTION_WALLET_TYPE } from 'components/transactionTipPopUp'
import { AccountView } from 'near-api-js/lib/providers/provider'
import {
  addQueryParams,
  extraWalletsError,
  getCurrentWallet,
  ledgerTipTrigger,
  walletsRejectError,
} from './sender-wallet'

const config = getConfig()

export const {
  CONTRACT_NAME,
  ARTEX_FT_NAME,
  STAKING_CONTRACT_NAME,
  STAKING_FT_NAME,
  STAKING_NFT_NAME,
  MARKETPLACE_CONTRACT_NAME,
  NFT_CONTRACT_NAME,
  AIRDROP_CONTRACT_NAME,
  AIRDROP_FT_NAME,
  networkId,
  PHYGITAL_NFT_NAME,
  PHYGITAL_MARKETPLACE_NAME,
  DIGITAL_NFT_NAME,
} = config

export const TOKEN_DENOMS = {
  near: 24,
  [ARTEX_FT_NAME]: 24,
}

export const LP_STORAGE_AMOUNT = '0.01'

export const ONE_YOCTO_NEAR = '0.000000000000000000000001'

export const CONTRACT_BY_CATEGORY = {
  Community: NFT_CONTRACT_NAME,
  Phygital: PHYGITAL_NFT_NAME,
  Digital: DIGITAL_NFT_NAME,
  community: NFT_CONTRACT_NAME,
  phygital: PHYGITAL_NFT_NAME,
  digital: DIGITAL_NFT_NAME,
}
export const MARKETPLACE_BY_CATEGORY = {
  community: MARKETPLACE_CONTRACT_NAME,
  phygital: PHYGITAL_MARKETPLACE_NAME,
  digital: MARKETPLACE_CONTRACT_NAME,
}
export const CATEGORY_BY_CONTRACT = {
  [NFT_CONTRACT_NAME]: 'community',
  [PHYGITAL_NFT_NAME]: 'phygital',
  [DIGITAL_NFT_NAME]: 'digital',
}
export const ARTEX_CONTRACT_NAME = config.ARTEX_CONTRACT_NAME

export const getGas = (gas: string) =>
  gas ? new BN(gas) : new BN('300000000000000')
export const getAmount = (amount: string) =>
  amount ? new BN(utils.format.parseNearAmount(amount)) : new BN('0')

export interface MarbleViewFunctionOptions {
  methodName: string
  args?: object
}

export interface MarbleFunctionCallOptions extends MarbleViewFunctionOptions {
  gas?: string
  amount?: string
}

export interface NearFunctionCallOptions extends MarbleFunctionCallOptions {
  contractId: string
}

/////////////////////////////////////////////
/////////////////  NFT  /////////////////////
/////////////////////////////////////////////

export const nftViewFunction = ({
  methodName,
  args,
}: MarbleViewFunctionOptions) => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore()
  //@ts-ignore
  // keyStore?.reKey = () => {}
  const near = new Near({
    keyStore,
    headers: {},
    ...config,
  })
  const wallet = new SpecialWallet(near, MARKETPLACE_CONTRACT_NAME)

  return wallet.account().viewFunction(NFT_CONTRACT_NAME, methodName, args)
}
export const nftFunctionCall = async ({
  methodName,
  args,
  gas,
  amount,
}: MarbleFunctionCallOptions) => {
  const { wallet } = getCurrentWallet()
  await ledgerTipTrigger(wallet)
  if ((await wallet.wallet()).id === 'sender') {
    return window.near
      .account()
      .functionCall(
        NFT_CONTRACT_NAME,
        methodName,
        args,
        getGas(gas),
        getAmount(amount)
      )
      .catch(async (e: any) => {
        console.log(e)

        return (await wallet.wallet())
          .signAndSendTransaction({
            signerId: wallet.getAccountId()!,
            receiverId: NFT_CONTRACT_NAME,
            actions: [
              {
                type: 'FunctionCall',
                params: {
                  methodName,
                  args,
                  gas: getGas(gas).toNumber().toFixed(),
                  deposit: utils.format.parseNearAmount(amount || '0')!,
                },
              },
            ],
          })
          .catch((e: Error) => {
            console.log(e)

            if (extraWalletsError.includes(e.message)) {
              return
            }

            if (
              !walletsRejectError.includes(e.message) &&
              !extraWalletsError.includes(e.message)
            ) {
              sessionStorage.setItem('WALLETS_TX_ERROR', e.message)
            }

            window.location.reload()
          })
      })
  } else {
    return (await wallet.wallet())
      .signAndSendTransaction({
        signerId: wallet.getAccountId()!,
        receiverId: NFT_CONTRACT_NAME,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName,
              args,
              gas: getGas(gas).toNumber().toFixed(),
              deposit: utils.format.parseNearAmount(amount || '0')!,
            },
          },
        ],
      })
      .catch((e: Error) => {
        console.log(e)

        if (extraWalletsError.includes(e.message)) {
          return
        }

        if (
          !walletsRejectError.includes(e.message) &&
          !extraWalletsError.includes(e.message)
        ) {
          sessionStorage.setItem('WALLETS_TX_ERROR', e.message)
        }

        window.location.reload()
      })
  }
}

/////////////////////////////////////////////
//////////////  Marketplace  ////////////////
/////////////////////////////////////////////
export const marketplaceViewFunction = ({
  methodName,
  args,
}: MarbleViewFunctionOptions) => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore()
  //@ts-ignore
  // keyStore?.reKey = () => {}
  const near = new Near({
    keyStore,
    headers: {},
    ...config,
  })
  const wallet = new SpecialWallet(near, MARKETPLACE_CONTRACT_NAME)
  return wallet
    .account()
    .viewFunction(MARKETPLACE_CONTRACT_NAME, methodName, args)
}
export const marketplaceFunctionCall = async ({
  methodName,
  args,
  gas,
  amount,
}: MarbleFunctionCallOptions) => {
  const { wallet } = getCurrentWallet()
  await ledgerTipTrigger(wallet)
  if ((await wallet.wallet()).id === 'sender') {
    return window.near
      .account()
      .functionCall(
        MARKETPLACE_CONTRACT_NAME,
        methodName,
        args,
        getGas(gas),
        getAmount(amount)
      )
      .catch(async (e: any) => {
        console.log(e)

        return (await wallet.wallet())
          .signAndSendTransaction({
            signerId: wallet.getAccountId()!,
            receiverId: MARKETPLACE_CONTRACT_NAME,
            actions: [
              {
                type: 'FunctionCall',
                params: {
                  methodName,
                  args,
                  gas: getGas(gas).toNumber().toFixed(),
                  deposit: utils.format.parseNearAmount(amount || '0')!,
                },
              },
            ],
          })
          .catch((e: Error) => {
            console.log(e)

            if (extraWalletsError.includes(e.message)) {
              return
            }

            if (
              !walletsRejectError.includes(e.message) &&
              !extraWalletsError.includes(e.message)
            ) {
              sessionStorage.setItem('WALLETS_TX_ERROR', e.message)
            }

            window.location.reload()
          })
      })
  } else {
    return (await wallet.wallet())
      .signAndSendTransaction({
        signerId: wallet.getAccountId()!,
        receiverId: MARKETPLACE_CONTRACT_NAME,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName,
              args,
              gas: getGas(gas).toNumber().toFixed(),
              deposit: utils.format.parseNearAmount(amount || '0')!,
            },
          },
        ],
      })
      .catch((e: Error) => {
        console.log(e)

        if (extraWalletsError.includes(e.message)) {
          return
        }

        if (
          !walletsRejectError.includes(e.message) &&
          !extraWalletsError.includes(e.message)
        ) {
          sessionStorage.setItem('WALLETS_TX_ERROR', e.message)
        }

        window.location.reload()
      })
  }
}

/////////////////////////////////////////////
//////////////    General    ////////////////
/////////////////////////////////////////////

export const nearFunctionCall = async ({
  contractId,
  methodName,
  args,
  gas,
  amount,
}: NearFunctionCallOptions) => {
  const { wallet } = getCurrentWallet()
  await ledgerTipTrigger(wallet)
  if ((await wallet.wallet()).id === 'sender') {
    return window.near
      .account()
      .functionCall(
        contractId,
        methodName,
        args,
        getGas(gas),
        getAmount(amount)
      )
      .catch(async (e: any) => {
        console.log(e)

        return (await wallet.wallet())
          .signAndSendTransaction({
            signerId: wallet.getAccountId()!,
            receiverId: contractId,
            actions: [
              {
                type: 'FunctionCall',
                params: {
                  methodName,
                  args,
                  gas: getGas(gas).toNumber().toFixed(),
                  deposit: utils.format.parseNearAmount(amount || '0')!,
                },
              },
            ],
          })
          .catch((e: Error) => {
            console.log(e)

            if (extraWalletsError.includes(e.message)) {
              return
            }

            if (
              !walletsRejectError.includes(e.message) &&
              !extraWalletsError.includes(e.message)
            ) {
              sessionStorage.setItem('WALLETS_TX_ERROR', e.message)
            }

            window.location.reload()
          })
      })
  } else {
    return (await wallet.wallet())
      .signAndSendTransaction({
        signerId: wallet.getAccountId()!,
        receiverId: contractId,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName,
              args,
              gas: getGas(gas).toNumber().toFixed(),
              deposit: utils.format.parseNearAmount(amount || '0')!,
            },
          },
        ],
      })
      .catch((e: Error) => {
        console.log(e)

        if (extraWalletsError.includes(e.message)) {
          return
        }

        if (
          !walletsRejectError.includes(e.message) &&
          !extraWalletsError.includes(e.message)
        ) {
          sessionStorage.setItem('WALLETS_TX_ERROR', e.message)
        }

        window.location.reload()
      })
  }
}

export const nearViewFunction = ({ contractId, methodName, args }) => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore()
  //@ts-ignore
  // keyStore?.reKey = () => {}
  const near = new Near({
    keyStore,
    headers: {},
    ...config,
  })
  const wallet = new SpecialWallet(near, contractId)
  return wallet.account().viewFunction(contractId, methodName, args)
}

export interface Transaction {
  receiverId: string
  functionCalls: MarbleFunctionCallOptions[]
}

export const executeMultipleTransactions = async (
  transactions: Transaction[],
  callbackUrl?: string
) => {
  const { wallet } = getCurrentWallet()

  const wstransactions: WSTransaction[] = []

  transactions.forEach((transaction) => {
    wstransactions.push({
      signerId: wallet.getAccountId()!,
      receiverId: transaction.receiverId,
      actions: transaction.functionCalls.map((fc) => {
        return {
          type: 'FunctionCall',
          params: {
            methodName: fc.methodName,
            args: fc.args,
            gas: getGas(fc.gas).toNumber().toFixed(),
            deposit: utils.format.parseNearAmount(fc.amount || '0')!,
          },
        }
      }),
    })
  })

  await ledgerTipTrigger(wallet)

  return (await wallet.wallet())
    .signAndSendTransactions({
      transactions: wstransactions,
    })
    .then((res) => {
      if (!res) return

      const transactionHashes = res?.map((r) => r.transaction.hash)
      const parsedTransactionHashes = transactionHashes?.join(',')
      const newHref = addQueryParams(
        window.location.origin + window.location.pathname,
        {
          [TRANSACTION_WALLET_TYPE.WalletSelector]: parsedTransactionHashes,
        }
      )

      window.location.href = newHref
    })
    .catch((e: Error) => {
      console.log(e)

      if (extraWalletsError.includes(e.message)) {
        return
      }

      if (
        !walletsRejectError.includes(e.message) &&
        !extraWalletsError.includes(e.message)
      ) {
        sessionStorage.setItem('WALLETS_TX_ERROR', e.message)
      }

      window.location.reload()
    })
}

export const getAccountNearBalance = async (accountId: string) => {
  const provider = new providers.JsonRpcProvider({
    url: getConfig().nodeUrl,
  })

  return provider
    .query<AccountView>({
      request_type: 'view_account',
      finality: 'final',
      account_id: accountId,
    })
    .then((data) => ({ available: data.amount }))
}
export const sendTransactionForMarketplace = async (
  params: Transaction,
  category: string
) => {
  const wallet = getCurrentWallet()
  const transactionForStorageDeposit: Transaction = {
    receiverId: MARKETPLACE_BY_CATEGORY[category],
    functionCalls: [
      {
        methodName: 'storage_deposit',
        args: {
          account_id: wallet.accountId,
        },
        amount: '0.00859',
      },
    ],
  }
  executeMultipleTransactions([transactionForStorageDeposit, params])
}

export const checkTransactionStatus = (txHash: string) => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore()
  const near = new Near({
    keyStore,
    headers: {},
    ...config,
  })
  return near.connection.provider.txStatus(
    txHash,
    getCurrentWallet()?.wallet?.getAccountId()
  )
}
export const checkTransaction = (txHash: string) => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore()
  const near = new Near({
    keyStore,
    headers: {},
    ...config,
  })
  return (near.connection.provider as JsonRpcProvider).sendJsonRpc(
    'EXPERIMENTAL_tx_status',
    [txHash, getCurrentWallet()?.accountId]
  )
}
