import { priceToSqrtPrice } from "./sqrtpricex96";

const ethers = require("ethers");
const dontenv = require("dotenv");
dontenv.config();
const INonfungiblePositionManagerABI =
  require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json").abi;
const IUniswapV3PoolABI =
  require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json").abi;
const IERC20ABI =
  require("@openzeppelin/contracts/build/contracts/IERC20.json").abi;
// Contract addresses
const NonfungiblePositionManager = "0xec12a9F9a09f50550686363766Cc153D03c27b5e";

const {
  abi: ISwapRouterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");

const SwapRouter = "0x091AD9e2e6e5eD44c1c66dB50e49A601F9f36cF6";
const ApprovalSwapRouter = "0x64e698f0c7f830b31fde3c9294879141dba9856e";

const WLD = "0x2cfc85d8e48f8eab294be644d9e25c3030863003";
const WBTC = "0x03c7054bcb39f7b2e5b2c7acb37583e32d70cfa3";
const WETH = "0x4200000000000000000000000000000000000006";
const USDC = "0x79A02482A880bCE3F13e09Da970dC34db4CD24d1";

// Connect to the network (replace with your provider URL)
const provider = new ethers.providers.JsonRpcProvider(
  "https://worldchain-mainnet.g.alchemy.com/v2/0_XjRVg4tM1eXKp9Je8xkVFflZo4wnrp"
);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

// Contract instances
const nftManager = new ethers.Contract(
  NonfungiblePositionManager,
  INonfungiblePositionManagerABI,
  signer
);

const swapRouter = new ethers.Contract(SwapRouter, ISwapRouterABI, signer);
// const swapRouter = new ethers.Contract(
//   ApprovalSwapRouter,
//   ISwapRouterABI,
//   signer
// );

const usdcToken = new ethers.Contract(USDC, IERC20ABI, signer);
const wldToken = new ethers.Contract(WLD, IERC20ABI, signer);
const wethToken = new ethers.Contract(WETH, IERC20ABI, signer);
const wbtcToken = new ethers.Contract(WBTC, IERC20ABI, signer);

const recipient = "0x6348A4a4dF173F68eB28A452Ca6c13493e447aF1";

async function main() {
  // // 1. Grant approvals
  // await grantApprovals();
  // // 2. Create pools
  // await createPool_USDC_WBTC();
  // 3. Test swap
  await testSwap();
}

async function testSwap() {
  const params = {
    tokenIn: USDC,
    tokenOut: WLD,
    fee: 500,
    recipient,
    amountIn: "1000000",
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
    deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
  };

  // [
  //     "0x79a02482a880bce3f13e09da970dc34db4cd24d1",
  //     "0x2cfc85d8e48f8eab294be644d9e25c3030863003",
  //     "500",
  //     "0x6348a4a4df173f68eb28a452ca6c13493e447af1",
  //     "1000000",
  //     "0",
  //     "0"
  // ]

  console.log(params);

  const tx = await swapRouter.exactInputSingle(params);
  console.log(tx);
}

async function grantApprovals() {
  const maxApproval = ethers.constants.MaxUint256;
  // await usdcToken.approve(NonfungiblePositionManager, maxApproval);
  // await wldToken.approve(NonfungiblePositionManager, maxApproval);
  // await wethToken.approve(NonfungiblePositionManager, maxApproval);
  // await wbtcToken.approve(NonfungiblePositionManager, maxApproval);

  await usdcToken.approve(SwapRouter, maxApproval);
  // await wldToken.approve(SwapRouter, maxApproval);
  // await wethToken.approve(SwapRouter, maxApproval);
  // await wbtcToken.approve(SwapRouter, maxApproval);

  console.log("Approvals granted");
}

async function createPool_USDC_WBTC() {
  let token0, token1;
  let decimals0, decimals1;

  if (USDC > WETH) {
    token0 = WETH;
    decimals0 = 18;
    token1 = USDC;
    decimals1 = 6;
  } else {
    token0 = USDC;
    decimals0 = 6;
    token1 = WETH;
    decimals1 = 18;
  }

  let price = 2500;
  const fee = 500;

  const sqrtPriceX9 = priceToSqrtPrice(price, decimals0, decimals1);

  console.log(sqrtPriceX9);
  console.log("Token 0 is USDC", token0 === "USDC");

  if (token0 === "USDC") {
    console.log("Token 0 is USDC, swapping price before sqrt price calc");
    console.log("Token 0 is USDC");
    console.log("Token 1 is WETH");
    price = 1 / price;
  } else {
    console.log("Token 0 is WETH");
    console.log("Token 1 is USDC");
  }

  console.log(token0);
  console.log(decimals0);
  console.log(token1);
  console.log(decimals1);

  // await createAndInitializePool(token0, token1, fee, sqrtPriceX9);

  // const token0Amount = 0.4 * 10 ** decimals0;
  // const token1Amount = price * 0.4 * 10 ** decimals1;

  const token0Amount = "200000000000000000";
  const token1Amount = "1000000000";

  const params = {
    token0: token0,
    token1: token1,
    fee: fee,
    tickLower: "-500000",
    tickUpper: "500000",
    amount0Desired: token0Amount,
    amount1Desired: token1Amount,
    amount0Min: 0,
    amount1Min: 0,
    recipient,
    deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
  };

  console.log(params);

  const result = await nftManager.mint(params);
  console.log(result);
}

async function createAndInitializePool(
  token0: string,
  token1: string,
  fee: number,
  sqrtPriceX96: bigint
) {
  const result = await nftManager.createAndInitializePoolIfNecessary(
    token0,
    token1,
    fee,
    sqrtPriceX96
  );

  console.log(result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
