function ItemDTO(code,iName,price,quantity){
    var itemCode=code;
    var itemName=iName;
    var itemPrice=price;
    var itemQuantity=quantity;

    this.getItemCode=function (){
        return itemCode;
    }
    this.setItemCode=function (code){
        itemCode=code;
    }
    this.getItemName=function (){
        return itemName;
    }
    this.setItemName=function (iName){
        itemName=iName;
    }
    this.getItemPrice=function (){
        return itemPrice;
    }
    this.setItemPrice=function (price){
        itemPrice=price;

    }
    this.getItemQuantity=function (){
        return itemQuantity;
    }
    this.setItemQuantity=function (quantity){
        itemQuantity=quantity;
    }
}