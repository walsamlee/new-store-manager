const 
    thistoken = sessionStorage.getItem("token"),
    id = sessionStorage.getItem("id");

const thisAddProduct = () => {
    const myForm = document.getElementById('product-form');
    const formData = new FormData(myForm);
    
    if(thistoken && (parseInt(id) === 1)) {
        const url = 'https://crud-store-manager.herokuapp.com/api/v1/products';
        
        fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                token: thistoken
            }
        })
        .then(res => res.json())
        .then(response => {
            // const
            // resId = response.id,
            // resName = response.name,
            // resQuantity = response.quantity;

            alert(`${response.quantity} number of ${response.name} has been added to the store successfully`);
            let redirect = document.location.href.replace(/[^/]*$/, '');
            window.location = `${redirect}singleprod.html?id=${response.id}`;
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Unauthorized to perform this operation!');
    }
};

const addCancel = () => {
    window.location = document.location.href.replace(/[^/]*$/, '') + 'index.html';
};