


var productInputName = document.getElementById('productname');
var productInputprice = document.getElementById('productprice');
var productInputcategory = document.getElementById('productcategory');
var productInputdescription = document.getElementById('productdescription');
var productInputimage = document.getElementById('productimage');
var search = document.getElementById('search');
var rowda=document.getElementById('rowData');

var addBtn=document.getElementById('add');
var updateBtn=document.getElementById('update');



var products;
if(localStorage.getItem('products')!=null){
    products=JSON.parse(localStorage.getItem('products'));
    display(products);
}else{
    products=[];
}

function addproduct() {
    var product={
        name:productInputName.value,
        price:productInputprice.value,
        category:productInputcategory.value,
        description:productInputdescription.value,
        image:productInputimage.files[0]?.name,
        productIndex:'0',
    }
    console.log(product);
    products.push(product);
    localStorage.setItem('products',JSON.stringify(products));
    clearForm();
    display(products);
}

function clearForm(){
    productInputName.value= null;
    productInputprice.value= null;
    productInputcategory.value= null;
    productInputdescription.value= null;
    productInputimage.value= null;
}
function display(arr){
    var container=``;
    for (let i = 0; i < arr.length; i++) {
        container+=
        `
        <div class="col-md-3 py-2">
        <div class="card">
            <img src="${'images/' + (arr[i].image || 'place.png')}" class="card-img-top" alt="one">
            <div class="card-body text-center">
                <span>${arr[i].productIndex=i+1}</span>
                <h5 class="card-title">${arr[i].name}</h5>
                <p class="card-text">${arr[i].price}</p>
                <p class="card-text">${arr[i].category}</p>
                <p class="card-text">${arr[i].description}</p>   
            </div>
            <div class="card-footer text-center">
                <div onclick="deleteItem(${i})" class="btn btn-outline-danger">Delete</div>
                <div onclick="editProduct(${i})" class="btn btn-outline-success">Edit item</div>
            </div>
        </div>
        </div>`
        
    }
    rowda.innerHTML= container;
}

function deleteItem(indexToDelete){
    products.splice(indexToDelete,1);
    localStorage.setItem('products',JSON.stringify(products))
    display(products);
}

function searchproduct(){
    var searchArr=[];
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(search.value.toLowerCase())){
            searchArr.push(products[i]);
        }
    }
    display(searchArr);
}
var global;
function editProduct(updatedindex){
    global=updatedindex;
    productInputName.value= products[updatedindex].name;
    productInputprice.value= products[updatedindex].price;
    productInputcategory.value= products[updatedindex].category;
    productInputdescription.value= products[updatedindex].description;
    
    
    updateBtn.classList.remove('d-none');
    addBtn.classList.add('d-none');
}

function update(){
    
    products[global].name = productInputName.value;
    products[global].price = productInputprice.value;
    products[global].category = productInputcategory.value;
    products[global].description = productInputdescription.value;
    localStorage.setItem('products',JSON.stringify(products))
    display(products);
    clearForm();
    updateBtn.classList.add('d-none');
    addBtn.classList.remove('d-none');
}





