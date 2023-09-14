# SERVER

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

#### https://www.paypal.com/sdk/js?client-id=...

##### Đây là một phần của PayPal JavaScript SDK, được sử dụng để tích hợp chức năng thanh toán PayPal vào trang web của bạn. Cụ thể, JavaScript SDK có các chức năng sau:

###### Tạo Giao diện Thanh toán: JavaScript SDK cho phép bạn tạo giao diện trực quan cho người dùng chọn thanh toán bằng PayPal trên trang web của bạn. Người dùng có thể nhấp vào nút thanh toán PayPal để chuyển đến trang thanh toán PayPal.

###### Xử lý Thanh toán: Sau khi người dùng chuyển đến trang thanh toán PayPal và nhập thông tin thanh toán, PayPal sẽ xử lý thanh toán và trừ tiền từ tài khoản của người dùng. JavaScript SDK không thực hiện quy trình thanh toán thực sự mà chỉ tạo ra giao diện cho quy trình này.

###### Trả kết quả: Sau khi thanh toán hoàn tất, PayPal sẽ trả về kết quả thanh toán cho trang web của bạn thông qua các hàm callback hoặc promises, cho phép bạn xác minh và lưu trữ thông tin về giao dịch thanh toán.

###### Tóm lại, JavaScript SDK của PayPal là một công cụ giúp bạn tích hợp khả năng thanh toán PayPal vào trang web của bạn, tạo ra giao diện cho người dùng để thực hiện thanh toán và cung cấp các phương tiện để truy cập thông tin về giao dịch sau khi thanh toán đã hoàn tất. Tuy nó không xử lý thanh toán trực tiếp, nhưng nó là một phần quan trọng trong quá trình tích hợp PayPal vào trang web của bạn.
