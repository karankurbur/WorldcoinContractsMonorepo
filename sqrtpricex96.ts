// Use this to determine the pool sqrtPriceX96 when initializing

// 369403212462982385656397824n
// Resulted in 46000k WBTC for 1 USDC.
// If USDC is token 0 do 1/46000 else do 46000
const price = 3

console.log(priceToSqrtPrice(price, 18, 18))

function priceToSqrtPrice(price: number, token0Decimals: number, token1Decimals: number) {
    const decimalAdjustment = 10 ** (token0Decimals - token1Decimals);
    const mathPrice = price / decimalAdjustment;

    let sqrtPriceX96 = Math.floor(Math.sqrt(mathPrice) * 2 ** 96);
    return BigInt(sqrtPriceX96);
};

