const cartToken = sessionStorage.getItem('token');
const cartEmail = sessionStorage.getItem('email');
const cartUrl = `http://localhost:3000/api/v1/sales/cart/${cartEmail}`;

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = () => {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

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
            
            responseCart.forEach(cartItem => {
                const productNameText = document.createTextNode(cartItem.product);
                const productName = document.createElement('p');
                
                productName.appendChild(productNameText);
                
                const inCart = document.getElementById("in-cart");
                
                inCart.appendChild(productName);
            })
        } else {
            const cartItemText = document.createTextNode('0');
            document.getElementById("cart-items").appendChild(cartItemText);
        }
    })
    .catch(err => console.log(err));

