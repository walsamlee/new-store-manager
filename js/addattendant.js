const passwordCompare = (form) => {
    if(form.password.value !== form.password2.value) {
        document.getElementById('password-compare').style.display = 'inline';
    } else {
        document.getElementById('password-compare').style.display = 'none';
    }
};

const createUser = (form) => {
    const signupToken = sessionStorage.getItem('token');
    const email = form.email.value;
    const password = form.password.value;
    const password2 = form.password2.value;
    const privilege = form.privilege.value;
    let right;
    
    if(privilege === 'admin') {
        right = 1;
    } else {
        right = 0;
    }
    
    if(password === password2) {
        const data = {
            email: email,
            password: password,
            previlledge: right
        };
    
        const url = 'http://localhost:3000/auth/signup';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: signupToken
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(response => {
                alert(`User ${response.email} added successfully`);
                window.location = 'http://localhost:8080/store-manager/addattendant.html';
            })
            .catch(err => console.log(err));
    }
};