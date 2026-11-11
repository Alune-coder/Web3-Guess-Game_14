📖 项目简介
本项目是《开源文化运动》期末考核开源项目。这是一个基于以太坊智能合约开发的去中心化猜数字小游戏（DApp）。代码完全开源，逻辑链上透明可查。玩家通过 MetaMask 钱包连接并支付 0.01 测试 ETH 参与猜数字（1-10），猜中即可赢走合约奖池内的所有奖金。

🛠️ 技术栈
智能合约：Solidity ^0.8.34

开发框架：Hardhat 3

前端交互：原生 HTML/JS + ethers.js v5

钱包接入：MetaMask

📂 项目结构
Web3-Guess-Game_14/
├── contracts/ # 智能合约目录 (GuessGame.sol)
├── scripts/ # 部署脚本目录 (deploy.js)
├── frontend/ # 前端页面目录 (index.html, app.js)
├── hardhat.config.ts # Hardhat 配置文件
├── README.md # 项目说明文档
└── LICENSE # MIT 开源许可证

🚀 快速开始（本地运行测试）
本项目已在 Hardhat 本地网络（Localhost）测试通过，无需真实资金。请按照以下步骤在本地运行：

安装依赖并编译合约。确保电脑已安装 Node.js (v22.13.0+)，在根目录执行：
npm install
npx hardhat compile

启动本地区块链节点。打开一个新终端，启动 Hardhat 本地网络（注意：此终端窗口不要关闭）：
npx hardhat node
启动后，终端会输出 20 个测试账户及其私钥，请记下 Account #0 的私钥，稍后用于导入钱包。

部署智能合约。再开一个终端，将合约部署到本地网络：
npx hardhat run scripts/deploy.js --network localhost
终端会输出类似 GuessGame 合约已部署到: 0x5fbdb... 的地址，请复制该地址。

配置前端与钱包。打开 frontend/app.js，将 CONTRACT_ADDRESS 变量的值替换为你刚刚部署得到的合约地址。打开浏览器 MetaMask 插件，添加自定义网络：
网络名称：Hardhat Local
RPC URL：http://127.0.0.1:8545
链 ID：31337
货币符号：ETH
在 MetaMask 中导入你刚才记下的 Account #0 测试私钥，你会获得 10000 个测试 ETH。

运行前端页面。在 frontend 目录下启动一个本地静态服务器：
cd frontend
npx http-server -p 8080
在浏览器中访问 http://127.0.0.1:8080，连接钱包，输入 1-10 的数字即可开始游戏！

⚠️ 安全声明
本项目为教学演示用途，目前采用的是“伪随机数”生成方案。在实际生产环境中，由于区块时间戳等链上数据可被矿工/验证者影响，存在被操纵的风险。工业级 DApp 通常会采用 Chainlink VRF 等去中心化预言机方案来获取绝对安全的随机数。

📄 开源协议
本项目基于 MIT License 开源。
