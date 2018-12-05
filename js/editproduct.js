const 
    editToken = sessionStorage.getItem("token"),
    id = parseInt(sessionStorage.getItem("id"));

let option = document.createElement("option");

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
        resName = response.name;
        
        alert(resName + ' has been updated successfully'); 
        
        window.location = 'http://localhost:8080/store-manager/editproduct.html';          
    })
    .catch(error => console.error('Error:', error));
};

const editCancel = () => {
    window.location = document.location.href.replace(/[^/]*$/, '') + 'index.html';
};

if(editToken && (id === 1)) {
    fetch('http://localhost:3000/api/v1/products')
    .then(res => res.json())
    .then(response => {
        const data = response;

        for (let i = 0; i < data.length; i++) {
            let 
            select = document.getElementById("name-select"),
            option = document.createElement("option");

            option.text = data[i].name;
            select.add(option);      
        }

        let mySelect = document.getElementById('name-select');
        mySelect.onchange = (event) => {
            const inputText = event.target.value;

            if (inputText === 'options') {
                alert('Please select a product to edit');

                document.getElementById("id").value = '';
                document.getElementById("name").value = '';
                document.getElementById("description").value = '';
                document.getElementById("category").value = '';
                document.getElementById("quantity").value = '';
                document.getElementById("price").value = '';
                document.getElementById("date").value = '';
                document.getElementById("minimum").value = '';
            }
            
            for (let j = 0; j < data.length; j++) {
                if (data[j].name === inputText) {
                    document.getElementById("id").value = data[j].id;
                    document.getElementById("image").value = data[j].image;
                    document.getElementById("name").value = data[j].name;
                    document.getElementById("description").value = data[j].description;
                    document.getElementById("category").value = data[j].category;
                    document.getElementById("quantity").value = data[j].quantity;
                    document.getElementById("price").value = data[j].price;
                    document.getElementById("date").value = data[j].date;
                    document.getElementById("minimum").value = data[j].minimum;
                }
                
            }
        }
    })
    .catch(error => console.error('Error:', error));
}