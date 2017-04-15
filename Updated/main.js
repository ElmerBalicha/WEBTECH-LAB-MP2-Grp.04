var myIndex = 0;
function add() {
	var div = document.createElement('div');
	div.setAttribute('id', 'div_'+myIndex);

	var add_btn =document.getElementById('add');


	div.innerHTML = 'Item: <input type="text"> Quantity: <input type="text"> Price: <input type="text"> Limit: <input type="text"> <button id="rmv_('+myIndex+')" onclick="remove('+myIndex+')"> - </button>';
	document.getElementById('div_-1').appendChild(div);

	document.getElementById('div_-1').insertBefore(div,add_btn);
	myIndex++;
}

function remove(index) {
	var a = document.getElementById('div_-1');
	var rmvDiv = document.getElementById('div_'+index);

	a.removeChild(rmvDiv);
}
function notNumber() {
	alert("Please enter a number!");
	throw new Error("Please enter a number!");
}
function emptyInput() {
	alert("Please fill up what is needed");
	throw new Error("Please fill up what is needed");	
}
function noMatch() {
	alert("No match! Please check your inventory");
	throw new Error("No match! Please check your inventory");	
}
function soldIsGreater() {
	alert("No more available stock!");
	throw new Error("No more available stock!");		
}

var itemsArray = [];

function save() {
	var item;
	var quantity;
	var price;
	var limit;

	var quantityParse;
	var limitParse;
	var priceParse;

		var myIndex = -1;
		var subDiv = document.getElementById('div_'+myIndex);
		if (localStorage.ItemsAdded !== undefined) {
			itemsArray = JSON.parse(localStorage.ItemsAdded);
		}

			for (count = 0; count <= subDiv.children.length; count++) {
				if (count == 0) {
					item = subDiv.children[0].value;
						if (item == "") {
							subDiv.children[0].select();
							emptyInput();
						} else {
							continue;
						}
				}
				if (count == 1) {
					quantity = subDiv.children[1].value;
					quantityParse = parseInt(quantity);
					if (quantity == "") {
						quantity = subDiv.children[1].select();
						emptyInput();
					}

						 if (isNaN(quantity)) {
							quantity = subDiv.children[1].select();
							notNumber();
						} else {
							continue;
						}
				}

				if (count == 2){
					price = subDiv.children[2].value;
					priceParse = parseInt(price);
					if (price == "") {
						price = subDiv.children[2].select();
						emptyInput();
					}
						else if (isNaN(price)) {
							price = subDiv.children[2].select();
							notNumber();
						} else {
							continue;
						}
				}
				if (count == 3) {
					limit = subDiv.children[3].value;
					limitParse = parseInt(limit);
				if (limit == "") {
					subDiv.children[3].select();
					emptyInput();
				}
						else if (isNaN(limit)) {
							limit = subDiv.children[3].select();
							notNumber();
						} else {
							continue;
						}
				}


				if (count == 4) {

				var itemObj = {
					'Item': item,
					'Quantity': quantity,
					'Price': price,
					'Limit': limit
				}

					itemsArray.push(itemObj);
				}

				if (count >= 5) {
					myIndex++;
					subDiv = document.getElementById('div_'+myIndex);
					count = -1;
					if (subDiv == null) {
						if(confirm("Are you sure you want to add this item(s) in your inventory?")) {
						localStorage.ItemsAdded = JSON.stringify(itemsArray);
						alert("Success! Item(s) are added in your inventory. Redirecting to your inventory...");
						window.location = "inventory.html";
						break;

					} else {
						alert("Item(s) was not added in your inventory");
						break;
					}
						init();
					}
					continue;
		} 
	}
	
}
function addRestock() {
	var div = document.createElement('div');
	div.setAttribute('id', 'res_'+myIndex);

	var add_btn =document.getElementById('addRestock');


	div.innerHTML = 'Item: <input type="text"> Quantity: <input type="text"> <button id="rmv_('+myIndex+')" onclick="removeRestock('+myIndex+')"> - </button>';
	document.getElementById('res_-1').appendChild(div);

	document.getElementById('res_-1').insertBefore(div,add_btn);
	myIndex++;
}

function removeRestock(index) {
	var a = document.getElementById('res_-1');
	var rmvDiv = document.getElementById('res_'+index);

	a.removeChild(rmvDiv);
}

function Restock() {
	var newQuantityParse;
	var match = false;
	if (localStorage.ItemsAdded !== undefined) {
		itemsArray = JSON.parse(localStorage.ItemsAdded);
	}

	var myIndex = -1;
	var restockItems = document.getElementById('res_'+myIndex);

	for (i = 0; i <= restockItems.children.length; i++ ) {
		if (i == 0) {
			item = restockItems.children[0].value;
				if (item == "") {
					item = restockItems.children[0].select();
					emptyInput();
				}

		}
		if (i == 1) {
			quantity = restockItems.children[1].value;
			quantityParse = parseInt(quantity);
				if (quantity == "") {
					quantity = restockItems.children[1].select();
					emptyInput();
				}
					if (isNaN(quantity)) {
						quantity = restockItems.children[1].select();
						notNumber();
					} 
						for (var c = 0; c < itemsArray.length; c++) {
							if (item == itemsArray[c].Item) {
								newQuantityParse = parseInt(itemsArray[c].Quantity);
								newQuantityParse += quantityParse;
								itemsArray[c].Quantity = newQuantityParse;
								match = true;
				} 
			}
							if (!match) {
								item = restockItems.children[0].select();
								noMatch();
							}	
							match = false;
		}

		if (i >= 2) {
			myIndex++;
			restockItems = document.getElementById('res_'+myIndex);
			i = -1;
			if (restockItems == null) {
				if(confirm("Are you sure to add your new stocks?")) {
						localStorage.ItemsAdded = JSON.stringify(itemsArray);
						alert("Success! Item(s) has been restocked. Redirecting to your inventory...");
						window.location = "inventory.html";
						break;
				} else {
						alert("Your new stocks was not added")
						break;
				} 

			}
			continue;
	} 

	}
}
