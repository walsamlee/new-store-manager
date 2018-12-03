const dosubmit = () => {
    const myForm = document.getElementById('upload-form');
    const formData = new FormData(myForm);
    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(response => {
            alert(JSON.stringify(response));
        })
        .catch(err => console.log(err));
};