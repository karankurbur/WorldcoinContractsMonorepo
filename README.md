# WorldcoinContractsMonorepo
https://www.notion.so/worldcoin/World-App-Smart-Contracts-Encyclopedia-348dd5aca9b94187ab08c3b98e5f88cb?pvs=4

Sepolia Contract Addresses

// Wallet Deployments
SafeDeployer - 0x7387d78b5a77639c162b8cb60c3dc416e930cf79

// Grants
StagingGrant - 0x0C8a3FDFeB85Ac9B2194f3eAaE057f567226e73C
RecurringGrantDrop - 0x5a640089567C343FbD54c4CaCBC236C205d40302

// Tokens
USDC - 0xEC7DF3E5553CC0d5821FB294E43f7203C20EA896
WBTC - 0x4006e60991BfE6aB89cedf3Db3d2ddb8655d582f
WETH - 0x8725756e867DB3C004468ed8ADb73d2EeacD5F3A
WLD  - 0x223369abAfBbF7F96c2a17cD7b6d4D6dB03aeEB0

// Uniswapv3
UniswapV3PoolFactory - 0x5a26a2AbFe972cf20aEfFB180F64a331044e74f3
UniswapnonFungiblePositionManager - 0x4C9cb855170372BfABcCeD87Fb0306A19a55bBD8
UniswapSwapRouter - 0x403616fBc3D2d0E9a0aBAf7cDCbc6611F41f7142
ApprovalSwapRouter - 0x07f1c09794bC50cED3C9C6aA1746b4B9B633872C

// Deploy RecurringGrantDrop
// 0x11cA3127182f7583EfC416a8771BD4d11Fae4334, 1, 0x223369abAfBbF7F96c2a17cD7b6d4D6dB03aeEB0, 0xD3cC83bcd3e7ee71f846b18EAd994603c3b19315, 0x0C8a3FDFeB85Ac9B2194f3eAaE057f567226e73C
// Router, groupId, token, spender, grant

How to deploy Uniswapv3 on a new network
1. Deploy Uniswapv3Factory
2. Deploy WETH, WBTC, WLD, USDC
4. Deploy UniswapSwapRouter with Uniswapv3Factory + WETH addresses
5. Deploy ApprovalSwapRouter with UniswapSwapRouter address (actual entrypoint for user transaction)
6. Replace lane 191 with dummy value in UniswapnonFungiblePositionManager - https://github.com/Uniswap/v3-periphery/blob/main/contracts/NonfungiblePositionManager.sol#L191. This is so we do not to deploy NonfungibleTokenPositionDescriptor
7. Deploy UniswapnonFungiblePositionManager with Uniswapv3Factory + WETH addresses + any address for NonfungibleTokenPositionDescriptor
8. From EOA, grant approval for each token to the UniswapnonFungiblePositionManager 
9. Create pools USDC/WETH, USDC/WBTC, USDC/WLD using createAndInitializePoolIfNecessary on NFTManager. Utilize scripts/sqrtpricex96.ts to calculate sqrtPriceX96
10. Call mint function on NFTManager to provide liquidity for each pool
11. Test a swap on the router - use scripts/generateSwapParams.ts

NOTE: UNISWAP CONTRACTS MUST BE DEPLOYED THROUGH its repo

Hardhat config snippet to verify contract
HARDHAT FIX VERIFICATION - https://ethereum.stackexchange.com/questions/120358/typeerror-etherscan-apikey-trim-is-not-a-function-with-multiple-api-keys
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

TxBundler Changes
1. Update configs for transferBundler and swapBundler with new token addresses - https://github.com/worldcoin/tx-bundler/blob/main/contracts/config/config.json
2. Update updates for claimBundler with newly deployed grant contracts. It will be the same for all 3.
3. `export STAGE=<STAGE>`
4. Deploy ClaimStaging.yul - NOTE: rename ClaimStaging.yul to Claim.yul and use the ClaimDeployer script. 
5. Deploy ClaimReserved.yul
6. Deploy SwapSwap.yul - update the hardcoded ApprovalSwapAddress
7. Deploy SafeTransfer.yul
8. Deploy Multicall3.sol
9. Update contract addresses in each strategy file (claim_bundler.rs, claim_reserved_bundler.rs, swap_bundler.rs, transfer_bundler.rs, fall_backbundler.rs) //TODO: Move to config files
10. Redeploy TxBundler

Note: If any of the contract fail to deploy, try changing the salt in the DeployerScript
```
cd contracts

export STAGE=<STAGE>

forge script \
    "script/SafeSwapDeployer.s.sol:SafeSwapDeployer" \
    --broadcast \
    --rpc-url https://opt-sepolia.g.alchemy.com/v2/API_KEY \
    --private-key PRIVATE_KEY \
    --sender 0xD3cC83bcd3e7ee71f846b18EAd994603c3b19315 \
    --json \
    --silent \
    -C src/SafeSwap.yul

```

Backend Changes
1. Update app-config (UniswapRouter) -> use the new ApprovalSwap contract address - https://github.com/worldcoin/product/pull/4689/files#diff-c035a723ab8608252b1000c26582551858b013cd5e2bcf2c35097bbb84a9d39aR59
2. Update tokens parameters -> use the new ApprovalSwap contract address and tokens - https://github.com/worldcoin/product/pull/4683/files#diff-92338c97f51da608e4e9a1c414ed9eb7485656ab48bb9c18639a1cc804f461aaR21-R31
3. Update tokens table in DB with new contract addresses

Grant Changes
1. Deploy StagingGrant with a matching startingTimestamp to match current grantId
2. Deploy RecurringGrantDrop with Router, group 1, token, spender, grant as params
3. Grant approval from spender to RecurringGrantDrop