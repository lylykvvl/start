class Order{
	constructor(sOrderId){
		this.orderForm = $(sOrderId);
		this.name = this.orderForm.find('.order__name');
		this.tel = this.orderForm.find('.order__tel');
		this.eEmail = this.orderForm.find('.order__e-mail');
		this.orderList = this.orderForm.find('.orderList');

		this.createEvents();
	}

	send(event){
		event.preventDefault();
		console.log('ok');
		$.ajax({
			url:'order.php'
			, method:'post'
			, dataType: 'JSON'
			, timeout: 1000
			, data: {
				'name'  : this.name.val()
				, 'tel' : this.tel.val()
				, 'eEmail' : this.eEmail.val()
				, 'orderList' : this.orderList.val()
			}
			, success : (objectOkAjax)=>{
				console.log("objectOkAjax", objectOkAjax);

			}
			, error : (objectErrorAjax)=>{
				console.log(objectErrorAjax);
				
			}
			, complete : (objectAjax)=>{
				console.log("objectAjax", objectAjax);
			}
		});

		// https://www.google.com/search?q=google&rlz=1C1CHBD_ruUA791UA791&oq=goo&aqs=chrome.0.0l3j69i57j69i60l2.1191j0j8&sourceid=chrome&ie=UTF-8
	}

	createEvents(){
		this.orderForm.submit(this.send.bind(this));

	}
}