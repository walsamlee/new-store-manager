const deleteUser = (form) => {
    const email = document.getElementById('email');
    const selectedUser = email.options[email.selectedIndex].value;

    const url = `http://localhost:3000/auth/users/delete/${selectedUser}`;
    fetch(url, {
        method: 'DELETE',
        headers: {
            token: deleteUserToken
        }
    })
        .then(res => res.json())
        .then(response => {
            alert(response.message);
            window.location = 'http://localhost:8080/store-manager/deleteattendant.html';
        })
        .catch(err => console.log(err));
};

const deleteUserToken = sessionStorage.getItem('token');

fetch('http://localhost:3000/auth/users', {
    headers: {
        token: deleteUserToken
    }
})
    .then(res => res.json())
    .then(response => {
        response.forEach(user => {
            if(user.email !== 'admin@store.com') {
                const select = document.getElementById("email");
                const option = document.createElement("option");
                
                option.text = user.email;
                select.add(option);
            }
        });
        
        const mySelect = document.getElementById('email');
        mySelect.onchange = (event) => {
            const inputText = event.target.value;
            
            if (inputText === 'options') {
                alert('Please select a user to edit');
            }
            
        }
    })
    .catch(err => console.log(err));