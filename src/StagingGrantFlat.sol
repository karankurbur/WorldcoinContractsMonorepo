// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IGrant {
    /// @notice Error in case the grant is invalid.
    error InvalidGrant();

    /// @notice Error in case the grant configuration is invalid.
    error InvalidConfiguration();

    /// @notice Returns the current grant id.
    function getCurrentId() external view returns (uint256);

    /// @notice Returns the amount of tokens for a grant.
    /// @notice This may contain more complicated logic and is therefore not just a member variable.
    /// @param grantId The grant id to get the amount for.
    function getAmount(uint256 grantId) external view returns (uint256);

    /// @notice Checks whether a grant is valid.
    /// @param grantId The grant id to check.
    function checkValidity(uint256 grantId) external view;

    /// @notice Calculates the grant id for a given timestamp.
    /// @param timestamp The timestamp to calculate the grant id for.
    function calculateId(uint256 timestamp) external view returns (uint256);

    /// @notice Checks whether a reservation is valid.
    /// @param timestamp The timestamp to check the reservation for.
    function checkReservationValidity(uint256 timestamp) external view;
}

/////////////////////////////////////////
/// ONLY USED FOR STAGING.
/////////////////////////////////////////

contract StagingGrant is IGrant {
    uint256 internal immutable startOffsetInSeconds;
    uint256 internal immutable amount;

    constructor(uint256 _startOffsetInSeconds, uint256 _amount) {
        if (block.timestamp < _startOffsetInSeconds) revert InvalidConfiguration();

        startOffsetInSeconds = _startOffsetInSeconds;
        amount = _amount;
    }

    function getCurrentId() external view override returns (uint256) {
        return this.calculateId(block.timestamp);
    }

    function calculateId(uint256 timestamp) external view override returns (uint256) {
        return (timestamp - startOffsetInSeconds) / 3 hours;
    }

    function getAmount(uint256) external view override returns (uint256) {
        return amount;
    }

    function checkValidity(uint256 grantId) external view override{
        if (this.getCurrentId() != grantId) revert InvalidGrant();
    }

    function checkReservationValidity(uint256 timestamp) external view override {
        uint256 grantId = this.calculateId(timestamp);

        // No future grants can be reserved and claimed.
        if (grantId >= this.getCurrentId()) revert InvalidGrant();

        // Reservations are only valid for 12 months.
        if (block.timestamp > timestamp + 52 weeks) revert InvalidGrant();
    }
}

