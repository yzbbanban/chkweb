import { getContract } from "@/util/base.js";
import SnatchNormal from "@/abi/SnatchNormal.json";

let contract

/**
 * 全局init(名称使用合约名命名)
 */
export const initSnatchNormalContract = async()=>{
    if(contract == null){
        contract = await getContract('0x87e973e4cd2606338039933f664b925f9d7a3949',SnatchNormal);
        console.log(contract)
    }
}

  
/**
 * 创建合约调用
 * @param {tokenAddress} tokenAddress 
 * @param {abi} abi 
 */
export const getSnatchNormalContract = ()=>{
    return contract
}

/**
 * 获取时间信息
 * @param {number}} _id 
 */
export const getSnatchTimeInfo = async (_id) => {
    return await contract.getSnatchTimeInfo(_id);
}

/**
 * 根据id获取基本信息
 * @param {number} _id 
 */
export const getSnatchBaseInfo = async (_id) => {
    return await contract.getSnatchBaseInfo(_id);
}

/**
 * 获取用户已经执行的次数
 * @param {address} account 
 * @param {number} tokenId 
 */
export const ticketCountMap = async (account,tokenId) => {
    return await contract.ticketCountMap(account,tokenId);
}

/**
 * 获取用户的snatch
 * @param {address} _id 
 */
export const getOwnerSnatch = async (_owner) => {
    return await contract.getOwnerSnatch(_owner);
}


/**
 * 增加私有snatch
 * @param {address} account 推荐人id
 * @param {number} tokenId id
 * @param {number} nftToken 推荐人id
 * @param {number} token 推荐人id
 * @param {number} submitAmount 推荐人id
 * @param {number} durationTime 推荐人id
 * @param {number} durationEndTime 推荐人id
 * @param {number} increaseRange 推荐人id
 */
export const addSnatch = async(
        account,
        tokenId,
        nftToken,
        token,
        submitAmount,
        durationTime,
        durationEndTime,
        increaseRange) => {
    let collateral = await contract.addSnatch(
        tokenId,
        nftToken,
        token,
        submitAmount,
        durationTime,
        durationEndTime,
        increaseRange
    ).estimateGasAndCollateral({from:account});
    return await contract.register(1).sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized})
}

/**
 * snatch
 * @param {*} _id 推荐人id
 * @param {*} amount 推荐人id
 */
export const snatchTokenPool = async(account,_id,amount) => {
    let collateral = await contract.snatchTokenPool(_id,amount).estimateGasAndCollateral({from:account});
    return await contract.register(_id,amount).sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized})
}

/**
 * 赢家收取收益
 * @param {address} account 执行人
 */
export const withdrawPool = async(account) => {
    let collateral = await contract.withdrawPool().estimateGasAndCollateral({from:account});
    return await contract.withdrawPool().sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:300})
}

/**
 * 其他人帮助赢家收取收益
 * @param {address} account 执行人
 */
export const otherWithdrawToken = async(account,_id) => {
    let collateral = await contract.otherWithdrawToken(_id).estimateGasAndCollateral({from:account});
    return await contract.otherWithdrawToken(_id).sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:300})
}

