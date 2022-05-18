/*Customer part*/

generateId();

$("#btnCustomerAdd").click(function (){

    let customerId =$("#customerId").val();
    let customerName =$("#customerName").val();
    let customerAddress =$("#customerAddress").val();
    let customerSalary =$("#salary").val();


    var customerOB=new CustomerDTO(customerId,customerName,customerAddress,customerSalary)
    customerDB.push(customerOB);
    addDataToTable();
    clearField();
    generateId();
    deleteCustomer();
    loadAllCustomerIds()

});

$("#updateCustomerBtn").click(function (){
    let customerId =$("#Id").val();
    let customerName =$("#Name").val();
    let customerAddress =$("#Address").val();
    let customerSalary =$("#customerSalary").val();

    for (var i=0;i<customerDB.length;i++){
        if (customerDB[i].getCustomerId()==customerId){
            customerDB[i].setCustomerName(customerName);
            customerDB[i].setCustomerAddress(customerAddress);
            customerDB[i].setCustomerSalary(customerSalary);
        }
    }

    addDataToTable();
    clearField();
    generateId();

});

function deleteCustomer (){
    $("#deleteCustomerBtn").click(function (){
        let getClickData=$("#Id").val();
        for (let i=0;i<customerDB.length;i++){
            if (customerDB[i].getCustomerId()==getClickData){
                customerDB.splice(i, 1);
            }
        }
        clearField();
        addDataToTable();
        generateId();
    });
}

$("#clearBtn").click(function (){
    clearField();
});

function addDataToTable(){
    $("#tblcstmr").empty();
    for (var i of customerDB){

        let raw = `<tr><td>${i.getCustomerId()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerSalary()}</td></tr>`
        $("#tblcstmr").append(raw);

        bindCustomer();
        deleteCustomer();
    }
}

function clearField(){
    $("#customerId,#customerName,#customerAddress,#salary,#Id,#Name,#Address,#customerSalary").val("");
}

/*enter next field*/
$("#Id").keydown(function (event) {
    if (event.key == "Enter") {
        $("#Name").focus();
    }
});

/*search part*/
$("#btnSearch").click(function (){
    var searchId = $("#txtSearch").val();
    var response = searchCustomer(searchId);
    if (response){
        $("#Id").val(response.getCustomerId());
        $("#Name").val(response.getCustomerName());
        $("#Address").val(response.getCustomerAddress());
        $("#customerSalary").val(response.getCustomerSalary());
    }else {
        alert("Invalid customer Search");

    }
});
function searchCustomer (id){
    for (let i=0;i<customerDB.length;i++){
        if (customerDB[i].getCustomerId()==id){
            return customerDB[i];
        }
    }
}

function bindCustomer(){
    $("#tblcstmr>tr").click(function (){
        let customerId= $(this).children(":eq(0)").text();
        let customerName= $(this).children(":eq(1)").text();
        let customerAddress= $(this).children(":eq(2)").text();
        let customerSalary= $(this).children(":eq(3)").text();

        $("#Id").val(customerId);
        $("#Name").val(customerName);
        $("#Address").val(customerAddress);
        $("#customerSalary").val(customerSalary);
    });
}
/*ID GENARATE*/
function generateId() {
    let index = customerDB.length - 1;
    let id;
    let temp;
    if (index != -1) {
        id = customerDB[customerDB.length - 1].getCustomerId();
        temp = id.split("-")[1];
        temp++;
    }

    if (index == -1) {
        $("#customerId").val("C00-001");
    } else if (temp <= 9) {
        $("#customerId").val("C00-00" + temp);
    } else if (temp <= 99) {
        $("#customerId").val("C00-0" + temp);
    } else {
        $("#customerId").val("C00-" + temp);
    }

}





