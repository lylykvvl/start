class Component{
	constructor(id){
		this.elem = $(id);

	}

	copyData(fromCopy, toCopy, listCopy){
		$.each(listCopy, (i, cssClassName)=>{
			let currentElementfromCatalog = fromCopy.find(cssClassName)
			, currentElementfromCart = toCopy.find(cssClassName);
			let tagName = currentElementfromCatalog.prop('tagName').toLowerCase();
			if (tagName == 'img') {
				currentElementfromCart.attr('src', currentElementfromCatalog.attr('src'))
			} else if(tagName == 'input'){
				currentElementfromCart.val(currentElementfromCatalog.val())
			} else {
				currentElementfromCart.text(currentElementfromCatalog.text());
			}
			});
	}
}