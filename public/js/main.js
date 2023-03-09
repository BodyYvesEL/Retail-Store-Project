

let products = [];
const cartItems = [];
const cart_n = document.getElementById('cart_n');

// -----> DIV

const fruitDIV = document.getElementById("fruitDIV");
const juiceDIV = document.getElementById("juiceDIV");
const vegetableDIV = document.getElementById("vegetableDIV");


// -----> INFORMATION

const FRUIT = [
    {name: 'Pitaya', price: 1},
    {name: 'Salak', price: 1},
    {name: 'Mangosteen', price: 1},
    {name: 'Rambutan', price: 1},
    {name: 'Logan', price: 1},
    {name: 'Jackfruit', price: 1},
    
];

const JUICE = [
    {name: 'juice #1', price: 10},
    {name: 'juice #2', price: 11},
    {name: 'juice #3', price: 12},
    
];

const VEGETABLE = [
    {name: 'vegetable #1', price: 10},
    {name: 'vegetable #2', price: 12},
    {name: 'vegetable #3', price: 14},
    
];

// -----> HTML

function HTMLfruitProduct(con) {
    let URL = `../img/fruits/fruit${con}.jpeg`;
    let btn = `btnFruit${con}`;
    return `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height: 16rem;" src="${URL}" alt="Card imaage cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <p class="card-text">${FRUIT[con-1].name}</p>
                    <p class="card-text">Price: ${FRUIT[con-1].price}.00</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" onClick="cart2('${FRUIT[con-1].name}', '${FRUIT[con-1].price}', '${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary"><a style="color: inherit;" href="/cart">Buy</a></button>
                            <button id="${btn}" type="button" onclick="cart('${FRUIT[con-1].name}', '${FRUIT[con-1].price}', '${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary" >Add to cart</button>
                        </div>
                        <small class="text-muted">Free Delivery</small>
                    </div>
                </div>
            </div>
        </div> 
    `
}

function HTMLjuiceProduct(con) {
    let URL = `img/juice/juice${con}.jpeg`;
    let btn = `btnJuice${con}`;
    return `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height: 16rem;" src="${URL}" alt="Card imaage cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <p class="card-text">${JUICE[con-1].name}</p>
                    <p class="card-text">Price: ${JUICE[con-1].price}.00</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" onClick="cart2('${JUICE[con-1].name}', '${JUICE[con-1].price}', '${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary"><a href="/cart" style="color:inherit;">Buy</a></button>
                            <button id="${btn}" type="button" onclick="cart('${JUICE[con-1].name}', '${JUICE[con-1].price}', '${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary" >Add to cart</button>
                        </div>
                        <small class="text-muted">Free Delivery</small>
                    </div>
                </div>
            </div>
        </div> 
    `
}

function HTMLvegetableProduct(con) {
    let URL = `img/vegetable/vegetable${con}.jpeg`;
    let btn = `btnVegetable${con}`;
    return `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" style="height: 16rem;" src="${URL}" alt="Card imaage cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <i style="color:orange;" class="fa fa-star" ></i>
                    <p class="card-text">${VEGETABLE[con-1].name}</p>
                    <p class="card-text">Price: ${VEGETABLE[con-1].price}.00</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" onClick="cart2('${VEGETABLE[con-1].name}', '${VEGETABLE[con-1].price}', '${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary"><a href="/cart" style="color:inherit;">Buy</a></button>
                            <button id="${btn}" type="button" onclick="cart('${VEGETABLE[con-1].name}', '${VEGETABLE[con-1].price}', '${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary" >Add to cart</button>
                        </div>
                        <small class="text-muted">Free Delivery</small>
                    </div>
                </div>
            </div>
        </div> 
    `
}

// -----> ANIMATION

function animation() {
    const toast=swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000
    });

    toast({
        type: 'success',
        title: 'Added to shopping cart'
    });
}

// -----> CART FUNCTIONS

function cart (name, price, url, con, btncart) {
    const item = {
        name: name,
        price: price,
        url: url
    }

    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem('cart'));
    if (storage == null) {
        products.push(item);
        localStorage.setItem('cart', JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem('cart'));
        products.push(item);
        localStorage.setItem('cart', JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem('cart'));
    cart_n.innerHTML = `[${products.length}]`;
    document.getElementById(btncart).style.display = "none";
    animation();
}

function cart2 (name, price, url, con, btncart) {
    const item = {
        name: name,
        price: price,
        url: url
    }

    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem('cart'));
    if (storage == null) {
        products.push(item);
        localStorage.setItem('cart', JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem('cart'));
        products.push(item);
        localStorage.setItem('cart', JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem('cart'));
    cart_n.innerHTML = `[${products.length}]`;
    document.getElementById(btncart).style.display = "none";
    //animation();
}



const Products = JSON.parse(localStorage.getItem("cart")) || [];

(() => {
    for (let index = 1; index <= 6; index++) {
        fruitDIV.innerHTML += `${HTMLfruitProduct(index)}`;
    }
    for (let index = 1; index <= 3; index++) {
        juiceDIV.innerHTML+= `${HTMLjuiceProduct(index)}`;
        vegetableDIV.innerHTML+= `${HTMLvegetableProduct(index)}`;
    }
    cart_n.innerHTML = `[${products.length}]`;
})();

/*


const Products = JSON.parse(localStorage.getItem("cart")) || [];

(() => {
    for (let index = 1; index <= 6; index++) {
        fruitDIV.innerHTML += `${HTMLfruitProduct(index)}`;
    }
    for (let index = 1; index <= 3; index++) {
        juiceDIV.innerHTML += `${HTMLjuiceProduct(index)}`;
        vegetableDIV.innerHTML += `${HTMLvegetableProduct(index)}`;
    }
    cart_n.innerHTML = `[${products.length}]`;
})();





/*

(() => {
    try {
        for (let index = 1; index <= 6; index++) {
            fruitDIV.innerHTML += `${HTMLfruitProduct(index)}`;
        }

        for (let index = 1; index <= 3; index++) {
            const juiceProduct = HTMLjuiceProduct(index);
            const vegetableProduct = HTMLvegetableProduct(index);
            
            if (juiceProduct) {
                juiceDIV.innerHTML += `${juiceProduct}`;
            }
            
            if (vegetableProduct) {
                vegetableDIV.innerHTML += `${vegetableProduct}`;
            }
        }

        if (localStorage.getItem("cart")) {
            const products = JSON.parse(localStorage.getItem("cart"));
            cart_n.innerHTML = `[${products.length}]`;
        }
    } catch (error) {
        console.error(error);
    }
})();






(() => {
    for (let index = 1; index <= 6; index++) {
        fruitDIV.innerHTML += `${HTMLfruitProduct(index)}`;
    }
    for (let index = 1; index <= 3; index++) {
        juiceDIV.innerHTML += `${HTMLjuiceProduct(index)}`;
        vegetableDIV.innerHTML += `${HTMLvegetableProduct(index)}`;
    }
    if (localStorage.getItem("cart") == null) {

    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        cart_n.innerHTML = `[${products.length}]`;
    }
})();

*/
