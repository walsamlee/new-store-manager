"use strict";

var products = [{
    "id": 1,
    "name": "DELL Laptop",
    "description": "XPS Core i7 2TB SSD",
    "category": "Laptop",
    "quantity": 4,
    "price": 270000,
    "date": "23/10/2018",
    "minimum": 2
}, {
    "id": 2,
    "name": "MacBook Pro",
    "description": "Core i9 2TB SSD",
    "category": "Laptop",
    "quantity": 4,
    "price": 970000,
    "date": "23/10/2018",
    "minimum": 5
}, {
    "id": 3,
    "name": "Samsung wear 3",
    "description": "Samsung Smart watch 3rd generation",
    "category": "Smart watch",
    "quantity": 4,
    "price": 120000,
    "date": "23/10/2018",
    "minimum": 7
}, {
    "id": 4,
    "name": "iPhone XS",
    "description": "Apple smart phone",
    "category": "Samrt phone",
    "quantity": 4,
    "price": 470000,
    "date": "23/10/2018",
    "minimum": 2
}, {
    "id": 5,
    "name": "Bluegate UPS",
    "description": "Bluegate 4KVA UPS",
    "category": "UPS",
    "quantity": 6,
    "price": 62000,
    "date": "23/10/2018",
    "minimum": 12
}];

var product1 = {
    "id": 6,
    "name": "Polystar UPS",
    "description": "Polystar 6KVA UPS",
    "category": "UPS",
    "quantity": 6,
    "price": 68000,
    "date": "23/10/2018",
    "minimum": 13
};

var product2 = {
    "id": 7,
    "name": "1TB Seagate SSD External Storage",
    "description": "Seagate SSD External Storage",
    "category": "External Storage",
    "quantity": 6,
    "price": 48000,
    "date": "23/10/2018",
    "minimum": 20
};

var product3 = {
    "name": "Bluegate UPS",
    "description": "Bluegate 4KVA UPS",
    "category": "UPS",
    "quantity": 6,
    "price": 40000,
    "date": "23/11/2018",
    "minimum": 10
};

var user1 = {
    "email": "store3@store.com",
    "password": "store123",
    "previlledge": 0
},
    user2 = {
    "email": "store4@store.com",
    "password": "store123",
    "previlledge": 0
};

var sales = [{
    id: null,
    attendant_id: '1',
    attendant_email: 'store1@store.com',
    products: 'HP Laptop, DELL Laptop',
    total: 200000,
    date: '23/10/2018'
}];

var signupUser = {
    "email": "store4@store.com",
    "password": "$2b$10$ZUwBefo5LhxieuyGKfrhRu0Rf2WVzmEYXOIOxdY12t7HCSEzva0vC",
    "previlledge": 0
};

var loginUser = {
    email: "admin@store.com",
    password: "store123"
};

module.exports = {
    product1: product1,
    product2: product2,
    product3: product3,
    products: products,
    user1: user1,
    user2: user2,
    signupUser: signupUser,
    sales: sales,
    loginUser: loginUser
};