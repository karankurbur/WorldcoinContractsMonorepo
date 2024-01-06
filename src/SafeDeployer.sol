// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

/// Contract addresses for Optimism Mainnet and Optimism Goerli.
contract SafeDeployer {
    event WalletDeployment(address wallet, bool success);

    function deploy(address wallet, uint256 nonce) internal {
        address SAFE_PROXY = address(0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2);
        address SINGLETON = address(0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552);
        bytes memory initializer = hex"b63e800d000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000";

        (bool success, ) = SAFE_PROXY.call{gas: 300000}(abi.encodeWithSignature("createProxyWithNonce(address,bytes,uint256)", SINGLETON, abi.encodePacked(initializer, wallet, uint256(0)), nonce));

        if (success) {
            emit WalletDeployment(wallet, true);
        } else {
            emit WalletDeployment(wallet, false);
        }
    }

    function deploySingle(address wallet, uint256 nonce) external {
        deploy(wallet, nonce);
    }

    function deployBatch(address[] memory wallets, uint256[] memory nonce) external {
        for (uint i = 0; i < wallets.length; i++) {
            deploy(wallets[i], nonce[i]);
        }
    }
}
