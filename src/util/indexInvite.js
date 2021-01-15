import { getContract } from "@/util/base.js";
import InviteApollo from "@/abi/Invite.json";

let contract

/**
 * 全局init(名称使用合约名命名)
 */
export const initAIContract = async()=>{
    if(contract == null){
        contract = await getContract('0x8387a6267a0b38a62646dab24956fe2189279197',InviteApollo);
        console.log(contract)
    }
}
  
/**
 * 创建合约调用
 * @param {tokenAddress} tokenAddress 
 * @param {abi} abi 
 */
export const getAiContract = ()=>{
    return contract
}

/**
 * 获取地址id
 * @param {address} account 
 */
export const userMap = async (account) => {
    return await contract.userMap(account);
}

/**
 * 获取用户信息
 * @param {address}} account 
 *  address owner,  0
    address referrer, 1
    uint256 referrerId, 2
    uint256 id, 3
    uint256 createTime 4
 */
export const getUserInfo = async (account) => {
    return await contract.getUserInfo(account);
}

/**
 * 注册
 * @param {number} _referrerId 推荐人id
 */
export const register = async(_referrerId,account) => {
    let collateral = await contract.register(_referrerId).estimateGasAndCollateral({from:account});
    return await contract.register(_referrerId).sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized}).executed()
}