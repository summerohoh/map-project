
/*--------MODEL --------*/

var data={
	currentCat:null,
	cats:[
			{
			name:"Dash",
			clickCount:0,
			imageSrc:"./img/cat1.jpg",
			imageAttribution: "https://unsplash.com/photos/FqkBXo2Nkq0"
			},
			{
			name:"Oscar",
			clickCount:0,
			imageSrc:"./img/cat2.jpg",
			imageAttribution: "https://unsplash.com/photos/2mggzzwA-6Y"
			},
			{
			name:"Chessy",
			clickCount:0,
			imageSrc:"./img/cat3.jpg",
			imageAttribution: "https://unsplash.com/photos/o6RbK3y7mK4"
			},
			{
			name:"Tobby",
			clickCount:0,
			imageSrc:"./img/cat4.jpg",
			imageAttribution: "https://unsplash.com/photos/IWblYR8n9zw"
			},
			{
			name:"Tigger",
			clickCount:0,
			imageSrc:"./img/cat5.jpg",
			imageAttribution: "https://unsplash.com/photos/YifPTBCy-x8"
			},
	]
}

/*-------- Controller --------*/

var controller = {

	init: function(){
		//set initial current cat as the first cat
		data.currentCat = data.cats[0];
		//tell the view to initialize
		catListView.init();
		catView.init();
	},

	getCurrentCat: function(){
		return data.currentCat;
	},

	getCats: function(){
		return data.cats;
	},

	setCurrentCat: function(e){
		data.currentCat=e;
	},

	incrementCounter: function(){
		data.currentCat.clickCount+=1;
		catView.render();
	}
}


/*--------VIEW --------*/

var catView = {

	init:function(){
		//store pointers for easy access
		this.catNameElem= $("#cat-name");
		this.catImageElem= $("#cat-image");
		this.catCountElem=$("#cat-count");
		//increment count
		this.catImageElem.click(function(e){
			controller.incrementCounter();
		});
			//render view
		this.render();
	},

	render: function(){
		var currentCat=controller.getCurrentCat();
		this.catNameElem.text(currentCat.name);
		this.catImageElem.attr("src",currentCat.imageSrc);
		this.catImageElem.attr("width",300+currentCat.clickCount*3);
		this.catCountElem.text(currentCat.clickCount);

	}
}

var catListView = {

    init: function() {
        this.catListElem = $('#cat-list');
        this.render();
        },

    render: function() {
        var cats = controller.getCats();
        this.catListElem.empty();

        for (var i = 0; i < cats.length; i++) {
            var cat = cats[i];
            var elem = $('<li class="bar-item button"></li>');
            elem.text(cat.name);
            elem.click((function(cat){
        		return function() {
                    controller.setCurrentCat(cat);
                    catView.render();
                }
            })(cat));
                this.catListElem.append(elem);
        }
    }
};

controller.init();