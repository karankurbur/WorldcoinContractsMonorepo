// Use this to determine the pool sqrtPriceX96 when initializing

// 369403212462982385656397824n
// Resulted in 46000k WBTC for 1 USDC.
// If USDC is token 0 do 1/46000 else do 46000

const USDC = "0xEC7DF3E5553CC0d5821FB294E43f7203C20EA896"
const WBTC = "0x4006e60991BfE6aB89cedf3Db3d2ddb8655d582f"
const WETH = "0x8725756e867DB3C004468ed8ADb73d2EeacD5F3A"
const WLD = "0x223369abAfBbF7F96c2a17cD7b6d4D6dB03aeEB0"

const fee = 500;

const OWNER = "0xD3cC83bcd3e7ee71f846b18EAd994603c3b19315"

calculateSwapRate(USDC, WBTC, 46000)
// calculateSwapRate(USDC, WETH, 2600)
// calculateSwapRate(USDC, WLD, 3)

function calculateSwapRate(USDC: string, OTHER_TOKEN: string, price: number) {
    if(USDC > OTHER_TOKEN) {
        const initPool = {
            token0: OTHER_TOKEN,
            token1: USDC,
            fee,
            sqrtPriceX96: priceToSqrtPrice(price, 18, 18)
        }

        const addLiqudity = [
            OTHER_TOKEN,
            USDC,
            fee,
            "-500000",
            "500000",
            "100000000000000000000000",
            "100000000000000000000000000",
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

        console.log("IN HERE")
        const initPool = {
            token0: USDC,
            token1: OTHER_TOKEN,
            fee,
            sqrtPriceX96: priceToSqrtPrice(1/price, 18, 18)
        }

        const addLiqudity = [
            USDC,
            OTHER_TOKEN,
            fee,
            "-500000",
            "500000",
            "100000000000000000000000000",
            "100000000000000000000000",
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

