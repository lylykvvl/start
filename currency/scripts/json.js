let url = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCUSD'
	, data = {
    "ask": 143.5964,
    "bid": 143.3828,
    "last": 143.6607,
    "high": 145.8824,
    "low": 136.5052,
    "open": {
        "hour": 140.9429,
        "day": 138.8627,
        "week": 135.2974,
        "month": 90.3918,
        "month_3": 58.9350,
        "month_6": 30.8563,
        "year": 89.0983
    },
    "averages": {
        "day": 140.1261,
        "week": 136.1952,
        "month": 119.8714
    },
    "volume": 1898978.44162889,
    "changes": {
        "percent": {
            "hour": 1.9300,
            "day": 3.4600,
            "week": 6.1800,
            "month": 58.9300,
            "month_3": 143.7600,
            "month_6": 365.5800,
            "year": 61.2400
        },
        "price": {
            "hour": 2.7178,
            "day": 4.7980,
            "week": 8.3633,
            "month": 53.2689,
            "month_3": 84.7257,
            "month_6": 112.8044,
            "year": 54.5624
        }
    },
    "volume_percent": 93.5745,
    "timestamp": 1561225236,
    "display_timestamp": "2019-06-22 17:40:36",
    "display_symbol": "LTC-USD"
}
	, json =  JSON.stringify(data)
	, list = JSON.parse(json)
	, dollarPrice = document.querySelector('.dollar-price')
	, dollarPriceJquery = $('.dollar-price')

	;

console.log(list);
console.log(list.ask);
console.log(list.open.hour);
console.log(dollarPrice);
	//dollarPrice.innerText = list.high;


	$.getJSON(url, function(data){
		dollarPriceJquery.text(list.high);
	})




