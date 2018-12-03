const thisLogin = (form) => {
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
        if(typeof response === 'string') {
            sessionStorage.setItem("token", response);
            window.location = 'http://localhost:8080/store-manager/index.html';
        } else {
            alert('Invalid Username or password!');
        }
        
    })
    .catch(error => console.error('Error:', error));
}