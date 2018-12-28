const editUser = (form) => {
    const email = document.getElementById('email');
    const selectedUser = email.options[email.selectedIndex].value;
    const privilege = form.privilege.value;
    let right;
    
    if(privilege === 'admin') {
        right = 1;
    } else {
        right = 0;
    }
    
    if(privilege) {
        const data = {
            previlledge: right
        };

        const url = `https://crud-store-manager.herokuapp.com/auth/users/update/${selectedUser}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: editUserToken
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(response => {
                alert(`User ${response.email} updated successfully`);
                window.location = document.location.href.replace(/[^/]*$/, '') + 'editattendant.html';
            })
            .catch(err => console.log(err));
    }
};

const editUserToken = sessionStorage.getItem('token');

fetch('https://crud-store-manager.herokuapp.com/auth/users', {
    headers: {
        token: editUserToken
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