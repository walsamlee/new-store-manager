const 
    deleteToken = sessionStorage.getItem("token"),
    deleteId = parseInt(sessionStorage.getItem("id"));

let option = document.createElement("option");

const deleteproduct = (form) => {
    const 
    productId = parseInt(form.id.value, 10);

    const url = 'http://localhost:3000/api/v1/products/' + productId;
    
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            token: deleteToken
        }
    })
    .then(res => res.json())
    .then(response => {
        alert(response.message + ' successfully'); 
        
        window.location = 'http://localhost:8080/store-manager/deleteproduct.html';          
    })
    .catch(error => console.error('Error:', error));
};

if(deleteToken && (deleteId === 1)) {
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
                alert('Please select a product to delete');

                document.getElementById("id").value = '';
                document.getElementById("image").value = '';
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