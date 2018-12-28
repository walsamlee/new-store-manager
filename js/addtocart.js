const searchParts = window.location.search.split('=');
const searchId = parseInt(searchParts[1], 10);
const url = `https://crud-store-manager.herokuapp.com/api/v1/products/${searchId}`;

const toCartToken = sessionStorage.getItem("token");
const toCartEmail = sessionStorage.getItem('email');

const addToCart = (form) => {
    const amount = parseInt(form.amount.value);
    const available = form.quantity.value;

    if((amount > available) || (available <= form.minimum.value) ) {
        alert('Not enough product in stock');
    } else {
        fetch(`https://crud-store-manager.herokuapp.com/api/v1/sales/cart/${toCartEmail}`, {
            method: 'GET',
            headers: {
                token: toCartToken
            }
        })
            .then(res1 => res1.json())
            .then(response1 => {
                let inCart = false;
                let productInCart = {};

                for(let k in response1) {
                    if(response1[k].product === form.name.value) {
                        inCart = true;
                        productInCart = response1[k];
                    }
                }

                if(inCart) {
                    let cost = (parseFloat(form.price.value) * amount) + productInCart.cost;
                    const payload = {
                        email: sessionStorage.getItem('email'),
                        product: form.name.value,
                        cost: cost
                    };
    
                    const url3 = `https://crud-store-manager.herokuapp.com/api/v1/sales/add-to-cart`;
    
                    fetch(url3, {
                        method: 'PUT',
                        body: JSON.stringify(payload),
                        headers: {
                            'Content-Type': 'application/json',
                            token: toCartToken
                        }
                    })
                        .then(res3 => res3.json())
                        .then(() => {
                            const productQuantity = form.quantity.value - amount;
                            const productId = form.id.value;
                            
                            const updatePayload = {
                                quantity: productQuantity
                            };
            
                            fetch(`https://crud-store-manager.herokuapp.com/api/v1/products/sales/${productId}`, {
                                method: 'PUT',
                                body: JSON.stringify(updatePayload),
                                headers: {
                                    'Content-Type': 'application/json',
                                    token: toCartToken
                                }
                            })
                                .then(res => res.json())
                                .then(response6 => {
                                    console.log('Response here' + response6);
                                })
                                .catch(err => console.log(err));
            
                            alert(`${form.amount.value} pieces of ${productInCart.product} has been added to cart successfully`);
                            window.location = document.location.href.replace(/[^/]*$/, '') + 'addtocart.html?=' + searchId;
                        })
                        .catch(error => console.error('Error:', error));
    
                } else {
                    let cost = parseFloat(form.price.value) * amount;
                    const payload = {
                        seller_email: sessionStorage.getItem('email'),
                        product: form.name.value,
                        cost: cost,
                    };
    
                    const url4 = 'https://crud-store-manager.herokuapp.com/api/v1/sales/add-to-cart';
    
                    fetch(url4, {
                        method: 'POST',
                        body: JSON.stringify(payload),
                        headers: {
                            'Content-Type': 'application/json',
                            token: toCartToken
                        }
                    })
                        .then(res4 => res4.json())
                        .then(response4 => {
                            const productQuantity = form.quantity.value - amount;
                            const productId = form.id.value;
                            
                            const updatePayload = {
                                quantity: productQuantity
                            };

                            fetch(`https://crud-store-manager.herokuapp.com/api/v1/products/sales/${productId}`, {
                                method: 'PUT',
                                body: JSON.stringify(updatePayload),
                                headers: {
                                    'Content-Type': 'application/json',
                                    token: toCartToken
                                }
                            })
                                .then(res => res.json())
                                .then(response5 => {
                                    console.log('Response here' + response5);
                                })
                                .catch(err => console.log(err));
            
                            alert(`${form.amount.value} pieces of ${response4.product} has been added to cart successfully`);
                            window.location = document.location.href.replace(/[^/]*$/, '') + 'addtocart.html?=' + searchId;
                        })
                        .catch(error => console.error('Error:', error));
                    
                }

            })
            .catch(err => console.log(err));
        
    }
    
    // fetch(`http://localhost:3000/api/v1/sales/cart/${toCartEmail}`, {
    //     method: 'DELETE',
    //     headers: {
    //         token: toCartToken
    //     }
    // })
    //     .then(res => res.json())
    //     .then(response => {
    //         alert('Deleted')
    //     })
    //     .catch(err =>  console.log(err))
    
};

const cartCancel = () => {
    window.location = document.location.href.replace(/[^/]*$/, '') + 'index.html';
};

fetch(`https://crud-store-manager.herokuapp.com/api/v1/products/${searchId}`)
    .then(res => res.json())
    .then(response => {
        if (response.error) {
            alert(`Product with ID ${searchId} not found`);
        } else {
            document.getElementById("id").value = response.id;
            document.getElementById("name").value = response.name;
            document.getElementById("description").value = response.description;
            document.getElementById("category").value = response.category;
            document.getElementById("quantity").value = response.quantity;
            document.getElementById("price").value = response.price;
            document.getElementById("minimum").value = response.minimum;
        }
    })
    .catch(error => console.error('Error:', error));