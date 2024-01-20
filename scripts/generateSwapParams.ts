const { ethers } = require("ethers");

// Define token addresses
const USDC = "0xEC7DF3E5553CC0d5821FB294E43f7203C20EA896"
const WBTC = "0x4006e60991BfE6aB89cedf3Db3d2ddb8655d582f"

// Define amount to swap (100 USDC with 18 decimals)
const amountIn = ethers.utils.parseUnits("100", 18);

// Define the recipient address (example address, replace with actual)
const recipient = "0xD3cC83bcd3e7ee71f846b18EAd994603c3b19315";

// Set the deadline (example: 20 minutes from now)
const deadline = Math.floor(Date.now() / 1000) + 20 * 60;

// Define the fee tier (example: 0.3% fee tier)
const fee = 500;

// Define the sqrtPriceLimitX96 (setting to 0 means no limit)
const sqrtPriceLimitX96 = 0;

// Create the parameters for the swap
const params = [
    USDC,
    WBTC,
    fee,
    recipient,
    deadline,
    '100000000000000000000',
    0,
    sqrtPriceLimitX96
]

console.log(params)
// This params object can now be passed to the exactInputSingle function
