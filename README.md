# Demo MongoDB

Một ứng dụng demo đơn giản sử dụng MongoDB và Node.js.

## Giới thiệu

Dự án này là một ứng dụng demo minh họa cách kết nối và làm việc với MongoDB thông qua Node.js. Ứng dụng cung cấp các chức năng cơ bản để tương tác với cơ sở dữ liệu MongoDB.

## Công nghệ sử dụng

- Node.js
- MongoDB
- Express.js
- Mongoose

## Điều kiện tiên quyết

Trước khi bắt đầu, đảm bảo bạn đã:

- Cài đặt Node.js (phiên bản 14.x trở lên)
- Cài đặt MongoDB và đảm bảo dịch vụ MongoDB đang chạy trên máy của bạn

## Cài đặt

1. Clone repository này về máy của bạn:
```
git clone https://github.com/username/demo-mongodb.git
cd demo-mongodb
```

2. Cài đặt các dependencies:
```
npm install
```

## Cấu hình

Mặc định, ứng dụng sẽ kết nối với MongoDB trên `mongodb://localhost:27017/demodb`. Nếu bạn muốn thay đổi cấu hình kết nối, hãy chỉnh sửa file `.env` (hoặc tạo mới nếu chưa có):

```
MONGODB_URI=mongodb://localhost:27017/demodb
PORT=3000
```

## Chạy ứng dụng

Để khởi động ứng dụng:

```
npm start
```

Ứng dụng sẽ chạy trên `http://localhost:3000`. Mở trình duyệt web và truy cập địa chỉ này để xem ứng dụng.

## Các tính năng

- Xem danh sách dữ liệu
- Thêm dữ liệu mới
- Cập nhật dữ liệu hiện có
- Xóa dữ liệu

## Cấu trúc dự án

```
demo-mongodb/
├── models/          # Các model MongoDB
├── routes/          # Các route API
├── public/          # Assets tĩnh
├── server.js           # File khởi động ứng dụng
├── package.json
└── README.md
```

## Đóng góp

Mọi đóng góp đều được hoan nghênh. Hãy tạo một pull request hoặc mở issue để đề xuất tính năng hoặc báo cáo lỗi.

## Giấy phép

MIT
