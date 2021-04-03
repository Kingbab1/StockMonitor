module.exports = {
  API: require("../Connections/Stock_API_Connections.json"),
  unirest: require("unirest"),
  get_stock_summary: async function (ticker, region) {
    return new Promise((resolve, reject) => {
      var localAPI = this.API[0];
      var req = this.unirest("GET", localAPI.endpoint[0].URL);

      req.query({
        symbol: ticker,
        region: region,
      });

      req.headers({
        "x-rapidapi-key": localAPI.endpoint[0].headers.x_rapidapi_key,
        "x-rapidapi-host": localAPI.endpoint[0].headers.x_rapidapi_host,
        useQueryString: localAPI.endpoint[0].headers.useQueryString,
      });

      req.end(function (res) {
        if (res.error) reject(res.error);
        else {
          console.log(res.body);
          let temp = res.body;
          var returnValue = {
            "ticker": temp.symbol,
            "defaultStats": {
				      //"52WeekChange" : temp.defaultKeyStatistics.keys("52WeekChange")[0],
              "sharesOutstanding": temp.defaultKeyStatistics.sharesOutstanding,
              "shortedShares": temp.defaultKeyStatistics.sharesShort,
              "institutionalHolders": temp.defaultKeyStatistics.heldPercentInstitutions,
              "netIncome": temp.defaultKeyStatistics.netIncomeToCommon,
              "dividend": temp.defaultKeyStatistics.lastDividendValue,
              "insiderHolders": temp.defaultKeyStatistics.heldPercentInsiders,
              "yield" : temp.defaultKeyStatistics.yield,
              "shortRatio": temp.defaultKeyStatistics.shortRatio,
              "floatShares": temp.defaultKeyStatistics.floatShares,
              "earningsQuarterlyGrowth": temp.defaultKeyStatistics.earningsQuarterlyGrowth,
              "shortPercentOfFloat": temp.defaultKeyStatistics.shortPercentOfFloat
            },
            "price": {
              "marketOpen": temp.price.regularMarketOpen,
              //"averageDailyValueThreeMonths": temp.price.keys("averageDailyVolume3Month")[0],
              "previousClose": temp.price.regularMarketPreviousClose,
              "MarketCap": temp.price.MarketCap
            },
            "financialData": {
              "profitMargins": temp.financialData.profitMargins,
              "grossMargins": temp.financialData.grossMargins,
              "operatingCashFlow": temp.financialData.operatingCashFlow,
              "revenueGrowth": temp.financialData.revenueGrowth,
              "operatingMargins": temp.financialData.operatingMargins,
              "ebitda": temp.financialData.ebitda,
              "grossProfits": temp.financialData.grossProfits,
              "freeCashFlow": temp.financialData.freeCashFlow,
              "currentPrice": temp.financialData.currentPrice,
              "earningsGrowth": temp.financialData.earningsGrowth,
              "returnOnAssets": temp.financialData.returnOnAssets,
              "debtToEquity": temp.financialData.debtToEquity,
              "returnOnEquity": temp.financialData.returnOnEquity,
              "totalCash": temp.financialData.totalCash,
              "totalDebt": temp.financialData.totalDebt,
              "totalRevenue": temp.financialData.totalRevenue,
              "currency": temp.financialData.financialCurrency
            },
            "quoteType": {
              "exchange": temp.quoteType.exchange,
              "shortName": temp.quoteType.shortName,
              "longName": temp.quoteType.longName,
              "symbol": temp.quoteType.symbol,

            }
          };
          resolve(returnValue);
        }
      });
    });
  },
};
