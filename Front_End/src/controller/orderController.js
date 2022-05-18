generateOrderId();
setDate();
var selectedItemId;
var selectedCustomerId;

//////////////-load customer and item ids /////////////////////////////////////

$("#btnAddCart").click(function (){
    addToCart();
});
$("#dis").keyup(function(event){
    discountCal();
});

$("#cash").keyup(function (event) {

    let subTotal = parseInt($("#lblSubTotal").text());
    let cash = parseInt($("#cash").val());
    let balance = cash - subTotal;
    $("#balanceCash").val(balance);


});


$("#cIdCmb").change(function (e){
    selectedCustomerId =$('#cIdCmb').find(":selected").text();
    selectedCustomer(selectedCustomerId);
});


$("#itmIdCmb").change(function (e){
     selectedItemId =$('#itmIdCmb').find(":selected").text();
    selectedItem(selectedItemId);
});

/* load customer ids to cmb (customer)*/
function loadAllCustomerIds() {
    $("#cIdCmb").empty();

    let cusHint=`<option disabled selected> Select Customer ID</option>`;

    $("#cIdCmb").append(cusHint);

    for (let i in customerDB) {
        let option = `<option value="${customerDB[i].getCustomerId()}">${customerDB[i].getCustomerId()}</option>`
        $("#cIdCmb").append(option);
    }
}
/*load customer data to text fields*/
function selectedCustomer(CustomerId){
    for (const i in customerDB){
        if (customerDB[i].getCustomerId()==CustomerId) {
            let element = customerDB[i];
            $("#cusName").val(element.getCustomerName());
            $("#cusSalary").val(element.getCustomerSalary());
            $("#cusAddress").val(element.getCustomerAddress());
        }
    }
}


/* load item ids to cmb (item)*/
function loadAllItemIds() {
    $("#itmIdCmb").empty();

    let itemHint=`<option disabled selected> Select Item ID</option>`;

    $("#itmIdCmb").append(itemHint);

    for (let i in itemDB) {
        let option = `<option value="${itemDB[i].getItemCode()}">${itemDB[i].getItemCode()}</option>`
        $("#itmIdCmb").append(option);
    }
}
/*load item data to text fields*/
function selectedItem(ItemId){
    for (const i in itemDB){
        if (itemDB[i].getItemCode()==ItemId) {
            let element = itemDB[i];
            $("#itmName").val(element.getItemName());
            $("#itmQtyOnHand").val(element.getItemQuantity());
            $("#itmPrice").val(element.getItemPrice());
        }
    }
}


/*add cart part*/
var fullTotal = 0;
function addToCart(){
        let id = selectedItemId;
        let iName = $("#itmName").val();
        let iQtyOnHand = parseInt($("#qtyOnHandO").val());
        let iPrice = $("#itmPrice").val();
        let iOrderQTY = parseInt($("#orderQty").val());

        let total = 0;
    if (iQtyOnHand+1 <= iOrderQTY) {
        alert("Enter Valid QTY");
        $("#orderQty").val("");
        return;
    }
    iQtyOnHand = iQtyOnHand - iOrderQTY;

    //updateing qty
    for (let i = 0; i < itemDB.length; i++) {
        if (id == itemDB[i].getItemCode()) {
            itemDB[i].setItemQuantity(iQtyOnHand);
        }
    }
    let newQty = 0;
    let newTotal= 0;

    if (checkDuplicates(id)==-1) {
        total = iOrderQTY * iPrice;
        fullTotal = fullTotal + total;
        let row =
            `<tr><td>${id}</td><td>${iName}</td><td>${iPrice}</td><td>${iOrderQTY}<td>${total}</td></tr>`;
        $("#tblItemCart").append(row);
        $("#txtTotal").text(fullTotal+" LKR");
        // alert("23445");
        clearInputItems();

    }else{

        let rowNo = checkDuplicates(id);
        newQty = iOrderQTY;
        let oldQty = parseInt($($('#tblItemCart>tr').eq(rowNo).children(":eq(3)")).text());
        let oldTotal = parseInt($($('#tblItemCart>tr').eq(rowNo).children(":eq(4)")).text());

        fullTotal = fullTotal-oldTotal;
        newQty = parseInt(oldQty) + parseInt(newQty) ;
        newTotal = newQty * iPrice;
        fullTotal = fullTotal + newTotal;

        //Update row
        $('#tblItemCart tr').eq(rowNo).children(":eq(3)").text(newQty);
        $('#tblItemCart tr').eq(rowNo).children(":eq(4)").text(newTotal);

        $("#txtTotal").text(fullTotal+" LKR");
        // alert("test");
        clearInputItems();
    }

}
function checkDuplicates(itemId) {
    for (let i = 0; i < $("#tblItemCart > tr").length; i++) {
        if (itemId == $('#tblItemCart').children().eq(i).children().eq(0).text()) {
            // alert(i);
            return i;
        }

    }
    return -1;
}

function clearInputItems() {
    $("#itmIdCmb").val("");
    $("#itmName").val("");
    $("#itmQtyOnHand").val("");
    $("#itmPrice").val("");
    $("#orderQty").val("");
}

/*calculate discount part*/

function discountCal() {

    var discount =0;
    var discounted_price=0;
    var tempDiscount=0;

    discount = parseInt($("#dis").val());
    tempDiscount = 100-discount;
    discounted_price = (tempDiscount*fullTotal)/100;
    console.log(typeof discounted_price);
    $("#lblSubTotal").text(discounted_price +" LKR");


}



////////////////////////////////////////////////////////////////////////////////////////

//generate order Id

function generateOrderId() {

    let index = orderDB.length - 1;
    let id;
    let temp;
    if (index != -1) {
        id = orderDB[orderDB.length - 1].getOrderId();
        temp = id.split("-")[1];
        temp++;
    }

    if (index == -1) {
        $("#orderId").val("O00-001");
    } else if (temp <= 9) {
        $("#orderId").val("O00-00" + temp);
    } else if (temp <= 99) {
        $("#orderId").val("O00-0" + temp);
    } else {
        $("#orderId").val("O00-" + temp);
    }

}

//set date

function setDate() {
    let d = new Date();
    let dd = d.toISOString().split("T")[0].split("-");
    $("#txtDate").val(dd[0]+"-"+dd[1]+"-"+dd[2]);
    $("#txtDate").text(dd[0]+"-"+dd[1]+"-"+dd[2]);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////

