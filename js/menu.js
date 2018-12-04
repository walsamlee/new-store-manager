const category = () => {
    document.getElementById('categories').classList.toggle('show');
};

window.onclick = (event) => {
    if(!event.target.matches('.drop-down')) {
        document.getElementById('categories').classList.remove('show');
    }
};

fetch('http://localhost:3000/api/v1/products')
.then(res => res.json())
.then(response => {
    let count = 0;
    response.forEach(data => {
        count ++;
        const menu = document.createElement("a");
        const menuText = document.createTextNode(data.category);
        
        menu.appendChild(menuText);
        menu.href = document.location.href.replace(/[^/]*$/, '') + 'category.html?=' + data.category;
        
        document.getElementById('categories').appendChild(menu);
        
        console.log(count);
    })
})
.catch(err => console.log(err));