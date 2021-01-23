 const {
     ChainId,
     Token,
     WETH,
     Fetcher,
     Route,
     Trade,
     TokenAmount,
     TradeType
 } = require('@pancakeswap-libs/sdk')

 const {
     JsonRpcProvider
 } = require('@ethersproject/providers')

 const getMidPrice = async (baseToken, baseDecimal, quoteToken, quoteDecimal, chainId) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network = new JsonRpcProvider('https://bsc-dataseed.binance.org')

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         pair = await Fetcher.fetchPairData(quote, base, network),
         route = await new Route([pair], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6)

     return {
         base2quote: base2quote,
         quote2base: quote2base
     }

 }

 const getExecutionPrice = async (baseToken, baseDecimal, quoteToken, quoteDecimal, tradeAmount, chainId) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network = new JsonRpcProvider('https://bsc-dataseed.binance.org')

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         pair = await Fetcher.fetchPairData(quote, base, network),
         route = await new Route([pair], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6),
         trade = new Trade(route, new TokenAmount(base, tradeAmount), TradeType.EXACT_INPUT)

     return trade.executionPrice.toSignificant(6)

 }
 const getMidPriceViaETH = async (baseToken, baseDecimal, quoteToken, quoteDecimal, chainId) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network = new JsonRpcProvider('https://bsc-dataseed.binance.org')

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         quoteWETH = await Fetcher.fetchPairData(quote, WETH[chainId], network),
         WETHbase = await Fetcher.fetchPairData(WETH[chainId], base, network),
         route = await new Route([WETHbase, quoteWETH], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6)

     return {
         base2quote: base2quote,
         quote2base: quote2base
     }

 }
 const getExecutionPriceViaETH = async (baseToken, baseDecimal, quoteToken, quoteDecimal, tradeAmount, chainId) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network = new JsonRpcProvider('https://bsc-dataseed.binance.org')

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
     quoteWETH = await Fetcher.fetchPairData(quote, WETH[chainId], network),
         WETHbase = await Fetcher.fetchPairData(WETH[chainId], base, network),
         route = await new Route([WETHbase, quoteWETH], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6),
         trade = new Trade(route, new TokenAmount(base, tradeAmount), TradeType.EXACT_INPUT)

     return trade.executionPrice.toSignificant(6)

 }

 const getMidPriceViaExactToken = async (baseToken, baseDecimal, quoteToken, quoteDecimal, midToken, midDecimal, chainId) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network = new JsonRpcProvider('https://bsc-dataseed.binance.org')

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         mid = new Token(chainId, midToken, midDecimal)
         quoteMid = await Fetcher.fetchPairData(quote, mid, network),
         midBase = await Fetcher.fetchPairData(mid, base, network),
         route = await new Route([midBase, quoteMid], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6)

     return {
         base2quote: base2quote,
         quote2base: quote2base
     }

 }
 const getExecutionPriceViaExactToken = async (baseToken, baseDecimal, quoteToken, quoteDecimal, midToken, midDecimal, tradeAmount, chainId) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network = new JsonRpcProvider('https://bsc-dataseed.binance.org')

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
 	 mid = new Token(chainId, midToken, midDecimal)
         quoteMid = await Fetcher.fetchPairData(quote, mid, network),
         midBase = await Fetcher.fetchPairData(mid, base, network),
         route = await new Route([midBase, quoteMid], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6),
         trade = new Trade(route, new TokenAmount(base, tradeAmount), TradeType.EXACT_INPUT)

     return trade.executionPrice.toSignificant(6)

 }


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
 //main()
 module.exports = {
     getMidPrice: getMidPrice,
     getExecutionPrice: getExecutionPrice,
     getMidPriceViaETH: getMidPriceViaETH,
     getExecutionPriceViaETH: getExecutionPriceViaETH,
     getMidPriceViaExactToken: getMidPriceViaExactToken,
     getExecutionPriceViaExactToken: getExecutionPriceViaExactToken,
 }
