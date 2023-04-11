# CLIENT
## Shop
## ReactJs, ExpressJs, MongoDB
## Url: 

### bcryptjs

Một dạng hash pasword thường được sử dụng để mã hoá password với mục đích tăng cường bảo mật sử dụng thuật toán blowfish xuất bản bới Bruce Schneier (1993)

### express-async-handler

1 phần mềm trung gian cho việc xử lý ngoại lệ cho các sự kiện bất đồng bộ và đưa chúng tới trình xử lý lồi của express

### jsonwebtoken

Tạo random token qua một mã ẩn

### Luồng LOGIN

User login ==> request (email + password) ==> server check comparePassword ==> 
(oke) send res (token) ==> next request (headers: Authorization: Bearer + Token) ==> Server verify ==> oke (res data)
Mỗi lần user login ==> tạo token mới ==> mỗi token tạo ra có thời gian hết hạn nhất định.

### Luồng REGISTER

Register ==>check trùng ==> Lưu DB ==> res (token + data)

### Các request đều gửi token để verify

### Các chức năng chính

#### Đăng ký, đăng nhập, render UI, phân trang, GPUD Database, Mua hàng qua Paypal