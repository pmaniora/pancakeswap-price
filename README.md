# uniswap-price [![npm version](https://badge.fury.io/js/uniswap-price.svg)](https://badge.fury.io/js/uniswap-price)
get token price from pancakeswap

## Install 
```
npm i --save pancakeswap-price
```

## Usage

Note: WBNB address is `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`

- **getMidPrice(sourceToken, sourceDecimal, destToken, destDecimal, chainId)**: return the reference price
- **getExecutionPrice(sourceToken, sourceDecimal, destToken, destDecimal, chainId)**: return the exact price for the trade with your specified amount
- **getMidPriceViaETH(sourceToken, sourceDecimal, destToken, destDecimal, chainId)**: return the reference price using route via ETH
- **getExecutionPriceViaETH(sourceToken, sourceDecimal, destToken, destDecimal, chainId)**: return the exact price for the trade with your specified amount using route via ETH
- **getMidPriceViaExactToken(sourceToken, sourceDecimal, destToken, destDecimal, pivotToken, pivotTokenDecimal, chainId)**: return the reference price using route via ExactToken
- **getExecutionPriceViaExactToken(sourceToken, sourceDecimal, destToken, destDecimal, pivotToken, pivotTokenDecimal, chainId)**: return the exact price for the trade with your specified amount using route via ExactToken

### Arguments
- sourceToken: address of source token
- sourceDecimal: decimal of source token
- destToken: address of destination token
- destDecimal: decimal of destination token
- pivotToken: the token used for routing
- pivotTokenDecimal: decimal of the token used for routing
- chainId: default 56 (Binance Smart Chain mainnet 56)


```nodejs
const pancakeswapPrice = require('pancakeswap-price')

 const main = async () => {
     let data
     const CAKE = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
     const BUSD = '0xe9e7cea3dedca5984780bafc599bd69add087d56'

     data = await pancakeswapPrice.getMidPrice(CAKE, 18, BUSD, 18)
     console.log(data)

     data = await pancakeswapPrice.getExecutionPrice(CAKE, 18, BUSD, 18, "1000000000000000000")
     console.log(data)

     data = await pancakeswapPrice.getMidPriceViaETH(CAKE, 18, BUSD, 18)
     console.log(data)

     data = await pancakeswapPrice.getExecutionPriceViaETH(CAKE, 18, BUSD, 18, "1000000000000000000")
     console.log(data)
 }
```

