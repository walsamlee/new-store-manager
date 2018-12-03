const 
    thistoken = sessionStorage.getItem("token"),
    id = sessionStorage.getItem("id");

const thisAddProduct = (form) => {
    const myForm = document.getElementById('product-form');
    const formData = new FormData(myForm);
    if(thistoken && (parseInt(id) === 1)) {
        const
            quantity = parseInt(form.quantity.value, 10),
            price = parseFloat(form.price.value),
            image = form.image.files[0];
        const data = {
            image: image,
            name: form.name.value,
            description: form.description.value,
            category: form.category.value,
            quantity: quantity,
            price: price,
            date: form.date.value,
            minimum: form.minimum.value,
        };
        console.log(form.image.files[0]);
        const url = 'http://localhost:3000/api/v1/products';
        
        fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                token: thistoken
            }
        })
        .then(res => res.json())
        .then(response => {
            alert(JSON.stringify(response));
            // const
            // resId = response.id,
            // resName = response.name,
            // resQuantity = response.quantity;
            //
            // alert(resQuantity + ' number of ' + resName + ' has been added to the store successfully');
            // let redirect = document.location.href.replace(/[^/]*$/, '');
            // window.location = `${redirect}singleprod.html?id=${resId}`;
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Unauthorized to perform this operation!');
    }
};