# WorldcoinContractsMonorepo
Several code bases are imported in the /lib folder (Uniswap v3 core, Uniswap v3 Periphery, OpenZeppelin, GnosisSafe)

https://www.notion.so/worldcoin/World-App-Smart-Contracts-Encyclopedia-348dd5aca9b94187ab08c3b98e5f88cb?pvs=4

Sepolia Contract Addresses

// Wallet Deployments
SafeDeployer - 0x7387d78b5a77639c162b8cb60c3dc416e930cf79

// Grants
StagingGrant - 0xda5C5fDbB0588b57B0aa32D74bB24000f8E771d7
RecurringGrantDrop - 0xA3aDda8E928B6ec8ff203e0e736a3d09804f9038

// Deploy RecurringGrantDrop
// 0x11cA3127182f7583EfC416a8771BD4d11Fae4334, 1, 0x3dc20aaab0bC4a02E38F2b617AcDD5b333F0bf7a, 0xD3cC83bcd3e7ee71f846b18EAd994603c3b19315, 0xda5C5fDbB0588b57B0aa32D74bB24000f8E771d7
// Router, groupId, token, spender, grant

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
"1807637494"
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


USDC - 0xEC7DF3E5553CC0d5821FB294E43f7203C20EA896
WBTC - 0x4006e60991BfE6aB89cedf3Db3d2ddb8655d582f
WETH - 0x8725756e867DB3C004468ed8ADb73d2EeacD5F3A
WLD  - 0x223369abAfBbF7F96c2a17cD7b6d4D6dB03aeEB0

UniswapV3PoolFactory - 0x5a26a2AbFe972cf20aEfFB180F64a331044e74f3
UniswapnonFungiblePositionManager - 0x4C9cb855170372BfABcCeD87Fb0306A19a55bBD8
UniswapSwapRouter - 0x403616fBc3D2d0E9a0aBAf7cDCbc6611F41f7142
ApprovalSwapRouter - 0x07f1c09794bC50cED3C9C6aA1746b4B9B633872C


USDC/WBTC Pool (0.05%) - 
USDC/WETH Pool (0.05%) - 
USDC/WLD Pool  (0.05%) - 

1000000000000000000000000
1000000000000000000000000000000000000
[ "0xEec4b8B5DE989f3edBA8E3aD23af1E94c5794eac", "0xf17201f6a5b0658dd7a90468e499ab6cb67e5eb4", "500", "-887270", "887270", "1000000000000000000000000000000000000", "1000000000000000000000000", "0", "0", "0xD3cC83bcd3e7ee71f846b18EAd994603c3b19315", "1707637494" ]

https://sepolia-optimism.etherscan.io/tx/0xa62e7819d5c5755a73daddf8c1e6c1c0bd6db98b48e7200782d89b435aa0d842
https://sepolia-optimism.etherscan.io/tx/0x377902ab3ec408a27848ff48c074226940b085dc7ca8361ba36400172b4175a3
https://sepolia-optimism.etherscan.io/tx/0x1d2c7e9c2b5a6cb1a0cbcb2d52b557041ec327213d72d50a9112954b86c79664


NOTE: UNISWAP CONTRACTS MUST BE DEPLOYED THROUGH its repo

Hardhat config snippet:
```
  etherscan: {
    apiKey: {
      optimism: "API_KEY"
    },
    customChains: [
      {
        network: "optimism",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io"
        }
      }
    ]
  },
```

HARDHAT FIX VERIFICATION - https://ethereum.stackexchange.com/questions/120358/typeerror-etherscan-apikey-trim-is-not-a-function-with-multiple-api-keys



Deploy new factory, nft manager, add liquidity, swapRouter, approvalSwapRouter

Deploying Uniswap
1. Deploy Factory from v3-core
2. Deploy NFT Manager from v3-periphery with factory param.
NOTE:   REPLACE `function tokenURI(uint256 tokenId) public view override(ERC721, IERC721Metadata)`  with a dummy string else u need to deploy another contract for the tokenMetadataURI. Use any address for this param in the NFTManager deployment.
3. Approve tokens to NFT Manager
4. Deploy pools with createAndInitializePoolIfNecessary on NFTManager. Calculate sqrtPriceX96 using sqrtpricex96.ts - you have to switch the price depending on the token ordering between USDC and other token. 
5. 
5. Deploy SwapRouter from v3-periphery
6. Deploy ApprovalSwapRouter from v3-periphery with SwapRouter as param

