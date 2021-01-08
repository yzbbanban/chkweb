import { getContract } from "@/util/base.js";
import Ticket1155Nft from "@/abi/Ticket1155Nft.json";

let contract

/**
 * 全局init(名称使用合约名命名)
 */
export const init1155Contract = async()=>{
    if(contract == null){
        contract = await getContract('0x84979ec412653e65948151949f9fbdc2c3179818',Ticket1155Nft);
        console.log(contract)
    }
}

  
/**
 * 创建合约调用
 * @param {tokenAddress} tokenAddress 
 * @param {abi} abi 
 */
export const get1155Contract = ()=>{
    return contract
}

/**
 * 授权
 * @param {address} operator 授权合约
 * @param {address} account 执行人
 */
export const setApprovalForAll = async(operator,account) => {
    let collateral = await contract.setApprovalForAll(operator,true).estimateGasAndCollateral({from:account});
    return await contract.setApprovalForAll(operator,true).sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized})
}

/**
 * 是否授权
 * @param {address} account 执行人
 * @param {address} operator 授权合约
 */
export const isApprovedForAll = async(account,operator) => {
    return await contract.isApprovedForAll(account,operator);
}

/**
 * 转账
 * @param {address} from from
 * @param {address} to to
 * @param {number} tokenId token id
 */
export const safeTransferFrom = async(from,to,tokenId) => {
    let collateral = await contract.safeTransferFrom(from,to,tokenId,1,"").estimateGasAndCollateral({from});
    return await contract.safeTransferFrom(from,to,tokenId,1,"").sendTransaction({from,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized})
}

/**
 * 有没有nft
 * @param {address} account account 
 * @param {number} tokenId tokenId 
 */
export const balanceOf = async (account,tokenId) => {
    return await contract.balanceOf(account,tokenId);
}

/**
 * 
 * @param {number} tokenId tokenId
 */
export const uri = async (tokenId) => {
    return await contract.uri(tokenId);
}

/**
 * 所有者的token
 * @param {address} owner 所有者
 */
export const tokensOf = async (owner) => {
    return await contract.tokensOf(owner);
}