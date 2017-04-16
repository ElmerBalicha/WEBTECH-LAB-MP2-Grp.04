var myIndex = 0;
var dateToday;
var dateTime;
function add() {
	var div = document.createElement('div');
	div.setAttribute('id', 'div_'+myIndex);

	var add_btn =document.getElementById('add');


	div.innerHTML = '<input type="text" placeholder="&nbsp;&#xf290;&nbsp; Enter Item Name"><input type="text" placeholder="&nbsp;&#xf292;&nbsp; Enter Item Quantity"><input type="text" placeholder="&nbsp;&#xf0d6;&nbsp; Enter Item Price"><input type="text" placeholder="&nbsp;&#xf00d;&nbsp; Enter Minimun Quantity"><button style="float:none;"id="rmv_('+myIndex+')" onclick="remove('+myIndex+')"> Remove </button><br><br><div class="inputs"><hr></div>';
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
function existingItem() {
	alert("This item exists!");
	throw new Error("The item you want to add exists")
}

function init() {
	if (localStorage.ItemsAdded) {
		itemsArray = JSON.parse(localStorage.ItemsAdded);
		document.getElementById("tableBody").innerHTML = "";
		for(var i = 0; i < itemsArray.length; i++) {
			tableInv(itemsArray[i].Item, itemsArray[i].Quantity, itemsArray[i].Price, itemsArray[i].Limit, itemsArray[i].DateAdded);

		}

	}
}
function Remittance() {
dateToday = new Date(); 
var hour =  dateToday.getHours();  
var min =  dateToday.getMinutes();
var rem = document.getElementById('remitNa');
var s = 0;
	if (hour == 17) {
	 		remitArray = JSON.parse(localStorage.remitToAccounting);
			for (var c = 0; c < remitArray.length; c++) {
				var a = parseInt(remitArray[c].pricesold);
				s += a;
				rem.innerHTML = "Please remit to accounting office: PHP "+s;
			}
	}
}
function low() {
	var count = 0;
		 if (localStorage.ItemsAdded) {
	 			itemsArray = JSON.parse(localStorage.ItemsAdded);
					for (var i = 0; i < itemsArray.length; i++) {
						var theLimitParsed = parseInt(itemsArray[i].Limit);
						var theQuantityOrig =  parseInt(itemsArray[i].Quantity);
						if (theLimitParsed >= theQuantityOrig) {
							document.getElementById("noResult").innerHTML = "Items with critical quantities";
								document.getElementById("itemQ").innerHTML = "Items";
								document.getElementById("quantityQ").innerHTML = "Quantity";
								document.getElementById("priceQ").innerHTML = "Minimum Quantity";
								count++;
							limitTable(itemsArray[i].Item, theQuantityOrig, itemsArray[i].Limit);
					} else if (count == 0){
								document.getElementById("noResult").innerHTML = "There are no items with critical quantity at the moment";

			}
		}
	}
}
function limitTable(item, quantity, price) {
	var table = document.getElementById('lowTable');
	var row = table.insertRow();
	var itemLimCell = row.insertCell(0);
	var quantityLimCell = row.insertCell(1);
	var priceLimCell = row.insertCell(2);


	itemLimCell.innerHTML = item;
	quantityLimCell.innerHTML = quantity;
	priceLimCell.innerHTML = price;
}


var sum = 0;
function breakdown() {
dateToday = new Date(); 
dateTime = 	dateToday.getDate() + "/"
                + (dateToday.getMonth()+1)  + "/" 
                + dateToday.getFullYear() + " @ "  
                + dateToday.getHours() + ":"  
                + dateToday.getMinutes() + ":" 
                + dateToday.getSeconds();
          if (dateToday.getHours() >= 17 && dateToday.getHours() <= 23) {
			document.getElementById("remitThisOne").innerHTML = "No transactions at the moment";
			document.getElementById("itemR").innerHTML = "";
			document.getElementById("quantityR").innerHTML = "";
			document.getElementById("priceO").innerHTML = "";
			document.getElementById("priceR").innerHTML = "";
			document.getElementById("dateSold").innerHTML = "";


          } else {

		 if (localStorage.remitToAccounting) {
	 		remitArray = JSON.parse(localStorage.remitToAccounting);
			for (var c = 0; c < remitArray.length; c++) {
				var a = parseInt(remitArray[c].pricesold);
				sum += a;
				document.getElementById("remitThisOne").innerHTML = "Total sales as of "+dateTime+": <br>PHP " +sum;

				remitTable(remitArray[c].itemsold, remitArray[c].soldquantity, remitArray[c].origPrice, remitArray[c].pricesold, remitArray[c].DateSold);
			}
		} else {
			document.getElementById("remitThisOne").innerHTML = "No transactions at the moment";
			document.getElementById("itemR").innerHTML = "";
			document.getElementById("quantityR").innerHTML = "";
			document.getElementById("priceR").innerHTML = "";
			document.getElementById("priceO").innerHTML = "";
			document.getElementById("dateSold").innerHTML = "";

			}
		}

}
function initReport() {
var total = 0;
dateToday = new Date(); 
dateTime = 	dateToday.getDate() + "/"
                + (dateToday.getMonth()+1)  + "/" 
                + dateToday.getFullYear() + " @ "  
                + dateToday.getHours() + ":"  
                + dateToday.getMinutes() + ":" 
                + dateToday.getSeconds();

	if (dateToday.getHours() >= 17 && dateToday.getHours() <= 23) {
		 if (localStorage.remitToAccounting) {
	 		remitArray = JSON.parse(localStorage.remitToAccounting);
			for (var counter = 0; counter < remitArray.length; counter++) {
				var a = parseInt(remitArray[counter].pricesold);
				total += a;
				document.getElementById("reportSales").innerHTML = "Total sales for the day: PHP " +total;

				reportTable(remitArray[counter].itemsold, remitArray[counter].soldquantity, remitArray[counter].origPrice, remitArray[counter].pricesold, remitArray[counter].DateSold);
			}
		}
	} else {
		document.getElementById("reportSales").innerHTML = "Transaction report will be generated at 5:00pm";
		document.getElementById("itemReport").innerHTML = "";
		document.getElementById("quantityReport").innerHTML = "";
		document.getElementById("priceReport").innerHTML = "";
		document.getElementById("priceOrigReport").innerHTML = "";
		document.getElementById("dateReport").innerHTML = "";

	} 
		if (dateToday.getHours() == 0) {
	        localStorage.removeItem("remitToAccounting");
	}
}

window.onload = function() {
	init();
}
var itemsArray = [];

function save() {
dateToday = new Date(); 
dateTime = 	dateToday.getDate() + "/"
                + (dateToday.getMonth()+1)  + "/" 
                + dateToday.getFullYear() + " @ "  
                + dateToday.getHours() + ":"  
                + dateToday.getMinutes() + ":" 
                + dateToday.getSeconds();

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
						for (x = 0; x < itemsArray.length; x++) {
							var itemsInLS = itemsArray[x].Item;
							if (item == itemsInLS) {
								subDiv.children[0].select();
								existingItem();
							} 
						}

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
					'Limit': limit,
					'DateAdded': dateTime
				}

					itemsArray.push(itemObj);
				}

				if (count >= 4) {
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
						window.location = "addItems.html";
						break;
					}
						init();
					}
					continue;
				}
	}
	
}


function tableInv(item, quantity, price, limit, dateTime) {

	var table = document.getElementById('tableBody');
	var row = table.insertRow();
	var itemNameCell = row.insertCell(0);
	var quantityCell = row.insertCell(1);
	var priceCell = row.insertCell(2);
	var limitCell = row.insertCell(3);
	var dateCell = row.insertCell(4);
	var optionCell = row.insertCell(5);
	var table_len = (table.rows.length)-1;
	row.setAttribute("id", "row"+table_len);


	itemNameCell.innerHTML = item;
	quantityCell.innerHTML = quantity;
	priceCell.innerHTML = price;
	limitCell.innerHTML = limit;
	dateCell.innerHTML = dateTime;

	optionCell.innerHTML = '<input type = "button" value = "Delete" onclick = "delete_row('+table_len+')">';
	
	
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

function delete_row(no) {
	
	document.getElementById("row"+no).outerHTML = "";
	itemsArray = JSON.parse(localStorage.ItemsAdded);
	itemsArray.splice(no,1);
	if (confirm("Are you sure you want to delete this item?")) {
		localStorage.ItemsAdded = JSON.stringify(itemsArray);
		alert("Item deleted");
	} else {
		alert("Item is not deleted");
	}
	init();
	
	
}

function addRestock() {
	var div = document.createElement('div');
	div.setAttribute('id', 'res_'+myIndex);

	var add_btn =document.getElementById('addRestock');


	div.innerHTML = '<input type="text" placeholder="&nbsp;&#xf290;&nbsp; Enter Item Name"><input type="text" placeholder="&nbsp;&#xf292;&nbsp; Enter Item Quantity"><button style="float:none;"id="rmv_('+myIndex+')" onclick="removeRestock('+myIndex+')"> Remove </button><br><br><div class="inputs"><hr></div>';
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
function addSales() {
	var div = document.createElement('div');
	div.setAttribute('id', 'sales_'+myIndex);

	var add_btn =document.getElementById('addSales');


	div.innerHTML = '<input type="text" placeholder="&nbsp;&#xf290;&nbsp; Enter Item Name"><input type="text" placeholder="&nbsp;&#xf292;&nbsp; Enter Item Quantity"><button style="float:none;"id="rmv_('+myIndex+')" onclick="removeSales('+myIndex+')"> Remove </button><br><br><div class="inputs"><hr></div>';
	document.getElementById('sales_-1').appendChild(div);

	document.getElementById('sales_-1').insertBefore(div,add_btn);
	myIndex++;
}

function removeSales(index) {
	var a = document.getElementById('sales_-1');
	var rmvDiv = document.getElementById('sales_'+index);

	a.removeChild(rmvDiv);
}

function onSales() {
	dateToday = new Date(); 
	dateTime = 	dateToday.getDate() + "/"
	                + (dateToday.getMonth()+1)  + "/" 
	                + dateToday.getFullYear() + " @ "  
	                + dateToday.getHours() + ":"  
	                + dateToday.getMinutes() + ":" 
	                + dateToday.getSeconds();

	var origQuantityParse;
	var itemLimitParse;
	var origPriceParse;
	var priceSoldParse;
	var arr = [];
	var remitArray = [];
	var match = false;
	var iden = false;
	if (localStorage.ItemsAdded !== undefined) {
		itemsArray = JSON.parse(localStorage.ItemsAdded);
	}

	var myIndex = -1;
	var sellItems = document.getElementById('sales_'+myIndex);

	for (i = 0; i <= sellItems.children.length; i++ ) {
		if (i == 0) {
			item = sellItems.children[0].value;
				if (item == "") {
					item = sellItems.children[0].select();
					emptyInput();
				}

		}
		if (i == 1) {
			quantity = sellItems.children[1].value;
			quantityParse = parseInt(quantity);
				if (quantity == "") {
					quantity = sellItems.children[1].select();
					emptyInput();
				}
					if (isNaN(quantity)) {
						quantity = sellItems.children[1].select();
						notNumber();
					} 
						for (var c = 0; c < itemsArray.length; c++) {
							if (item == itemsArray[c].Item) {
								origQuantityParse = parseInt(itemsArray[c].Quantity);
								itemLimitParse = parseInt(itemsArray[c].Limit);
								if (origQuantityParse < quantityParse) {
									item = sellItems.children[0].select();
									soldIsGreater();
								}
								origQuantityParse -= quantityParse;
								itemsArray[c].Quantity = origQuantityParse;
								match = true;
				} 
			}
							if (!match) {
								item = sellItems.children[0].select();
								noMatch();
							}	
							match = false;

							for (var c = 0; c < itemsArray.length; c++) {
								if (item == itemsArray[c].Item) {
									origPriceParse = parseInt(itemsArray[c].Price);
									priceSoldParse = parseInt(itemsArray[c].Price);
									quantityParse = parseInt(quantity);
									priceSoldParse *= quantityParse;
									iden = true;
									arr[c] = priceSoldParse;
									if(localStorage.remitToAccounting !== undefined) {
										remitArray = JSON.parse(localStorage.remitToAccounting);
									}
								}
								if (iden == true) {
									var remitObj = {'itemsold': item, 'soldquantity': quantity, 'origPrice': origPriceParse, 'pricesold': priceSoldParse, 'DateSold': dateTime};

									remitArray.push(remitObj);
									localStorage.remitToAccounting = JSON.stringify(remitArray);
									iden = false;

			}
		}
	}

		if (i >= 2) {
			myIndex++;
			sellItems = document.getElementById('sales_'+myIndex);
			i = -1;
			if (sellItems == null) {
				localStorage.ItemsAdded = JSON.stringify(itemsArray);

				if (origQuantityParse <= itemLimitParse) {
						alert("Success! Item(s) has been sold. There are item(s) in critical quantity...");
						window.location = "lowQuantity.html"
						break;
					} else {
							alert("Success! Item(s) has been sold. Redirecting to your sales...");
							window.location = "salesBreakdown.html";
							break;
				}
			}
			continue;
	} 

	}
}
function remitTable(itemsold, quantitySold, origPriceParse, priceSoldParse, dateTime) {

	var table = document.getElementById('remitTable');
	var row = table.insertRow();
	var itemsoldCell = row.insertCell(0);
	var quantitySoldCell = row.insertCell(1);
	var priceOrigSoldCell = row.insertCell(2);
	var priceSoldCell = row.insertCell(3);
	var dateSoldCell = row.insertCell(4);


	itemsoldCell.innerHTML = itemsold;
	quantitySoldCell.innerHTML = quantitySold;
	priceOrigSoldCell.innerHTML = origPriceParse;
	priceSoldCell.innerHTML = priceSoldParse;
	dateSoldCell.innerHTML = dateTime;

}
function addPrice() {
	var div = document.createElement('div');
	div.setAttribute('id', 'pri_'+myIndex);

	var add_btn =document.getElementById('addPrice');


	div.innerHTML = '<input type="text" placeholder="&nbsp;&#xf290;&nbsp; Enter Item Name"><input type="text" placeholder="&nbsp;&#xf292;&nbsp; Enter Item Price"><button style="float:none;"id="rmv_('+myIndex+')" onclick="removePrice('+myIndex+')"> Remove </button><br><br><div class="inputs"><hr></div>';
	document.getElementById('pri_-1').appendChild(div);

	document.getElementById('pri_-1').insertBefore(div,add_btn);
	myIndex++;
}

function removePrice(index) {
	var a = document.getElementById('pri_-1');
	var rmvDiv = document.getElementById('pri_'+index);

	a.removeChild(rmvDiv);
}

function updatePrice() {
	var newPriceParse;
	var match = false;
	if (localStorage.ItemsAdded !== undefined) {
		itemsArray = JSON.parse(localStorage.ItemsAdded);
	}

	var myIndex = -1;
	var restockItems = document.getElementById('pri_'+myIndex);

	for (i = 0; i <= restockItems.children.length; i++ ) {
		if (i == 0) {
			item = restockItems.children[0].value;
				if (item == "") {
					item = restockItems.children[0].select();
					emptyInput();
				}

		}
		if (i == 1) {
			price = restockItems.children[1].value;
			priceParse = parseInt(price);
				if (price == "") {
					price = restockItems.children[1].select();
					emptyInput();
				}
					if (isNaN(price)) {
						price = restockItems.children[1].select();
						notNumber();
					} 
						for (var c = 0; c < itemsArray.length; c++) {
							if (item == itemsArray[c].Item) {
								newPriceParse = parseInt(itemsArray[c].Price);
								newPriceParse = priceParse;
								itemsArray[c].Price = newPriceParse;
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
			restockItems = document.getElementById('pri_'+myIndex);
			i = -1;
			if (restockItems == null) {
				if (confirm("Are you sure you want to update the item(s) price?")) {
						localStorage.ItemsAdded = JSON.stringify(itemsArray);
						alert("Success! Item(s) price has been updated. Redirecting to your inventory...");
						window.location = "inventory.html";
						break;
				} else {
					alert("Item(s) price was not updated");
					break;
				}
			}
			continue;
	} 

	}
}
function pullInventory() {
	var xhr = new XMLHttpRequest();	
	try {
		xhr.open("GET", "inventory.txt", false);
		xhr.send(null);
		if (xhr.status == 200) {
			var inventory = JSON.parse(xhr.responseText);
			localStorage.ItemsAdded = JSON.stringify(inventory);
			alert("Success! Redirecting to your inventory...");
			window.location = "inventory.html";
		} else {
			alert("Error encountered while pulling your inventory");
		}
	} catch (error) {
			alert("Error encountered while pulling your inventory");
		return;
	}
}
function pushInventory() {
	if (localStorage.ItemsAdded == undefined) {
		alert("Your inventory is empty! Nothing to push");
	} else {
		var xmlhttp = new XMLHttpRequest();   
        xmlhttp.open("POST", "book_store_items.json", false);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(localStorage.getItem("ItemsAdded"));
	}
}
function reportTable(itemsold, quantitySold, origPriceParse, priceSoldParse, dateTime) {
	var table = document.getElementById('reportTable');
	var row = table.insertRow();
	var itemsoldReportCell = row.insertCell(0);
	var quantitySoldReportCell = row.insertCell(1);
	var priceOrigSoldReportCell = row.insertCell(2);
	var priceSoldReportCell = row.insertCell(3);
	var dateSoldReportCell = row.insertCell(4);


	itemsoldReportCell.innerHTML = itemsold;
	quantitySoldReportCell.innerHTML = quantitySold;
	priceOrigSoldReportCell.innerHTML = origPriceParse;
	priceSoldReportCell.innerHTML = priceSoldParse;
	dateSoldReportCell.innerHTML = dateTime;

}
function searchSales() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("remitTable");
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

function searchLow() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("lowTable");
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
