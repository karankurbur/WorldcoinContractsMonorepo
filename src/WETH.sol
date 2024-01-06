// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WETH is ERC20 {
    constructor() ERC20("Wrapped Ethereum", "WETH") {
        _mint(msg.sender, 1000000000 * (10 ** 18));
    }

    function freeCoin() public {
        _mint(msg.sender, 100000 * (10 ** 18));
    }
}