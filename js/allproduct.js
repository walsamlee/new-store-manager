fetch('http://localhost:3000/api/v1/products')
    .then(res => res.json())
    .then(response => {
        response.forEach(data => {
            const naira = `N ${data.price}`;
            const available = `Available in stock: ${data.quantity}`;
            const who = sessionStorage.getItem('id');
            
            const display = document.getElementById('display');
            const columnNode = document.createElement('div');
            const imageNode = document.createElement('div');
            const nameNode = document.createElement('div');
            const priceNode = document.createElement('div');
            const stockNode = document.createElement('div');
            const addToCart = document.createElement('a');
            
            columnNode.className = 'col-3';
            imageNode.className = 'image';
            nameNode.className = 'name';
            priceNode.className = 'price';
            stockNode.className = 'price';
            addToCart.className = 'btn btn-cart';
            
            const image = document.createElement('img');
            const name = document.createElement('p');
            const price = document.createElement('p');
            const stock = document.createElement('p');
            
            const nameText = document.createTextNode(data.name);
            const priceText = document.createTextNode(naira);
            stockText = document.createTextNode(available);
            if(parseInt(who, 10) === 1) {
                const linkText = document.createTextNode('Edit');
                addToCart.appendChild(linkText);
                addToCart.href = document.location.href.replace(/[^/]*$/, '') + 'edititem.html?=' + data.id;
            } else {
                const linkText = document.createTextNode('Add to Cart');
                addToCart.appendChild(linkText);
                addToCart.href = document.location.href.replace(/[^/]*$/, '') + 'singleprod.html?=' + data.id;
            }
            
            if (data.image) image.src = 'http://localhost:3000/' + data.image;
            else image.src = 'images/default.png';
            
            name.appendChild(nameText);
            price.appendChild(priceText);
            stock.appendChild(stockText);
            
            imageNode.appendChild(image);
            nameNode.appendChild(name);
            priceNode.appendChild(price);
            stockNode.appendChild(stock);
            
            columnNode.appendChild(imageNode);
            columnNode.appendChild(nameNode);
            columnNode.appendChild(priceNode);
            columnNode.appendChild(stockNode);
            columnNode.appendChild(addToCart);
            
            display.appendChild(columnNode);
        });
    })
    .catch(err => console.log(err));