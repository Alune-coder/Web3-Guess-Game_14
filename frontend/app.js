// 1. 确保这里的地址是你刚部署出来的那个！
const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

// 2. 合约的 ABI (接口描述)
const CONTRACT_ABI = [
    "function play(uint256 _guess) external payable",
    "function getPoolBalance() external view returns (uint256)"
];

let provider, signer, contract;

// 初始化函数
async function init() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // 请求用户连接钱包
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            
            // 实例化合约
            contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            console.log("合约实例化成功:", contract.address);
            
            updatePool();
        } catch (error) {
            console.error("连接钱包失败:", error);
            document.getElementById('status').innerText = "连接钱包失败，请检查 MetaMask 是否解锁。";
        }
    } else {
        document.getElementById('status').innerText = "请安装 MetaMask 浏览器插件！";
    }
}

// 更新奖池余额
async function updatePool() {
    if (!contract) return;
    try {
        const balance = await contract.getPoolBalance();
        document.getElementById('pool').innerText = ethers.utils.formatEther(balance);
    } catch (e) {
        console.error("获取奖池失败:", e);
    }
}

// 参与游戏
async function play() {
    if (!contract) {
        alert("合约未连接，请等待页面加载完毕或重试！");
        return;
    }

    const guess = document.getElementById('guessInput').value;
    if (!guess || guess < 1 || guess > 10) {
        alert("请输入1-10的数字！"); return;
    }

    try {
        document.getElementById('status').innerText = "交易发送中，请在 MetaMask 确认...";
        
        // 发送交易，附带 0.01 ETH
        const tx = await contract.play(guess, {
    value: ethers.utils.parseEther("0.01"),
    gasLimit: 500000  // 手动给足 Gas，覆盖合约执行所需
});
        document.getElementById('status').innerText = "等待交易打包上链...";
        
        await tx.wait();
        document.getElementById('status').innerText = "交易成功！";
        updatePool();
    } catch (e) {
        console.error(e);
        // 提取更友好的报错信息
        document.getElementById('status').innerText = "交易失败: " + (e.reason || e.message);
    }
}

// 绑定按钮事件 (页面加载完自动绑定)
window.addEventListener('DOMContentLoaded', () => {
    // 给按钮绑定点击事件，顺便触发初始化
    document.querySelector('button').addEventListener('click', async () => {
        if (!contract) {
            await init(); // 如果没连上，先尝试连钱包
        }
        play(); // 然后玩游戏
    });
    
    // 页面打开时尝试静默连接（如果你之前已经授权过）
    init();
});