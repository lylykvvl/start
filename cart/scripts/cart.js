class Cart extends Component{
	constructor(sCatalogId, sCartId){
		super(sCatalogId);
		this.minicart = $(sCartId);
		this.bMinicartList = this.minicart.find('.b-minicart__list');
		this.bMinicartQuantity = this.minicart.find('.b-minicart__quantity');
		this.bMinicartTotal = this.minicart.find('.b-minicart__total');
		this.goods = {}; // то что записываем в  куки, хранится соответсвие между количеством товара и Id товара
		this.bMinicartButton = this.minicart.find('.b-minicart__button');
		this.bMinicartOrder = this.minicart.find('.b-minicart__order');
		this.bMinicartOrderLink = this.minicart.find('.b-minicart__order-link');

		this.load();
		this.createEvents();
		


console.log(this.elem);
	}

	add(event){
		event.preventDefault();
		console.log('ok');

		let orderForm = $(event.currentTarget)
			,currentCatalogGoods 	= orderForm.closest('.b-good') // нажал на кнопку и товар должен попасть в коризину
		// , addedGoods 			= new Goods(currentCatalogGoods)
		// 	, goodsId 				= addedGoods.getId() //идентификтор товара
		// 	, minicartGoodsForClone = this.bMinicartList.find('.b-good:first-child')
		// 	, cloneCartGoods 		= minicartGoodsForClone.clone()
		// ;
		// // console.log(addedGoods.elem);
		// console.log(addedGoods.getId());
		
		// console.log(cloneCartGoods);
		// this.copyData(currentCatalogGoods, cloneCartGoods, ['.b-good__image', '.b-good__name', '.b-good__price', '.b-order-form__quantity']);
		// cloneCartGoods.addClass("b-good_id_" + goodsId);
		// cloneCartGoods.find('.b-good__delete').click(this.del.bind(this));
		// this.bMinicartList.find('.b-goods').append(cloneCartGoods);
			, goodsId = this.put(currentCatalogGoods);

		this.goods[goodsId] = currentCatalogGoods.find('.b-order-form__quantity').val();

		console.log("this.goods", this.goods);
		this.saveCookie();

		this.bMinicartList.slideDown();

		this.showCartInfo();

	


	}

	put(currentCatalogGoods){ //розмещение товаров в корзине
		let addedGoods 			= new Goods(currentCatalogGoods)
			, goodsId 				= addedGoods.getId() //идентификтор товара
			, minicartGoodsForClone = this.bMinicartList.find('.b-good:first-child')
			, cloneCartGoods 		= minicartGoodsForClone.clone()
			, existingGoods			= this.bMinicartList.find(".b-good_id_" + goodsId);
		;
		// console.log(addedGoods.elem);
		//console.log(addedGoods.getId());
		
		console.log("existingGoods.length", existingGoods.length);
			if(existingGoods.length){ // для отмены дублирования товаров 
				this.copyData(currentCatalogGoods, existingGoods, ['.b-order-form__quantity']);
			}
			else{
				this.copyData(currentCatalogGoods, cloneCartGoods, ['.b-good__image', '.b-good__name', '.b-good__price', '.b-order-form__quantity']);
				cloneCartGoods.addClass("b-good_id_" + goodsId);
				cloneCartGoods.find('.b-good__delete').click(this.del.bind(this));
				this.bMinicartList.find('.b-goods').append(cloneCartGoods);
			}
		
		return goodsId;
	}

	del(event){
		event.preventDefault();
		let currentDelLink  = $(event.currentTarget)
			, currentGood   = currentDelLink.closest('.b-good')
			, getDelGoods 	= new Goods(currentGood)
			, delGoodsId    = getDelGoods.getId()
			;

			currentGood.remove();
			delete this.goods[delGoodsId];
			this.saveCookie();

			console.log(getDelGoods);

		this.showCartInfo();
	}

	saveCookie(){
		$.cookie('cartList', this.goods);
	}

	load(){
		this.goods = $.cookie('cartList');
			if(this.goods){
				console.log("1")
				 $.each(this.goods, (id, quantity) => {
				 	let currentGoods = this.elem.find(".b-goods_id_" + id);
					console.log(currentGoods);

					this.put(currentGoods);
				 });
			}
			else{
				console.log("2");
				this.goods = {};
			}
			console.log(this.goods);

			this.showCartInfo();

	}

	changeQuantity(event){
		let currentButton = $(event.currentTarget)
		, step = currentButton.data('step')
		, currentTextField = currentButton.siblings('.b-order-form__quantity')
		, currentTextFieldVal = +currentTextField.val() + +step;
		// console.log(currentTextFieldVal);
			if (currentTextFieldVal > 0 ) {
				currentTextField.val(currentTextFieldVal)
			} else {
				alert('не может быть товара меньше 0');
			}
	}


	showHideCart(){
		this.bMinicartList.slideToggle();
	}

	showCartInfo(){
		let totalQty = 0
		, price = 0
		, totalPrice = 0
		, goodsList = ''
		, name = ''
		, orderForm = new Order('#order1')
		;

		$.each(this.goods, (id, qty)=>{
			totalQty+= +qty;		
			price = this.elem.find('.b-good_id_' + id + ' .b-good__price').text();
			name = this.elem.find('.b-good_id_' + id + ' .b-good__name').text();
			totalPrice += price * qty;
			goodsList += id + ' ' + name + ' ' + price + 'грн.<br>';
		})
		this.bMinicartQuantity.text(totalQty);
		//console.log(totalPrice);

		this.bMinicartTotal.text(totalPrice);
		orderForm.orderList.val(goodsList);
	}

	showHideOrderForm(event){
		event.preventDefault();
		this.bMinicartOrder.slideToggle();
	}

	createEvents(){
		this.elem.find('.b-order-form').submit(this.add.bind(this));
		console.log('info');
		this.bMinicartButton.click(this.showHideCart.bind(this));
		this.elem.find('.b-order-form__change-qty').click(this.changeQuantity.bind(this));
		this.bMinicartOrderLink.click(this.showHideOrderForm.bind(this));
	}



}