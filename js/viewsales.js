const saleToken = sessionStorage.getItem('token');
fetch('https://crud-store-manager.herokuapp.com/api/v1/sales', {
    method: 'GET',
    headers: {
        token: saleToken
    }
})
.then(res => res.json())
.then(response => {
    let serial = 1;
    response.forEach(sale => {
        const display = document.getElementById('sales-display');
        const salesTableTr = document.createElement('tr');
        const serialNo = document.createElement('td');
        const salesTdEmail = document.createElement('td');
        const salesTdAttdId = document.createElement('td');
        const salesTdDate = document.createElement('td');
        const salesTdId = document.createElement('td');
        const salesTdProducts = document.createElement('td');
        const salesTdTotal = document.createElement('td');

        const serialTdText = document.createTextNode(serial++);
        const salesTdEmailText = document.createTextNode(sale.attendant_email);
        const salesTdAttdIdText = document.createTextNode(sale.attendant_id);
        const salesTdDateText = document.createTextNode(sale.date);
        const salesTdIdText = document.createTextNode(sale.id);
        const salesTdProductsText = document.createTextNode(sale.products);
        const salesTdTotalText = document.createTextNode(sale.total);
        
        serialNo.appendChild(serialTdText);
        salesTdEmail.appendChild(salesTdEmailText);
        salesTdAttdId.appendChild(salesTdAttdIdText);
        salesTdDate.appendChild(salesTdDateText);
        salesTdId.appendChild(salesTdIdText);
        salesTdProducts.appendChild(salesTdProductsText);
        salesTdTotal.appendChild(salesTdTotalText);
    
        salesTableTr.appendChild(serialNo);
        salesTableTr.appendChild(salesTdEmail);
        salesTableTr.appendChild(salesTdAttdId);
        salesTableTr.appendChild(salesTdDate);
        salesTableTr.appendChild(salesTdId);
        salesTableTr.appendChild(salesTdProducts);
        salesTableTr.appendChild(salesTdTotal);
      
        display.appendChild(salesTableTr);
    });
})
.catch(err => console.log(err));