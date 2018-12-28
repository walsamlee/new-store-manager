const token = sessionStorage.getItem("token");

if(token) {
    const url = 'https://crud-store-manager.herokuapp.com/auth/admin';

    fetch(url, {
        method: 'POST',
        headers: {
            token: token
        }
    })
    .then(res => res.json())
    .then(response => {
        sessionStorage.setItem("id", response);
        
        if(response === 1) {
            document.getElementById('admsb').style.display = "block";
            document.getElementById('dshbd').style.width = "80%";
            document.getElementById('cart').style.display = "none";
        } else {
            document.getElementById('atdsb').style.display = "block";
            document.getElementById('dshbd').style.width = "80%";
        }
    });
}