/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// require('dotenv').config();
// const mnemonic = process.env["MNEMONIC"];
// const infuraProjectId = process.env["INFURA_PROJECT_ID"];
 
// const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache, geth, or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    
    // truffle console --network ganache
    // truffle migrate --network ganache
    metacoin: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    //
    // goerli: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infuraProjectId}`),
    //   network_id: 5,       // Goerli's id
    //   chain_id: 5
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // 从github下载的代码是0.8.13的版本，但由于网络原因，这里下载不了，所以改成自带的0.5.16版本。
  // 因为大版本改了，源码也需要做一些改动。
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.16",      // Fetch exact version from solc-bin
    }
  }
};

/**
 * 启动ganache后，如果想让metamask连接到ganache（本地网络），将metamask的网络设置为localhost:8545。
 * 如果想在metamask中看到ganache中的账户，需要导入ganache中的账户到metamask中。
 * 可以在ganache中点击key图标，将私钥复制到metamask中。
 * 也可以在ganache中导出助记词，然后在metamask中导入助记词。
 */

/**
 * ganache在本地启动了一条私链（truffle develop在本地也启动了一条私链）
 * 
 * ganache中默认给了10个账户，每个账户都有100个以太币。
 * 这里需要注意，私链和账户是两个概念。私链中可以没有账户。
 * 
 * metamask如果尚未输入助记词，可以输入ganache的助记词。
 * 如果已经有了助记词，可以输入10个账户的私钥。
 * 这两种方法都可以导入ganache中的账户到metamask中。
 * 
 * metamask是钱包，可以连接到不同的链（私链公链都ok）。
 * 自然可以连接到本地的ganache私链。
 * 配置metamask的网络为localhost:8545。
 */