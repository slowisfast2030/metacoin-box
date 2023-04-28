// 引入web3模块
var Web3 = require("web3");
// 创建web3对象，连接到本地ganache私链
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

// 获取ganache中的账户列表
web3.eth.getAccounts().then(function(accounts) {
  // 打印账户列表
  console.log("账户列表：");
  console.log(accounts);

  // 设置转账的发送方和接收方
  var sender = accounts[0];
  var receiver = accounts[1];
  // 设置转账的金额，单位为wei
  var amount = web3.utils.toWei("1", "ether");
  
  // 调用web3.eth.sendTransaction方法，发送一笔转账交易
  web3.eth.sendTransaction({
    from: sender,
    to: receiver,
    value: amount
  }).then(function(receipt) {
    // 打印交易收据
    console.log("交易收据：");
    console.log(receipt);
  }).catch(function(error) {
    // 打印错误信息
    console.log("交易失败：");
    console.log(error);
  });
});
