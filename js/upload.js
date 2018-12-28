const dosubmit = () => {
    const myForm = document.getElementById('upload-form');
    const formData = new FormData(myForm);
    fetch('https://crud-store-manager.herokuapp.com/upload', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(response => {
            alert(JSON.stringify(response));
        })
        .catch(err => console.log(err));
};