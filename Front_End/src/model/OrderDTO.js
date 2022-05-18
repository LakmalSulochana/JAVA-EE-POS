function OrderDTO(orderId,itmId,cusId,date,discount,total){
    var oId=orderId;
    var iId=itmId;
    var cId=cusId;
    var date=date;
    var discount=discount;
    var total=total;

    this.setOrderId=function (orderId){
        oId=orderId;
    }
    this.getOrderId=function (){
        return oId
    }

    this.setItmId=function (itmId){
        iId=itmId;
    }
    this.getItmId=function (){
        return iId;
    }
    this.setCusId=function (cusId){
        cId=cusId;
    }
    this.getCusId=function (){
        return iId;
    }

    this.setDate=function (date){
        date=date;
    }
    this.getDate=function (){
        return date;
    }

    this.setDiscount=function (discount){
        discount=discount;
    }
    this.getDiscount=function (){
        return discount;
    }
    this.setTotal=function (total){
        total=total;
    }
    this.getTotal=function (){
        return total;
    }

}