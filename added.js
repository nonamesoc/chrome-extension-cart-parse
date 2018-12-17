var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            document.body.className = 'ok';
            parser = new DOMParser();
			doc = parser.parseFromString(request.responseText, "text/html");
			doc = doc.querySelectorAll('div.sc-list-body span.a-list-item .a-link-normal');
			var items =[];
			for (var i = 0; i < doc.length; ++i) {
  				var item = doc[i].innerText;
  				item = item.replace(/ /gi, "");
				item = item.replace(/\n/gi, "");
  				items.push(item);
			}
			console.log(doc);
			chrome.storage.sync.set({'items': items});
        } else {
            document.body.className = 'error';
        }
    }
};

request.open("GET", 'https://www.amazon.com/gp/cart/view.html?ref=nav_cart' , true);
request.send(null);

chrome.storage.sync.get(['items'], function(result) {
	var items = result.items;
	doc = document.querySelectorAll('.a-link-normal.s-access-detail-page.s-color-twister-title-link.a-text-normal');
	for (var i = 0; i < doc.length; ++i) {
	  	var item = doc[i].innerText;
	  	item = item.replace(/ /gi, "");
		item = item.replace(/\n/gi, "");
		item = item.replace(/Sponsored/gi, "");
		item = item.replace(/\[|\]/g, "");
	  	for (var j = 0; j < items.length; ++j) {
	  		if(item == items[j]){
	  			var div = document.createElement("div");
    			div.innerText = "УЖЕ ДОБАВЛЕН В КОРЗИНУ";
    			id = "result_" + i;
    			div.style = "color: red";
    			document.querySelector("#"+id+" div").appendChild(div);

	  		}
	  	}
	}
});