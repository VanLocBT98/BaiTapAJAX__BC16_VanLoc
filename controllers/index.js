function renderTableNhanVien(arrNV) {
    var stringHTML = "";
    for (var i = 0; i < arrNV.length; i++) {
        var nv = arrNV[i];
        var textXepLoai = ""
        if (nv.soGioLamTrongThang >= 120) {
            textXepLoai = " Nhân Viên Xuất Sắc"
        } else if (nv.soGioLamTrongThang >= 100 && nv.soGioLamTrongThang < 120) {
            textXepLoai = " Nhân Viên Giỏi"
        } else if (nv.soGioLamTrongThang >= 80 && nv.soGioLamTrongThang < 100) {
            textXepLoai = "Nhân Viên Khá"
        } else {
            textXepLoai = "Nhân Viên TB"
        }
        stringHTML += `
              <tr>
                  <td>${nv.maNhanVien}</td>
                  <td>${nv.tenNhanVien}</td>
                  <td>${nv.chucVu}</td>
                  <td>${nv.luongCoBan}</td>
                  <td>${(nv.luongCoBan)*(nv.heSoChucVu)}</td>
                  <td>${nv.soGioLamTrongThang}</td>
                  <td>${
                      textXepLoai
                    }
                  </td>
                  <td>
                      <button class="btn btn-outline-danger" onclick="DELETE('${nv.maNhanVien}')" >Xoá</button>
                      <button class="btn btn-outline-primary" onclick="EDIT('${nv.maNhanVien}')" >Chỉnh sửa</button>
                  </td>
              </tr>
          `;
    }
    //Dom đến thẻ tbody viết lại phần innerHTML của thẻ
    $("tbody").innerHTML = stringHTML;
}

function getAPINv() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET'
    });
    promise.then(function (result) {
        // call api create table nv
        renderTableNhanVien(result.data)
    })
    // khi thất bại
    promise.catch(function (error) {
        console.log(error)
    })
}
getAPINv();
// POST thêm dữ liệu để sever lưu trữ
$('#btnXacNhan').addEventListener('click', function () {
    // tạo ra format data theo back end yêu cầu

    var nhanVien = new NhanVien()
    var Test = new Validation()
    nhanVien.maNhanVien = $("#maNhanVien").value;
    nhanVien.tenNhanVien = $("#tenNhanVien").value;
    nhanVien.heSoChucVu = $("#chucVu").value;
    nhanVien.luongCoBan = $("#luongCoBan").value;
    nhanVien.soGioLamTrongThang = $("#soGioLamTrongThang").value;
    var slChucVu = $('#chucVu');
    var index = slChucVu.selectedIndex;
    nhanVien.chucVu = slChucVu.options[index].innerHTML;
    //

    // dat co
    var valid = true;
    //check ma
    valid &= Test.isRequired(nhanVien.maNhanVien,
            '#errmess-ma',
            'Vui lòng nhập mã nhân viên') &&
        Test.TestLength(nhanVien.maNhanVien,
            '#errmess-ma', 4, 6,
            'Vui lòng nhập mã tối thiểu 4 ký tự và tối da 6 ký tự');
    // check name
    valid &= Test.isRequired(nhanVien.tenNhanVien,
            '#errmess-ten',
            'Vui nhập tên nhân viên') &&
        Test.TestLength(nhanVien.tenNhanVien,
            '#errmess-ten', 4, 999,
            'Vui lòng nhập đầy đủ họ và tên nhân viên') &&
        Test.testString(nhanVien.tenNhanVien,
            '#errmess-ten',
            'Vui nhập tên nhân viên bằng chữ');
    // check lương
    valid &= Test.isRequired(nhanVien.luongCoBan,
            '#errmess-luongcb',
            'Vui lòng nhấp vào lương') &&
        Test.testNumber(nhanVien.luongCoBan,
            '#errmess-luongcb',
            'Vui lòng nhập lương bằng số') &&
        Test.nhapso(nhanVien.luongCoBan, 1000000, 20000000,
            '#errmess-luongcb',
            'Lương cơ bản từ 1 000 000 đến 20 000 000')
    // check giờ làm
    valid &= Test.isRequired(nhanVien.soGioLamTrongThang,
            '#errmess-giolam',
            'Vui lòng không bỏ trống giờ làm') &&
        Test.testNumber(nhanVien.soGioLamTrongThang,
            '#errmess-giolam',
            'Vui lòng nhập giờ làm bằng số') &&
        Test.nhapso(nhanVien.soGioLamTrongThang, 50, 150,
            '#errmess-giolam',
            'Giờ làm tối thiểu 50h và tối da 150h');

    if (!valid) {
        return; //Dừng không chạy tiếp
    }
    // tạo api thêm dũ liệu
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nhanVien
    })
    promise.then(function (result) {
        console.log(result.data)

        getAPINv();
        ressetForm()
    })
    // khi thất bại
    promise.catch(function (error) {
        console.log(error)

    })
})

function DELETE(maNhanVien) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=' + maNhanVien,
        method: 'DELETE',
    })
    promise.then(function (result) {
        console.log(result.data);
        // xóa dữ liệu thành công  gọi lại trả data về sever
        getAPINv();
    })
    // khi thất bại
    promise.catch(function (error) {
        console.log(error)
    })
}

function EDIT(maNhanVien) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=' + maNhanVien,
        method: 'GET',
    })
    promise.then(function (result) {
        console.log(result.data);
        // load du liệu ra input
        var nhanVien = result.data;
        console.log(nhanVien)
        $("#maNhanVien").value = nhanVien.maNhanVien;
        $("#tenNhanVien").value = nhanVien.tenNhanVien;
        $("#luongCoBan").value = nhanVien.luongCoBan;
        $("#soGioLamTrongThang").value = nhanVien.soGioLamTrongThang;
        var slChucVu = $('#chucVu');
        var index = slChucVu.selectedIndex;
        console.log(index)
        slChucVu.options[index] = nhanVien.chucVu;
        $("#maNhanVien").disabled = true;


        getAPINv();
    })
    // khi thất bại
    promise.catch(function (error) {
        console.log(error)
    })
}
$('#btnCapNhat').addEventListener('click', function () {
    // lấy dữ liệu từ o input
    var nhanVien = new NhanVien()
    nhanVien.maNhanVien = $("#maNhanVien").value;
    nhanVien.tenNhanVien = $("#tenNhanVien").value;
    nhanVien.heSoChucVu = $("#chucVu").value;
    nhanVien.luongCoBan = $("#luongCoBan").value;
    nhanVien.soGioLamTrongThang = $("#soGioLamTrongThang").value;
    var slChucVu = $('#chucVu');
    var index = slChucVu.selectedIndex;
    nhanVien.chucVu = slChucVu.options[index].innerHTML;

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=' + nhanVien.maNhanVien,
        method: 'PUT',
        data: nhanVien
    })
    promise.then(function (result) {
        console.log(result.data);
        // thành công tạo lại table
        $("#maNhanVien").disabled = false;


        getAPINv();
        ressetForm()
    })
    // khi thất bại
    promise.catch(function (error) {
        console.log(error)
    })
})

function ressetForm() {
    var arrInput = $$('#formnv input');
    for (i = 0; i < arrInput.length; i++) {
        var input = arrInput[i];
        input.value = '';
    }
}