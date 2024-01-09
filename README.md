# WorldcoinContractsMonorepo
Several code bases are imported in the /lib folder (Uniswap v3 core, Uniswap v3 Periphery, OpenZeppelin, GnosisSafe)

https://www.notion.so/worldcoin/World-App-Smart-Contracts-Encyclopedia-348dd5aca9b94187ab08c3b98e5f88cb?pvs=4

Sepolia Contract Addresses

SafeDeployer - 0x7387d78b5a77639c162b8cb60c3dc416e930cf79

USDC - 0xa8a4Ff4DeA78FA4634B6279591DFead74c826a56
WBTC - 0x396458af3Bc363B0c41ce1EEbe356Cf8A00F0aef 
WETH - 0xf17201f6a5b0658dd7a90468e499ab6cb67e5eb4
WLD  - 0x0ada1acad14b2efe7f30d96702dab6ec286e651a

UniswapV3PoolFactory - 0xa4e69bae6512febba928d1b9fbbecff729fc5943
UniswapSwapRouter - 0xC8E8034A6D65b448CEC00f65B3BC94A73d464A8e
UniswapnonFungiblePositionManager - 0xAc2b92C05a78010AcB0082d115908D5b0C1bee97

USDC/WBTC Pool (0.05%) - 0xAEaC40FDE29F51B5B9fb967a7Eec378F7EB67Bb1
USDC/WETH Pool (0.05%) - 0x0C8086C5EC44FA9B2D2CeB668f8c8E635668f253
USDC/WLD Pool  (0.05%) - 0xA030547Ab6659c39F2fD29d0F2a962Bb280f6727

// Grants
StagingGrant - 0x16db5b91bdae98bbf827f9f0e7e17d0601b1045a
RecurringGrantDrop - 0x0047c9afd92bda1358990ca27afa50b79cca160e

// TODO: Add liquidity
// Add liquidity params on UniswapnonFungiblePositionManager
["0xa8a4Ff4DeA78FA4634B6279591DFead74c826a56",
"0x396458af3Bc363B0c41ce1EEbe356Cf8A00F0aef",
"500",
"-887272",
"887272",
"1000000000000000000",
"1000000000000000000",
"0",
"0",
"0xD3cC83bcd3e7ee71f846b18EAd994603c3b19315",
"1799456414"
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


// TODO: Determine a good starting price for the pool
Don't use the Factory directly to create the pool, use the NFTManager as it will also initialize it with an starting price.