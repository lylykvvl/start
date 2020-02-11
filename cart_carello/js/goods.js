class Goods {
	constructor(currentGoods){
		this.elem = currentGoods;
	}

	getId(){
		let cssClass 	= this.elem.attr('class'),
			regExp 		= "id_([0-9]{1,11})",
			oRegExp		= new RegExp(regExp),
			regExpResult= cssClass.match(oRegExp),
			id 			= regExpResult[1]
			;
		return id;
	}
}