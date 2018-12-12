const cartToken = sessionStorage.getItem('token');
const cartEmail = sessionStorage.getItem('email');
const cartUrl = `http://localhost:3000/api/v1/sales/cart/${cartEmail}`;

fetch(cartUrl, {
    method: 'GET',
    headers: {
        token: cartToken
    }
})
    .then(res => res.json())
    .then(responseCart => {
        if(responseCart.length > 0) {
            const cartItemText = document.createTextNode(responseCart.length);
            document.getElementById("cart-items").appendChild(cartItemText);
        } else {
            const cartItemText = document.createTextNode('0');
            document.getElementById("cart-items").appendChild(cartItemText);
        }
    })
    .catch(err => console.log(err));