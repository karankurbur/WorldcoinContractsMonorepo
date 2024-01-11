// How many USDC = X Asset (WBTC/WLD/WETH)
// Use this to determine the pool sqrtPriceX96 when initializing
const price = 46000

console.log(priceToSqrtPrice(price, 18, 18))

function priceToSqrtPrice(price: number, token0Decimals: number, token1Decimals: number) {
    const decimalAdjustment = 10 ** (token0Decimals - token1Decimals);
    const mathPrice = price / decimalAdjustment;

    let sqrtPriceX96 = Math.floor(Math.sqrt(mathPrice) * 2 ** 96);
    return BigInt(sqrtPriceX96);
};