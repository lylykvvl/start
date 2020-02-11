class Exchanger {
    constructor(sSelector){
        this.exchanger          = $(sSelector);
        this.currency           = this.exchanger.find('.currency');
        this.currentCurrency    = 'USD';
        this.checkBoxes         = this.exchanger.find('.toggle-price');
        this.toggleFlag         = {
                    'ETH'   : false
                    ,'LTC'  : false
                    ,'BTC'  : false
                };
        
        this.changeInfo();
        this.createEvents();

    }

    changeInfo(event){
        this.currentCurrency = !event ? 'USD' : $(event.currentTarget).val() // опция, которую выбрал пользователь из выпадающего списка
        let criptoCurrencies = ['ETH', 'LTC', 'BTC']
        , url = ''
        ;
      
        $.each(criptoCurrencies, (i, currentCripto)=>{
            url = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/' + currentCripto + this.currentCurrency;
            this.getJSON(url, currentCripto);          
         });   
    }

    getJSON(url, currentCripto){
        $.getJSON(url, (currentJson)=>{
            let percentVal = this.toggleFlag[currentCripto] ? 'price' : 'percent';
            //console.log(percentVal);
               console.log(percentVal);
                this.changeFieldData(' .high-price', currentJson.high, currentCripto);
                // this.exchanger.find('.' + currentCripto + ' .high-price').text(currentJson.high);
                this.changeFieldData(' .hour-percent', currentJson.changes['percent'].hour, currentCripto);
                //this.exchanger.find('.' + currentCripto + ' .hour-percent').text(currentJson.changes.percent.hour);
                this.changeFieldData(' .day-percent', currentJson.changes['percent'].day, currentCripto);
                //this.exchanger.find('.' + currentCripto + ' .day-percent').text(currentJson.changes.percent.day);
                this.changeFieldData(' .week-percent', currentJson.changes['percent'].week, currentCripto);
                //this.exchanger.find('.' + currentCripto + ' .week-percent').text(currentJson.changes.percent.week);
                this.changeFieldData(' .month-percent', currentJson.changes['percent'].month, currentCripto);
                //this.exchanger.find('.' + currentCripto + ' .month-percent').text(currentJson.changes.percent.month);
             });
    }

    changeFieldData(cssClassName, content, currentCripto){
        let currentField = this.exchanger.find('.' + currentCripto + cssClassName)
            , isRedField = false
            ;
        currentField.text(content);
            if(+ content < 0){
                isRedField = true;
            }
        //console.log(isRedField);
        currentField.toggleClass("cell_percent_percent_red", isRedField);   
    }

    changePrices(event){
        let currentCheckBox     = $(event.currentTarget)
            , currentCriptoBox  = currentCheckBox.closest('.currency_item')
            , currentCripto     = currentCriptoBox.data("symbol")
            , url               = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/' + currentCripto + this.currentCurrency
            ;
            if(this.toggleFlag[currentCripto]){
                this.toggleFlag[currentCripto] = false;
            }
            else{
                this.toggleFlag[currentCripto] = true;
            }
            // console.log(this.toggleFlag);
            this.getJSON(url, currentCripto);       
    }

    createEvents(){
        this.currency.change(this.changeInfo.bind(this));
        this.checkBoxes.click(this.changePrices.bind(this));
    }
}