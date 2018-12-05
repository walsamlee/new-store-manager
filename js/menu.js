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
    let tempArr = [];
    response.forEach(data => {
        tempArr.push(data.category);
    });
    
    const categorySet = [...new Set(tempArr)];
    
    for(let i = 0; i < categorySet.length; i++) {
        const menu = document.createElement("a");
        const menuText = document.createTextNode(categorySet[i]);
    
        menu.appendChild(menuText);
        menu.href = document.location.href.replace(/[^/]*$/, '') + 'category.html?=' + categorySet[i];
    
        document.getElementById('categories').appendChild(menu);
    }
    
})
.catch(err => console.log(err));