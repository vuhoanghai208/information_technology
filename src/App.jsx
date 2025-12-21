import React, { useState, useEffect } from 'react';
import { 
  Brain, Wifi, Scale, Globe, Briefcase, Code2, Database, Film, 
  Sparkles, ChevronRight, Check, X, RefreshCw,
  Terminal, Trophy, ArrowRight, Lightbulb, ChevronLeft, LayoutGrid, Home
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- CONFIG: Lấy Anime.js từ CDN ---
const anime = window.anime; 

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- DỮ LIỆU CÂU HỎI (Giữ nguyên) ---
const QUESTION_BANK = [
  // --- A. TRÍ TUỆ NHÂN TẠO (AI) ---
  { subject: 'ai', q: "AI (Trí tuệ nhân tạo) là gì?", a: "Khả năng của máy tính mô phỏng trí tuệ con người.", o: ["Khả năng của con người lập trình máy tính.", "Công nghệ lưu trữ dữ liệu lớn.", "Kỹ năng giao tiếp của robot."], e: "AI mô phỏng các hoạt động trí tuệ như học tập, suy luận và giải quyết vấn đề." },
  { subject: 'ai', q: "Thuật ngữ 'AI' chính thức được đưa ra vào năm nào?", a: "1956", o: ["1945", "1950", "1965"], e: "Tại Hội nghị Dartmouth năm 1956." },
  { subject: 'ai', q: "Google Dịch là ví dụ tiêu biểu của loại AI nào?", a: "AI hẹp (yếu)", o: ["AI mạnh (tổng quát)", "Hệ chuyên gia", "Siêu trí tuệ nhân tạo"], e: "AI hẹp chỉ thực hiện tốt một nhiệm vụ cụ thể." },
  { subject: 'ai', q: "Hệ chuyên gia MYCIN nổi tiếng trong lĩnh vực nào?", a: "Y học", o: ["Giao thông", "Tài chính", "Giáo dục"], e: "MYCIN giúp chẩn đoán bệnh nhiễm trùng máu." },
  { subject: 'ai', q: "Đặc điểm nổi bật của AI mạnh (tổng quát) là gì?", a: "Có khả năng học tập, suy nghĩ và hành động linh hoạt như con người.", o: ["Chỉ xử lý được bài toán dịch thuật.", "Không cần dữ liệu để hoạt động.", "Chỉ thực hiện một tác vụ."], e: "AI mạnh hiện tại vẫn chưa đạt được hoàn toàn." },
  { subject: 'ai', q: "Robot Asimo của Honda là ứng dụng của AI trong lĩnh vực nào?", a: "Điều khiển và tự động hóa", o: ["Nhận dạng chữ viết", "Dịch ngôn ngữ", "Hệ chuyên gia"], e: "Robot tích hợp AI để di chuyển và tương tác." },
  { subject: 'ai', q: "Công nghệ nào giúp AI hiểu ngôn ngữ con người?", a: "NLP (Xử lý ngôn ngữ tự nhiên)", o: ["Computer Vision", "Robotics", "Blockchain"], e: "NLP giúp máy tính hiểu và phản hồi ngôn ngữ tự nhiên." },
  
  // --- B. MẠNG MÁY TÍNH (NETWORK) ---
  { subject: 'network', q: "Mạng LAN thường được sử dụng trong phạm vi nào?", a: "Một tòa nhà, trường học", o: ["Quốc gia", "Nhiều châu lục", "Toàn cầu"], e: "Local Area Network có phạm vi địa lý nhỏ." },
  { subject: 'network', q: "Thiết bị nào chuyển tiếp dữ liệu thông minh trong mạng LAN?", a: "Switch", o: ["Hub", "Repeater", "Modem"], e: "Switch ghi nhớ địa chỉ MAC để gửi gói tin đến đúng đích." },
  { subject: 'network', q: "Giao thức nào dùng để truyền tải các trang web?", a: "HTTP/HTTPS", o: ["FTP", "SMTP", "DNS"], e: "HyperText Transfer Protocol (Secure)." },
  { subject: 'network', q: "Địa chỉ IP 192.168.1.1 thường là loại địa chỉ nào?", a: "IP Private (Nội bộ)", o: ["IP Public (Công cộng)", "Địa chỉ MAC", "Địa chỉ Loopback"], e: "Dải 192.168.x.x dành cho mạng nội bộ." },
  { subject: 'network', q: "Chức năng chính của Router là gì?", a: "Kết nối các mạng khác nhau và định tuyến dữ liệu.", o: ["Chia sẻ máy in.", "Lưu trữ dữ liệu.", "Quét virus."], e: "Router tìm đường đi tối ưu cho gói tin giữa các mạng." },
  { subject: 'network', q: "DNS có chức năng gì?", a: "Chuyển tên miền thành địa chỉ IP", o: ["Mã hóa dữ liệu", "Tăng tốc mạng", "Lưu trữ web"], e: "Giúp người dùng truy cập bằng tên dễ nhớ (vd: google.com) thay vì số IP." },

  // --- D. ĐẠO ĐỨC & PHÁP LUẬT (ETHICS) ---
  { subject: 'ethics', q: "Hành vi nào vi phạm Luật An ninh mạng?", a: "Phát tán tin giả, xúc phạm danh dự người khác.", o: ["Chia sẻ kiến thức học tập.", "Báo cáo nội dung xấu.", "Sử dụng phần mềm bản quyền."], e: "Các hành vi gây hoang mang hoặc xâm phạm quyền lợi người khác bị cấm." },
  { subject: 'ethics', q: "Khi bị bắt nạt qua mạng (Cyberbullying), bạn nên làm gì?", a: "Chặn, báo cáo và chia sẻ với người tin cậy.", o: ["Đáp trả bằng lời lẽ thô tục.", "Im lặng chịu đựng.", "Xóa tài khoản vĩnh viễn."], e: "Cần có biện pháp bảo vệ bản thân và nhờ sự trợ giúp." },
  { subject: 'ethics', q: "Vi phạm bản quyền là gì?", a: "Sử dụng, sao chép tác phẩm mà không xin phép tác giả.", o: ["Mua phần mềm chính hãng.", "Trích dẫn nguồn hợp lệ.", "Sáng tạo nội dung mới."], e: "Tôn trọng quyền sở hữu trí tuệ." },
  { subject: 'ethics', q: "Phishing là hình thức tấn công gì?", a: "Lừa đảo qua email/tin nhắn để đánh cắp thông tin.", o: ["Tấn công từ chối dịch vụ.", "Lây lan virus qua USB.", "Nghe lén mạng."], e: "Thường giả mạo các tổ chức uy tín để lừa lấy mật khẩu, thẻ tín dụng." },

  // --- F. HTML & CSS (HTML) ---
  { subject: 'html', q: "Thẻ HTML nào dùng để tạo liên kết?", a: "<a>", o: ["<link>", "<href>", "<connect>"], e: "Thẻ <a> (anchor) với thuộc tính href." },
  { subject: 'html', q: "Để tạo danh sách có thứ tự, ta dùng thẻ nào?", a: "<ol>", o: ["<ul>", "<li>", "<dl>"], e: "<ol> là Ordered List." },
  { subject: 'html', q: "Trong CSS, thuộc tính nào đổi màu chữ?", a: "color", o: ["text-color", "font-color", "bg-color"], e: "Thuộc tính 'color' quy định màu của văn bản." },
  { subject: 'html', q: "Thẻ nào dùng để chèn hình ảnh?", a: "<img>", o: ["<picture>", "<image>", "<src>"], e: "Thẻ <img> với thuộc tính src." },
  { subject: 'html', q: "Thuộc tính target='_blank' trong thẻ <a> có tác dụng gì?", a: "Mở liên kết trong tab/cửa sổ mới", o: ["Mở liên kết tại trang hiện tại", "Tải file xuống", "Không làm gì cả"], e: "Giúp giữ trang hiện tại khi người dùng click link." },

  // --- G. HƯỚNG NGHIỆP (CAREER) ---
  { subject: 'career', q: "Công việc chính của một Data Scientist là gì?", a: "Thu thập, phân tích và khai thác dữ liệu lớn.", o: ["Sửa chữa máy tính.", "Lắp đặt mạng LAN.", "Thiết kế logo."], e: "Khoa học dữ liệu tập trung vào việc trích xuất tri thức từ dữ liệu." },
  { subject: 'career', q: "Kỹ năng quan trọng nhất của Lập trình viên là gì?", a: "Tư duy logic và ngôn ngữ lập trình.", o: ["Kỹ năng vẽ tay.", "Sức khỏe thể chất.", "Khả năng sửa điện."], e: "Cần tư duy giải thuật để viết mã nguồn." },
  { subject: 'career', q: "Chuyên viên An ninh mạng làm gì?", a: "Bảo vệ hệ thống khỏi các cuộc tấn công và lỗ hổng.", o: ["Bán máy tính.", "Viết content marketing.", "Dạy tin học văn phòng."], e: "Đảm bảo an toàn, bảo mật và toàn vẹn dữ liệu." },

  // --- LẬP TRÌNH (PYTHON) ---
  { subject: 'python', q: "Kết quả của print(10 % 3) là gì?", a: "1", o: ["3", "0", "10"], e: "Toán tử % lấy phần dư. 10 chia 3 dư 1." },
  { subject: 'python', q: "Hàm len('Python') trả về giá trị bao nhiêu?", a: "6", o: ["5", "7", "Error"], e: "Độ dài chuỗi 'Python' là 6 ký tự." },
  { subject: 'python', q: "Để kiểm tra số chẵn trong Python, ta dùng điều kiện nào?", a: "x % 2 == 0", o: ["x / 2 == 0", "x % 2 != 0", "x // 2 == 0"], e: "Số chẵn chia hết cho 2 (dư 0)." },
  { subject: 'python', q: "Kiểu dữ liệu của [1, 2, 3] là gì?", a: "list", o: ["tuple", "set", "dict"], e: "Ngoặc vuông [] biểu thị danh sách (list)." },
  { subject: 'python', q: "Kết quả của '3' * 2 trong Python là?", a: "'33'", o: ["6", "'6'", "Error"], e: "Toán tử * với chuỗi sẽ lặp lại chuỗi đó." },

  // --- CƠ SỞ DỮ LIỆU (SQL) ---
  { subject: 'sql', q: "Câu lệnh SQL nào dùng để lấy dữ liệu từ bảng?", a: "SELECT", o: ["GET", "EXTRACT", "PULL"], e: "SELECT * FROM TableName..." },
  { subject: 'sql', q: "Điều kiện WHERE dùng để làm gì?", a: "Lọc các bản ghi thỏa mãn điều kiện.", o: ["Sắp xếp dữ liệu.", "Nhóm dữ liệu.", "Xóa bảng."], e: "Ví dụ: SELECT * FROM HS WHERE Diem > 8." },
  { subject: 'sql', q: "Khóa chính (Primary Key) có đặc điểm gì?", a: "Duy nhất và không được để trống (NULL).", o: ["Có thể trùng lặp.", "Luôn là số.", "Không quan trọng."], e: "Dùng để định danh duy nhất mỗi dòng trong bảng." },
  { subject: 'sql', q: "Lệnh nào dùng để thêm dữ liệu mới?", a: "INSERT INTO", o: ["ADD NEW", "UPDATE", "CREATE"], e: "INSERT INTO TenBang VALUES (...)" },

  // --- ĐA PHƯƠNG TIỆN (MEDIA) ---
  { subject: 'media', q: "Đuôi file .jpg, .png là loại file gì?", a: "Hình ảnh", o: ["Âm thanh", "Video", "Văn bản"], e: "Các định dạng nén ảnh phổ biến." },
  { subject: 'media', q: "Phần mềm nào thường dùng để chỉnh sửa ảnh?", a: "Photoshop", o: ["Excel", "Notepad", "Chrome"], e: "Adobe Photoshop là phần mềm đồ họa raster." },
  { subject: 'media', q: "RGB là viết tắt của các màu nào?", a: "Red, Green, Blue", o: ["Red, Gold, Black", "Rose, Grey, Blue", "Red, Green, Black"], e: "Hệ màu cộng dùng cho màn hình hiển thị." },
  
  // --- CHỦ ĐỀ: SQL & CƠ SỞ DỮ LIỆU (Nâng cao) ---
  {
    subject: 'sql',
    q: "Cho bảng 'DonHang' (MaDH, NgayDat) và 'ChiTietDH' (MaDH, MaSP, SoLuong, DonGia). Câu lệnh SQL nào tính tổng doanh thu theo từng đơn hàng?",
    a: "SELECT MaDH, SUM(SoLuong * DonGia) FROM ChiTietDH GROUP BY MaDH",
    o: [
      "SELECT MaDH, COUNT(SoLuong * DonGia) FROM ChiTietDH GROUP BY MaDH",
      "SELECT MaDH, SUM(SoLuong) FROM ChiTietDH ORDER BY MaDH",
      "SELECT MaDH, (SoLuong * DonGia) FROM ChiTietDH"
    ],
    e: "Cần dùng hàm SUM để cộng dồn tích (Số lượng * Đơn giá) và nhóm theo (GROUP BY) mã đơn hàng."
  },
  {
    subject: 'sql',
    q: "Mệnh đề HAVING trong SQL khác mệnh đề WHERE ở điểm nào?",
    a: "HAVING lọc dữ liệu sau khi đã gom nhóm (GROUP BY), còn WHERE lọc trước khi gom nhóm.",
    o: [
      "HAVING dùng cho dữ liệu số, WHERE dùng cho văn bản.",
      "HAVING luôn đứng trước GROUP BY, WHERE đứng sau.",
      "Hai mệnh đề này hoàn toàn giống nhau."
    ],
    e: "WHERE lọc các bản ghi (rows) riêng lẻ. HAVING lọc các nhóm (groups) được tạo ra bởi GROUP BY (thường đi với các hàm tổng hợp như SUM, COUNT)."
  },
  {
    subject: 'sql',
    q: "Kết quả của phép 'INNER JOIN' giữa hai bảng A và B là gì?",
    a: "Chỉ các bản ghi có giá trị khóa liên kết trùng khớp ở cả hai bảng.",
    o: [
      "Tất cả các bản ghi của bảng A và các bản ghi khớp của bảng B (Left Join).",
      "Tất cả các bản ghi của cả hai bảng (Full Outer Join).",
      "Tích Đề-các của hai bảng (Cross Join)."
    ],
    e: "INNER JOIN chỉ trả về giao của hai tập hợp bản ghi dựa trên điều kiện kết nối."
  },
  {
    subject: 'sql',
    q: "Ràng buộc toàn vẹn tham chiếu (Referential Integrity) đảm bảo điều gì?",
    a: "Giá trị khóa ngoại ở bảng con phải tồn tại làm khóa chính ở bảng cha (hoặc là NULL).",
    o: [
      "Không được phép để trống (NULL) ở tất cả các cột.",
      "Mọi giá trị trong bảng phải là duy nhất.",
      "Dữ liệu nhập vào phải đúng định dạng ngày tháng."
    ],
    e: "Ngăn chặn việc nhập một mã (ví dụ Mã Lớp) vào bảng con mà mã đó chưa tồn tại trong bảng danh mục (bảng cha)."
  },
  {
    subject: 'sql',
    q: "Câu lệnh: 'DELETE FROM HocSinh WHERE Diem < 5' thực hiện việc gì?",
    a: "Xóa các bản ghi trong bảng HocSinh có trường Diem nhỏ hơn 5.",
    o: [
      "Xóa cột Diem khỏi bảng HocSinh.",
      "Xóa toàn bộ bảng HocSinh nếu có điểm nhỏ hơn 5.",
      "Hiển thị các học sinh có điểm nhỏ hơn 5."
    ],
    e: "Lệnh DELETE xóa dòng dữ liệu (bản ghi), không xóa cấu trúc bảng."
  },
  {
    subject: 'sql',
    q: "Để đảm bảo một trường (cột) không bao giờ nhận giá trị trùng lặp, ta dùng ràng buộc nào?",
    a: "UNIQUE",
    o: ["NOT NULL", "CHECK", "DEFAULT"],
    e: "UNIQUE constraint đảm bảo tính duy nhất của dữ liệu trong cột đó (khác với Primary Key là UNIQUE cho phép 1 giá trị NULL tùy hệ quản trị, nhưng Primary Key thì không)."
  },

  // --- CHỦ ĐỀ: TRÍ TUỆ NHÂN TẠO (AI) (Chuyên sâu) ---
  {
    subject: 'ai',
    q: "Trong Học máy (Machine Learning), 'Overfitting' là hiện tượng gì?",
    a: "Mô hình học quá kỹ dữ liệu huấn luyện, dẫn đến dự đoán kém trên dữ liệu mới.",
    o: [
      "Mô hình quá đơn giản, không học được quy luật của dữ liệu.",
      "Mô hình chạy quá chậm do dữ liệu lớn.",
      "Mô hình tự động xóa dữ liệu nhiễu."
    ],
    e: "Overfitting (quá khớp) xảy ra khi mô hình 'học vẹt' các nhiễu trong tập train thay vì học quy luật tổng quát."
  },
  {
    subject: 'ai',
    q: "Phép thử Turing (Turing Test) được dùng để đánh giá điều gì?",
    a: "Khả năng của máy tính thể hiện hành vi thông minh không thể phân biệt với con người.",
    o: [
      "Tốc độ xử lý của CPU so với não bộ.",
      "Khả năng lưu trữ dữ liệu lớn của AI.",
      "Độ chính xác của thuật toán nhận diện khuôn mặt."
    ],
    e: "Nếu người thẩm định không phân biệt được đâu là máy, đâu là người qua giao tiếp văn bản, máy tính vượt qua bài kiểm tra."
  },
  {
    subject: 'ai',
    q: "Hệ chuyên gia (Expert System) khác với các hệ thống AI hiện đại (Deep Learning) ở điểm cốt lõi nào?",
    a: "Dựa trên tập luật (Rules) do con người định nghĩa sẵn thay vì tự học từ dữ liệu.",
    o: [
      "Hệ chuyên gia chạy nhanh hơn Deep Learning.",
      "Hệ chuyên gia không cần máy tính để chạy.",
      "Hệ chuyên gia chỉ xử lý được hình ảnh."
    ],
    e: "Hệ chuyên gia hoạt động dựa trên tri thức 'If-Then' được nạp vào, trong khi Deep Learning tự trích xuất đặc trưng từ dữ liệu."
  },
  {
    subject: 'ai',
    q: "Thuật toán nào sau đây thường được dùng trong bài toán Phân lớp (Classification)?",
    a: "Decision Tree (Cây quyết định)",
    o: ["K-Means Clustering", "Linear Regression (Hồi quy tuyến tính)", "Apriori"],
    e: "Decision Tree dùng để phân lớp dữ liệu dựa trên các quy tắc rẽ nhánh. K-Means là gom cụm (Clustering)."
  },
  {
    subject: 'ai',
    q: "Deepfake là ứng dụng của công nghệ AI nào?",
    a: "GANs (Generative Adversarial Networks)",
    o: ["Expert Systems", "Genetic Algorithms", "Fuzzy Logic"],
    e: "GANs gồm 2 mạng: mạng sinh (Generator) tạo ảnh giả và mạng phân biệt (Discriminator) cố gắng phát hiện ảnh giả, thi đua nhau để tạo ảnh như thật."
  },

  // --- CHỦ ĐỀ: MẠNG MÁY TÍNH & AN NINH MẠNG (Vận dụng) ---
  {
    subject: 'network',
    q: "Giao thức TCP khác UDP ở điểm quan trọng nào?",
    a: "TCP đảm bảo độ tin cậy, truyền lại gói tin lỗi; UDP thì không.",
    o: [
      "TCP nhanh hơn UDP vì không cần thiết lập kết nối.",
      "UDP dùng cho web, TCP dùng cho xem phim.",
      "TCP chỉ hoạt động trong mạng LAN."
    ],
    e: "TCP (Transmission Control Protocol) là giao thức hướng kết nối, đảm bảo toàn vẹn dữ liệu. UDP (User Datagram Protocol) ưu tiên tốc độ (livestream, game)."
  },
  {
    subject: 'network',
    q: "Địa chỉ IP 192.168.1.5/24 có Subnet Mask là bao nhiêu?",
    a: "255.255.255.0",
    o: ["255.255.0.0", "255.0.0.0", "255.255.255.255"],
    e: "/24 nghĩa là 24 bit đầu làm Network ID, tương ứng với 11111111.11111111.11111111.00000000 = 255.255.255.0."
  },
  {
    subject: 'network',
    q: "Tấn công 'Man-in-the-Middle' (MitM) là hình thức tấn công gì?",
    a: "Kẻ tấn công xen vào giữa giao tiếp của hai bên để nghe lén hoặc thay đổi dữ liệu.",
    o: [
      "Làm tràn ngập hệ thống bằng lượng truy cập giả (DDoS).",
      "Gửi email lừa đảo để lấy mật khẩu (Phishing).",
      "Mã hóa dữ liệu tống tiền (Ransomware)."
    ],
    e: "Kẻ tấn công bí mật chuyển tiếp và có thể sửa đổi thông tin trao đổi giữa hai bên mà họ không hề hay biết."
  },
  {
    subject: 'network',
    q: "Giao thức DHCP có chức năng gì trong mạng?",
    a: "Tự động cấp phát địa chỉ IP và cấu hình mạng cho các thiết bị.",
    o: [
      "Phân giải tên miền thành địa chỉ IP.",
      "Truyền tải các trang web siêu văn bản.",
      "Gửi và nhận thư điện tử."
    ],
    e: "Dynamic Host Configuration Protocol giúp thiết bị (client) nhận IP động từ Router/Server."
  },
  {
    subject: 'network',
    q: "Mô hình OSI có bao nhiêu tầng và tầng nào chịu trách nhiệm định tuyến (routing)?",
    a: "7 tầng - Tầng Network (Mạng)",
    o: [
      "4 tầng - Tầng Internet",
      "7 tầng - Tầng Transport",
      "5 tầng - Tầng Data Link"
    ],
    e: "Router hoạt động ở tầng 3 (Network Layer) của mô hình OSI."
  },

  // --- CHỦ ĐỀ: ĐẠO ĐỨC, PHÁP LUẬT & XÃ HỘI (Tình huống) ---
  {
    subject: 'ethics',
    q: "Theo Luật An ninh mạng Việt Nam, hành vi nào bị nghiêm cấm tuyệt đối?",
    a: "Sử dụng không gian mạng để tổ chức, hoạt động chống Nhà nước CHXHCN Việt Nam.",
    o: [
      "Kinh doanh online không đăng ký.",
      "Sử dụng tên giả (nickname) trên mạng xã hội.",
      "Truy cập vào các trang web nước ngoài."
    ],
    e: "Điều 8 Luật An ninh mạng quy định các hành vi bị nghiêm cấm, bao gồm xâm phạm an ninh quốc gia."
  },
  {
    subject: 'ethics',
    q: "Bạn nhận được email từ 'Facebook' yêu cầu click vào link lạ để đổi mật khẩu ngay lập tức. Đây là dấu hiệu của?",
    a: "Phishing (Tấn công lừa đảo)",
    o: ["DDoS Attack", "SQL Injection", "Brute Force Attack"],
    e: "Kẻ tấn công giả mạo giao diện/email của tổ chức uy tín để lừa người dùng nhập thông tin nhạy cảm."
  },
  {
    subject: 'ethics',
    q: "Creative Commons (CC) là gì?",
    a: "Một loại giấy phép công cộng cho phép tác giả chia sẻ tác phẩm với các quyền nhất định.",
    o: [
      "Một phần mềm chỉnh sửa ảnh miễn phí.",
      "Một tổ chức bảo mật mạng quốc tế.",
      "Một loại virus máy tính lây lan qua ảnh."
    ],
    e: "Giấy phép CC giúp tác giả cho phép cộng đồng sử dụng lại tác phẩm của mình (ví dụ: được chia sẻ nhưng phải ghi nguồn)."
  },

  // --- CHỦ ĐỀ: PYTHON (Code logic khó) ---
  {
    subject: 'python',
    code: "x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)",
    q: "Kết quả của đoạn chương trình trên là gì?",
    a: "[1, 2, 3, 4]",
    o: ["[1, 2, 3]", "Lỗi chương trình", "[4, 1, 2, 3]"],
    e: "Trong Python, gán list y = x là tham chiếu (reference) đến cùng một vùng nhớ. Thay đổi y sẽ làm thay đổi x."
  },
  {
    subject: 'python',
    code: "print([i for i in range(5) if i % 2 == 0])",
    q: "List Comprehension trên tạo ra danh sách nào?",
    a: "[0, 2, 4]",
    o: ["[1, 3, 5]", "[2, 4]", "[0, 1, 2, 3, 4]"],
    e: "range(5) tạo 0,1,2,3,4. Điều kiện if i % 2 == 0 lọc các số chẵn (bao gồm 0)."
  },
  {
    subject: 'python',
    code: "def func(a, b=[]):\n    b.append(a)\n    return b\nprint(func(1))\nprint(func(2))",
    q: "Kết quả in ra màn hình là gì? (Lưu ý về Mutable Default Argument)",
    a: "[1] và [1, 2]",
    o: ["[1] và [2]", "[1] và [1]", "Lỗi cú pháp"],
    e: "Trong Python, giá trị mặc định của tham số (list b) được khởi tạo một lần duy nhất. Các lần gọi hàm sau sẽ dùng tiếp list b đã bị thay đổi trước đó."
  },
  {
    subject: 'python',
    code: "d = {1: 'a', 2: 'b'}\nprint(d.get(3, 'c'))",
    q: "Phương thức get() trả về giá trị gì?",
    a: "'c'",
    o: ["None", "Lỗi KeyError", "'b'"],
    e: "d.get(key, default) trả về giá trị default nếu key không tồn tại trong dictionary."
  },

  // --- CHỦ ĐỀ: HTML & CSS (Web Design) ---
  {
    subject: 'html',
    q: "Trong CSS, 'Box Model' bao gồm các thành phần nào (từ trong ra ngoài)?",
    a: "Content -> Padding -> Border -> Margin",
    o: [
      "Content -> Margin -> Border -> Padding",
      "Border -> Padding -> Content -> Margin",
      "Padding -> Content -> Margin -> Border"
    ],
    e: "Box Model quy định cấu trúc hộp của phần tử: Nội dung, vùng đệm (padding), viền (border), và lề (margin)."
  },
  {
    subject: 'html',
    q: "Độ ưu tiên (Specificity) của CSS Selector nào cao nhất?",
    a: "ID selector (#id)",
    o: ["Class selector (.class)", "Tag selector (div, p)", "Universal selector (*)"],
    e: "Thứ tự ưu tiên: Inline style > ID > Class/Attribute/Pseudo-class > Tag/Pseudo-element."
  },
  {
    subject: 'html',
    q: "Thẻ <meta name='viewport' ...> có tác dụng chính là gì?",
    a: "Giúp trang web hiển thị tốt trên các thiết bị di động (Responsive).",
    o: [
      "Tăng tốc độ tải trang.",
      "Khai báo bảng mã ký tự UTF-8.",
      "Chặn người dùng copy nội dung."
    ],
    e: "Viewport điều khiển kích thước và tỷ lệ hiển thị trên màn hình di động."
  },

  // --- CHỦ ĐỀ: HƯỚNG NGHIỆP (Thực tế) ---
  {
    subject: 'career',
    q: "Vai trò chính của một 'Full-stack Developer' là gì?",
    a: "Có khả năng làm việc cả Front-end (giao diện) và Back-end (xử lý server/CSDL).",
    o: [
      "Chỉ chuyên thiết kế đồ họa game.",
      "Chỉ chuyên về bảo mật mạng.",
      "Quản lý dự án không cần viết code."
    ],
    e: "Full-stack nghĩa là nắm vững trọn vẹn các tầng công nghệ của ứng dụng web."
  },
  {
    subject: 'career',
    q: "Chứng chỉ nào sau đây được đánh giá cao trong lĩnh vực Mạng máy tính?",
    a: "CCNA (Cisco Certified Network Associate)",
    o: ["IELTS", "MOS Excel", "TOEIC"],
    e: "CCNA là chứng chỉ quốc tế uy tín về kiến thức và kỹ năng mạng của Cisco."
  },
  
  // --- BỔ SUNG CÂU HỎI VẬN DỤNG CAO KHÁC ---
  {
    subject: 'sql',
    q: "Khi nào nên tạo Index (Chỉ mục) cho một cột trong CSDL?",
    a: "Khi cột đó thường xuyên được dùng trong điều kiện tìm kiếm (WHERE) hoặc nối bảng (JOIN).",
    o: [
      "Luôn tạo Index cho tất cả các cột để nhanh nhất.",
      "Khi cột đó có quá ít giá trị khác nhau (VD: Nam/Nữ).",
      "Khi muốn tiết kiệm dung lượng ổ cứng."
    ],
    e: "Index giúp tìm kiếm nhanh nhưng làm chậm thao tác ghi (INSERT/UPDATE) và tốn dung lượng. Chỉ nên tạo ở các cột hay truy vấn."
  },
  {
    subject: 'ai',
    q: "Thuật ngữ 'IoT' (Internet of Things) đề cập đến điều gì?",
    a: "Mạng lưới các thiết bị vật lý kết nối internet, có khả năng thu thập và chia sẻ dữ liệu.",
    o: [
      "Một phần mềm diệt virus mới.",
      "Mạng xã hội dành cho các đồ vật.",
      "Công nghệ thực tế ảo."
    ],
    e: "IoT biến các đồ vật vô tri (bóng đèn, tủ lạnh, cảm biến) trở nên thông minh nhờ kết nối mạng."
  },
  
  // ========================================================================
  // 1. CHỦ ĐỀ: SQL & CƠ SỞ DỮ LIỆU (Nâng cao - Subquery, Join, Transaction)
  // ========================================================================
  {
    subject: 'sql',
    q: "Để lấy danh sách khách hàng chưa từng đặt hàng, câu truy vấn nào tối ưu nhất?",
    a: "SELECT * FROM KhachHang WHERE MaKH NOT IN (SELECT MaKH FROM DonHang)",
    o: [
      "SELECT * FROM KhachHang INNER JOIN DonHang ON KhachHang.MaKH = DonHang.MaKH",
      "SELECT * FROM DonHang WHERE MaKH IS NULL",
      "DELETE FROM KhachHang WHERE MaKH IN (SELECT MaKH FROM DonHang)"
    ],
    e: "Sử dụng Subquery với NOT IN (hoặc LEFT JOIN kiểm tra NULL) để tìm các bản ghi không có liên kết ở bảng bên kia."
  },
  {
    subject: 'sql',
    q: "Kết quả của truy vấn: SELECT COUNT(MaNV), COUNT(DISTINCT MaNV) FROM NhanVien ... sẽ khác nhau khi nào?",
    a: "Khi cột MaNV có các giá trị trùng lặp.",
    o: [
      "Khi cột MaNV có chứa giá trị NULL.",
      "Hai hàm này luôn trả về kết quả giống nhau.",
      "Khi bảng NhanVien không có dữ liệu."
    ],
    e: "COUNT(Cột) đếm tất cả các dòng không NULL, còn COUNT(DISTINCT Cột) chỉ đếm các giá trị duy nhất (loại bỏ trùng lặp)."
  },
  {
    subject: 'sql',
    q: "Trong SQL, 'Self Join' (kết nối chính bảng đó với nó) thường dùng để giải quyết bài toán nào?",
    a: "Tìm các cặp bản ghi trong cùng một bảng có mối quan hệ (VD: Nhân viên và Quản lý cùng bảng).",
    o: [
      "Sao chép bảng ra một bảng mới.",
      "Xóa các dòng trùng lặp trong bảng.",
      "Tự động tạo khóa chính cho bảng."
    ],
    e: "Self Join dùng để so sánh các dòng trong cùng một bảng hoặc truy xuất cấu trúc phân cấp (Cha-Con) trong 1 bảng."
  },
  {
    subject: 'sql',
    q: "Mục đích chính của 'Transaction' (Giao dịch) với các lệnh COMMIT/ROLLBACK là gì?",
    a: "Đảm bảo tính toàn vẹn dữ liệu (ACID): Tất cả lệnh thành công hoặc không lệnh nào được thực thi.",
    o: [
      "Tăng tốc độ thực thi câu lệnh SELECT.",
      "Tự động sao lưu dữ liệu hàng ngày.",
      "Mã hóa dữ liệu trước khi lưu xuống đĩa."
    ],
    e: "Nếu một bước trong giao dịch lỗi, ROLLBACK sẽ hoàn tác mọi thay đổi trước đó, giữ data nhất quán."
  },
  {
    subject: 'sql',
    q: "Khi nào mệnh đề HAVING được xử lý trong thứ tự thực thi của câu lệnh SELECT?",
    a: "Sau GROUP BY và trước ORDER BY.",
    o: [
      "Trước WHERE và GROUP BY.",
      "Sau ORDER BY.",
      "Đầu tiên, trước cả SELECT."
    ],
    e: "Thứ tự: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY."
  },
  {
    subject: 'sql',
    q: "Ràng buộc 'CHECK' trong tạo bảng dùng để làm gì?",
    a: "Đảm bảo dữ liệu nhập vào thỏa mãn một điều kiện logic cụ thể (VD: Tuoi > 18).",
    o: [
      "Kiểm tra xem dữ liệu có trùng khóa chính không.",
      "Tự động điền ngày giờ hiện tại.",
      "Liên kết với bảng khác."
    ],
    e: "CHECK giúp hạn chế miền giá trị của dữ liệu ngay tại mức cơ sở dữ liệu."
  },
  {
    subject: 'sql',
    q: "Câu lệnh TRUNCATE TABLE khác DELETE FROM ở điểm cốt yếu nào?",
    a: "TRUNCATE xóa toàn bộ dữ liệu nhanh hơn, không ghi log chi tiết từng dòng và reset bộ đếm ID.",
    o: [
      "TRUNCATE có thể dùng kèm mệnh đề WHERE để lọc dòng xóa.",
      "DELETE xóa cả cấu trúc bảng, TRUNCATE chỉ xóa dữ liệu.",
      "Hai lệnh này hoàn toàn giống nhau."
    ],
    e: "TRUNCATE là lệnh DDL (nhanh, reset ID), DELETE là lệnh DML (chậm hơn, không reset ID, rollback được)."
  },

  // ========================================================================
  // 2. CHỦ ĐỀ: HTML & CSS (Deep Dive - Specificity, Box Model, Layout)
  // ========================================================================
  {
    subject: 'html',
    q: "Độ ưu tiên (Specificity) của bộ chọn CSS nào là cao nhất trong các phương án sau?",
    a: "Inline Style (style='...')",
    o: ["ID Selector (#header)", "Class Selector (.menu)", "Tag Selector (div)"],
    e: "Thứ tự ưu tiên: !important > Inline Style > ID > Class/Attribute > Tag."
  },
  {
    subject: 'html',
    q: "Thuộc tính 'box-sizing: border-box' có tác dụng gì quan trọng trong Layout?",
    a: "Tính cả padding và border vào kích thước tổng (width/height) của phần tử.",
    o: [
      "Chỉ tính content vào width, padding và border tính thêm ra ngoài.",
      "Tạo đường viền bao quanh hộp.",
      "Căn giữa nội dung trong hộp."
    ],
    e: "Mặc định (content-box) width chỉ là nội dung. border-box giúp layout không bị vỡ khi thêm padding/border."
  },
  {
    subject: 'html',
    q: "Giá trị 'position: absolute' định vị phần tử dựa trên cái gì?",
    a: "Dựa trên phần tử cha gần nhất có thuộc tính position (khác static).",
    o: [
      "Luôn dựa trên cửa sổ trình duyệt (viewport).",
      "Dựa trên vị trí ban đầu của nó trong dòng chảy tài liệu.",
      "Dựa trên phần tử đứng liền trước nó."
    ],
    e: "Nếu không có cha nào có position, nó mới dựa vào body/html. Khác với 'fixed' là luôn theo viewport."
  },
  {
    subject: 'html',
    q: "Pseudo-class ':nth-child(2n)' sẽ chọn các phần tử nào?",
    a: "Các phần tử con ở vị trí chẵn (2, 4, 6...).",
    o: [
      "Các phần tử con ở vị trí lẻ.",
      "Hai phần tử con đầu tiên.",
      "Tất cả các phần tử con trừ phần tử thứ 2."
    ],
    e: "2n tương đương với 'even' (chẵn). 2n+1 là 'odd' (lẻ)."
  },
  {
    subject: 'html',
    q: "Thẻ <meta charset='UTF-8'> có chức năng quan trọng gì?",
    a: "Khai báo bảng mã ký tự, giúp hiển thị đúng tiếng Việt và các ngôn ngữ khác.",
    o: [
      "Tối ưu hóa SEO cho Google.",
      "Khai báo tiêu đề của trang web.",
      "Liên kết với file CSS."
    ],
    e: "Nếu thiếu thẻ này, trình duyệt có thể hiển thị lỗi font chữ (ký tự lạ) với tiếng Việt."
  },
  {
    subject: 'html',
    q: "Trong Flexbox, thuộc tính 'justify-content: space-between' làm gì?",
    a: "Phân bố các phần tử con: cái đầu sát mép trái, cái cuối sát mép phải, khoảng trống ở giữa đều nhau.",
    o: [
      "Căn tất cả phần tử vào giữa.",
      "Tạo khoảng trống đều xung quanh mỗi phần tử.",
      "Căn tất cả phần tử sang phải."
    ],
    e: "Rất hữu ích để làm menu hoặc header có logo bên trái và nút bên phải."
  },
  {
    subject: 'html',
    q: "Thẻ <input type='hidden'> thường được dùng để làm gì?",
    a: "Gửi dữ liệu ngầm lên server mà người dùng không nhìn thấy (VD: ID người dùng, Token).",
    o: [
      "Ẩn mật khẩu người dùng nhập vào.",
      "Làm nút reset form.",
      "Tạo ô nhập liệu bị mờ đi."
    ],
    e: "Dữ liệu vẫn được gửi đi khi submit form nhưng không hiển thị trên giao diện."
  },

  // ========================================================================
  // 3. CHỦ ĐỀ: MẠNG MÁY TÍNH & AN NINH (Giao thức, Mô hình OSI, Tấn công)
  // ========================================================================
  {
    subject: 'network',
    q: "Trong mô hình OSI, Router hoạt động chủ yếu ở tầng nào?",
    a: "Tầng 3 - Network Layer (Tầng Mạng)",
    o: ["Tầng 2 - Data Link Layer", "Tầng 4 - Transport Layer", "Tầng 1 - Physical Layer"],
    e: "Router xử lý địa chỉ IP và định tuyến gói tin (Packets) tại tầng Mạng."
  },
  {
    subject: 'network',
    q: "Giao thức DHCP có vai trò gì trong mạng?",
    a: "Tự động cấp phát địa chỉ IP, Subnet Mask, Gateway cho các thiết bị.",
    o: [
      "Phân giải tên miền thành địa chỉ IP.",
      "Truyền tải file giữa các máy tính.",
      "Gửi email qua mạng."
    ],
    e: "Dynamic Host Configuration Protocol giúp người dùng không cần cài đặt IP thủ công."
  },
  {
    subject: 'network',
    q: "Tấn công DDoS (Distributed Denial of Service) hoạt động như thế nào?",
    a: "Huy động một mạng lưới máy tính (Botnet) gửi dồn dập yêu cầu giả mạo làm tê liệt hệ thống.",
    o: [
      "Cài phần mềm gián điệp để đánh cắp mật khẩu.",
      "Giả mạo trang web ngân hàng để lừa tiền.",
      "Nghe lén dữ liệu truyền trên Wifi."
    ],
    e: "Mục đích là làm quá tải tài nguyên (băng thông, CPU) khiến người dùng thật không truy cập được."
  },
  {
    subject: 'network',
    q: "Địa chỉ IP 127.0.0.1 (Loopback Address) dùng để làm gì?",
    a: "Kiểm tra kết nối mạng nội tại trên chính máy tính đó (localhost).",
    o: [
      "Kết nối ra Internet quốc tế.",
      "Đại diện cho địa chỉ Broadcast của mạng.",
      "Là địa chỉ IP của Router."
    ],
    e: "Gửi tin đến 127.0.0.1 là gửi tin cho chính mình, không đi qua card mạng ra ngoài."
  },
  {
    subject: 'network',
    q: "Cổng (Port) mặc định của giao thức HTTPS là bao nhiêu?",
    a: "443",
    o: ["80 (HTTP)", "21 (FTP)", "25 (SMTP)"],
    e: "HTTPS sử dụng port 443 để truyền tải dữ liệu web được mã hóa (SSL/TLS)."
  },
  {
    subject: 'network',
    q: "Thiết bị nào có khả năng chia nhỏ Collision Domain (miền xung đột) nhưng vẫn chung Broadcast Domain?",
    a: "Switch",
    o: ["Hub", "Repeater", "Router (chia cả Broadcast Domain)"],
    e: "Mỗi cổng của Switch là một Collision Domain riêng, giúp giảm xung đột dữ liệu so với Hub."
  },

  // ========================================================================
  // 4. CHỦ ĐỀ: TRÍ TUỆ NHÂN TẠO (AI) (Deep Learning, Ứng dụng)
  // ========================================================================
  {
    subject: 'ai',
    q: "Thuật toán 'Backpropagation' (Lan truyền ngược) đóng vai trò gì trong Neural Network?",
    a: "Điều chỉnh trọng số (weights) của mạng dựa trên sai số để tối ưu hóa mô hình.",
    o: [
      "Tăng tốc độ xử lý dữ liệu đầu vào.",
      "Xóa bỏ các nơ-ron không cần thiết.",
      "Tự động tạo ra dữ liệu mới."
    ],
    e: "Đây là cơ chế cốt lõi để mạng nơ-ron 'học' và giảm thiểu sai số dự đoán."
  },
  {
    subject: 'ai',
    q: "Turing Test (Phép thử Turing) nhằm mục đích gì?",
    a: "Đánh giá xem máy tính có khả năng thể hiện trí tuệ giống con người hay không.",
    o: [
      "Đo tốc độ tính toán của CPU.",
      "Kiểm tra khả năng bảo mật của AI.",
      "Đo dung lượng lưu trữ tri thức."
    ],
    e: "Nếu người đánh giá không phân biệt được đang chat với máy hay người, máy tính vượt qua bài test."
  },
  {
    subject: 'ai',
    q: "Trong Học máy (Machine Learning), dữ liệu 'Label' (Nhãn) cần thiết cho loại học nào?",
    a: "Supervised Learning (Học có giám sát).",
    o: [
      "Unsupervised Learning (Học không giám sát).",
      "Reinforcement Learning (Học tăng cường).",
      "Clustering (Gom cụm)."
    ],
    e: "Học có giám sát cần cặp dữ liệu (Input, Output/Label) để dạy mô hình (VD: Ảnh con mèo -> Nhãn 'Mèo')."
  },
  {
    subject: 'ai',
    q: "AI 'yếu' (Weak AI) hay AI hẹp (Narrow AI) có đặc điểm gì?",
    a: "Chỉ thực hiện tốt một nhiệm vụ cụ thể được lập trình sẵn (VD: Chơi cờ, Dịch thuật).",
    o: [
      "Có ý thức và cảm xúc như con người.",
      "Có thể giải quyết mọi vấn đề trong cuộc sống.",
      "Tự nhận thức được sự tồn tại của mình."
    ],
    e: "Hầu hết AI hiện nay (Siri, Google Search, AlphaGo) đều là AI hẹp."
  },

  // ========================================================================
  // 5. CHỦ ĐỀ: PYTHON (Code Logic, List Comprehension, Scope)
  // ========================================================================
  {
    subject: 'python',
    code: "print([i**2 for i in range(5) if i % 2 == 0])",
    q: "List Comprehension này tạo ra danh sách nào?",
    a: "[0, 4, 16]",
    o: ["[0, 1, 4, 9, 16]", "[4, 16]", "[0, 2, 4]"],
    e: "range(5) là 0,1,2,3,4. Lấy số chẵn (0, 2, 4). Bình phương lên là 0, 4, 16."
  },
  {
    subject: 'python',
    code: "x = 'Python'\nprint(x[::-1])",
    q: "Lệnh slicing này thực hiện việc gì?",
    a: "Đảo ngược chuỗi -> 'nohtyP'",
    o: ["Lấy ký tự cuối cùng.", "Lấy ký tự đầu tiên.", "In nguyên văn chuỗi."],
    e: "Cú pháp [start:stop:step]. Step = -1 nghĩa là duyệt ngược từ cuối về đầu."
  },
  {
    subject: 'python',
    q: "Hàm nào dùng để chuyển đổi một chuỗi thành số nguyên?",
    a: "int()",
    o: ["str()", "float()", "char()"],
    e: "int('123') sẽ trả về số nguyên 123."
  },

  // ========================================================================
  // 6. CHỦ ĐỀ: ĐẠO ĐỨC & HƯỚNG NGHIỆP (Luật An Ninh Mạng, Kỹ năng mềm)
  // ========================================================================
  {
    subject: 'ethics',
    q: "Phishing (Lừa đảo trực tuyến) thường sử dụng phương thức nào?",
    a: "Gửi email/tin nhắn giả mạo tổ chức uy tín để dụ người dùng nhập mật khẩu/OTP.",
    o: [
      "Tấn công trực tiếp vào máy chủ bằng mã độc.",
      "Nghe lén đường truyền cáp quang.",
      "Làm chậm mạng bằng cách gửi nhiều gói tin."
    ],
    e: "Phishing đánh vào yếu tố con người (nhẹ dạ, thiếu cảnh giác) hơn là lỗi kỹ thuật."
  },
  {
    subject: 'career',
    q: "Kỹ năng quan trọng nhất của một Data Scientist (Khoa học dữ liệu) là gì?",
    a: "Kết hợp Toán thống kê, Lập trình và Kiến thức nghiệp vụ để khai thác dữ liệu.",
    o: [
      "Khả năng lắp ráp máy tính nhanh.",
      "Kỹ năng vẽ tay đẹp.",
      "Khả năng sửa chữa máy in."
    ],
    e: "Data Scientist cần biến dữ liệu thô thành tri thức có giá trị (Insight)."
  },

  {
    subject: 'media',
    q: "Sự khác biệt cơ bản nhất giữa đồ họa Vector (SVG, AI) và đồ họa Raster (JPG, PNG) là gì?",
    a: "Vector dựa trên thuật toán toán học (đường, điểm), phóng to không vỡ; Raster dựa trên ma trận điểm ảnh (pixel), phóng to bị vỡ.",
    o: [
      "Vector dùng cho in ấn (CMYK), Raster dùng cho màn hình (RGB).",
      "Vector có dung lượng file luôn lớn hơn Raster.",
      "Raster có thể chuyển sang Vector dễ dàng, nhưng Vector không thể chuyển sang Raster."
    ],
    e: "Ảnh Vector lưu trữ các công thức vẽ hình nên độ nét độc lập với độ phân giải. Ảnh Raster (bitmap) lưu trữ màu sắc từng pixel cố định."
  },
  {
    subject: 'media',
    q: "Hệ màu CMYK (Cyan, Magenta, Yellow, Key/Black) thường được sử dụng trong lĩnh vực nào?",
    a: "In ấn và thiết kế bao bì (Hệ màu trừ).",
    o: [
      "Hiển thị trên màn hình máy tính, điện thoại (Hệ màu cộng).",
      "Chụp ảnh kỹ thuật số.",
      "Truyền hình vệ tinh."
    ],
    e: "Khi in ấn, ta trộn mực để tạo màu (trừ ánh sáng phản xạ). Màn hình dùng RGB (phát sáng trực tiếp)."
  },
  {
    subject: 'media',
    q: "Trong âm thanh số, 'Sample Rate' (Tần số lấy mẫu - VD: 44.1kHz) đại diện cho điều gì?",
    a: "Số lần mẫu âm thanh được đo/ghi lại trong một giây.",
    o: [
      "Độ lớn (âm lượng) của âm thanh.",
      "Số bit dùng để lưu trữ một mẫu âm thanh.",
      "Tốc độ nén file âm thanh."
    ],
    e: "Tần số lấy mẫu càng cao (VD: 48kHz, 96kHz) thì việc tái tạo sóng âm thanh càng chính xác so với thực tế."
  },
  {
    subject: 'media',
    q: "Định dạng ảnh nào hỗ trợ nền trong suốt (Transparency) và nén không mất dữ liệu (Lossless)?",
    a: "PNG (Portable Network Graphics)",
    o: ["JPG (JPEG)", "BMP (Bitmap)", "SVG (Scalable Vector Graphics)"],
    e: "JPG nén mất dữ liệu và không hỗ trợ trong suốt. PNG hỗ trợ kênh Alpha (độ trong suốt) và nén bảo toàn chất lượng."
  },

  // ========================================================================
  // CHỦ ĐỀ: SQL & CSDL (Gài bẫy & Hiệu năng)
  // ========================================================================
  {
    subject: 'sql',
    q: "Sự khác biệt giữa 'UNION' và 'UNION ALL' khi gộp kết quả 2 câu truy vấn là gì?",
    a: "UNION loại bỏ các dòng trùng lặp (chậm hơn), UNION ALL giữ lại tất cả (nhanh hơn).",
    o: [
      "UNION giữ lại trùng lặp, UNION ALL loại bỏ trùng lặp.",
      "UNION dùng cho số, UNION ALL dùng cho chuỗi.",
      "UNION nối cột (ngang), UNION ALL nối dòng (dọc)."
    ],
    e: "Vì UNION phải thực hiện thêm bước kiểm tra và xóa trùng lặp (distinct) nên hiệu năng thấp hơn UNION ALL."
  },
  {
    subject: 'sql',
    q: "Trong mô hình quan hệ, 'Khóa ngoại' (Foreign Key) có thể nhận giá trị NULL không?",
    a: "Có, trừ khi cột đó được định nghĩa ràng buộc NOT NULL.",
    o: [
      "Không bao giờ, khóa ngoại bắt buộc phải có dữ liệu.",
      "Chỉ được NULL nếu khóa chính bảng tham chiếu cũng NULL.",
      "Luôn luôn phải là NULL."
    ],
    e: "Khóa ngoại có thể NULL (thể hiện mối quan hệ không bắt buộc), nhưng nếu có giá trị thì phải tồn tại bên bảng cha."
  },
  {
    subject: 'sql',
    q: "Kết quả của biểu thức: SELECT NULL + 10 sẽ là gì?",
    a: "NULL",
    o: ["10", "0", "Error"],
    e: "Trong SQL, mọi phép toán cộng trừ nhân chia với NULL đều trả về NULL (Giá trị không xác định)."
  },

  // ========================================================================
  // CHỦ ĐỀ: HTML & CSS (Advanced Layout & Behavior)
  // ========================================================================
  {
    subject: 'html',
    q: "Thuộc tính 'z-index' chỉ hoạt động trên các phần tử có thuộc tính 'position' là gì?",
    a: "relative, absolute, fixed, hoặc sticky (Khác static).",
    o: [
      "Tất cả mọi phần tử (bao gồm static).",
      "Chỉ phần tử có display: flex.",
      "Chỉ phần tử float: left."
    ],
    e: "Mặc định position là static, lúc này z-index bị vô hiệu hóa. Phải set position khác static để xếp lớp layer."
  },
  {
    subject: 'html',
    q: "Sự khác biệt giữa 'display: none' và 'visibility: hidden' là gì?",
    a: "display: none xóa phần tử khỏi cấu trúc trang (không chiếm chỗ); visibility: hidden chỉ ẩn đi nhưng vẫn chiếm chỗ.",
    o: [
      "display: none vẫn chiếm chỗ trống, visibility: hidden thì không.",
      "Hai thuộc tính này hoàn toàn giống nhau.",
      "display: none dùng cho ảnh, visibility: hidden dùng cho văn bản."
    ],
    e: "Đây là câu hỏi kinh điển về Layout. Dùng visibility: hidden nếu muốn giữ layout không bị xô lệch."
  },
  {
    subject: 'html',
    q: "Đơn vị 'vh' và 'vw' trong CSS tương ứng với cái gì?",
    a: "1% chiều cao (vh) và 1% chiều rộng (vw) của khung nhìn (viewport).",
    o: [
      "1% kích thước phần tử cha.",
      "1 pixel màn hình.",
      "1% kích thước của file HTML."
    ],
    e: "100vh = toàn bộ chiều cao màn hình trình duyệt. Rất hữu ích khi làm các trang landing page full màn hình."
  },

  // ========================================================================
  // CHỦ ĐỀ: PYTHON (Các lỗi tư duy thường gặp)
  // ========================================================================
  {
    subject: 'python',
    code: "print(0.1 + 0.2 == 0.3)",
    q: "Kết quả của phép so sánh trên là gì?",
    a: "False",
    o: ["True", "Error", "None"],
    e: "Do sai số của dấu phẩy động (Floating Point Arithmetic) trong máy tính, 0.1 + 0.2 thực tế là 0.30000000000000004."
  },
  {
    subject: 'python',
    code: "def test(*args):\n    print(type(args))\ntest(1, 2, 3)",
    q: "Kiểu dữ liệu của biến 'args' bên trong hàm là gì?",
    a: "<class 'tuple'>",
    o: ["<class 'list'>", "<class 'set'>", "<class 'dict'>"],
    e: "Toán tử * gom các tham số truyền vào thành một Tuple bất biến."
  },
  {
    subject: 'python',
    code: "x = 10\ndef my_func():\n    print(x)\n    x = 20\nmy_func()",
    q: "Đoạn code trên sẽ gây ra lỗi gì?",
    a: "UnboundLocalError",
    o: ["In ra 10 rồi gán 20", "In ra 20", "NameError"],
    e: "Python thấy phép gán 'x = 20' trong hàm nên coi x là biến cục bộ. Nhưng lệnh print(x) lại gọi trước khi gán -> Lỗi chưa khởi tạo."
  },

  {
    subject: 'network',
    q: "Giao thức WPA3 trong mạng Wifi cải tiến điều gì lớn nhất so với WPA2?",
    a: "Chống lại các cuộc tấn công từ điển (Brute-force) và mã hóa dữ liệu cá nhân tốt hơn (SAE).",
    o: [
      "Tăng tốc độ truyền tải dữ liệu lên gấp đôi.",
      "Cho phép kết nối nhiều thiết bị hơn.",
      "Loại bỏ hoàn toàn nhu cầu nhập mật khẩu."
    ],
    e: "WPA3 sử dụng giao thức SAE (Simultaneous Authentication of Equals) thay thế cho PSK cũ, giúp an toàn hơn ngay cả khi mật khẩu yếu."
  },
  {
    subject: 'network',
    q: "VPN (Mạng riêng ảo) giúp bảo vệ dữ liệu người dùng bằng cách nào?",
    a: "Tạo một 'đường hầm' mã hóa giữa thiết bị và máy chủ VPN, ẩn địa chỉ IP thật.",
    o: [
      "Diệt virus trên máy tính người dùng.",
      "Tăng băng thông internet miễn phí.",
      "Chặn tất cả các quảng cáo trên web."
    ],
    e: "Dữ liệu đi qua đường hầm (tunnel) được mã hóa, nên nhà cung cấp mạng (ISP) hay hacker không thể đọc được nội dung."
  },
  {
    subject: 'network',
    q: "Firewall (Tường lửa) hoạt động dựa trên nguyên tắc cơ bản nào?",
    a: "Kiểm soát lưu lượng ra/vào dựa trên bộ quy tắc (Rules) được định nghĩa trước.",
    o: [
      "Tự động tấn công lại hacker.",
      "Mã hóa toàn bộ ổ cứng.",
      "Sao lưu dữ liệu đám mây."
    ],
    e: "Tường lửa (Packet filtering) xem xét IP nguồn, IP đích, cổng (port) để quyết định cho phép (Allow) hay chặn (Deny/Drop)."
  },

  // ========================================================================
  // CHỦ ĐỀ: SQL & CSDL (Lý thuyết Chuẩn hóa - Normalization)
  // ========================================================================
  {
    subject: 'sql',
    q: "Dạng chuẩn 1 (1NF) trong CSDL quan hệ yêu cầu điều gì?",
    a: "Giá trị tại mỗi ô (cột) phải là nguyên tố (Atomic), không chứa danh sách hay nhóm lặp.",
    o: [
      "Phải có khóa chính và khóa ngoại.",
      "Không được có thuộc tính phụ thuộc bắc cầu.",
      "Tất cả các bảng phải có số dòng bằng nhau."
    ],
    e: "Ví dụ: Một ô 'SoDienThoai' chứa '0901, 0902' là vi phạm 1NF. Phải tách thành dòng riêng hoặc bảng riêng."
  },
  {
    subject: 'sql',
    q: "Hiện tượng 'Dirty Read' trong giao dịch (Transaction) xảy ra khi nào?",
    a: "Khi một giao dịch đọc dữ liệu chưa được COMMIT bởi một giao dịch khác.",
    o: [
      "Khi dữ liệu bị xóa nhầm.",
      "Khi hai giao dịch cùng đọc một dữ liệu đã COMMIT.",
      "Khi ổ cứng bị hỏng sector."
    ],
    e: "Nếu giao dịch kia ROLLBACK (hủy bỏ), dữ liệu mà giao dịch này vừa đọc sẽ trở thành rác (không tồn tại)."
  },
  {
    subject: 'sql',
    q: "Câu lệnh SQL: 'SELECT * FROM BangA CROSS JOIN BangB' sẽ trả về bao nhiêu dòng?",
    a: "Tích của số dòng BangA nhân với số dòng BangB (M * N).",
    o: [
      "Tổng số dòng của hai bảng (M + N).",
      "Số dòng của bảng lớn hơn.",
      "Chỉ những dòng có khóa chung."
    ],
    e: "CROSS JOIN (Tích Đề-các) ghép mỗi dòng của bảng A với tất cả các dòng của bảng B."
  },

  // ========================================================================
  // CHỦ ĐỀ: PYTHON (Tư duy giải thuật & Cạm bẫy)
  // ========================================================================
  {
    subject: 'python',
    code: "print(1 or 1/0)",
    q: "Kết quả của biểu thức trên là gì? (Cạm bẫy Short-circuit)",
    a: "1",
    o: ["Lỗi ZeroDivisionError", "0", "True"],
    e: "Trong phép OR, nếu vế trái là True (số khác 0), Python trả về vế trái ngay mà KHÔNG tính toán vế phải (bỏ qua lỗi 1/0)."
  },
  {
    subject: 'python',
    code: "x = 10\ndef foo():\n    global x\n    x += 1\nfoo()\nprint(x)",
    q: "Từ khóa 'global' có tác dụng gì ở đây?",
    a: "Cho phép hàm thay đổi giá trị của biến x nằm ngoài phạm vi hàm.",
    o: [
      "Tạo một biến x mới bên trong hàm.",
      "Biến x trở thành hằng số.",
      "Lỗi cú pháp."
    ],
    e: "Nếu không có 'global', Python sẽ báo lỗi UnboundLocalError vì nó tưởng x là biến cục bộ chưa được gán giá trị."
  },
  {
    subject: 'python',
    code: "a = [1, 2, 3]\nb = a[:]\nb.append(4)\nprint(a)",
    q: "Kết quả in ra là gì? (Lưu ý về Slicing copy)",
    a: "[1, 2, 3]",
    o: ["[1, 2, 3, 4]", "Lỗi", "[4, 1, 2, 3]"],
    e: "Cú pháp a[:] tạo ra một bản sao (shallow copy) của list a. Do đó, thay đổi b không ảnh hưởng đến a (khác với gán b = a)."
  },
  {
    subject: 'python',
    q: "Độ phức tạp thuật toán (Big O) của việc tìm kiếm trong Dictionary (Hash Map) là bao nhiêu?",
    a: "O(1) - Trung bình",
    o: ["O(n) - Tuyến tính", "O(log n) - Logarit", "O(n^2) - Bình phương"],
    e: "Dictionary dùng Bảng băm (Hash Table) nên việc truy xuất theo Key diễn ra tức thì, không phụ thuộc kích thước dữ liệu."
  },

  // ========================================================================
  // CHỦ ĐỀ: HTML & CSS (Hiện đại)
  // ========================================================================
  {
    subject: 'html',
    q: "CSS Variable (Biến) được khai báo và sử dụng như thế nào?",
    a: "--main-color: red; và color: var(--main-color);",
    o: [
      "$main-color: red; và color: $main-color;",
      "@main-color: red; và color: @main-color;",
      "var main-color = red; và color: main-color;"
    ],
    e: "Cú pháp chuẩn của CSS thuần (không phải SASS/LESS) là dùng hai dấu gạch ngang -- để khai báo và hàm var() để gọi."
  },
  {
    subject: 'html',
    q: "Thẻ <canvas> trong HTML5 thường được dùng để làm gì?",
    a: "Vẽ đồ họa 2D/3D, game, hoặc xử lý ảnh động qua JavaScript.",
    o: [
      "Hiển thị video từ Youtube.",
      "Tạo bảng dữ liệu Excel.",
      "Lưu trữ dữ liệu cục bộ."
    ],
    e: "<canvas> cung cấp một vùng trống để JS có thể vẽ từng pixel lên đó (khác với SVG là vẽ vector)."
  },

  {
    subject: 'network', // Gộp vào nhóm tin học chung
    q: "Hiện tượng 'Deadlock' (Tắc nghẽn) trong Hệ điều hành xảy ra khi nào?",
    a: "Khi hai hoặc nhiều tiến trình chờ đợi nhau giải phóng tài nguyên, gây ra sự treo cứng.",
    o: [
      "Khi CPU hoạt động quá 100% công suất.",
      "Khi ổ cứng bị đầy dữ liệu.",
      "Khi RAM bị tràn bộ nhớ (Stack Overflow)."
    ],
    e: "Giống như hai chiếc xe đi vào cầu hẹp từ hai phía, không ai chịu lùi lại, dẫn đến tắc nghẽn mãi mãi."
  },
  {
    subject: 'network',
    q: "Chức năng chính của 'Virtual Memory' (Bộ nhớ ảo) là gì?",
    a: "Sử dụng một phần ổ cứng (HDD/SSD) để làm bộ nhớ tạm khi RAM bị đầy.",
    o: [
      "Tăng tốc độ xử lý của CPU lên gấp đôi.",
      "Lưu trữ dữ liệu vĩnh viễn không bị mất khi tắt máy.",
      "Tạo ra một máy tính ảo bên trong máy thật."
    ],
    e: "Giúp máy tính chạy được các ứng dụng nặng hơn dung lượng RAM vật lý, nhưng tốc độ sẽ chậm hơn RAM."
  },
  {
    subject: 'network',
    q: "Tại sao bộ nhớ Cache (L1, L2, L3) của CPU lại quan trọng?",
    a: "Nó có tốc độ cực nhanh, giúp CPU truy xuất dữ liệu thường dùng mà không cần đợi RAM.",
    o: [
      "Nó giúp lưu trữ dữ liệu người dùng lâu dài.",
      "Nó giúp làm mát CPU.",
      "Nó chứa hệ điều hành Windows."
    ],
    e: "Tốc độ: Cache > RAM > SSD > HDD. Cache giúp giảm nghẽn cổ chai giữa CPU siêu nhanh và RAM chậm hơn."
  },

  // ========================================================================
  // CHỦ ĐỀ: QUY TRÌNH PHẦN MỀM (Software Engineering)
  // ========================================================================
  {
    subject: 'career',
    q: "Trong mô hình Agile/Scrum, vai trò của 'Product Owner' là gì?",
    a: "Đại diện cho khách hàng, quản lý Product Backlog và định hướng tính năng sản phẩm.",
    o: [
      "Quản lý tiến độ làm việc của các thành viên (Scrum Master).",
      "Trực tiếp viết code cho sản phẩm.",
      "Kiểm thử lỗi phần mềm (Tester)."
    ],
    e: "Product Owner quyết định 'Làm cái gì' (What), còn Team quyết định 'Làm như thế nào' (How)."
  },
  {
    subject: 'career',
    q: "Kiểm thử hộp đen (Black-box Testing) là phương pháp kiểm thử như thế nào?",
    a: "Kiểm tra chức năng đầu vào/đầu ra mà không quan tâm đến mã nguồn bên trong.",
    o: [
      "Kiểm tra chi tiết từng dòng code, cấu trúc thuật toán (White-box).",
      "Kiểm tra độ bảo mật của server.",
      "Kiểm tra khả năng chịu tải của hệ thống."
    ],
    e: "Tester nhập dữ liệu vào và xem kết quả trả về có đúng mong đợi không, coi phần mềm như một 'hộp đen'."
  },

  // ========================================================================
  // CHỦ ĐỀ: LẬP TRÌNH PYTHON (OOP & Advanced)
  // ========================================================================
  {
    subject: 'python',
    code: "class A:\n    def __init__(self):\n        self.x = 1\nclass B(A):\n    def __init__(self):\n        super().__init__()\n        self.y = 2\nb = B()\nprint(b.x, b.y)",
    q: "Hàm super().__init__() có tác dụng gì trong đoạn code trên?",
    a: "Gọi hàm khởi tạo của lớp cha (A) để thiết lập thuộc tính x.",
    o: [
      "Tạo ra một đối tượng mới của lớp A.",
      "Xóa bỏ thuộc tính x của lớp A.",
      "Lỗi cú pháp."
    ],
    e: "Nếu không gọi super().__init__(), thuộc tính self.x sẽ không được khởi tạo trong đối tượng của lớp B."
  },
  {
    subject: 'python',
    code: "try:\n    print(1/0)\nexcept:\n    print('Lỗi')\nfinally:\n    print('Xong')",
    q: "Thứ tự in ra màn hình sẽ là gì?",
    a: "'Lỗi' rồi đến 'Xong'",
    o: ["Chỉ in 'Lỗi'", "Chỉ in 'Xong'", "'Xong' rồi đến 'Lỗi'"],
    e: "Khối 'finally' LUÔN LUÔN được thực thi bất kể có lỗi xảy ra hay không (thường dùng để đóng file, ngắt kết nối DB)."
  },
  {
    subject: 'python',
    code: "x = [[]] * 3\nx[0].append(1)\nprint(x)",
    q: "Kết quả in ra là gì? (Bẫy sao chép List)",
    a: "[[1], [1], [1]]",
    o: ["[[1], [], []]", "Lỗi", "[[1], [2], [3]]"],
    e: "Toán tử * tạo ra 3 phần tử nhưng tất cả đều tham chiếu đến CÙNG MỘT list rỗng ban đầu. Sửa 1 cái là sửa tất cả."
  },

  // ========================================================================
  // CHỦ ĐỀ: WEB SECURITY (XSS, CSRF)
  // ========================================================================
  {
    subject: 'ethics',
    q: "Tấn công XSS (Cross-Site Scripting) hoạt động bằng cách nào?",
    a: "Chèn các đoạn mã JavaScript độc hại vào trang web để chạy trên trình duyệt của người dùng khác.",
    o: [
      "Tấn công trực tiếp vào cơ sở dữ liệu SQL.",
      "Làm sập server bằng cách gửi nhiều request.",
      "Đánh cắp mật khẩu wifi."
    ],
    e: "Hacker thường chèn script vào ô bình luận. Khi người khác xem bình luận, script chạy và lấy cắp cookie/session."
  },
  {
    subject: 'ethics',
    q: "Để bảo vệ mật khẩu người dùng trong CSDL, ta nên làm gì?",
    a: "Băm (Hash) mật khẩu kèm theo Salt (muối) trước khi lưu (VD: bcrypt, Argon2).",
    o: [
      "Lưu mật khẩu dưới dạng văn bản thường (Plain text).",
      "Mã hóa mật khẩu bằng thuật toán Caesar.",
      "Chỉ lưu 3 ký tự đầu của mật khẩu."
    ],
    e: "Hashing là một chiều (không thể dịch ngược). Salt giúp chống lại tấn công Rainbow Table."
  },

  {
    subject: 'network',
    q: "Giao thức SMB (Server Message Block) thường được dùng để làm gì trong mạng LAN?",
    a: "Chia sẻ file, máy in và các cổng nối tiếp giữa các thiết bị trong mạng.",
    o: [
      "Gửi email nội bộ.",
      "Kiểm tra tốc độ mạng.",
      "Mã hóa mật khẩu wifi."
    ],
    e: "Khi bạn share folder trên Windows cho máy khác truy cập, bạn đang dùng SMB."
  },
  {
    subject: 'network',
    q: "Để kết nối mạng dây (LAN) cho laptop đời mới không có cổng RJ45, ta cần thiết bị gì?",
    a: "Cáp chuyển đổi USB-C sang LAN (Adapter).",
    o: [
      "Bộ phát Wifi di động.",
      "Cáp HDMI.",
      "Switch chia mạng."
    ],
    e: "Các dòng Ultrabook mỏng nhẹ thường bỏ cổng LAN, cần dùng Adapter qua cổng USB-C."
  },
  {
    subject: 'network',
    q: "Thiết bị WAP (Wireless Access Point) khác Router Wifi ở điểm nào?",
    a: "WAP chỉ có chức năng phát sóng wifi (mở rộng vùng phủ), thường không cấp IP (DHCP) như Router.",
    o: [
      "WAP phát sóng mạnh hơn Router gấp 10 lần.",
      "WAP dùng để kết nối mạng dây, Router dùng cho không dây.",
      "Hai thiết bị này là một, không có gì khác nhau."
    ],
    e: "Trong các hệ thống lớn (trường học, khách sạn), Router cấp IP tổng, còn WAP chỉ đóng vai trò các điểm phát sóng nối dài."
  },

  // ========================================================================
  // CHI TIẾT TỪ FILE: CĐ2 HTML & CSS
  // ========================================================================
  {
    subject: 'html',
    q: "Thẻ <fieldset> và <legend> trong HTML form dùng để làm gì?",
    a: "<fieldset> gom nhóm các ô nhập liệu liên quan, <legend> tạo chú thích (tiêu đề) cho nhóm đó.",
    o: [
      "Tạo đường viền trang trí cho ảnh.",
      "Tạo bảng dữ liệu phức tạp.",
      "Chèn video từ nguồn bên ngoài."
    ],
    e: "Thường dùng để gom nhóm: 'Thông tin cá nhân' (Họ tên, Tuổi) và 'Thông tin đăng nhập' (User, Pass) trong cùng 1 form."
  },
  {
    subject: 'html',
    q: "Để nhúng một video vào trang web mà hỗ trợ nhiều định dạng (mp4, webm), ta dùng cấu trúc nào?",
    a: "<video controls> <source src='...' type='video/mp4'> ... </video>",
    o: [
      "<media src='...' play='true'></media>",
      "<youtube link='...'></youtube>",
      "<iframe video='...'></iframe>"
    ],
    e: "Thẻ <video> của HTML5 cho phép khai báo nhiều nguồn <source> để trình duyệt tự chọn định dạng phù hợp."
  },
  {
    subject: 'html',
    q: "Đơn vị đo 'em' trong CSS có đặc điểm gì?",
    a: "Kích thước tương đối, dựa trên cỡ chữ (font-size) của phần tử cha trực tiếp.",
    o: [
      "Kích thước tuyệt đối, giống pixel.",
      "Dựa trên cỡ chữ của phần tử gốc (html).",
      "Dựa trên chiều rộng màn hình."
    ],
    e: "2em nghĩa là gấp 2 lần cỡ chữ hiện tại. Khác với 'rem' (dựa trên root html)."
  },

  // ========================================================================
  // CHI TIẾT TỪ FILE: CĐ5 TỔNG HỢP & KỸ NĂNG MỀM
  // ========================================================================
  {
    subject: 'career',
    q: "Kỹ năng 'Tư duy phản biện' (Critical Thinking) giúp gì cho người làm CNTT?",
    a: "Phân tích vấn đề đa chiều, đánh giá tính logic của giải pháp và tránh các lỗi ngụy biện.",
    o: [
      "Giúp gõ code nhanh hơn.",
      "Giúp ghi nhớ các câu lệnh tốt hơn.",
      "Giúp sửa chữa phần cứng máy tính."
    ],
    e: "Trong lập trình, tư duy phản biện giúp tìm ra nguyên nhân gốc rễ (root cause) của lỗi (bug) thay vì chỉ sửa phần ngọn."
  },
  {
    subject: 'career',
    q: "Thế nào là 'Bản quyền phần mềm' (Software License)?",
    a: "Quyền pháp lý cho phép hoặc hạn chế việc sử dụng, sao chép, phân phối phần mềm.",
    o: [
      "Mã nguồn của phần mềm.",
      "Giá tiền của phần mềm.",
      "Hướng dẫn sử dụng phần mềm."
    ],
    e: "Vi phạm license (dùng crack, lậu) là vi phạm pháp luật và đạo đức nghề nghiệp."
  },

  // ========================================================================
  // CHI TIẾT TỪ FILE: SQL (Các hàm ít gặp)
  // ========================================================================
  {
    subject: 'sql',
    q: "Hàm COALESCE(val1, val2, ...) trong SQL trả về giá trị nào?",
    a: "Giá trị KHÔNG NULL đầu tiên tìm thấy trong danh sách tham số.",
    o: [
      "Giá trị lớn nhất trong danh sách.",
      "Giá trị trung bình của danh sách.",
      "Giá trị cuối cùng trong danh sách."
    ],
    e: "Rất hữu ích để xử lý dữ liệu thiếu. Ví dụ: COALESCE(SoDienThoai, 'Chưa cập nhật') -> Nếu SĐT null thì hiện text thay thế."
  },
  {
    subject: 'sql',
    q: "Lệnh 'DROP TABLE' và 'DELETE TABLE' (nếu có) khác nhau thế nào?",
    a: "DROP TABLE xóa hoàn toàn bảng và cấu trúc khỏi CSDL; DELETE chỉ xóa dữ liệu bên trong.",
    o: [
      "DROP TABLE chỉ xóa dữ liệu, giữ lại cấu trúc.",
      "Hai lệnh này tương đương nhau.",
      "SQL không có lệnh DROP TABLE."
    ],
    e: "Cẩn thận tuyệt đối với DROP TABLE vì không thể Undo (trừ khi có backup)."
  },

  { subject: 'network', q: "Thiết bị nào kết nối các mạng khác nhau và chọn đường đi tối ưu cho dữ liệu?", a: "Router", o: ["Switch", "Hub", "Repeater"], e: "Router (Bộ định tuyến) hoạt động ở tầng 3 OSI, quyết định đường đi cho gói tin." },
  { subject: 'network', q: "Thiết bị nào chuyển tiếp dữ liệu thông minh dựa trên địa chỉ MAC?", a: "Switch", o: ["Hub", "Modem", "Bridge"], e: "Switch ghi nhớ địa chỉ MAC để gửi dữ liệu đến đúng cổng đích, giảm xung đột." },
  { subject: 'network', q: "Hub khác Switch ở điểm cơ bản nào?", a: "Hub truyền dữ liệu tới tất cả các cổng (Broadcast), Switch chỉ truyền tới cổng đích.", o: ["Hub nhanh hơn Switch.", "Hub bảo mật hơn Switch.", "Hub dùng địa chỉ IP."], e: "Hub hoạt động ở tầng 1 (Vật lý), nhân bản tín hiệu ra mọi cổng." },
  { subject: 'network', q: "Giao thức nào dùng để cấp phát địa chỉ IP tự động?", a: "DHCP", o: ["DNS", "HTTP", "FTP"], e: "Dynamic Host Configuration Protocol giúp thiết bị không cần cài IP thủ công." },
  { subject: 'network', q: "Lệnh nào dùng để kiểm tra kết nối mạng giữa hai máy tính?", a: "ping", o: ["ipconfig", "tracert", "netstat"], e: "Ping gửi gói tin ICMP Echo Request." },
  { subject: 'network', q: "Địa chỉ IPv4 có độ dài bao nhiêu bit?", a: "32 bit", o: ["128 bit", "48 bit", "64 bit"], e: "Gồm 4 nhóm số thập phân, ví dụ: 192.168.1.1." },
  { subject: 'network', q: "Địa chỉ MAC là gì?", a: "Địa chỉ vật lý duy nhất của card mạng.", o: ["Địa chỉ logic của máy.", "Địa chỉ website.", "Tên máy tính."], e: "Gồm 48 bit, thường viết dưới dạng Hex (VD: 00:1A:...). " },
  { subject: 'network', q: "Giao thức nào chuyển đổi tên miền (VD: google.com) thành địa chỉ IP?", a: "DNS", o: ["DHCP", "ARP", "TCP"], e: "Domain Name System giống như danh bạ điện thoại của Internet." },
  { subject: 'network', q: "Mô hình OSI có bao nhiêu tầng?", a: "7 tầng", o: ["4 tầng", "5 tầng", "6 tầng"], e: "Physical, Data Link, Network, Transport, Session, Presentation, Application." },
  { subject: 'network', q: "Giao thức HTTP sử dụng cổng (port) mặc định nào?", a: "80", o: ["443", "21", "25"], e: "HTTPS dùng cổng 443." },
  { subject: 'network', q: "Giao thức nào dùng để gửi thư điện tử (Email)?", a: "SMTP", o: ["POP3", "IMAP", "HTTP"], e: "Simple Mail Transfer Protocol." },
  { subject: 'network', q: "Mạng LAN là viết tắt của gì?", a: "Local Area Network", o: ["Live Area Network", "Long Area Network", "Link Area Network"], e: "Mạng cục bộ trong phạm vi hẹp (tòa nhà, phòng)." },
  { subject: 'network', q: "WPA2 là chuẩn bảo mật cho loại mạng nào?", a: "Mạng Wifi (Không dây)", o: ["Mạng dây Ethernet", "Mạng 4G", "Bluetooth"], e: "Wi-Fi Protected Access 2." },
  { subject: 'network', q: "Thiết bị Modem có chức năng chính là gì?", a: "Chuyển đổi tín hiệu số sang tương tự và ngược lại (Điều chế/Giải điều chế).", o: ["Phát wifi.", "Lưu trữ dữ liệu.", "In ấn qua mạng."], e: "Giúp máy tính giao tiếp qua đường dây điện thoại/cáp quang." },
  { subject: 'network', q: "Địa chỉ IP 127.0.0.1 được gọi là gì?", a: "Loopback Address (Localhost)", o: ["Public IP", "Private IP", "Broadcast IP"], e: "Dùng để kiểm tra chính máy tính đó." },
  { subject: 'network', q: "Lệnh 'ipconfig' (Windows) dùng để làm gì?", a: "Xem cấu hình IP hiện tại của máy.", o: ["Kiểm tra tốc độ mạng.", "Xóa lịch sử web.", "Đổi mật khẩu wifi."], e: "Hiển thị IP, Subnet Mask, Default Gateway." },
  { subject: 'network', q: "Để kết nối mạng Internet an toàn cho nhân viên từ xa, người ta dùng công nghệ gì?", a: "VPN (Virtual Private Network)", o: ["LAN ảo", "Proxy công cộng", "HTTP"], e: "Tạo đường hầm mã hóa dữ liệu." },
  { subject: 'network', q: "Tấn công DDoS là gì?", a: "Tấn công từ chối dịch vụ phân tán (làm quá tải server).", o: ["Đánh cắp mật khẩu.", "Nghe lén dữ liệu.", "Lây nhiễm virus."], e: "Dùng mạng lưới botnet gửi lượng truy cập khổng lồ." },
  { subject: 'network', q: "Cáp xoắn đôi (UTP) thường dùng đầu nối chuẩn nào?", a: "RJ45", o: ["RJ11", "USB", "HDMI"], e: "RJ45 có 8 chân tiếp xúc." },
  { subject: 'network', q: "Tầng nào trong mô hình OSI chịu trách nhiệm mã hóa và nén dữ liệu?", a: "Presentation (Tầng 6)", o: ["Application", "Session", "Transport"], e: "Đảm bảo dữ liệu đọc được bởi tầng ứng dụng." },

  // ========================================================================
  // PHẦN 2: HTML & CSS (Nguồn: CĐ2 Thầy Thạnh)
  // ========================================================================
  { subject: 'html', q: "HTML là viết tắt của?", a: "HyperText Markup Language", o: ["HyperText Make Language", "HighText Markup Language", "Home Tool Markup Language"], e: "Ngôn ngữ đánh dấu siêu văn bản." },
  { subject: 'html', q: "Thẻ nào dùng để tạo liên kết?", a: "<a>", o: ["<link>", "<href>", "<url>"], e: "Sử dụng thuộc tính href." },
  { subject: 'html', q: "Thẻ nào tạo danh sách có thứ tự (1, 2, 3...)?", a: "<ol>", o: ["<ul>", "<li>", "<dl>"], e: "Ordered List." },
  { subject: 'html', q: "Để chèn ảnh, ta dùng thẻ nào?", a: "<img>", o: ["<image>", "<pic>", "<src>"], e: "Thẻ <img> là thẻ rỗng (không có thẻ đóng)." },
  { subject: 'html', q: "Thuộc tính 'alt' trong thẻ <img> dùng để làm gì?", a: "Hiển thị văn bản thay thế khi ảnh lỗi.", o: ["Hiển thị chú thích khi rê chuột.", "Chỉnh kích thước ảnh.", "Tạo đường viền ảnh."], e: "Rất quan trọng cho SEO và người khiếm thị." },
  { subject: 'html', q: "CSS là viết tắt của?", a: "Cascading Style Sheets", o: ["Computer Style Sheets", "Colorful Style Sheets", "Creative Style Sheets"], e: "Ngôn ngữ định dạng kiểu dáng web." },
  { subject: 'html', q: "Để đổi màu chữ trong CSS, dùng thuộc tính nào?", a: "color", o: ["text-color", "font-color", "bg-color"], e: "Ví dụ: color: red;" },
  { subject: 'html', q: "Thẻ <br> dùng để làm gì?", a: "Ngắt dòng (Xuống dòng)", o: ["Tạo đoạn văn.", "In đậm.", "Tạo đường kẻ ngang."], e: "Break line." },
  { subject: 'html', q: "Để mở liên kết trong tab mới, dùng thuộc tính nào?", a: "target='_blank'", o: ["target='new'", "target='_self'", "open='new'"], e: "Giúp giữ trang hiện tại." },
  { subject: 'html', q: "Đâu là cú pháp đúng để comment trong HTML?", a: "", o: ["// Comment", "/* Comment */", "# Comment"], e: "Khác với CSS (/* */) và JS (//)." },
  { subject: 'html', q: "Thẻ <table> chứa thẻ nào để tạo hàng?", a: "<tr>", o: ["<td>", "<th>", "<row>"], e: "Table Row." },
  { subject: 'html', q: "Thuộc tính 'padding' trong CSS là gì?", a: "Khoảng cách từ nội dung đến viền (border).", o: ["Khoảng cách từ viền ra ngoài.", "Độ dày của viền.", "Khoảng cách giữa các dòng."], e: "Vùng đệm bên trong phần tử." },
  { subject: 'html', q: "Thẻ <h1> đến <h6> dùng để làm gì?", a: "Tạo tiêu đề (Heading)", o: ["Tạo đoạn văn.", "Tạo danh sách.", "Tạo bảng."], e: "h1 lớn nhất, h6 nhỏ nhất." },
  { subject: 'html', q: "Để tạo ô nhập mật khẩu, dùng thẻ input kiểu nào?", a: "type='password'", o: ["type='hidden'", "type='text'", "type='secure'"], e: "Ký tự nhập vào sẽ bị che đi." },
  { subject: 'html', q: "Trong CSS, dấu '#' đại diện cho bộ chọn nào?", a: "ID Selector", o: ["Class Selector", "Tag Selector", "Universal Selector"], e: "Ví dụ: #header { ... }" },
  { subject: 'html', q: "Trong CSS, dấu '.' đại diện cho bộ chọn nào?", a: "Class Selector", o: ["ID Selector", "Group Selector", "Child Selector"], e: "Ví dụ: .menu { ... }" },
  { subject: 'html', q: "Thuộc tính 'text-align: center' dùng để làm gì?", a: "Căn giữa văn bản", o: ["Căn giữa khối div.", "Căn đều hai bên.", "Căn phải."], e: "Chỉ tác dụng lên nội dung inline hoặc text." },
  { subject: 'html', q: "Thẻ <iframe> dùng để làm gì?", a: "Nhúng một trang web khác vào trang hiện tại.", o: ["Tạo khung viền ảnh.", "Tạo form đăng nhập.", "Chèn video từ file."], e: "Inline Frame." },
  { subject: 'html', q: "Thẻ <meta charset='UTF-8'> có tác dụng gì?", a: "Khai báo bảng mã ký tự (hiển thị đúng tiếng Việt).", o: ["Tối ưu SEO.", "Tạo tiêu đề trang.", "Liên kết file CSS."], e: "Tránh lỗi font chữ." },
  { subject: 'html', q: "Đơn vị 'px' trong CSS là gì?", a: "Pixel (Điểm ảnh)", o: ["Percentage", "Point", "Pica"], e: "Đơn vị đo lường tuyệt đối trên màn hình." },

  // ========================================================================
  // PHẦN 3: CƠ SỞ DỮ LIỆU & SQL (Nguồn: CĐ3 Thầy Thạnh)
  // ========================================================================
  { subject: 'sql', q: "SQL là viết tắt của?", a: "Structured Query Language", o: ["Simple Query Language", "Strong Question Language", "System Query Link"], e: "Ngôn ngữ truy vấn có cấu trúc." },
  { subject: 'sql', q: "Câu lệnh nào dùng để lấy dữ liệu từ bảng?", a: "SELECT", o: ["GET", "EXTRACT", "OPEN"], e: "SELECT * FROM Table..." },
  { subject: 'sql', q: "Mệnh đề nào dùng để lọc dữ liệu theo điều kiện?", a: "WHERE", o: ["HAVING", "FILTER", "IF"], e: "Ví dụ: WHERE Age > 18." },
  { subject: 'sql', q: "Từ khóa DISTINCT dùng để làm gì?", a: "Loại bỏ các bản ghi trùng lặp trong kết quả.", o: ["Sắp xếp dữ liệu.", "Đếm số dòng.", "Xóa dữ liệu trùng trong bảng gốc."], e: "SELECT DISTINCT City FROM Customers." },
  { subject: 'sql', q: "Câu lệnh nào dùng để thêm dữ liệu mới?", a: "INSERT INTO", o: ["ADD NEW", "UPDATE", "CREATE"], e: "INSERT INTO Table VALUES (...)" },
  { subject: 'sql', q: "Câu lệnh nào dùng để xóa toàn bộ dữ liệu trong bảng nhưng giữ lại cấu trúc?", a: "TRUNCATE TABLE", o: ["DELETE TABLE", "DROP TABLE", "REMOVE TABLE"], e: "Nhanh hơn DELETE và reset ID tự tăng." },
  { subject: 'sql', q: "Lệnh DROP TABLE làm gì?", a: "Xóa hoàn toàn bảng và dữ liệu khỏi CSDL.", o: ["Chỉ xóa dữ liệu.", "Xóa một cột.", "Xóa khóa chính."], e: "Không thể khôi phục (trừ khi có backup)." },
  { subject: 'sql', q: "Khóa chính (Primary Key) có đặc điểm gì?", a: "Duy nhất và không được NULL.", o: ["Có thể trùng lặp.", "Luôn là số.", "Có thể NULL."], e: "Định danh duy nhất cho mỗi dòng." },
  { subject: 'sql', q: "Hàm COUNT(*) trả về giá trị gì?", a: "Tổng số dòng trong bảng (kể cả NULL).", o: ["Tổng số dòng không NULL.", "Giá trị lớn nhất.", "Giá trị trung bình."], e: "Dùng để đếm số lượng bản ghi." },
  { subject: 'sql', q: "Để sắp xếp dữ liệu giảm dần, dùng từ khóa nào?", a: "DESC", o: ["ASC", "DOWN", "Z-A"], e: "ORDER BY Column DESC." },
  { subject: 'sql', q: "INNER JOIN trả về kết quả nào?", a: "Các bản ghi có giá trị khớp ở cả hai bảng.", o: ["Tất cả bản ghi bảng trái.", "Tất cả bản ghi bảng phải.", "Tích Đề-các."], e: "Phép nối bằng." },
  { subject: 'sql', q: "Ràng buộc 'NOT NULL' nghĩa là gì?", a: "Cột không được phép để trống.", o: ["Cột không được trùng.", "Cột là khóa chính.", "Cột là số dương."], e: "Bắt buộc phải nhập liệu." },
  { subject: 'sql', q: "Hàm AVG() dùng để làm gì?", a: "Tính giá trị trung bình.", o: ["Tính tổng.", "Đếm số lượng.", "Tìm giá trị lớn nhất."], e: "Average." },
  { subject: 'sql', q: "Toán tử LIKE với ký tự '%' đại diện cho cái gì?", a: "Chuỗi ký tự bất kỳ (0 hoặc nhiều ký tự).", o: ["Đúng 1 ký tự.", "Ký tự số.", "Ký tự đặc biệt."], e: "Ví dụ: LIKE 'A%' (Bắt đầu bằng A)." },
  { subject: 'sql', q: "Mệnh đề GROUP BY thường đi kèm với các hàm nào?", a: "Hàm tổng hợp (SUM, COUNT, AVG...)", o: ["Hàm xử lý chuỗi.", "Hàm ngày tháng.", "Lệnh INSERT."], e: "Gom nhóm dữ liệu để tính toán." },
  { subject: 'sql', q: "Để lọc dữ liệu sau khi đã GROUP BY, ta dùng mệnh đề nào?", a: "HAVING", o: ["WHERE", "FILTER", "ORDER BY"], e: "WHERE lọc dòng, HAVING lọc nhóm." },
  { subject: 'sql', q: "Câu lệnh UPDATE dùng để làm gì?", a: "Sửa đổi dữ liệu đã có.", o: ["Thêm dòng mới.", "Xóa bảng.", "Tạo bảng mới."], e: "UPDATE Table SET Col = Val WHERE..." },
  { subject: 'sql', q: "Kiểu dữ liệu VARCHAR(255) nghĩa là gì?", a: "Chuỗi ký tự độ dài thay đổi, tối đa 255.", o: ["Chuỗi ký tự độ dài cố định 255.", "Số nguyên 255.", "Ngày tháng."], e: "Variable Character." },
  { subject: 'sql', q: "Giao dịch (Transaction) cần đảm bảo tính chất nào (ACID)?", a: "Tính nguyên tử, nhất quán, cô lập, bền vững.", o: ["Tính nhanh chóng.", "Tính bảo mật.", "Tính mở rộng."], e: "Atomicity, Consistency, Isolation, Durability." },
  { subject: 'sql', q: "Khóa ngoại (Foreign Key) dùng để làm gì?", a: "Liên kết và đảm bảo toàn vẹn tham chiếu giữa hai bảng.", o: ["Tăng tốc độ truy vấn.", "Mã hóa dữ liệu.", "Đặt mật khẩu."], e: "Tham chiếu đến khóa chính của bảng khác." },

  // ========================================================================
  // PHẦN 4: TRÍ TUỆ NHÂN TẠO & LÝ THUYẾT (Nguồn: CĐ5 Thầy Thạnh)
  // ========================================================================
  { subject: 'ai', q: "Turing Test dùng để đánh giá điều gì?", a: "Khả năng trí tuệ của máy tính có giống con người không.", o: ["Tốc độ CPU.", "Dung lượng bộ nhớ.", "Khả năng kết nối mạng."], e: "Do Alan Turing đề xuất năm 1950." },
  { subject: 'ai', q: "Hệ chuyên gia MYCIN nổi tiếng trong lĩnh vực nào?", a: "Y tế (Chẩn đoán bệnh nhiễm trùng).", o: ["Chơi cờ.", "Dự báo thời tiết.", "Chứng khoán."], e: "Một trong những hệ chuyên gia đầu tiên." },
  { subject: 'ai', q: "Deep Blue là siêu máy tính đánh bại ai?", a: "Garry Kasparov (Vua cờ vua).", o: ["Lee Sedol.", "Bill Gates.", "Einstein."], e: "Sự kiện năm 1997." },
  { subject: 'ai', q: "AI hẹp (Weak AI) là gì?", a: "AI chỉ giỏi trong một lĩnh vực cụ thể.", o: ["AI thông minh hơn con người mọi mặt.", "AI có cảm xúc.", "Robot hủy diệt."], e: "Ví dụ: Google Maps, AlphaGo." },
  { subject: 'ai', q: "Học máy (Machine Learning) là gì?", a: "Máy tính tự học từ dữ liệu để cải thiện hiệu suất.", o: ["Lập trình thủ công từng lệnh.", "Lắp ráp phần cứng robot.", "Học qua internet."], e: "Dựa trên dữ liệu huấn luyện." },
  { subject: 'ai', q: "Deepfake sử dụng công nghệ gì?", a: "GANs (Generative Adversarial Networks).", o: ["Hệ chuyên gia.", "Logic mờ.", "Cây quyết định."], e: "Tạo video/ảnh giả mạo như thật." },
  { subject: 'ai', q: "Robot ASIMO là sản phẩm của hãng nào?", a: "Honda", o: ["Toyota", "Sony", "Tesla"], e: "Robot hình người nổi tiếng." },
  { subject: 'ai', q: "IoT là viết tắt của?", a: "Internet of Things (Vạn vật kết nối).", o: ["Internet of Technology.", "Input of Tools.", "Intelligence of Time."], e: "Kết nối các thiết bị vật lý qua mạng." },
  { subject: 'ethics', q: "Luật An ninh mạng Việt Nam có hiệu lực từ năm nào?", a: "2019", o: ["2018", "2020", "2015"], e: "1/1/2019." },
  { subject: 'ethics', q: "Phishing là hành vi gì?", a: "Lừa đảo trực tuyến (giả mạo web/email).", o: ["Câu cá trên mạng.", "Tấn công từ chối dịch vụ.", "Quét virus."], e: "Nhằm đánh cắp tài khoản, mật khẩu." },
  { subject: 'ethics', q: "Malware là tên gọi chung của?", a: "Phần mềm độc hại (Virus, Worm, Trojan...).", o: ["Phần mềm diệt virus.", "Phần mềm bản quyền.", "Phần cứng máy tính."], e: "Malicious Software." },
  { subject: 'career', q: "Nhiệm vụ chính của Tester là gì?", a: "Kiểm thử phần mềm để tìm lỗi (Bug).", o: ["Viết code.", "Bán phần mềm.", "Sửa máy in."], e: "Đảm bảo chất lượng sản phẩm." },
  { subject: 'career', q: "BA (Business Analyst) là làm gì?", a: "Phân tích nghiệp vụ, cầu nối giữa khách hàng và đội Dev.", o: ["Quản trị mạng.", "Thiết kế logo.", "Lắp ráp máy tính."], e: "Chuyển yêu cầu kinh doanh thành yêu cầu kỹ thuật." },
  { subject: 'media', q: "Hệ màu RGB dùng cho thiết bị nào?", a: "Màn hình hiển thị (TV, Máy tính, Đt).", o: ["Máy in.", "Sơn tường.", "Nhuộm vải."], e: "Red, Green, Blue (Hệ màu cộng)." },
  { subject: 'media', q: "Hệ màu CMYK dùng cho?", a: "In ấn.", o: ["Màn hình.", "Web.", "Đèn LED."], e: "Cyan, Magenta, Yellow, Key (Black)." },
  { subject: 'media', q: "Định dạng ảnh nào hỗ trợ nền trong suốt?", a: "PNG", o: ["JPG", "BMP", "RAW"], e: "Portable Network Graphics." },
  { subject: 'media', q: "MP4 là định dạng của loại tệp nào?", a: "Video", o: ["Âm thanh", "Hình ảnh", "Văn bản"], e: "Chuẩn nén video phổ biến nhất." },
  { subject: 'python', q: "Kết quả của 10 // 3 trong Python?", a: "3", o: ["3.33", "1", "3.0"], e: "Chia lấy phần nguyên." },
  { subject: 'python', q: "Kết quả của 10 % 3 trong Python?", a: "1", o: ["3", "0", "0.33"], e: "Chia lấy phần dư." },
  { subject: 'python', q: "Len('Hello') bằng bao nhiêu?", a: "5", o: ["4", "6", "Error"], e: "Độ dài chuỗi." },
  // ========================================================================
  // PHẦN TIẾP THEO: CHI TIẾT KỸ THUẬT & NÂNG CAO
  // ========================================================================
  
  // --- MẠNG MÁY TÍNH (Advanced) ---
  { subject: 'network', q: "Subnet Mask mặc định của lớp mạng C là gì?", a: "255.255.255.0", o: ["255.255.0.0", "255.0.0.0", "255.255.255.255"], e: "Lớp C dành cho các mạng nhỏ (LAN), 24 bit đầu là NetID." },
  { subject: 'network', q: "Giao thức FTP dùng để làm gì?", a: "Truyền tải tập tin (File Transfer).", o: ["Truyền tải web.", "Gửi email.", "Quản lý IP."], e: "Hoạt động trên cổng 20, 21." },
  { subject: 'network', q: "Mạng WLAN là gì?", a: "Wireless Local Area Network (Mạng cục bộ không dây).", o: ["Mạng diện rộng.", "Mạng dây.", "Mạng vệ tinh."], e: "Thường sử dụng chuẩn Wi-Fi (IEEE 802.11)." },
  { subject: 'network', q: "Firewall (Tường lửa) có chức năng chính là gì?", a: "Kiểm soát và ngăn chặn truy cập trái phép vào mạng.", o: ["Diệt virus.", "Tăng tốc internet.", "Lưu trữ dữ liệu."], e: "Nó lọc các gói tin dựa trên các quy tắc bảo mật." },
  { subject: 'network', q: "Băng thông (Bandwidth) được đo bằng đơn vị gì?", a: "bps (bit per second).", o: ["Hz (Hertz).", "Byte.", "Pixel."], e: "Tốc độ truyền dữ liệu tối đa của đường truyền." },
  
  // --- HTML & CSS (Form & Layout) ---
  { subject: 'html', q: "Thẻ <textarea> dùng để làm gì?", a: "Tạo ô nhập văn bản nhiều dòng.", o: ["Tạo ô nhập mật khẩu.", "Tạo nút bấm.", "Tạo danh sách chọn."], e: "Thường dùng cho phần 'Nội dung' hoặc 'Ghi chú' trong form." },
  { subject: 'html', q: "Để tạo một danh sách thả xuống (Dropdown list), ta dùng thẻ nào?", a: "<select> và <option>", o: ["<list> và <item>", "<input type='list'>", "<dropdown>"], e: "<select> chứa các <option>." },
  { subject: 'html', q: "Thuộc tính 'placeholder' trong thẻ input có tác dụng gì?", a: "Hiển thị văn bản gợi ý mờ bên trong ô nhập.", o: ["Đặt giá trị mặc định.", "Kiểm tra lỗi chính tả.", "Ẩn nội dung."], e: "Ví dụ: 'Nhập họ tên của bạn...'." },
  { subject: 'html', q: "Trong CSS, 'margin: 0 auto;' thường dùng để làm gì?", a: "Căn giữa khối (block) theo chiều ngang.", o: ["Căn giữa văn bản.", "Xóa lề.", "Căn giữa theo chiều dọc."], e: "Rất phổ biến để căn giữa container chính của trang web." },
  { subject: 'html', q: "Pseudo-class ':hover' kích hoạt khi nào?", a: "Khi người dùng di chuột vào phần tử.", o: ["Khi người dùng click chuột.", "Khi trang vừa tải xong.", "Khi phần tử bị ẩn."], e: "Thường dùng làm hiệu ứng đổi màu nút bấm hoặc link." },
  { subject: 'html', q: "Thẻ <div> là loại phần tử gì?", a: "Block-level element (Phần tử khối).", o: ["Inline element (Phần tử nội dòng).", "Inline-block.", "Table element."], e: "Nó luôn bắt đầu trên một dòng mới và chiếm toàn bộ chiều rộng." },
  { subject: 'html', q: "Đơn vị 'rem' trong CSS dựa trên cái gì?", a: "Kích thước font chữ của phần tử gốc (html).", o: ["Kích thước font chữ của phần tử cha.", "Kích thước màn hình.", "Điểm ảnh."], e: "Giúp website scale tốt hơn trên các thiết bị." },

  // --- SQL & CSDL (Data Definition & Manipulation) ---
  { subject: 'sql', q: "Câu lệnh CREATE TABLE dùng để làm gì?", a: "Tạo một bảng mới trong CSDL.", o: ["Thêm dữ liệu vào bảng.", "Tạo CSDL mới.", "Sửa cấu trúc bảng."], e: "Định nghĩa tên bảng và các cột." },
  { subject: 'sql', q: "Để thêm một cột mới vào bảng đã có, ta dùng lệnh nào?", a: "ALTER TABLE ... ADD", o: ["UPDATE TABLE ... ADD", "INSERT COLUMN", "MODIFY TABLE"], e: "ALTER TABLE TenBang ADD TenCot KieuDuLieu." },
  { subject: 'sql', q: "Hàm MAX() và MIN() dùng để làm gì?", a: "Tìm giá trị lớn nhất và nhỏ nhất.", o: ["Tính tổng và trung bình.", "Đếm số lượng.", "Làm tròn số."], e: "Ví dụ: SELECT MAX(Diem) FROM HocSinh." },
  { subject: 'sql', q: "Toán tử 'BETWEEN' dùng để lọc dữ liệu như thế nào?", a: "Trong một khoảng giá trị xác định (bao gồm cả 2 đầu mút).", o: ["Lớn hơn một giá trị.", "Nhỏ hơn một giá trị.", "Khác một giá trị."], e: "WHERE Age BETWEEN 18 AND 25." },
  { subject: 'sql', q: "Ràng buộc 'DEFAULT' có ý nghĩa gì?", a: "Đặt giá trị mặc định cho cột nếu không nhập dữ liệu.", o: ["Bắt buộc phải nhập.", "Giá trị phải duy nhất.", "Tự động tăng."], e: "Ví dụ: NgayTao DEFAULT GETDATE()." },
  { subject: 'sql', q: "Lệnh 'DELETE' khác gì 'DROP'?", a: "DELETE xóa dòng dữ liệu, DROP xóa cả bảng.", o: ["DELETE xóa cột, DROP xóa dòng.", "DELETE không thể hồi phục, DROP có thể.", "DELETE nhanh hơn DROP."], e: "DELETE là DML, DROP là DDL." },
  { subject: 'sql', q: "Phép kết nối 'LEFT JOIN' trả về kết quả gì?", a: "Tất cả dòng từ bảng bên trái và các dòng khớp từ bảng bên phải.", o: ["Tất cả dòng từ bảng bên phải.", "Chỉ các dòng khớp nhau.", "Tất cả dòng từ cả 2 bảng."], e: "Nếu bảng phải không có dữ liệu khớp, kết quả sẽ là NULL." },

  // --- PYTHON & LẬP TRÌNH (Logic & Types) ---
  { subject: 'python', q: "Trong Python, chỉ số (index) của danh sách bắt đầu từ mấy?", a: "0", o: ["1", "-1", "Tùy ý"], e: "Phần tử đầu tiên là list[0]." },
  { subject: 'python', q: "Hàm range(5) tạo ra dãy số nào?", a: "0, 1, 2, 3, 4", o: ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4, 5", "1, 2, 3, 4"], e: "Bắt đầu từ 0, kết thúc trước n." },
  { subject: 'python', q: "Để chuyển đổi chuỗi '123' thành số nguyên, dùng hàm gì?", a: "int()", o: ["str()", "float()", "num()"], e: "Integer." },
  { subject: 'python', q: "Phép toán 'not True' trả về gì?", a: "False", o: ["True", "Error", "None"], e: "Phủ định logic." },
  { subject: 'python', q: "Cấu trúc dữ liệu nào lưu trữ các cặp key:value?", a: "Dictionary (Từ điển).", o: ["List (Danh sách).", "Tuple (Bộ).", "Set (Tập hợp)."], e: "Khai báo bằng dấu ngoặc nhọn { }." },
  { subject: 'python', q: "Lệnh 'break' trong vòng lặp dùng để làm gì?", a: "Thoát khỏi vòng lặp ngay lập tức.", o: ["Bỏ qua lần lặp hiện tại.", "Khởi động lại vòng lặp.", "Dừng chương trình."], e: "Kết thúc vòng lặp chứa nó." },
  
  // --- KIẾN THỨC TỔNG HỢP (An toàn & Nghề nghiệp) ---
  { subject: 'ethics', q: "Trojan Horse (Ngựa Trojan) là loại mã độc nào?", a: "Ngụy trang dưới vỏ bọc phần mềm hợp pháp để xâm nhập.", o: ["Tự nhân bản qua mạng.", "Mã hóa dữ liệu tống tiền.", "Lây lan qua USB."], e: "Không tự nhân bản như Virus hay Worm." },
  { subject: 'ethics', q: "Xác thực 2 yếu tố (2FA) là gì?", a: "Sử dụng 2 lớp bảo vệ (VD: Mật khẩu + Mã OTP) để đăng nhập.", o: ["Dùng 2 mật khẩu khác nhau.", "Đăng nhập trên 2 máy tính.", "Dùng 2 tài khoản."], e: "Tăng cường bảo mật đáng kể." },
  { subject: 'career', q: "Ngành 'Công nghệ phần mềm' (Software Engineering) tập trung vào gì?", a: "Quy trình phát triển, bảo trì và kiểm thử phần mềm chuyên nghiệp.", o: ["Sửa chữa linh kiện điện tử.", "Lắp đặt mạng wifi.", "Bán hàng online."], e: "Làm ra phần mềm một cách bài bản, có hệ thống." },
  { subject: 'media', q: "Độ phân giải ảnh (Resolution) thường được đo bằng?", a: "Pixel (Ví dụ: 1920x1080).", o: ["Byte.", "Inch.", "Hz."], e: "Số lượng điểm ảnh càng cao, ảnh càng chi tiết." },
  // ========================================================================
  // PHẦN 3: KIẾN THỨC NGÁCH & CHI TIẾT (FINAL UPDATE)
  // ========================================================================

  // --- MẠNG MÁY TÍNH (Ports & Protocols - Cần nhớ kỹ) ---
  { subject: 'network', q: "Cổng (Port) 21 được sử dụng cho giao thức nào?", a: "FTP (File Transfer Protocol) - Truyền file.", o: ["SSH - Bảo mật.", "Telnet - Điều khiển từ xa.", "SMTP - Gửi thư."], e: "FTP dùng port 20 và 21." },
  { subject: 'network', q: "Giao thức POP3 (Post Office Protocol version 3) dùng để làm gì?", a: "Nhận và tải email từ máy chủ về máy cá nhân.", o: ["Gửi email đi.", "Lướt web.", "Chat trực tuyến."], e: "Khác với SMTP (gửi đi), POP3/IMAP là nhận về." },
  { subject: 'network', q: "Chuẩn Wifi 802.11ax còn được gọi là gì?", a: "Wi-Fi 6", o: ["Wi-Fi 5", "Wi-Fi 4", "Wi-Gig"], e: "Chuẩn wifi mới nhất với tốc độ cao và độ trễ thấp." },
  { subject: 'network', q: "Địa chỉ IP Public (Công cộng) là gì?", a: "Địa chỉ duy nhất trên toàn cầu, giúp thiết bị kết nối Internet.", o: ["Địa chỉ chỉ dùng trong nhà.", "Địa chỉ của máy in.", "Địa chỉ MAC."], e: "Do nhà cung cấp mạng (ISP) cấp phát." },
  { subject: 'network', q: "Lệnh 'netstat' dùng để làm gì?", a: "Hiển thị các kết nối mạng đang hoạt động và các cổng đang mở.", o: ["Kiểm tra tốc độ mạng.", "Đổi địa chỉ IP.", "Tắt máy từ xa."], e: "Network Statistics." },

  // --- HTML5 & CSS3 (Semantic & Advanced Properties) ---
  { subject: 'html', q: "Thẻ <nav> trong HTML5 dùng để làm gì?", a: "Chứa các liên kết điều hướng (Menu) của trang web.", o: ["Chứa nội dung chính.", "Chứa chân trang.", "Chứa quảng cáo."], e: "Semantic Tag giúp máy tìm kiếm hiểu cấu trúc web." },
  { subject: 'html', q: "Thẻ <footer> thường chứa thông tin gì?", a: "Bản quyền, thông tin liên hệ, liên kết mạng xã hội.", o: ["Logo và Menu chính.", "Bài viết chính.", "Thanh tìm kiếm."], e: "Nằm ở cuối trang web." },
  { subject: 'html', q: "Trong CSS, thuộc tính 'opacity' dùng để chỉnh gì?", a: "Độ trong suốt của phần tử (0 là trong suốt, 1 là rõ nhất).", o: ["Độ đậm của chữ.", "Độ sáng của ảnh.", "Màu nền."], e: "opacity: 0.5; làm mờ đi 50%." },
  { subject: 'html', q: "Đơn vị 'vh' (Viewport Height) nghĩa là gì?", a: "1vh = 1% chiều cao của cửa sổ trình duyệt.", o: ["1vh = 10px.", "1vh = 1% chiều rộng.", "1vh = 1cm."], e: "100vh là toàn màn hình." },
  { subject: 'html', q: "Để tạo hiệu ứng chuyển động mượt mà khi hover, dùng thuộc tính nào?", a: "transition", o: ["animation", "transform", "move"], e: "Ví dụ: transition: all 0.3s ease;" },
  { subject: 'html', q: "Grid Layout (display: grid) mạnh hơn Flexbox ở điểm nào?", a: "Điều khiển layout hai chiều (cả dòng và cột) cùng lúc.", o: ["Chỉ điều khiển 1 chiều.", "Đơn giản hơn.", "Chạy nhanh hơn."], e: "Flexbox tốt cho 1 chiều, Grid tốt cho bố cục tổng thể." },

  // --- PYTHON (String & List Manipulation) ---
  { subject: 'python', q: "Hàm strip() dùng cho chuỗi có tác dụng gì?", a: "Loại bỏ khoảng trắng ở đầu và cuối chuỗi.", o: ["Xóa toàn bộ khoảng trắng.", "Cắt đôi chuỗi.", "Viết hoa chuỗi."], e: "'  abc  '.strip() -> 'abc'" },
  { subject: 'python', q: "Phương thức append() của List làm gì?", a: "Thêm một phần tử vào cuối danh sách.", o: ["Thêm vào đầu danh sách.", "Xóa phần tử cuối.", "Sắp xếp danh sách."], e: "lst.append(x)" },
  { subject: 'python', q: "Lệnh import math dùng để làm gì?", a: "Nhập thư viện toán học (căn bậc 2, sin, cos...).", o: ["Nhập thư viện đồ họa.", "Nhập thư viện game.", "Tạo file mới."], e: "Cung cấp các hàm như math.sqrt(), math.pi." },
  { subject: 'python', q: "Kết quả của 'Python'.upper() là gì?", a: "'PYTHON'", o: ["'python'", "'Python'", "Lỗi"], e: "Chuyển toàn bộ thành chữ hoa." },
  { subject: 'python', q: "Hàm len([1, [2, 3], 4]) trả về bao nhiêu?", a: "3", o: ["4", "2", "Error"], e: "List có 3 phần tử: 1, [2,3] và 4." },

  // --- SQL (Advanced Queries) ---
  { subject: 'sql', q: "Để đổi tên cột trong kết quả hiển thị (Alias), ta dùng từ khóa nào?", a: "AS", o: ["IS", "TO", "NEW"], e: "SELECT TenCot AS TenMoi FROM..." },
  { subject: 'sql', q: "Hàm NOW() hoặc GETDATE() trả về gì?", a: "Ngày và giờ hiện tại của hệ thống.", o: ["Ngày sinh nhật.", "Năm nhuận.", "Thời gian chạy câu lệnh."], e: "Dùng để lưu thời điểm tạo dữ liệu." },
  { subject: 'sql', q: "Câu lệnh 'DELETE FROM HocSinh' (không có WHERE) sẽ làm gì?", a: "Xóa toàn bộ dữ liệu trong bảng HocSinh.", o: ["Báo lỗi thiếu điều kiện.", "Xóa bảng HocSinh.", "Không làm gì cả."], e: "Rất nguy hiểm, cần cẩn trọng." },
  { subject: 'sql', q: "Toán tử 'OR' trong điều kiện WHERE nghĩa là gì?", a: "Chỉ cần một trong các điều kiện đúng là lấy dòng đó.", o: ["Tất cả điều kiện phải đúng.", "Không điều kiện nào đúng.", "Loại trừ điều kiện."], e: "Ngược với AND." },

  // --- KỸ NĂNG & PHÁP LUẬT (Soft Skills & Law) ---
  { subject: 'ethics', q: "Theo luật, hành vi nào vi phạm bản quyền phần mềm?", a: "Sử dụng phần mềm 'bẻ khóa' (Crack) hoặc sao chép lậu.", o: ["Mua bản quyền chính hãng.", "Dùng phần mềm mã nguồn mở.", "Dùng bản dùng thử (Trial)."], e: "Vi phạm quyền sở hữu trí tuệ." },
  { subject: 'career', q: "Kỹ năng 'Làm việc nhóm' (Teamwork) yêu cầu điều gì nhất?", a: "Sự tôn trọng, lắng nghe và phối hợp vì mục tiêu chung.", o: ["Làm việc độc lập.", "Ra lệnh cho người khác.", "Giấu nghề."], e: "Không ai có thể làm dự án lớn một mình." },
  { subject: 'career', q: "Tư duy phản biện (Critical Thinking) giúp gì cho lập trình viên?", a: "Phân tích vấn đề logic để tìm giải pháp tối ưu, không chấp nhận ngay kết quả bề mặt.", o: ["Giúp gõ phím nhanh.", "Giúp nhớ mã lệnh.", "Giúp cài win."], e: "Kỹ năng cốt lõi để debug và thiết kế hệ thống." },
  { subject: 'media', q: "File âm thanh định dạng .WAV có đặc điểm gì?", a: "Chất lượng cao, không nén (Lossless), dung lượng lớn.", o: ["Nén mạnh, dung lượng nhỏ (như MP3).", "Chỉ chứa lời bài hát.", "Dùng cho video."], e: "Thường dùng trong thu âm chuyên nghiệp." },
  
  { subject: 'ethics', q: "Khi thấy người khác đăng thông tin sai sự thật trên mạng xã hội, hành động văn minh nhất là gì?", a: "Báo cáo (Report) bài viết và không chia sẻ/bình luận để tránh tăng tương tác.", o: ["Vào chửi bới người đăng.", "Chia sẻ lại để mọi người cùng chửi.", "Im lặng coi như không thấy."], e: "Tương tác (dù là chửi bới) sẽ làm thuật toán lan truyền tin giả rộng hơn." },
  { subject: 'ethics', q: "Nếu bạn nhận được tin nhắn vay tiền từ tài khoản Facebook của người thân, bạn nên làm gì đầu tiên?", a: "Gọi điện thoại trực tiếp (Video call) để xác minh danh tính.", o: ["Chuyển tiền ngay vì sợ người thân gặp nạn.", "Nhắn tin hỏi số tài khoản.", "Block ngay lập tức."], e: "Đây là chiêu trò hack nick lừa đảo phổ biến." },
  { subject: 'ethics', q: "Mật khẩu nào sau đây được coi là an toàn nhất?", a: "T@Q_Edu#2025!", o: ["12345678", "password123", "nguyenvana1990"], e: "Kết hợp chữ hoa, thường, số và ký tự đặc biệt, không mang ý nghĩa đoán được." },

  // --- KỸ NĂNG NGHỀ NGHIỆP (Soft Skills) ---
  { subject: 'career', q: "Kỹ năng 'Giao tiếp' (Communication) trong IT quan trọng nhất ở điểm nào?", a: "Diễn giải các vấn đề kỹ thuật phức tạp thành ngôn ngữ dễ hiểu cho người không chuyên.", o: ["Nói nhiều và nói to.", "Viết email dài dòng.", "Sử dụng nhiều từ chuyên ngành."], e: "Dev giỏi là người biết cách giải thích cho khách hàng hiểu." },
  { subject: 'career', q: "Để trở thành một Designer (Thiết kế đồ họa), ngoài sử dụng công cụ, bạn cần gì nhất?", a: "Tư duy thẩm mỹ, bố cục và màu sắc.", o: ["Biết lập trình web.", "Biết sửa máy tính.", "Biết tiếng Nhật."], e: "Công cụ chỉ là phương tiện, tư duy nghệ thuật mới là cốt lõi." },
  { subject: 'career', q: "Làm việc Freelance (Tự do) có ưu điểm gì?", a: "Linh hoạt về thời gian và địa điểm làm việc.", o: ["Có lương cứng ổn định.", "Được đóng bảo hiểm miễn phí.", "Không bao giờ bị quỵt tiền."], e: "Đổi lại phải tự quản lý kỷ luật bản thân rất cao." },

  // --- LỊCH SỬ & CHI TIẾT CÔNG NGHỆ (History & Trivia) ---
  { subject: 'ai', q: "Sự kiện nào đánh dấu sự ra đời của thuật ngữ 'Trí tuệ nhân tạo'?", a: "Hội nghị Dartmouth năm 1956.", o: ["Sự ra đời của máy tính ENIAC.", "Alan Turing giải mã Enigma.", "Deep Blue thắng cờ vua."], e: "Do John McCarthy và các cộng sự đề xuất." },
  { subject: 'network', q: "Mạng ARPANET (tiền thân của Internet) được phát triển bởi tổ chức nào?", a: "Bộ Quốc phòng Mỹ (DoD).", o: ["Microsoft.", "Google.", "Liên Hợp Quốc."], e: "Mục đích ban đầu là phục vụ quân sự." },
  { subject: 'html', q: "Cha đẻ của World Wide Web (WWW) là ai?", a: "Tim Berners-Lee.", o: ["Bill Gates.", "Steve Jobs.", "Mark Zuckerberg."], e: "Ông phát minh ra HTTP, HTML và trình duyệt web đầu tiên." },
  
  // --- MỘT CHÚT CODE PYTHON "HACK NÃO" CUỐI CÙNG ---
  { subject: 'python', code: "print(bool([]), bool([0]), bool('0'))", q: "Kết quả in ra là gì?", a: "False True True", o: ["False False False", "True True True", "False True False"], e: "List rỗng là False. List có phần tử (kể cả số 0) là True. Chuỗi không rỗng ('0') là True." },
  { subject: 'python', code: "x = [1, 2, 3]\ny = x\nz = x.copy()\nx[0] = 99\nprint(y[0], z[0])", q: "Kết quả in ra là gì?", a: "99 1", o: ["99 99", "1 1", "1 99"], e: "y là tham chiếu (biến đổi theo x). z là bản sao (độc lập với x)." }
];

const TOPICS = [
  { id: 'all', title: "TỔNG HỢP KIẾN THỨC", icon: <Sparkles size={40} />, color: "from-cyan-400 to-blue-600", border: "group-hover:border-cyan-400" },
  { id: 'ai', title: "A. Trí tuệ nhân tạo", icon: <Brain size={32} />, color: "from-pink-500 to-rose-500", border: "group-hover:border-pink-400" },
  { id: 'network', title: "B. Mạng máy tính", icon: <Wifi size={32} />, color: "from-emerald-400 to-cyan-500", border: "group-hover:border-emerald-400" },
  { id: 'ethics', title: "D. Đạo đức & Pháp luật", icon: <Scale size={32} />, color: "from-yellow-400 to-orange-500", border: "group-hover:border-yellow-400" },
  { id: 'html', title: "F. HTML & CSS", icon: <Globe size={32} />, color: "from-orange-400 to-red-500", border: "group-hover:border-orange-400" },
  { id: 'career', title: "G. Hướng nghiệp", icon: <Briefcase size={32} />, color: "from-cyan-500 to-sky-600", border: "group-hover:border-cyan-400" },
  { id: 'python', title: "Lập trình Python", icon: <Code2 size={32} />, color: "from-blue-500 to-indigo-600", border: "group-hover:border-blue-400" },
  { id: 'sql', title: "Cơ sở dữ liệu", icon: <Database size={32} />, color: "from-violet-500 to-purple-600", border: "group-hover:border-violet-400" },
  { id: 'media', title: "Đa phương tiện", icon: <Film size={32} />, color: "from-fuchsia-500 to-pink-600", border: "group-hover:border-fuchsia-400" },
];

const ITQuizGame = () => {
  const [mode, setMode] = useState('menu');
  const [currentTopic, setCurrentTopic] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    if (!anime) return;
    function animateBlob(target) {
      anime({
        targets: target,
        translateX: () => anime.random(-150, 150),
        translateY: () => anime.random(-150, 150),
        scale: () => anime.random(0.8, 1.4),
        duration: () => anime.random(7000, 10000),
        easing: 'easeInOutSine',
        complete: () => animateBlob(target)
      });
    }
    document.querySelectorAll('.bg-blob').forEach(animateBlob);
  }, []);

  const startExam = (topic) => {
    let questions = [];
    if (topic.id === 'all') {
      questions = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
    } else {
      questions = QUESTION_BANK.filter(q => q.subject === topic.id);
    }
    if (questions.length === 0) {
      alert("Chủ đề này đang cập nhật câu hỏi!");
      return;
    }
    const preparedQuestions = questions.map(q => ({
      ...q,
      options: [...q.o, q.a].sort(() => Math.random() - 0.5)
    }));
    setShowGrid(false);
    setActiveQuestions(preparedQuestions);
    setCurrentTopic(topic);
    setCurrentQIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOpt(null);
    setMode('playing');
  };

  const handleAnswer = (opt) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOpt(opt);
    if (opt === activeQuestions[currentQIndex].a) setScore(s => s + 10);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOpt(null);
    } else {
      setMode('result');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050511] text-white font-sans overflow-x-hidden flex flex-col items-center">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         <div className="bg-blob absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-500 blur-[120px] opacity-20"></div>
         <div className="bg-blob absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600 blur-[120px] opacity-20"></div>
      </div>

      {/* HEADER */}
      <header className="relative z-20 w-full px-6 md:px-8 py-6 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-sm sticky top-0">
        <div className="flex items-center gap-4 cursor-pointer group animate-in fade-in duration-500" onClick={() => setMode('menu')}>
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
            <Terminal size={24} className="text-white" />
          </div>
          <h1 className="hidden md:block text-2xl md:text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
            ÔN TẬP IT QUIZ 2025-2026
          </h1>
        </div>
        <div className="flex items-center gap-4">
            {mode === 'playing' && (
                <button 
                    onClick={() => setMode('menu')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-sm font-bold text-slate-300"
                >
                    <ChevronLeft size={18}/> Menu
                </button>
            )}
            <button 
                onClick={() => setShowGrid(true)}
                className="p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95"
            >
                <LayoutGrid size={24} />
            </button>
        </div>
      </header>

      {/* GRID OVERLAY MENU */}
      {showGrid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowGrid(false)}></div>
            <div className="relative z-10 w-full max-w-5xl bg-[#0a0a1a] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-90 duration-300 overflow-y-auto max-h-[90vh]">
                <button onClick={() => setShowGrid(false)} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>
                <h2 className="text-3xl font-black mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">Chọn chủ đề nhanh</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {TOPICS.map((topic) => (
                        <div key={topic.id} onClick={() => startExam(topic)} className={cn("group relative aspect-square rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 hover:border-white/20 hover:shadow-xl", topic.color.replace('from-', 'hover:shadow-'))}>
                            <div className={cn("mb-3 w-12 h-12 rounded-xl flex items-center justify-center text-white bg-black/30 shadow-inner group-hover:scale-110 transition-transform", topic.color.replace('from-', 'bg-'))}>{topic.icon}</div>
                            <span className="text-sm font-bold text-center text-slate-300 group-hover:text-white transition-colors">{topic.title}</span>
                            <div className={cn("absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 border-2 transition-opacity", topic.border)}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="relative z-10 w-full flex-1 flex flex-col justify-center py-8 overflow-hidden">
        
        {/* === MENU MODE: INFINITE TRAIN SCROLL === */}
        {mode === 'menu' && (
          <div className="w-full flex flex-col gap-12 animate-in fade-in duration-1000">
            <div className="text-center px-4">
                <h2 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">Dòng chảy Tri thức</h2>
                <p className="text-cyan-200/60 text-lg uppercase tracking-[0.3em] font-bold">Chọn chủ đề để khởi hành</p>
            </div>
            <div className="relative w-full py-10 group/track">
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 mt-1"></div>
                <div className="flex w-max gap-8 animate-scroll group-hover/track:pause px-8">
                    {[...TOPICS, ...TOPICS].map((topic, index) => (
                        <div key={`${topic.id}-${index}`} onClick={() => startExam(topic)} className={cn("relative w-72 h-72 shrink-0 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md p-8 cursor-pointer transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] group overflow-hidden flex flex-col justify-between", topic.border)}>
                            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br", topic.color)}></div>
                            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-white/5 shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-300 z-10", topic.color.replace('from-', 'bg-'))}>{topic.icon}</div>
                            <div className="absolute top-4 right-6 text-6xl font-black text-white/5 select-none group-hover:text-white/10 transition-colors">{index < TOPICS.length ? index + 1 : index + 1 - TOPICS.length}</div>
                            <div className="relative z-10 mt-auto">
                                <h3 className="text-2xl font-bold leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all">{topic.title}</h3>
                                <div className="h-1 w-0 bg-cyan-400 mt-3 group-hover:w-full transition-all duration-500 ease-out"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center text-slate-500 text-sm animate-pulse">&larr; Kéo hoặc chờ để xem thêm chủ đề &rarr;</div>
          </div>
        )}

        {/* === PLAYING MODE (ĐÃ PHÓNG TO SIZE) === */}
        {/* === PLAYING MODE (SIZE VỪA PHẢI - CÂN ĐỐI) === */}
        {mode === 'playing' && (
          // SỬA Ở ĐÂY: max-w-4xl là kích thước chuẩn đẹp nhất
          <div className="w-full max-w-4xl mx-auto animate-in zoom-in-95 duration-300 px-4 relative z-30">
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              
              <div className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-500" 
                   style={{width: `${((currentQIndex + 1) / activeQuestions.length) * 100}%`}}></div>
              
              <div className="mb-6 flex justify-between text-base font-bold text-slate-400 uppercase tracking-widest">
                <span className="text-cyan-400">Câu {currentQIndex + 1} / {activeQuestions.length}</span>
                <span className="flex items-center gap-2"><Trophy size={18} className="text-yellow-500"/> {score} Điểm</span>
              </div>

              {/* SỬA Ở ĐÂY: text-3xl là vừa, không quá to như 5xl */}
              <h3 className="text-2xl md:text-4xl font-black mb-8 leading-snug drop-shadow-md">
                {activeQuestions[currentQIndex].q}
              </h3>

              <div className="grid gap-4 mb-8">
                {activeQuestions[currentQIndex].options.map((opt, i) => {
                  const isSelected = opt === selectedOpt;
                  const isCorrect = opt === activeQuestions[currentQIndex].a;
                  
                  let stateStyle = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30";
                  if (isAnswered) {
                    if (isCorrect) stateStyle = "bg-green-500/20 border-green-500 text-green-300";
                    else if (isSelected) stateStyle = "bg-red-500/20 border-red-500 text-red-300";
                    else stateStyle = "bg-white/5 opacity-50";
                  }

                  return (
                    <button key={i} disabled={isAnswered} onClick={() => handleAnswer(opt)}
                      className={cn(
                        // SỬA Ở ĐÂY: p-5 và text-lg, text-xl là vừa tay
                        "w-full p-5 md:p-6 rounded-2xl border text-left text-lg md:text-xl font-bold transition-all flex justify-between items-center group shadow-md",
                        stateStyle
                      )}>
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <Check size={24} className="text-green-400 shrink-0 ml-3" />}
                      {isAnswered && isSelected && !isCorrect && <X size={24} className="text-red-400 shrink-0 ml-3" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-6 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-2 text-blue-300 font-bold uppercase text-xs tracking-wider">
                      <Lightbulb size={20} /> Giải thích
                    </div>
                    <p className="text-slate-200 leading-relaxed text-base md:text-lg">
                      {activeQuestions[currentQIndex].e}
                    </p>
                  </div>

                  <button onClick={handleNextQuestion}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg md:text-xl text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    {currentQIndex < activeQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'} <ArrowRight size={24} />
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* === RESULT MODE (ĐÃ PHÓNG TO SIZE) === */}
        {mode === 'result' && (
          <div className="text-center animate-in zoom-in-90 duration-300 max-w-2xl w-full mx-auto relative z-30">
            <div className="bg-white/5 border border-white/10 p-12 md:p-16 rounded-[4rem] backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(34,211,238,0.15)_0%,transparent_60%)] animate-pulse pointer-events-none"></div>
              
              <Trophy size={100} className="mx-auto text-yellow-400 mb-8 drop-shadow-[0_0_25px_rgba(250,204,21,0.6)]" />
              <h2 className="text-3xl md:text-5xl font-black mb-4">Hoàn thành xuất sắc!</h2>
              <p className="text-slate-400 text-xl mb-10">Bạn đã chinh phục thử thách này</p>
              
              <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-300 mb-4">
                {score}
              </div>
              <div className="text-lg font-bold text-cyan-500 uppercase tracking-widest mb-12">Tổng điểm</div>
              
              <div className="grid gap-4 relative z-10">
                <button onClick={() => {setMode('menu'); setCurrentTopic(null);}} 
                        className="w-full py-5 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all text-xl flex items-center justify-center gap-3">
                   <Home size={24} /> Quay lại Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ITQuizGame;