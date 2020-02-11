class Component{
	constructor(id){
		this.elem = $(id);

	}

	copyData(fromCopy, toCopy, listCopy){
		$.each(listCopy, (i, cssClassName)=>{
			//console.log(cssClassName);
			let currentElementfromCatalog = fromCopy.find(cssClassName)
			//console.log(currentElementfromCatalog);
			, currentElementfromCart = toCopy.find(cssClassName)
			//console.log(currentElementfromCart);
			, tagName = currentElementfromCatalog.prop('tagName').toLowerCase()
			//console.log(tagName);
			if (tagName == 'img') {
				currentElementfromCart.attr('src', currentElementfromCatalog.attr('src'))
			} else if(tagName == 'input'){
				currentElementfromCart.val(currentElementfromCatalog.val())
			} else {
				currentElementfromCart.text(currentElementfromCatalog.text())
			}
			});


	}
}