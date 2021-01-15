import { getContract } from "@/util/base.js";
import SnatchNormal from "@/abi/SnatchNormal.json";

let contract

const addr = '0x8685ba2fca7d19c07ba70f81c91cc3129f934f07'
 
/**
 * 全局init(名称使用合约名命名)
 */
export const initSnatchNormalContract = async()=>{
    if(contract == null){
        contract = await getContract(addr,SnatchNormal);
        console.log(contract)
    }
}

/**
 * 创建合约调用
 */
export const getSnatchNormalAddress = ()=>{
    return addr;
}

  
/**
 * 创建合约调用
 */
export const getSnatchNormalContract = ()=>{
    return contract
}

/**
 * 获取时间信息
 * @param {number}} _id 
 * startTime 
 * lastTime
 * durationTime
 * durationEndTime
 */
export const getSnatchTimeInfo = async (_id) => {
    return await contract.getSnatchTimeInfo(_id);
}

/**
 * 获取列表
 */
export const getSnatchList = async () => {
    return await contract.getSnatchList();
}

/**
 * 根据id获取基本信息
 * @param {number} _id 
 *  snatchInfo.token,
    snatchInfo.owner,
    snatchInfo.lastOwner,
    snatchInfo.tempOwner,
    snatchInfo.amount,
    snatchInfo.submitAmount,
    snatchInfo.lastAmount,
    snatchInfo.increaseRange,
    snatchInfo.snatchCount,
    snatchInfo.totalSnatchCount,
    snatchInfo.totalAmount
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
 * @param {address} account account
 * @param {number} tokenId id
 * @param {number} nftToken nftToken
 * @param {number} token token
 * @param {number} submitAmount submitAmount
 * @param {number} durationTime durationTime
 * @param {number} durationEndTime durationEndTime
 * @param {number} increaseRange increaseRange
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
    return await contract.addSnatch(tokenId,
        nftToken,
        token,
        submitAmount,
        durationTime,
        durationEndTime,
        increaseRange).sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized}).executed()
}

/**
 * snatch
 * @param {address} account account
 * @param {number} _id id
 * @param {address} amount amount
 */
export const snatchTokenPool = async(account,_id,amount) => {
    let collateral = await contract.snatchTokenPool(_id,amount).estimateGasAndCollateral({from:account});
    return await contract.snatchTokenPool(_id,amount).sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized}).executed()
}

/**
 * 赢家收取收益
 * @param {address} account 执行人
 * @param {number} _id id
 */
export const withdrawPool = async(account,_id) => {
    let collateral = await contract.withdrawPool(_id).estimateGasAndCollateral({from:account});
    return await contract.withdrawPool(_id).sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized}).executed()
}

/**
 * 其他人帮助赢家收取收益
 * @param {address} account 执行人
 * @param {number} _id id
 */
export const otherWithdrawToken = async(account,_id) => {
    let collateral = await contract.otherWithdrawToken(_id).estimateGasAndCollateral({from:account});
    return await contract.otherWithdrawToken(_id).sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized}).executed()
}

