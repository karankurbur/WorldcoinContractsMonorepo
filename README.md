# WorldcoinContractsMonorepo
Several code bases are imported in the /lib folder (Uniswap v3 core, Uniswap v3 Periphery, OpenZeppelin, GnosisSafe)

https://www.notion.so/worldcoin/World-App-Smart-Contracts-Encyclopedia-348dd5aca9b94187ab08c3b98e5f88cb?pvs=4

Sepolia Contract Addresses

// Wallet Deployments
SafeDeployer - 0x7387d78b5a77639c162b8cb60c3dc416e930cf79

// Grants
StagingGrant - 0xda5C5fDbB0588b57B0aa32D74bB24000f8E771d7
RecurringGrantDrop - 0x9452c25d331aB02f9EF195123b69D68Edb413343

// Add liquidity params on UniswapnonFungiblePositionManager
[
"0x396458af3Bc363B0c41ce1EEbe356Cf8A00F0aef",
"0x9A7D51C5433748aDD607b0316548670fB623665C",
"500",
"-887270",
"184220",
"1000000000000000000000000000000000",
"1000000000000000000",
"0",
"0",
"0xD3cC83bcd3e7ee71f846b18EAd994603c3b19315",
"1707637494"
]

{
    address token0
    address token1;
    uint24 fee;
    int24 tickLower;
    int24 tickUpper;
    uint256 amount0Desired;
    uint256 amount1Desired;
    uint256 amount0Min;
    uint256 amount1Min;
    address recipient;
    uint256 deadline;
}

How to deploy Uniswapv3 on a new network
1. Deploy Uniswapv3Factory
2. Deploy WETH, WBTC, WLD, USDC
3. Create pools USDC/WETH, USDC/WBTC, USDC/WLD
4. Deploy UniswapSwapRouter with Uniswapv3Factory + WETH addresses
5. Deploy ApprovalSwapRouter with UniswapSwapRouter address (actual entrypoint for user transaction)
6. Replace lane 191 with dummy value in UniswapnonFungiblePositionManager - https://github.com/Uniswap/v3-periphery/blob/main/contracts/NonfungiblePositionManager.sol#L191. This is so we do not to deploy NonfungibleTokenPositionDescriptor
7. Deploy UniswapnonFungiblePositionManager with Uniswapv3Factory + WETH addresses + any address for NonfungibleTokenPositionDescriptor
8. From EOA, grant approval for each token to the UniswapnonFungiblePositionManager
9. Call mint function on ApprovalSwapRouter to provide liquidity for each pool


USDC - 0xEec4b8B5DE989f3edBA8E3aD23af1E94c5794eac
WBTC - 0x396458af3Bc363B0c41ce1EEbe356Cf8A00F0aef
WETH - 0xf17201f6a5b0658dd7a90468e499ab6cb67e5eb4
WLD  - 0x3dc20aaab0bC4a02E38F2b617AcDD5b333F0bf7a

UniswapV3PoolFactory - 0xA4e69bAE6512FEBba928d1b9fBBecFf729Fc5943
UniswapSwapRouter -
UniswapnonFungiblePositionManager - 0x4a63199734a349A2125D310f86E974a63b44B22d

USDC/WBTC Pool (0.05%) - 0x67BFED85286db8705a9b534cC846085b921a0d7C
USDC/WETH Pool (0.05%) - 0x4B428ca59F3C9ff5D9715C9E72Bf3C8b8AC3e0ca
USDC/WLD Pool  (0.05%) - 0x1d802a35Fe7ef1E1A9DF4eEbc597DEeEa3aE2ebE

1000000000000000000000000
1000000000000000000000000000000000000
[ "0xEec4b8B5DE989f3edBA8E3aD23af1E94c5794eac", "0xf17201f6a5b0658dd7a90468e499ab6cb67e5eb4", "500", "-887270", "887270", "1000000000000000000000000000000000000", "1000000000000000000000000", "0", "0", "0xD3cC83bcd3e7ee71f846b18EAd994603c3b19315", "1707637494" ]

https://sepolia-optimism.etherscan.io/tx/0xa62e7819d5c5755a73daddf8c1e6c1c0bd6db98b48e7200782d89b435aa0d842
https://sepolia-optimism.etherscan.io/tx/0x377902ab3ec408a27848ff48c074226940b085dc7ca8361ba36400172b4175a3
https://sepolia-optimism.etherscan.io/tx/0x1d2c7e9c2b5a6cb1a0cbcb2d52b557041ec327213d72d50a9112954b86c79664