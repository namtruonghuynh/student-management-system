# Student Management System (Express + TypeScript + TypeORM + MySQL)

Hệ thống **quản lý học sinh** được phát triển bằng **TypeScript** với **Express.js** và **TypeORM**.  
Mục tiêu chính là vận dụng **Clean Code** và **SOLID principles** để xây dựng hệ thống có tính **mở rộng, dễ bảo trì, dễ kiểm thử**.

---

## Mục tiêu
- Thiết kế hệ thống RESTful API quản lý học sinh (CRUD).
- Tách biệt rõ các tầng **Controller – Service – Repository**.
- Áp dụng toàn diện **Clean Code** và **SOLID**.
- Cấu hình môi trường an toàn bằng `.env`.
- Kết nối MySQL qua **TypeORM**.

## Áp dụng Clean Code

Dự án Student Management System (Express + TypeScript + TypeORM) được thiết kế dựa trên triết lý “mã nguồn sạch” – giúp người khác có thể dễ dàng đọc, hiểu và mở rộng mà không cần phụ thuộc vào người viết ban đầu.

## Nguyên tắc Clean Code|Áp dụng cụ thể trong dự án|Lợi ích đạt được
Meaningful Names| Tên lớp, hàm và biến phản ánh đúng chức năng: StudentController, createStudent(), deleteStudentById()| Dễ đọc, dễ hiểu, hạn chế nhầm lẫn khi mở rộng mã nguồn

Small Functions| Mỗi hàm chỉ làm một nhiệm vụ duy nhất, ví dụ StudentService.createStudent() chỉ phụ trách thêm học sinh, không kiêm thêm validation hoặc logic phụ| Giảm rủi ro lỗi, dễ test và tái sử dụng

Single Responsibility| Tách code thành 3 tầng: Controller (xử lý request/response), Service (chứa logic nghiệp vụ), Repository (truy cập cơ sở dữ liệu)| Cấu trúc rõ ràng, dễ bảo trì và dễ mở rộng

Consistent Formatting| Dùng Prettier + ESLint + TypeScript strict mode để tự động định dạng và kiểm tra lỗi| Mã nguồn gọn gàng, thống nhất giữa các file

Error Handling| Toàn bộ API đều bọc trong try...catch, trả về thông báo lỗi có cấu trúc rõ ràng qua res.status(...).json(...)| Tránh crash server, dễ debug khi vận hành

Separation of Concerns| Từng module chỉ đảm nhận một chức năng (routing, controller, service, repository, database config)| Giảm coupling, dễ thêm tính năng mới mà không ảnh hưởng code cũ

## Áp dụng SOLID Principles

Dự án được phát triển với mục tiêu tuân thủ 5 nguyên tắc SOLID, giúp hệ thống dễ mở rộng, dễ test, giảm lỗi tiềm ẩn trong quá trình phát triển.

Nguyên tắc	Giải thích	Áp dụng trong dự án	Hiệu quả đạt được
S_Single Responsibility Principle
Mỗi class chỉ nên có một trách nhiệm duy nhất
- StudentController: xử lý HTTP request/response
- StudentService: xử lý logic nghiệp vụ
- StudentRepository: truy vấn database	Giảm độ phức tạp, giúp code dễ hiểu và dễ bảo trì

O_Open/Closed Principle
Class nên mở để mở rộng, nhưng đóng để chỉnh sửa
Dễ dàng thêm entity khác như Teacher, Course mà không cần sửa code cũ.
Mỗi entity có service, repository riêng	Tăng khả năng mở rộng mà không phá vỡ hệ thống

L_Liskov Substitution Principle
Lớp con có thể thay thế lớp cha mà không thay đổi hành vi
Các repository cụ thể (StudentRepository, TeacherRepository) kế thừa từ BaseRepository, đảm bảo tính thay thế
Giúp dễ thay đổi, mở rộng mà không sợ lỗi logic

I_Interface Segregation Principle	
Interface nên nhỏ gọn, chỉ chứa các phương thức cần thiết
Tạo các interface riêng biệt như ICreate, IRead, IUpdate, IDelete, chỉ implement phần cần dùng
Tránh việc class bị “ép” phải cài đặt những hàm không cần thiết

D_Dependency Inversion Principle
Module cấp cao không phụ thuộc trực tiếp vào module cấp thấp	
StudentController chỉ phụ thuộc vào StudentService, và service được inject qua constructor. Không phụ thuộc trực tiếp vào database	
Giảm coupling, dễ thay đổi service hoặc test mà không ảnh hưởng logic chính
