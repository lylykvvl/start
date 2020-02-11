class Cart extends Component{
	constructor(sCatalogId, sCartId){
		super(sCatalogId);
		this.minicart = $(sCartId);
		this.bMinicartList = this.minicart.find('.cart-list');
		this.bMinicartTotal = this.minicart.find('.cart-total-cost');
		this.goods = {};
		this.bMinicartButton = this.minicart.find('.cart-btn');

		$.cookie.json = true;
		this.load();
		this.createEvents();

	}
    setContentOpacity(){
	    $(".overflow-screen").fadeIn();
    }

	add(event){
		event.preventDefault();
		let orderForm = $(event.currentTarget)
			,currentCatalogGoods = orderForm.closest('.goods-item')
			, goodsId = this.put(currentCatalogGoods);

		this.goods[goodsId] = currentCatalogGoods.find('.change-gty-good').text();
		this.saveCookie();
		this.showCartInfo();
		this.setContentOpacity();
	}

	put(currentCatalogGoods){
		let addedGoods 			    = new Goods(currentCatalogGoods)
			, goodsId 				= addedGoods.getId()
			, minicartGoodsForClone = this.bMinicartList.find('.cart-item:first-child')
			, cloneCartGoods 		= minicartGoodsForClone.clone()
			, existingGoods			= this.bMinicartList.find(".cart-item_id_" + goodsId);
			if(existingGoods.length){
				this.copyData(currentCatalogGoods, existingGoods, ['.change-gty-good']);
			}
			else{
				this.copyData(currentCatalogGoods, cloneCartGoods, ['.goods-img', '.goods-heading', '.goods-price', '.change-gty-good']);
				cloneCartGoods.addClass("cart-item_id_" + goodsId);
				cloneCartGoods.find('.cart-item-del-link').click(this.del.bind(this));
				this.bMinicartList.append(cloneCartGoods);
			}
		this.minicart
            .css("display", "block")
            .stop()
            .animate({right : 0}, "slow");
		this.bMinicartList.css("display", "block");
		return goodsId;
	}

	del(event){
		event.preventDefault();
		let currentDelLink  = $(event.currentTarget)
			, currentGood   = currentDelLink.closest('.cart-item')
			, getDelGoods 	= new Goods(currentGood)
			, delGoodsId    = getDelGoods.getId()
			;

			currentGood.remove();
			delete this.goods[delGoodsId];
			this.saveCookie();
			this.showCartInfo();
	}

	saveCookie(){
		$.cookie('cartList', this.goods);
	}

	load(){
		this.goods = $.cookie('cartList');
			if(this.goods){
				 $.each(this.goods, (id, quantity) => {
				 	const currentGoods = this.elem.find(".goods-item_id_" + id);
				 	currentGoods.find(".change-gty-good").text(quantity);
					this.put(currentGoods);
				 });
			}
			else{
				this.goods = {};
			}

			this.showCartInfo();

	}

	showHideCart(){
		this.bMinicartList.slideToggle();
	}

	showCartInfo(){
		let price = 0
		, totalPrice = 0
		;
		$.each(this.goods, (id, qty)=>{
			price = this.elem.find('.goods-item_id_' + id + ' .goods-price').text();
			totalPrice += price * qty;
		});
		this.bMinicartTotal.text(totalPrice);
	}

    hideCart(){
		this.load();
        $(".overflow-screen").fadeOut();
        this.minicart
            .stop()
            .animate({right : "-469px"}, "slow");
    }

	createEvents(){
		this.elem.find('.qty-form').submit(this.add.bind(this));
		this.bMinicartButton.click(this.showHideCart.bind(this));
        this.bMinicartButton.click(this.hideCart.bind(this));
        $(".overflow-screen").click(this.hideCart.bind(this))
	}

}