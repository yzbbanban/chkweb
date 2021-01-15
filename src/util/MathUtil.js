import { formatUnits, parseUnits,formatEther } from 'ethers/lib/utils';

export function balanceToDecimal(s) {
    return formatUnits(s);
}

export function etherToBalance(s){
    return formatEther(s);
}

export function decimalToBalance(d, decimals = 18) {
    return parseUnits(String(d), decimals);
}

