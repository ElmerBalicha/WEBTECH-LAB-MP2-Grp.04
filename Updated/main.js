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
