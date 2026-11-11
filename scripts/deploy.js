import { network } from "hardhat";

const { viem } = await network.create();

console.log("正在部署 GuessGame 合约...");
const game = await viem.deployContract("GuessGame");

console.log(`GuessGame 合约已部署到: ${game.address}`);
console.log("请将这个地址填入 frontend/app.js 中！");