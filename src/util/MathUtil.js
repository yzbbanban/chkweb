import { formatUnits, parseUnits } from 'ethers/lib/utils';

export function balanceToDecimal(s) {
    return formatUnits(s);
}

export function decimalToBalance(d, decimals = 18) {
    return parseUnits(String(d), decimals);
}

