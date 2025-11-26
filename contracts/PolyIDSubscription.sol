// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title PolyIDSubscription
 * @dev Simple subscription contract for PolyID platform
 * Universities pay in MATIC to get monthly subscription
 */
contract PolyIDSubscription {
    address public owner;
    uint256 public monthlyPrice;
    
    struct Subscription {
        address university;
        uint256 expiryDate;
        bool active;
        uint256 totalPaid;
        uint256 subscriptionCount;
    }
    
    mapping(address => Subscription) public subscriptions;
    
    event SubscriptionPurchased(
        address indexed university,
        uint256 expiryDate,
        uint256 amount
    );
    
    event SubscriptionRenewed(
        address indexed university,
        uint256 newExpiryDate,
        uint256 amount
    );
    
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    
    constructor(uint256 _monthlyPriceInWei) {
        owner = msg.sender;
        monthlyPrice = _monthlyPriceInWei; // e.g., 10 ether = 10 MATIC
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    /**
     * @dev Purchase or renew subscription
     * Sends MATIC to contract and activates subscription for 30 days
     */
    function subscribe() external payable {
        require(msg.value >= monthlyPrice, "Insufficient payment");
        
        Subscription storage sub = subscriptions[msg.sender];
        uint256 expiryDate;
        
        if (sub.active && sub.expiryDate > block.timestamp) {
            // Extend existing subscription
            expiryDate = sub.expiryDate + 30 days;
            emit SubscriptionRenewed(msg.sender, expiryDate, msg.value);
        } else {
            // New subscription
            expiryDate = block.timestamp + 30 days;
            sub.subscriptionCount++;
            emit SubscriptionPurchased(msg.sender, expiryDate, msg.value);
        }
        
        sub.university = msg.sender;
        sub.expiryDate = expiryDate;
        sub.active = true;
        sub.totalPaid += msg.value;
        
        // Refund excess payment
        if (msg.value > monthlyPrice) {
            payable(msg.sender).transfer(msg.value - monthlyPrice);
        }
    }
    
    /**
     * @dev Check if subscription is active
     */
    function isSubscriptionActive(address university) external view returns (bool) {
        Subscription memory sub = subscriptions[university];
        return sub.active && sub.expiryDate > block.timestamp;
    }
    
    /**
     * @dev Get subscription details
     */
    function getSubscription(address university) external view returns (
        address universityAddress,
        uint256 expiryDate,
        bool active,
        uint256 totalPaid,
        uint256 subscriptionCount,
        uint256 daysRemaining
    ) {
        Subscription memory sub = subscriptions[university];
        uint256 remaining = 0;
        
        if (sub.active && sub.expiryDate > block.timestamp) {
            remaining = (sub.expiryDate - block.timestamp) / 1 days;
        }
        
        return (
            sub.university,
            sub.expiryDate,
            sub.active && sub.expiryDate > block.timestamp,
            sub.totalPaid,
            sub.subscriptionCount,
            remaining
        );
    }
    
    /**
     * @dev Get days remaining in subscription
     */
    function getDaysRemaining(address university) external view returns (uint256) {
        Subscription memory sub = subscriptions[university];
        
        if (!sub.active || sub.expiryDate <= block.timestamp) {
            return 0;
        }
        
        return (sub.expiryDate - block.timestamp) / 1 days;
    }
    
    /**
     * @dev Owner can update monthly price
     */
    function setMonthlyPrice(uint256 newPrice) external onlyOwner {
        uint256 oldPrice = monthlyPrice;
        monthlyPrice = newPrice;
        emit PriceUpdated(oldPrice, newPrice);
    }
    
    /**
     * @dev Owner can withdraw collected funds
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner).transfer(balance);
    }
    
    /**
     * @dev Get contract balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Transfer ownership
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
