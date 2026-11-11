// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GuessGame {
    address public owner;
    uint256 public constant GUESS_FEE = 0.01 ether; // 每次参与花费0.01 ETH
    uint256 public constant MAX_NUMBER = 10; // 猜1-10的数字

    event GameResult(address indexed player, bool win, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // 核心玩法：支付测试币猜数字
    function play(uint256 _guess) external payable {
        require(msg.value == GUESS_FEE, "Must send exactly 0.01 ETH");
        require(_guess >= 1 && _guess <= MAX_NUMBER, "Guess must be between 1 and 10");

        // 简单的伪随机数 (注意: 生产环境需用Chainlink VRF，此处为了教学演示)
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender))) % MAX_NUMBER + 1;

        if (_guess == random) {
            uint256 prize = address(this).balance;
            (bool success, ) = payable(msg.sender).call{value: prize}("");
            require(success, "Transfer failed");
            emit GameResult(msg.sender, true, prize);
        } else {
            emit GameResult(msg.sender, false, 0);
        }
    }

    // 查看当前奖池余额
    function getPoolBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // 仅限Owner: 提取资金(防止死局)
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        (bool success, ) = payable(owner).call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }
}