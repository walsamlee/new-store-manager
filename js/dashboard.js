const token = sessionStorage.getItem("token");

if(token) {
    const url = 'http://localhost:3000/auth/admin';

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
        } else {
            document.getElementById('atdsb').style.display = "block";
            document.getElementById('dshbd').style.width = "80%";
        }
    });
}