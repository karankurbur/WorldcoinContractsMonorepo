// Use this to determine the pool sqrtPriceX96 when initializing

// 369403212462982385656397824n
// Resulted in 46000k WBTC for 1 USDC.
// If USDC is token 0 do 1/46000 else do 46000

const fee = 500;
const USDC = "0xEec4b8B5DE989f3edBA8E3aD23af1E94c5794eac"
const WBTC = "0x396458af3Bc363B0c41ce1EEbe356Cf8A00F0aef"
const WETH = "0xf17201f6a5b0658dd7a90468e499ab6cb67e5eb4"
const WLD = "0x3dc20aaab0bC4a02E38F2b617AcDD5b333F0bf7a"
const OWNER = "0xD3cC83bcd3e7ee71f846b18EAd994603c3b19315"

// calculateSwapRate(USDC, WBTC, 46000)
// calculateSwapRate(USDC, WETH, 2600)
calculateSwapRate(USDC, WLD, 3)

function calculateSwapRate(USDC: string, OTHER_TOKEN: string, price: number) {
    if(USDC > OTHER_TOKEN) {
        const initPool = {
            token0: OTHER_TOKEN,
            token1: USDC,
            fee,
            sqrtPriceX96: priceToSqrtPrice(1/price, 18, 18)
        }

        const addLiqudity = [
            OTHER_TOKEN,
            USDC,
            fee,
            "-50000",
            "50000",
            "1000000000000000000",
            "1000000000000000000000000000000000",
            "0",
            "0",
            OWNER,
            "2529705600"
        ]

        console.log("INIT POOL PARAMS");
        console.log(initPool);

        console.log("ADD LIQUIDITY PARAMS");
        console.log(addLiqudity);
    } else {

        const initPool = {
            token0: USDC,
            token1: OTHER_TOKEN,
            fee,
            sqrtPriceX96: priceToSqrtPrice(price, 18, 18)
        }

        const addLiqudity = [
            USDC,
            OTHER_TOKEN,
            fee,
            "-50000",
            "50000",
            "1000000000000000000000000000000000",
            "1000000000000000000",
            "0",
            "0",
            OWNER,
            "2529705600"
        ]

        console.log("INIT POOL PARAMS");
        console.log(initPool);

        console.log("ADD LIQUIDITY PARAMS");
        console.log(addLiqudity);
    }
}

function priceToSqrtPrice(price: number, token0Decimals: number, token1Decimals: number) {
    const decimalAdjustment = 10 ** (token0Decimals - token1Decimals);
    const mathPrice = price / decimalAdjustment;

    let sqrtPriceX96 = Math.floor(Math.sqrt(mathPrice) * 2 ** 96);
    return BigInt(sqrtPriceX96);
};

