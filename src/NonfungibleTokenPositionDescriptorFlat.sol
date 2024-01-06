contract NonfungibleTokenPositionDescriptor {
    function tokenURI(address positionManager, uint256 tokenId)
    external
    returns (string memory) {
        return "test";
    }
}
