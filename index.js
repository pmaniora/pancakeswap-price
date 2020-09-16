 const {
     ChainId,
     Token,
     WETH,
     Fetcher,
     Route,
     Trade,
     TokenAmount,
     TradeType
 } = require('@uniswap/sdk')


 const getMidPrice = async (baseToken, baseDecimal, quoteToken, quoteDecimal) => {
     let base = new Token(ChainId.MAINNET, baseToken, baseDecimal),
         quote = new Token(ChainId.MAINNET, quoteToken, quoteDecimal),
         pair = await Fetcher.fetchPairData(quote, base),
         route = await new Route([pair], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6)

     return {
         base2quote: base2quote,
         quote2base: quote2base
     }

 }

 const getExecutionPrice = async (baseToken, baseDecimal, quoteToken, quoteDecimal, tradeAmount) => {
     base = new Token(ChainId.MAINNET, baseToken, baseDecimal),

         quote = new Token(ChainId.MAINNET, quoteToken, quoteDecimal),
         pair = await Fetcher.fetchPairData(quote, base),
         route = await new Route([pair], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6),
         trade = new Trade(route, new TokenAmount(base, tradeAmount), TradeType.EXACT_INPUT)

     return trade.executionPrice.toSignificant(6)

 }
 const main = async () => {
     let data
     data = await getMidPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18)
     console.log(data)

     data = await getExecutionPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, "1000000000000000000")
     console.log(data)
 }
 //main()
 module.exports = {
     getMidPrice: getMidPrice,
     getExecutionPrice: getExecutionPrice,
 }