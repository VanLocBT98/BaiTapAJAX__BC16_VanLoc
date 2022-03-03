function Validation() {
    this.isRequired = function (value, selecterError, mess) {
        if (value.trim() === '') {
            $(selecterError).innerHTML = mess;
            return false;
        } else {
            $(selecterError).innerHTML = "";
            return true;
        }
    }
    this.TestLength = function (value, selecterError, min, max, mess) {
        var le = value.trim().length;
        if (le >= min && le <= max) {
            $(selecterError).innerHTML = "";
            return true;
        }
        $(selecterError).innerHTML = mess;
        return false;
    }
    this.testString = function (value, selecterError, mess) {
        var letters = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letters)) {
            $(selecterError).innerHTML = "";
            return true;
        }
        $(selecterError).innerHTML = mess;
        return false;
    }
    this.nhapso = function(value,min,max, selecterError,mess){
        
        if(value >= min && value<= max){
            document.querySelector(selecterError).innerHTML = "";
            return true;
        }
        document.querySelector(selecterError).innerHTML = mess;
        return false;
    }
    this.testNumber = function (value, selecterError, mess) {
        var numbers = /^[0-9]+$/;
        if (value.match(numbers)) {
            $(selecterError).innerHTML = "";
            return true;
        }
        $(selecterError).innerHTML = mess;
        return false;
    }
     // check ma trùng lặp hay không
     this.maNhanVien = function (value, selecterError, arr, mess) {
        var status = true;

        for (var i = 0; i < arr.length; i++) {
          if (value === arr[i].maNhanVien) {
            //ma sv da ton tai
            status = false;
            break;
          }
        }
    
        if (status) {
          $(selecterError).innerHTML = "";
          return true;
        }
    
        $(selecterError).innerHTML = mess;
        return false;
    }
    
}