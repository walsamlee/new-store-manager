const thisLogin = (form) => {
    console.log(form.email.value);
    console.log(form.password.value);
    const data = {
        email: form.email.value,
        password: form.password.value
    };

    const url = 'http://localhost:3000/auth/login';
    
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        if(response.message) {
            alert('Invalid Username or password!');
        } else {
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("email", response.email);
            window.location = 'http://localhost:8080/store-manager/index.html';
        }
        
    })
    .catch(error => console.error('Error:', error));
};