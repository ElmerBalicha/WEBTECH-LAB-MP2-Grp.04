	var savedItems = [];
	var itemName, quantity, price;
function init() {
	if (localStorage.itemsAddedToInventory) {
		savedItems = JSON.parse(localStorage.itemsAddedToInventory);
		for(var i = 0; i < savedItems.length; i++) {
			tableInv(i, savedItems[i].ItemName, savedItems[i].Quantity, savedItems[i].Price);
		}
	}
}
window.onload = function() {
	init();
}
function saveAddedItems() {

	itemName = document.getElementById("itemName").value;
	quantity = document.getElementById("quantity").value;
	price = document.getElementById("price").value;

	if(isNaN(quantity) || isNaN(price)) {
		alert('Please enter a number!');
	} else if (itemName == "" || quantity == "" || price == "") {
		alert("Please fill up what is needed");
	} else {
	var quantityParsed = parseInt(quantity);
	var priceParsed = parseInt(price);

	var itemsObj = {'ItemName':itemName, 'Quantity':quantityParsed, 'Price':priceParsed};

	savedItems.push(itemsObj);
	localStorage.itemsAddedToInventory = JSON.stringify(savedItems);

	 document.getElementById("itemName").value = "";
	 document.getElementById("quantity").value = "";
	 document.getElementById("price").value = "";
	 alert('Success! Item is added in your inventory');

	init();

	}
}

function tableInv(index, itemName, quantityParsed, price) {

	var table = document.getElementById('tableBody');
	var row = table.insertRow();
	var itemNameCell = row.insertCell(0);
	var quantityCell = row.insertCell(1);
	var priceCell = row.insertCell(2);
	var optionCell = row.insertCell(3);


	itemNameCell.innerHTML = itemName;
	quantityCell.innerHTML = quantityParsed;
	priceCell.innerHTML = price;
	optionCell.innerHTML = '<button>Delete</button>';
}

function onUpdateQuantity(){
	var match = false;
	var searchItem = document.getElementById('searchItemName').value.toUpperCase();
	var newItemQuantity = document.getElementById('newQuantity').value;
	if (isNaN(newItemQuantity)) {
		alert('Please Enter a Number in Quantity');
		document.getElementById("searchItemName").value = "";
		document.getElementById("newQuantity").value = "";

	} else if (newItemQuantity == "" || searchItem == ""){
		alert("Please fill up what is needed");
		document.getElementById("searchItemName").value = "";
		document.getElementById("newQuantity").value = "";

	} else {
		var newItemParse = parseInt(newItemQuantity);
		if (localStorage.itemsAddedToInventory) {
			savedItems = JSON.parse(localStorage.itemsAddedToInventory);
			for(var i = 0; i < savedItems.length; i++) {
				if(searchItem == savedItems[i].ItemName.toUpperCase()) {
					var oldQuantityParse = parseInt(savedItems[i].Quantity);
					oldQuantityParse += newItemParse;
					savedItems[i].Quantity = oldQuantityParse;
					alert("Item's quantity has been updated");
					match = true;
			 document.getElementById("searchItemName").value = "";
			 document.getElementById("newQuantity").value = "";



				}
			} if (!match) {
			 document.getElementById("searchItemName").value = "";
			 document.getElementById("newQuantity").value = "";

				alert('No match');
			}
			localStorage.itemsAddedToInventory = JSON.stringify(savedItems);
		}
	}	

}

function searchInv() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("invTable");
  tr = table.getElementsByTagName("tr");

 
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}


function onUpdatePrice(){
	var match = false;
	var searchItem = document.getElementById('searchItemName').value.toUpperCase();
	var newItemPrice = document.getElementById('newPrice').value;
	if (isNaN(newItemPrice)) {
		alert('Please Enter a Number in Price');
		document.getElementById("searchItemName").value = "";
		document.getElementById("newPrice").value = "";

	} else if (newItemPrice == "" || searchItem == ""){
		alert("Please fill up what is needed");
		document.getElementById("searchItemName").value = "";
		document.getElementById("newPrice").value = "";

	} else {
		var newItemParse = parseInt(newItemPrice);
		if (localStorage.itemsAddedToInventory) {
			savedItems = JSON.parse(localStorage.itemsAddedToInventory);
			for(var i = 0; i < savedItems.length; i++) {
				if(searchItem == savedItems[i].ItemName.toUpperCase()) {
					var oldPriceParse = parseInt(savedItems[i].Price);
					oldPriceParse = newItemParse;
					savedItems[i].Price = oldPriceParse;
					alert("Item's price has been updated");
					match = true;
			 document.getElementById("searchItemName").value = "";
			 document.getElementById("newPrice").value = "";



				}
			} if (!match) {
			 document.getElementById("searchItemName").value = "";
			 document.getElementById("newPrice").value = "";

				alert('No match');
			}
			localStorage.itemsAddedToInventory = JSON.stringify(savedItems);
		}
	}	

}

function onUpdateOnSales() {
	var match = false;
	var itemsold = document.getElementById('soldItem').value.toUpperCase();
	var soldQuantity = document.getElementById('soldQuantity').value;
	if (isNaN(soldQuantity)) {
		alert('Please Enter a Number in Quantity');
		document.getElementById("soldQuantity").value = "";

	} else if (soldQuantity == "" || itemsold == ""){
		alert("Please fill up what is needed");
	} else {
		var newQuantityParse = parseInt(soldQuantity);
		if (localStorage.itemsAddedToInventory) {
			savedItems = JSON.parse(localStorage.itemsAddedToInventory);
			for(var i = 0; i < savedItems.length; i++) {
				if(itemsold == savedItems[i].ItemName.toUpperCase()) {
					var origQuantityParse = parseInt(savedItems[i].Quantity);
					origQuantityParse -= newQuantityParse;
					savedItems[i].Quantity = origQuantityParse;
					alert("Item's quantity has been updated");
					match = true;
			 document.getElementById("soldItem").value = "";
			 document.getElementById("soldQuantity").value = "";



				}
			} if (!match) {
			 document.getElementById("soldQuantity").value = "";

				alert('No match');
			}
			localStorage.itemsAddedToInventory = JSON.stringify(savedItems);
		}
	}	

}