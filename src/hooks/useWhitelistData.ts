import React, { useCallback } from 'react'
import {
 useContractRead,
 useContractWrite,
 useNetwork,
 usePrepareContractWrite,
} from 'wagmi'
import WHITELISTABI from '../constant/abi/whitelistDapp.json'
import { whitelistAddress } from 'constant/abi/contractAddress'

const useWhitelistData = (functionName?: string, args?: any) => {
 const { chain, chains } = useNetwork()
 console.log({ chain, chains })
 const { data }: any = useContractRead({
  abi: WHITELISTABI,
  address: whitelistAddress,
  functionName,
  args: args ? [args] : null,
 })

 const { config } = usePrepareContractWrite({
  address: whitelistAddress,
  abi: WHITELISTABI,
  functionName: 'addAddressToWhitelist',
  chainId: chain?.id,
 })

 const {
  data: whiteListData,
  isLoading,
  isIdle,
  reset,
  error,
  writeAsync: getAddToWhiteList,
  isSuccess,
 } = useContractWrite(config)

 console.log({ whiteListData, getAddToWhiteList, error })

 return { data, getAddToWhiteList, isLoading, isIdle, reset, error, isSuccess }
}

export default useWhitelistData
