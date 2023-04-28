// 引入web3模块
var Web3 = require("web3");
// 创建web3对象，连接到本地ganache私链
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));


async function run() {
    
    // abi可以从MetaCoin.json中获取。但获取的是一个列表，可以粘贴进浏览器，将其变为字符串
    const contractAbi = JSON.parse('[ { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "_from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "sendCoin", "outputs": [ { "internalType": "bool", "name": "sufficient", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "addr", "type": "address" } ], "name": "getBalanceInEth", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "addr", "type": "address" } ], "name": "getBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]')
    // 部署到ganache的合约地址
    const contractAddress = '0x9a3169431781f7737Bc8860868F0212A0fA41f70'
    const myContract = new web3.eth.Contract(contractAbi, contractAddress)

    // ganache的第一个账户
    from = '0xf833B6b5EfE6d7A52B6C6D91C63c14279F0f4F6e'
    // ganache的第二个账户
    to = '0xaF5C7bc6D4C711c49F784B7D965C06F8457bf9FE'

    // 第一个账户的私钥
    from_key = '0xcea7a08117505a1a41fa2f27c9897e456f9fbb99d836d81757e9c63b03df6890'

    // 调用合约，读取数据。这个地址可以是任意一个地址。
    myContract.methods.getBalance(to).call().then(console.log)

    // 调用合约，写入数据
    let txn = await web3.eth.accounts.signTransaction({
        gas: "71000",
        from: from, 
        to: contractAddress,
        data: myContract.methods.sendCoin(to, 15).encodeABI()
    }, from_key)

    console.log('===========================================================================');
    console.log(myContract.methods.sendCoin(to, 15).encodeABI());
    console.log('===========================================================================');

    // 发送
    web3.eth.sendSignedTransaction(txn.rawTransaction).on('transactionHash', function(hash){
        console.log("发送成功, 获取交易hash: ",hash)
    }).on('receipt', function(receipt){
        console.log("链上结果返回, 返回数据：",receipt)
    }).on('confirmation', function(confirmationNumber, receipt){
        console.log("链上confirmation结果返回, 确认数: ",confirmationNumber)
        console.log("链上confirmation结果返回, 返回数据: ",receipt)
    }).on('error', console.error);
  
  }
run()

// 这里用的是sendSignedTransaction，也可以用sendTransaction
// 但在测试链上，sendTransaction会报错
// 只能用sendSignedTransaction