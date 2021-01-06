import { getContract } from "@/util/base.js";
import TicketShop from "@/abi/TicketShop.json";

let contract

/**
 * 全局init(名称使用合约名命名)
 */
export const initTicketShopContract = async()=>{
    if(contract == null){
        contract = await getContract('0x8a8e4095ee3ee65dd200b5e4f9bceab285f9cd48',TicketShop);
        console.log(contract)
    }
}

  
/**
 * 创建合约调用
 * @param {tokenAddress} tokenAddress 
 * @param {abi} abi 
 */
export const getTicketShopContract = ()=>{
    return contract
}

/**
 * 获取票的价格
 */
export const ticketPrice = async () => {
    return await contract.ticketPrice();
}

/**
 * 获取剩余票数量
 */
export const totalTicket = async () => {
    return await contract.totalTicket();
}

/**
 * 获取商城列表
 * ["1","2"]
 */
export const getShopItems = async () => {
    return await contract.getShopItems();
}

/**
 * 获取商城列表详情
 * return
 * [
  "0x104af0d538799acb02d36e1e1e698b5b0e22855a", 卖家
  "2000000000000000000",                        价格
  "0x0000"
    ]
 */
export const shopMap = async (tokenId) => {
    return await contract.shopMap(tokenId);
}

/**
 * 购买票据
 * @param {address} account 执行人
 * @param {number} value 购买价格
 */
export const buyTicket = async(account,value) => {
    let collateral = await contract.buyTicket().estimateGasAndCollateral({from:account,value});
    return await contract.buyTicket().sendTransaction({from:account,value,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized})
}


/**
 * 销售票据
 * @param {address} account 执行人
 * @param {number} tokenId id
 * @param {address} price 购买价格
 */
export const sellTicket = async(account,tokenId,price) => {
    let collateral = await contract.buyTicket(tokenId,price).estimateGasAndCollateral({from:account});
    return await contract.buyTicket().sendTransaction({from:account,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized})
}

/**
 * 购买销售票据
 * @param {address} account 执行人
 * @param {number} tokenId id 
 * @param {address} value 购买价格
 */
export const buySellerTicket = async(account,tokenId,value) => {
    let collateral = await contract.buySellerTicket(tokenId,price).estimateGasAndCollateral({from:account,value});
    return await contract.buySellerTicket().sendTransaction({from:account,value,gas:collateral.gasLimit,storageLimit:collateral.storageCollateralized})
}