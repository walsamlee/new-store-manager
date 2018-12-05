const searchParts = window.location.search.split('=');
let searchCategory = searchParts[1];// searchCategory = searchCategory.replace('%20', ' ');

const categoryH = searchCategory.replace('%20', ' ');

const url = `http://localhost:3000/api/v1/products/category/${searchCategory}`;

fetch(url)
    .then(res => res.json())
    .then(response => {
        
        const categoryTitle = document.getElementById('category-title');
        const categoryTitleH1 = document.createElement('h2');
        const categoryTitleH1Text = document.createTextNode(`Products by Category: ${categoryH}`);
        categoryTitleH1.appendChild(categoryTitleH1Text);
        categoryTitle.appendChild(categoryTitleH1);
        
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