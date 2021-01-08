import { getContract } from "@/util/base.js";
import Snatch from "@/abi/Snatch.json";

let contract

/**
 * 全局init(名称使用合约名命名)
 */
export const initSnatchContract = async()=>{
    if(contract == null){
        contract = await getContract('0x81d4f865df154c174ad83b2a5a9e1e288e666a8d',Snatch);
        console.log(contract)
    }
}

  
/**
 * 创建合约调用
 * @param {tokenAddress} tokenAddress 
 * @param {abi} abi 
 */
export const getSnatchContract = ()=>{
    return contract
}

/**
 * 获取当前区块链时间戳
 */
export const getNow = async () => {
    return await contract.getNow();
}

/**
 * 获取历史获胜玩家
 * [1,2,3]
 */
export const getWinners = async () => {
    return await contract.getWinners();
}

/**
 * 获取历史获胜玩家地址
 * [0xsss,0xddd,0xddd]
 */
export const getWinnerAddresses = async () => {
    return await contract.getWinnerAddresses();
}


/**
 * 获取当前主 snatch 信息
 *  address lastOwner,
    address tempOwner,
    uint256 amount,
    uint256 submitAmount,
    uint256 lastAmount,
    uint256 lastTime,
    uint256 startTime,
    uint256 durationEndTime,
    uint256 durationTime,
    uint256 increaseRange,
    uint256 totalAmount,
    uint256 snatchCount,
    uint256 totalSnatchCount
 */
export const getCurrentSnatchInfo = async () => {
    return await contract.getCurrentSnatchInfo();
}

/**
 * snatchPool
 * @param {address} account 执行人
 * @param {value} value 数量
 */
export const snatchPool = async(account,value) => {
    let collateral = await contract.snatchPool().estimateGasAndCollateral({from:account,value});
    return await contract.snatchPool().sendTransaction({from:account,value,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized})
}

/**
 * 赢家收取收益
 * @param {address} account 执行人
 */
export const withdrawPool = async(account) => {
    let collateral = await contract.withdrawPool().estimateGasAndCollateral({from:account});
    console.log(collateral)
    return await contract.withdrawPool().sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized})
}

/**
 * 其他人帮助赢家收取收益
 * @param {address} account 执行人
 */
export const otherWithdrawPool = async(account) => {
    let collateral = await contract.otherWithdrawPool().estimateGasAndCollateral({from:account});
    console.log(collateral)
    return await contract.otherWithdrawPool().sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized})
}

