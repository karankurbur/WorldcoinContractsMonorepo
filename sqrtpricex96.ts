// Use this to determine the pool sqrtPriceX96 when initializing
const price = 1/46000
//16992547773297189899623485931520

console.log(priceToSqrtPrice(price, 18, 18))

function priceToSqrtPrice(price: number, token0Decimals: number, token1Decimals: number) {
    const decimalAdjustment = 10 ** (token0Decimals - token1Decimals);
    const mathPrice = price / decimalAdjustment;

    let sqrtPriceX96 = Math.floor(Math.sqrt(mathPrice) * 2 ** 96);
    return BigInt(sqrtPriceX96);
};

