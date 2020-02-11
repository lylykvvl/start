class Goods {
	constructor(currentGoods){
		this.elem = currentGoods;
		console.log(this.elem);
	}

	getId(){
		let cssClass 	= this.elem.attr('class'),
			regExp 		= "id_([0-9]{1,11})",		// () - для метода match возвращает то что находится между скобками отдельным результатом
			oRegExp		= new RegExp(regExp),
			regExpResult= cssClass.match(oRegExp),
			id 			= regExpResult[1]
			;
		//console.log(cssClass.match(oRegExp)[1]);
		return id;
	}
}