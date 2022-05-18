function CustomerDTO(id,name,address,salary){
    var customerId=id;
    var customerName=name;
    var customerAddress=address;
    var customerSalary=salary;

    this.getCustomerId=function (){
        return customerId;
    }
    this.setCustomerId=function (id){
        customerId=id;
    }
    this.getCustomerName=function (){
        return customerName;
    }
    this.setCustomerName=function (name){
        customerName=name;
    }
    this.getCustomerAddress=function (){
        return customerAddress;
    }
    this.setCustomerAddress=function (address){
        customerAddress=address;

    }
    this.getCustomerSalary=function (){
        return customerSalary;
    }
    this.setCustomerSalary=function (salary){
        customerSalary=salary;
    }
}