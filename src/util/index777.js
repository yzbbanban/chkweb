import { getContract } from "@/util/base.js";
import Chicken777 from "@/abi/Chicken777.json";

let contract

/**
 * 全局init(名称使用合约名命名)
 */
export const init777Contract = async()=>{
    if(contract == null){
        contract = await getContract('0x8ab7404a351fcea7c013592255b3f51f27512ff2',Chicken777);
        console.log(contract)
    }
}

/**
 * 全局init(名称使用合约名命名)
 */
export const init777TokenContract = async(tokenAddress)=>{
    contract = await getContract(tokenAddress,Chicken777);
    console.log(contract)
}

  
/**
 * 创建合约调用
 * @param {tokenAddress} tokenAddress 
 * @param {abi} abi 
 */
export const get777Contract = ()=>{
    return contract
}

/**
 * approve
 * @param {address} spender 授权合约
 * @param {number} value 数量
 */
export const approve = async(spender,value,account) => {
    let collateral = await contract.approve(spender,value).estimateGasAndCollateral({from:account});
    return await contract.approve(spender,value).sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized}).executed()
}

/**
 * allowance
 * @param {address} holder 使用者
 * @param {address} spender 授权合约
 */
export const allowance = async(holder,spender) => {
    return await contract.allowance(holder,spender)
}
/**
 * symbol
 */
export const symbol = async() => {
    return await contract.symbol()
}

/**
 * 余额
 * @param {address} tokenHolder 持有者
 */
export const balanceOf = async (tokenHolder) => {
    return await contract.balanceOf(tokenHolder);
}
