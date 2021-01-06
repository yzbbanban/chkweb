import {Conflux} from 'js-conflux-sdk'
window.jssdkcfx = new Conflux({
    logger: console,
});
window.jssdkcfx.provider = window.conflux
console.log('----------')
console.log(window.jssdkcfx.provider)
window.conflux.on('accountsChanged',async function (acc) {
    // let accounts = await conflux.enable();
    // console.log('=====>'+accounts[0])
    console.log('=====>'+acc)
  })
console.log('----------')
/**
 * 创建合约调用
 * @param {tokenAddress} tokenAddress 
 * @param {abi} abi 
 */
export const getContract = (address, abi)=>{
    return window.jssdkcfx.Contract({abi,address});
}

/**
 * 全局
 * 获取当前地址
 */
export const getAddress = async()=>{
    let accounts = await conflux.enable();
    console.log(accounts[0])
    return Promise.resolve(accounts[0]);
}