const searchParts = window.location.search.split('=');
const searchId = parseInt(searchParts[1], 10);
const url = `http://localhost:3000/api/v1/products/${searchId}`;

const
    editToken = sessionStorage.getItem("token");

const editproduct = (form) => {
    const
        productId = parseInt(form.id.value, 10),
        quantity = parseInt(form.quantity.value, 10),
        price = parseFloat(form.price.value);
    const payload = {
        image: form.image.value,
        name: form.name.value,
        description: form.description.value,
        category: form.category.value,
        quantity: quantity,
        price: price,
        date: form.date.value,
        minimum: form.minimum.value,
    };
    
    const url = 'http://localhost:3000/api/v1/products/' + productId;
    
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            token: editToken
        }
    })
        .then(res => res.json())
        .then(response => {
            const
                resName = response.name,
                resId = response.id;
            
            alert(resName + ' has been updated successfully');
            
            window.location = document.location.href.replace(/[^/]*$/, '') + 'singleprod.html?=' + resId;
        })
        .catch(error => console.error('Error:', error));
};

const editCancel = () => {
    window.location = document.location.href.replace(/[^/]*$/, '') + 'singleprod.html?=' + searchId;
};

fetch(url)
    .then(res => res.json())
    .then(response => {
        console.log(response);
        if (response.error) {
            alert(`Product with ID ${searchId} not found`);
        } else {
            document.getElementById("id").value = response.id;
            document.getElementById("image").value = response.image;
            document.getElementById("name").value = response.name;
            document.getElementById("description").value = response.description;
            document.getElementById("category").value = response.category;
            document.getElementById("quantity").value = response.quantity;
            document.getElementById("price").value = response.price;
            document.getElementById("date").value = response.date;
            document.getElementById("minimum").value = response.minimum;
        }
    })
    .catch(error => console.error('Error:', error));