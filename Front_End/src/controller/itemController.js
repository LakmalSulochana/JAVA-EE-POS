/*item Part*/

generatItemeId()
addItemDataToTable();

$("#btnItemSave").click(function (){
    $("#tblItem>tr").off("click");
    $.ajax({
        url:"http://localhost:8080/BackEnd/item",
        method:"POST",
        data:$("#itemForm").serialize(),
        success:function (resp){
            if (resp.status==200){
                addItemDataToTable();
                clearField();
                generateId();
                /*deleteCustomer();*/
            }else{
                alert(resp.data)
            }
        },
        error:function (ob,textStatus,error){
            console.log(ob);
            console.log(textStatus);
            console.log(error);

        }
    });



    /*let itemCode =$("#iCode").val();
    let itemName =$("#iName").val();
    let itemPrice =$("#iPrice").val();
    let itemQuantity =$("#iQuantity").val();


    var itemOB=new ItemDTO(itemCode,itemName,itemPrice,itemQuantity)
    itemDB.push(itemOB);
    addItemDataToTable();
    clearItemField();
    generatItemeId();
    deleteItem();
    loadAllItemIds()*/

});



$("#btnUpdateItem").click(function (){
    let itemId =$("#ItemId").val();
    let itemName =$("#ItemName").val();
    let itemPrice =$("#ItemPrice").val();
    let itemQuantity =$("#ItemQuantity").val();

    for (var i=0;i<itemDB.length;i++){
        if (itemDB[i].getItemCode()==itemId){
            itemDB[i].setItemName(itemName);
            itemDB[i].setItemPrice(itemPrice);
            itemDB[i].setItemQuantity(itemQuantity);
        }
    }
    addItemDataToTable();
    clearItemField();
    generatItemeId();

});

function deleteItem (){
    $("#btnItemDelete").click(function (){
        let getClickData=$("#ItemId").val();
        for (let i=0;i<itemDB.length;i++){
            if (itemDB[i].getItemCode()==getClickData){
                itemDB.splice(i, 1);
            }
        }
        clearItemField();
        addItemDataToTable();
        generatItemeId();
    });
}
$("#btnItemClear").click(function (){
    clearItemField();
});

function addItemDataToTable(){
    $("#tblItem").empty();
    $.ajax({
        url:"http://localhost:8080/BackEnd/item?option=GetAll",
        method:"GET",
        success:function (resp) {
            for (const item of resp.data){
                let raw = `<tr><td>${item.itemId}</td><td>${item.itemName}</td><td>${item.itemPrice}</td><td>${item.qtyOnHand}</td></tr>`
                $("#tblItem").append(raw);

                bindItem();
                deleteItem();

            }
        }
    });

   /* for (var i of itemDB){

        let raw = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemPrice()}</td><td>${i.getItemQuantity()}</td></tr>`
        $("#tblItem").append(raw);

        bindItem();
        deleteItem();
    }*/6
}
function clearItemField(){
    $("#iCode,#ItemId,#iName,#ItemName,#iPrice,#ItemPrice,#iQuantity,#ItemQuantity").val("");
}


function bindItem(){
    $("#tblItem>tr").click(function (){
        let itemCode= $(this).children(":eq(0)").text();
        let itemName= $(this).children(":eq(1)").text();
        let itemPrice= $(this).children(":eq(2)").text();
        let itemQuantity= $(this).children(":eq(3)").text();

        $("#ItemId").val(itemCode);
        $("#ItemName").val(itemName);
        $("#ItemPrice").val(itemPrice);
        $("#ItemQuantity").val(itemQuantity);
    });
}

/*ID GENARATE*/
function generatItemeId() {
    let index = itemDB.length - 1;
    let id;
    let temp;
    if (index != -1) {
        id = itemDB[itemDB.length - 1].getItemCode();
        temp = id.split("-")[1];
        temp++;
    }

    if (index == -1) {
        $("#iCode").val("I00-001");
    } else if (temp <= 9) {
        $("#iCode").val("I00-00" + temp);
    } else if (temp <= 99) {
        $("#iCode").val("I00-0" + temp);
    } else {
        $("#iCode").val("I00-" + temp);
    }

}

