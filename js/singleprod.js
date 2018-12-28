const searchParts = window.location.search.split('=');
const searchId = parseInt(searchParts[1], 10);
const url = `https://crud-store-manager.herokuapp.com/api/v1/products/${searchId}`;
const viewWho = sessionStorage.getItem('id');

fetch(url)
.then(res => res.json())
.then(response => {
    if (response.error) {
        alert(`Product with ID ${searchId} not found`);
    } else {
        console.log(response.image);
        if(response.image) document.getElementById('product-image').src = 'https://crud-store-manager.herokuapp.com/' + response.image;
            else document.getElementById('product-image').src = 'images/default.png';
        
        document.getElementById('name-par').append(response.name);
        document.getElementById('price-par').append(`N ${response.price}`);
        document.getElementById('description-par').append(`Description: ${response.description}`);
        document.getElementById('category-par').append(`Category: ${response.category}`);
        document.getElementById('quantity-par').append(`Available in store: ${response.quantity}`);
        document.getElementById('minimum-par').append(`Minimum allowed in store: ${response.minimum}`);
        
        if(parseInt(viewWho, 10) === 1) {
            const adminEditLink = document.createElement('a');
            const adminEditLinkText = document.createTextNode('Edit');
            
            adminEditLink.className = 'btn btn-cart';
            adminEditLink.href = document.location.href.replace(/[^/]*$/, '') + 'edititem.html?=' + response.id;
            
            adminEditLink.appendChild(adminEditLinkText);
            
            document.getElementById('admin-single-addto').appendChild(adminEditLink);
            
            document.getElementById('admin-single-addto').style.display = 'inline';
            document.getElementById('single-addto').style.display = 'none';
        }
        else {
            const addToCart = document.createElement('a');
            const addToCartText = document.createTextNode('Add to Cart');
    
            addToCart.className = 'btn btn-cart';
            addToCart.href = document.location.href.replace(/[^/]*$/, '') + 'addtocart.html?=' + response.id;
    
            addToCart.appendChild(addToCartText);
    
            document.getElementById('single-addto').appendChild(addToCart);
            document.getElementById('single-addto').style.display = 'inline';
            document.getElementById('admin-single-addto').style.display = 'none';
        }
    }
})
.catch(error => console.error('Error:', error));