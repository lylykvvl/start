(function(){
    const openScrollBtn = $(".open-scroll-btn");
    const goodsQtyList = $(".force-overflow li");

    openScrollBtn.click((event)=>{
        const qtyList = $(event.target).closest(".qty-form").find(".goods-qty");
        qtyList.slideToggle();
    });

    goodsQtyList.click((event)=>{
        const currentQtyField = $(event.target);
        const qtyList = currentQtyField.closest(".qty-form").find(".goods-qty");
        const goodsQtyField = currentQtyField.closest(".qty-form").find(".change-gty-good");
        goodsQtyField.text(currentQtyField.text());
        qtyList.hide();
    });
})();