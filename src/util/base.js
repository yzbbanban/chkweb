import {Conflux} from 'js-conflux-sdk'
window.jssdkcfx = new Conflux({
    logger: console,
});
window.jssdkcfx.provider = window.conflux
console.log('----------')
console.log(window.jssdkcfx.provider)
console.log(window.jssdkcfx)
console.log('==chainId==>')
let chainId = window.conflux.chainId;
console.log(chainId)
window.conflux.on('accountsChanged',async function (acc) {
    // let accounts = await conflux.enable();
    // console.log('=====>'+accounts[0])
    console.log('===acc==>'+acc)
  })
/**
 * 创建合约调用
 * @param {tokenAddress} tokenAddress 
 * @param {abi} abi 
 */
export const getContract = (address, abi)=>{
    return window.jssdkcfx.Contract({abi,address});
}

export const getNetWork=()=>{
    return chainId==1?'test':'main'
}

/**
 * 全局
 * 获取当前地址
 */
export const getAddress = async()=>{
    let accounts = await conflux.enable();
    return Promise.resolve(accounts[0]);
}