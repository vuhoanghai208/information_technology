import React, { useState, useEffect } from 'react';
import { 
  Brain, Wifi, Scale, Globe, Briefcase, Code2, Database, 
  Sparkles, Check, X, 
  Terminal, Trophy, ArrowRight, Lightbulb, ChevronLeft, LayoutGrid, Home,
  Palette, Keyboard // Icon đại diện
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- CONFIG: Lấy Anime.js từ CDN ---
const anime = window.anime; 

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// NGÂN HÀNG CÂU HỎI (FULL 16 MÀU & ĐA DẠNG CHẾ ĐỘ)
// ============================================================================
const QUESTION_BANK = [
  // ========================================================================
  // 1. CHỦ ĐỀ: MÀU SẮC (BAO GỒM 3 LOẠI: TEXT, MC, T/F)
  // Đảm bảo đủ 16 màu trong tài liệu
  // ========================================================================
  
  // --- LOẠI 1: NHẬP LIỆU (TEXT INPUT) ---
  { 
    subject: 'color', type: 'text',
    q: "Mã màu Hex #FF0000 là màu gì? (Tiếng Anh)", 
    a: "Red", 
    e: "#FF0000 là màu Đỏ chuẩn.",
    colorCode: "#FF0000" 
  },
  { 
    subject: 'color', type: 'text',
    q: "Mã màu #00FF00 (sáng nhất) là màu gì? (Tiếng Anh)", 
    a: "Lime", 
    e: "Lime dùng giá trị tối đa FF cho kênh Green.",
    colorCode: "#00FF00" 
  },
  { 
    subject: 'color', type: 'text',
    q: "Mã màu #0000FF là màu gì? (Tiếng Anh)", 
    a: "Blue", 
    e: "Blue dùng giá trị tối đa FF cho kênh Blue.",
    colorCode: "#0000FF" 
  },
  { 
    subject: 'color', type: 'text',
    q: "Mã màu #FFFF00 là màu gì? (Tiếng Anh)", 
    a: "Yellow", 
    e: "Sự kết hợp của Red (FF) và Green (FF) tạo ra Yellow.",
    colorCode: "#FFFF00" 
  },
  { 
    subject: 'color', type: 'text',
    q: "Mã màu #00FFFF là màu gì? (Tiếng Anh - Tên khác là Cyan)", 
    a: "Aqua", 
    e: "Sự kết hợp của Green (FF) và Blue (FF).",
    colorCode: "#00FFFF" 
  },
  { 
    subject: 'color', type: 'text',
    q: "Mã màu #FF00FF là màu gì? (Tiếng Anh - Tên khác là Magenta)", 
    a: "Fuchsia", 
    e: "Sự kết hợp của Red (FF) và Blue (FF).",
    colorCode: "#FF00FF" 
  },

  // --- LOẠI 2: TRẮC NGHIỆM (MULTIPLE CHOICE) ---
  { 
    subject: 'color', type: 'mc',
    q: "Mã màu #800000 là màu gì?", 
    a: "Maroon (Đỏ sậm)", 
    o: ["Red (Đỏ tươi)", "Purple (Tím)", "Brown (Nâu)"], 
    e: "Maroon là phiên bản tối (50% độ sáng) của Red.",
    colorCode: "#800000"
  },
  { 
    subject: 'color', type: 'mc',
    q: "Mã màu #000080 là màu gì?", 
    a: "Navy (Xanh hải quân)", 
    o: ["Blue (Xanh dương)", "Teal (Xanh lam ngọc)", "Black (Đen)"], 
    e: "Navy là phiên bản tối của Blue.",
    colorCode: "#000080"
  },
  { 
    subject: 'color', type: 'mc',
    q: "Mã màu #808000 là màu gì?", 
    a: "Olive (Xanh ô-liu)", 
    o: ["Yellow (Vàng)", "Lime (Xanh lá mạ)", "Green (Xanh lá)"], 
    e: "Olive là phiên bản tối của Yellow.",
    colorCode: "#808000"
  },
  { 
    subject: 'color', type: 'mc',
    q: "Mã màu #008080 là màu gì?", 
    a: "Teal (Xanh lam ngọc)", 
    o: ["Aqua (Xanh ngọc)", "Cyan (Xanh lơ)", "Blue (Xanh dương)"], 
    e: "Teal là phiên bản tối của Aqua/Cyan.",
    colorCode: "#008080"
  },
  { 
    subject: 'color', type: 'mc',
    q: "Mã màu #800080 là màu gì?", 
    a: "Purple (Tím)", 
    o: ["Fuchsia (Hồng cánh sen)", "Magenta", "Violet"], 
    e: "Purple là phiên bản tối của Fuchsia.",
    colorCode: "#800080"
  },
  { 
    subject: 'color', type: 'mc',
    q: "Mã màu #008000 là màu gì?", 
    a: "Green (Xanh lá - Tối)", 
    o: ["Lime (Xanh lá - Sáng)", "Olive", "Teal"], 
    e: "Green chuẩn dùng giá trị 80 (128), tối hơn Lime.",
    colorCode: "#008000"
  },

  // --- LOẠI 3: ĐÚNG / SAI (TRUE/FALSE) ---
  {
    subject: 'color', type: 'tf',
    q: "ĐÚNG hay SAI: Màu #000000 là màu Trắng (White)?",
    a: "Sai",
    o: ["Đúng"],
    e: "#000000 là màu Đen (Black). Màu Trắng là #FFFFFF.",
    colorCode: "#000000"
  },
  {
    subject: 'color', type: 'tf',
    q: "ĐÚNG hay SAI: Màu #FFFFFF là màu Trắng (White)?",
    a: "Đúng",
    o: ["Sai"],
    e: "Tất cả các kênh màu (R, G, B) đều đạt giá trị tối đa (FF) tạo ra màu trắng.",
    colorCode: "#FFFFFF"
  },
  {
    subject: 'color', type: 'tf',
    q: "ĐÚNG hay SAI: Màu #C0C0C0 là màu Silver (Bạc)?",
    a: "Đúng",
    o: ["Sai"],
    e: "Silver (#C0C0C0) sáng hơn Gray (#808080).",
    colorCode: "#C0C0C0"
  },
  {
    subject: 'color', type: 'tf',
    q: "ĐÚNG hay SAI: Màu #808080 là màu Gray (Xám)?",
    a: "Đúng",
    o: ["Sai"],
    e: "Gray là màu trung tính với giá trị 128 (80 hex) ở cả 3 kênh.",
    colorCode: "#808080"
  },
  // Câu hỏi bổ sung về Hex Math
  { 
    subject: 'color', type: 'text',
    q: "Trong hệ HEX, ký tự 'C' đại diện cho giá trị thập phân nào?", 
    a: "12", 
    e: "Hệ 16: 0-9, A=10, B=11, C=12."
  },

  // ========================================================================
  // 2. CÁC CHỦ ĐỀ KHÁC (CHỈ CÓ LOẠI: MC VÀ T/F)
  // ========================================================================

  // --- HTML & CSS ---
  { 
    subject: 'html', type: 'mc',
    q: "Độ ưu tiên (Specificity) cao nhất thuộc về?", 
    a: "!important", 
    o: ["ID Selector", "Class Selector", "Inline Style"], 
    e: "!important ghi đè mọi quy tắc khác." 
  },
  { 
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thẻ <div> là phần tử nội dòng (inline element)?", 
    a: "Sai", 
    o: ["Đúng"], 
    e: "<div> là phần tử dạng khối (block), luôn xuống dòng." 
  },

  // --- AI ---
  { 
    subject: 'ai', type: 'mc',
    q: "Hệ chuyên gia MYCIN dùng để làm gì?", 
    a: "Chẩn đoán bệnh nhiễm trùng", 
    o: ["Chơi cờ vua", "Dịch ngôn ngữ", "Nhận diện khuôn mặt"], 
    e: "MYCIN là hệ chuyên gia y học nổi tiếng." 
  },
  { 
    subject: 'ai', type: 'tf',
    q: "ĐÚNG hay SAI: Turing Test dùng để kiểm tra tốc độ máy tính?", 
    a: "Sai", 
    o: ["Đúng"], 
    e: "Turing Test kiểm tra trí tuệ và khả năng phản hồi giống con người." 
  },

  // --- MẠNG MÁY TÍNH ---
  { 
    subject: 'network', type: 'mc',
    q: "Thiết bị nào hoạt động ở Tầng 3 (Network) mô hình OSI?", 
    a: "Router", 
    o: ["Switch", "Hub", "Repeater"], 
    e: "Router định tuyến gói tin dựa trên địa chỉ IP." 
  },
  { 
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: Địa chỉ 127.0.0.1 là địa chỉ IP công cộng (Public)?", 
    a: "Sai", 
    o: ["Đúng"], 
    e: "127.0.0.1 là địa chỉ Loopback (Localhost)." 
  },

  // --- PYTHON ---
  { 
    subject: 'python', type: 'mc',
    q: "Hàm len('Python') trả về giá trị bao nhiêu?", 
    a: "6", 
    o: ["5", "7", "0"], 
    e: "Chuỗi 'Python' có 6 ký tự." 
  },
  { 
    subject: 'python', type: 'tf',
    q: "ĐÚNG hay SAI: List trong Python có thể thay đổi (Mutable)?", 
    a: "Đúng", 
    o: ["Sai"], 
    e: "Ta có thể thêm, sửa, xóa phần tử trong List." 
  },

  // --- SQL ---
  { 
    subject: 'sql', type: 'mc',
    q: "Lệnh nào dùng để xóa toàn bộ dữ liệu nhanh và reset ID?", 
    a: "TRUNCATE", 
    o: ["DELETE", "DROP", "REMOVE"], 
    e: "TRUNCATE tái tạo lại bảng, nhanh hơn DELETE." 
  },
  { 
    subject: 'sql', type: 'tf',
    q: "ĐÚNG hay SAI: Khóa chính (Primary Key) được phép NULL?", 
    a: "Sai", 
    o: ["Đúng"], 
    e: "Primary Key bắt buộc phải có dữ liệu và duy nhất." 
  },
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
  { subject: 'python', code: "x = [1, 2, 3]\ny = x\nz = x.copy()\nx[0] = 99\nprint(y[0], z[0])", q: "Kết quả in ra là gì?", a: "99 1", o: ["99 99", "1 1", "1 99"], e: "y là tham chiếu (biến đổi theo x). z là bản sao (độc lập với x)." },


  // ========================================================================
  // BỔ SUNG: HTML & CSS NÂNG CAO & CÁC THẺ ÍT GẶP
  // ========================================================================
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <legend> được sử dụng bên trong thẻ nào để tạo tiêu đề cho nhóm form?",
    a: "<fieldset>",
    o: ["<form>", "<div>", "<section>"],
    e: "<fieldset> tạo viền bao quanh nhóm, <legend> tạo tiêu đề nằm trên viền đó."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thẻ <input type='button'> có chức năng gửi dữ liệu về server mặc định?",
    a: "Sai",
    o: ["Đúng"],
    e: "Chỉ có <input type='submit'> mới gửi dữ liệu. Type='button' chỉ là nút bấm thường (thường dùng với JS)."
  },
  {
    subject: 'html', type: 'mc',
    q: "Để tạo danh sách gợi ý (autocomplete) cho ô nhập liệu, ta dùng thẻ nào?",
    a: "<datalist>",
    o: ["<select>", "<suggest>", "<option-group>"],
    e: "<datalist> chứa các <option> để gợi ý nhưng người dùng vẫn có thể nhập giá trị khác."
  },
  {
    subject: 'css', type: 'mc',
    q: "Selector 'div > p' biểu thị mối quan hệ gì?",
    a: "Cha - Con trực tiếp (Chỉ chọn p là con ruột của div)",
    o: ["Tổ tiên - Hậu duệ (Chọn tất cả p bên trong div)", "Anh em liền kề", "Anh em cùng cấp"],
    e: "Dấu '>' là Child Combinator, chỉ tác động lên phần tử con cấp 1."
  },
  {
    subject: 'css', type: 'mc',
    q: "Selector 'A + B' (Ví dụ: h1 + p) sẽ chọn phần tử nào?",
    a: "Phần tử B nằm ngay sau A (Anh em liền kề)",
    o: ["Tất cả phần tử B nằm sau A", "Phần tử B nằm bên trong A", "Phần tử A nằm ngay trước B"],
    e: "Dấu '+' là Adjacent Sibling Combinator, chỉ chọn phần tử liền kề ngay phía sau."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Thuộc tính 'display: inline' cho phép cài đặt chiều rộng (width) và chiều cao (height)?",
    a: "Sai",
    o: ["Đúng"],
    e: "Phần tử inline chỉ chiếm diện tích nội dung, không nhận width/height và margin/padding dọc (top/bottom)."
  },
  {
    subject: 'css', type: 'mc',
    q: "Giá trị 'line-height: 1.5' (số không đơn vị) khác gì với 'line-height: 150%'?",
    a: "Số không đơn vị sẽ kế thừa tỷ lệ cho con (tốt hơn), % sẽ tính ra pixel rồi mới kế thừa (dễ lỗi).",
    o: ["Giống hệt nhau.", "Số không đơn vị không hoạt động.", "Đơn vị % tốt hơn."],
    e: "Luôn khuyên dùng số không đơn vị (unitless) để tránh lỗi khi phần tử con có font-size khác."
  },
  {
    subject: 'css', type: 'mc',
    q: "Kiểu viền 'border-style: double' yêu cầu độ dày (width) tối thiểu bao nhiêu để hiển thị rõ?",
    a: "3px",
    o: ["1px", "5px", "10px"],
    e: "Cần ít nhất 3px: 1px viền + 1px khoảng trắng + 1px viền."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính 'text-indent' với giá trị âm (VD: -9999px) thường dùng để làm gì?",
    a: "Giấu chữ đi (để thay bằng hình ảnh logo/icon)",
    o: ["Căn giữa chữ.", "Tạo chữ đậm.", "Thụt đầu dòng đoạn văn."],
    e: "Giá trị âm sẽ đẩy dòng đầu tiên ra khỏi màn hình hiển thị."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <kbd> dùng để đại diện cho nội dung gì?",
    a: "Phím bấm bàn phím (Keyboard Input)",
    o: ["Đoạn mã code", "Kết quả đầu ra", "Biến số toán học"],
    e: "Ví dụ: Nhấn <kbd>Ctrl</kbd> + <kbd>C</kbd>."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: 'font-weight: 400' tương đương với 'font-weight: bold'?",
    a: "Sai",
    o: ["Đúng"],
    e: "400 là 'normal' (bình thường). 700 mới là 'bold' (đậm)."
  },
  {
    subject: 'css', type: 'mc',
    q: "Để chọn dòng đầu tiên của đoạn văn bản, ta dùng Pseudo-element nào?",
    a: "::first-line",
    o: ["::first-letter", "::before", "::after"],
    e: "::first-line chọn dòng hiển thị đầu tiên, thay đổi theo kích thước cửa sổ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Trong Flexbox, để các phần tử tự động xuống dòng khi hết chỗ, ta dùng thuộc tính nào?",
    a: "flex-wrap: wrap",
    o: ["flex-direction: column", "display: block", "white-space: normal"],
    e: "Mặc định Flexbox sẽ ép các phần tử trên 1 dòng (nowrap)."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Pseudo-element '::first-letter' có thể áp dụng cho thẻ <span> (display: inline)?",
    a: "Sai",
    o: ["Đúng"],
    e: "::first-letter chỉ áp dụng cho các phần tử dạng khối (block, inline-block...)."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thuộc tính 'target=\"_self\"' trong thẻ <a> có tác dụng gì?",
    a: "Mở liên kết ngay trong tab/cửa sổ hiện tại (Mặc định)",
    o: ["Mở liên kết trong tab mới", "Mở liên kết trong cửa sổ popup", "Tải file xuống"],
    e: "Khác với '_blank' là mở tab mới."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính 'list-style: square' tạo ra dấu đầu dòng hình gì?",
    a: "Hình vuông đặc",
    o: ["Hình tròn đặc (disc)", "Hình tròn rỗng (circle)", "Không có dấu"],
    e: "Square tạo dấu chấm vuông."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <mark> có tác dụng hiển thị mặc định như thế nào?",
    a: "Tô nền màu vàng (hoặc màu nổi bật) cho văn bản",
    o: ["Gạch chân văn bản", "In nghiêng văn bản", "Làm mờ văn bản"],
    e: "Dùng để đánh dấu/highlight văn bản quan trọng."
  }, 
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Id class='1st-item' là một tên class hợp lệ?",
    a: "Sai",
    o: ["Đúng"],
    e: "Tên class/id trong CSS không được bắt đầu bằng số."
  },
  {
    subject: 'css', type: 'mc',
    q: "Để gạch chân dưới văn bản, ta dùng thuộc tính nào?",
    a: "text-decoration: underline",
    o: ["font-style: italic", "text-transform: underline", "border-bottom: 1px"],
    e: "text-decoration dùng để trang trí gạch chân, gạch ngang, hoặc bỏ gạch chân."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính 'flex: 1' có ý nghĩa gì đối với các phần tử con?",
    a: "Các phần tử sẽ giãn đều nhau để lấp đầy chỗ trống",
    o: ["Các phần tử giữ nguyên kích thước", "Các phần tử co lại nhỏ nhất", "Các phần tử xếp dọc"],
    e: "Thường dùng để chia đều không gian trong Flexbox."
  },
  // ========================================================================
  // BỔ SUNG PHẦN 2: FORM NÂNG CAO, SEMANTIC TAGS & CSS EFFECTS
  // ========================================================================
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính 'align-content' trong Flexbox khác 'align-items' ở điểm nào?",
    a: "align-content căn chỉnh các dòng (khi có nhiều dòng), align-items căn chỉnh từng item trên một dòng.",
    o: ["align-content dùng cho trục chính, align-items dùng cho trục phụ.", "Hai thuộc tính này giống hệt nhau.", "align-content chỉ dùng cho văn bản."],
    e: "Ghi nhớ: align-items = từng item, align-content = cả dòng (chỉ hoạt động khi có flex-wrap: wrap)."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <input type='reset'> có tác dụng gì trong Form?",
    a: "Xóa toàn bộ dữ liệu người dùng vừa nhập về trạng thái ban đầu",
    o: ["Gửi dữ liệu đi.", "Tải lại trang web.", "Đóng form lại."],
    e: "Nút Reset giúp người dùng làm mới form nhanh chóng mà không cần F5."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Phương thức 'method=\"post\"' gửi dữ liệu hiển thị trực tiếp lên URL?",
    a: "Sai",
    o: ["Đúng"],
    e: "'GET' mới gửi qua URL. 'POST' gửi ngầm (ẩn) bên trong HTTP request body, bảo mật hơn."
  },
  {
    subject: 'css', type: 'mc',
    q: "Pseudo-element '::selection' cho phép thay đổi những thuộc tính nào?",
    a: "Color, Background-color, Text-shadow",
    o: ["Font-size, Font-weight, Margin", "Tất cả thuộc tính CSS", "Chỉ thay đổi được màu nền"],
    e: "Trình duyệt giới hạn các thuộc tính của ::selection để tránh thay đổi bố cục khi bôi đen."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <sup> và <sub> dùng để làm gì?",
    a: "sup: chỉ số trên (x²), sub: chỉ số dưới (H₂O)",
    o: ["sup: chỉ số dưới, sub: chỉ số trên", "sup: in đậm, sub: in nghiêng", "sup: gạch chân, sub: gạch ngang"],
    e: "Superscript (trên) và Subscript (dưới)."
  },
  {
    subject: 'css', type: 'mc',
    q: "Từ khóa 'inset' trong thuộc tính 'box-shadow' có tác dụng gì?",
    a: "Đổ bóng vào bên trong phần tử (thay vì đổ ra ngoài)",
    o: ["Làm bóng mờ đi.", "Đổi màu bóng thành màu đen.", "Xóa bóng."],
    e: "Mặc định bóng đổ ra ngoài (outset). Thêm 'inset' để tạo hiệu ứng lún/lõm xuống."
  },
  {
    subject: 'css', type: 'mc',
    q: "Selector 'E ~ F' (General Sibling) chọn phần tử nào?",
    a: "Tất cả phần tử F nằm sau E (cùng cha), không cần liền kề",
    o: ["Chỉ phần tử F nằm ngay sát sau E", "Phần tử F là con của E", "Phần tử F nằm trước E"],
    e: "Dấu '~' lỏng lẻo hơn dấu '+'. Nó chọn tất cả anh em phía sau."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thẻ <address> dùng để hiển thị địa chỉ nhà riêng của bất kỳ ai?",
    a: "Sai",
    o: ["Đúng"],
    e: "<address> dùng để cung cấp thông tin liên hệ của tác giả bài viết hoặc chủ sở hữu trang web."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính 'font-variant: small-caps' hiển thị văn bản như thế nào?",
    a: "Chữ in hoa nhưng kích thước nhỏ (bằng chữ thường)",
    o: ["Chữ in hoa toàn bộ (như uppercase)", "Chữ cái đầu viết hoa", "Chữ nghiêng nhỏ"],
    e: "Tạo kiểu chữ in hoa nghệ thuật, giữ độ cao bằng chữ thường (x-height)."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <q> khác thẻ <blockquote> ở điểm nào?",
    a: "<q> dùng cho trích dẫn ngắn trong dòng (tự thêm ngoặc kép), <blockquote> dùng cho trích dẫn dài (tạo khối riêng).",
    o: ["<q> dùng cho thơ, <blockquote> dùng cho văn xuôi.", "Hai thẻ này giống hệt nhau.", "<q> không có semantic."],
    e: "q (Quote) là inline, blockquote là block element."
  },
  {
    subject: 'css', type: 'mc',
    q: "Tính điểm trọng số (Specificity): Selector '.test #p11' có bao nhiêu điểm?",
    a: "110 (1 ID + 1 Class)",
    o: ["20 (2 Class)", "101 (1 ID + 1 Tag)", "11 (1 Class + 1 Tag)"],
    e: "ID (#) = 100 điểm, Class (.) = 10 điểm. Tổng = 110."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Thuộc tính 'letter-spacing' dùng để chỉnh khoảng cách giữa các từ?",
    a: "Sai",
    o: ["Đúng"],
    e: "'letter-spacing' chỉnh khoảng cách giữa các KÝ TỰ (chữ cái). 'word-spacing' mới chỉnh khoảng cách từ."
  },
  {
    subject: 'html', type: 'mc',
    q: "Để gộp 2 cột thành 1 ô trong bảng (table), ta dùng thuộc tính nào?",
    a: "colspan=\"2\"",
    o: ["rowspan=\"2\"", "span=\"2\"", "merge=\"2\""],
    e: "Colspan (Column Span) mở rộng ô theo chiều ngang."
  },
  {
    subject: 'css', type: 'mc',
    q: "Kiểu viền 'border-style: groove' tạo hiệu ứng gì?",
    a: "Khắc chìm (tạo rãnh sâu xuống bề mặt)",
    o: ["Gờ nổi (sống trâu)", "Nét đứt", "Nét đôi"],
    e: "Groove tạo cảm giác khung viền bị khắc vào màn hình."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thuộc tính 'autoplay' trong thẻ <video> có tác dụng gì?",
    a: "Tự động phát video ngay khi tải trang",
    o: ["Tự động phát lại khi hết (loop)", "Tắt tiếng video", "Hiển thị nút điều khiển"],
    e: "Lưu ý: Trình duyệt thường chặn autoplay nếu có tiếng (cần thêm 'muted')."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thẻ <code> dùng để định dạng các đoạn mã lập trình?",
    a: "Đúng",
    o: ["Sai"],
    e: "Thẻ <code> thường hiển thị font monospace (đơn không gian) để dễ đọc code."
  },
  {
    subject: 'css', type: 'mc',
    q: "Font-weight có giá trị số 700 tương đương với từ khóa nào?",
    a: "bold",
    o: ["normal", "bolder", "lighter"],
    e: "400 = normal, 700 = bold."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <ins> thường được trình duyệt hiển thị mặc định như thế nào?",
    a: "Gạch chân (để biểu thị nội dung mới được thêm vào)",
    o: ["Gạch ngang (xóa bỏ)", "In đậm", "Tô nền vàng"],
    e: "Ngược lại với <del> (gạch bỏ), <ins> (insert) dùng để đánh dấu nội dung mới."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính 'list-style: circle' tạo ra dấu đầu dòng gì?",
    a: "Hình tròn rỗng",
    o: ["Hình tròn đặc (disc)", "Hình vuông (square)", "Không có dấu"],
    e: "Disc (mặc định) là tròn đặc, Circle là tròn rỗng."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thuộc tính 'placeholder' trong input có thể thay thế hoàn toàn thẻ <label>?",
    a: "Sai",
    o: ["Đúng"],
    e: "Placeholder biến mất khi nhập liệu, làm giảm trải nghiệm người dùng (UX). Vẫn cần Label."
  },
  // ========================================================================
  // BỔ SUNG PHẦN 3: CÁC THẺ SEMANTIC, FORM & CSS COMBINATORS
  // ========================================================================
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <article> khác thẻ <section> ở điểm cốt lõi nào?",
    a: "<article> là nội dung độc lập, có thể tách riêng (như bài báo); <section> là một phần của tổng thể.",
    o: ["<article> dùng cho tiêu đề, <section> dùng cho chân trang.", "Hai thẻ này hoàn toàn giống nhau.", "<section> quan trọng hơn <article>."],
    e: "Hãy nhớ: <article> giống như một bài viết trên báo, cắt ra dán chỗ khác vẫn hiểu được. <section> giống như một chương sách."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Thuộc tính 'position: fixed' định vị phần tử dựa trên phần tử cha gần nhất?",
    a: "Sai",
    o: ["Đúng"],
    e: "'fixed' định vị dựa trên cửa sổ trình duyệt (viewport), nó sẽ đứng yên khi cuộn trang (trừ khi có transform)."
  },
  {
    subject: 'html', type: 'mc',
    q: "Để tạo một nhóm các tùy chọn trong thẻ <select> (Dropdown), ta dùng thẻ nào?",
    a: "<optgroup>",
    o: ["<group>", "<list>", "<option-group>"],
    e: "<optgroup label='Tiêu đề'> giúp phân nhóm các <option> để dễ nhìn hơn."
  },
  {
    subject: 'css', type: 'mc',
    q: "Selector 'p:first-child' sẽ chọn phần tử nào?",
    a: "Thẻ <p> nếu nó là con đầu tiên của cha nó.",
    o: ["Tất cả các thẻ <p> đầu tiên trong trang.", "Ký tự đầu tiên của thẻ <p>.", "Thẻ con đầu tiên bên trong <p>."],
    e: "Rất dễ nhầm: p:first-child chỉ chọn <p> KHI VÀ CHỈ KHI nó đứng đầu tiên trong container."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thuộc tính 'autocomplete=\"off\"' trong form có tác dụng gì?",
    a: "Tắt tính năng gợi ý lịch sử nhập liệu của trình duyệt.",
    o: ["Tự động điền mật khẩu.", "Ngăn chặn gửi form.", "Tự động sửa lỗi chính tả."],
    e: "Thường dùng cho các ô nhập liệu nhạy cảm hoặc captcha."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Giá trị 'opacity: 0' làm phần tử biến mất và không còn chiếm chỗ trên trang?",
    a: "Sai",
    o: ["Đúng"],
    e: "'opacity: 0' chỉ làm phần tử trở nên trong suốt (tàng hình), nó vẫn chiếm không gian và tương tác được (click)."
  },
  {
    subject: 'css', type: 'mc',
    q: "Trong mô hình Box Model, 'border-box' bao gồm những thành phần nào trong kích thước width/height?",
    a: "Content + Padding + Border",
    o: ["Content only", "Content + Margin", "Content + Padding + Border + Margin"],
    e: "box-sizing: border-box giúp kích thước phần tử không bị phình to khi thêm padding hay border."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <aside> thường được dùng cho nội dung gì?",
    a: "Nội dung phụ, bên lề (Sidebar, quảng cáo, bài viết liên quan).",
    o: ["Nội dung chính của trang.", "Tiêu đề đầu trang.", "Chân trang."],
    e: "Aside = 'Ở bên cạnh', nội dung không ảnh hưởng trực tiếp đến mạch chính."
  },
  {
    subject: 'css', type: 'mc',
    q: "Đơn vị 'vh' (Viewport Height) khác '%' ở điểm nào?",
    a: "'vh' dựa trên chiều cao màn hình trình duyệt, '%' dựa trên chiều cao phần tử cha.",
    o: ["'vh' là đơn vị tĩnh, '%' là đơn vị động.", "Hai đơn vị này giống hệt nhau.", "'vh' dùng cho font-size, '%' dùng cho width."],
    e: "100vh luôn bằng toàn bộ chiều cao màn hình, bất kể phần tử cha cao bao nhiêu."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thẻ <a> có thể chứa thẻ <div> bên trong (theo chuẩn HTML5)?",
    a: "Đúng",
    o: ["Sai"],
    e: "HTML5 cho phép thẻ a (inline) bao bọc các phần tử block (như div, h1) để làm cả khối clickable."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính 'overflow: hidden' thường dùng để giải quyết vấn đề gì (ngoài việc ẩn nội dung thừa)?",
    a: "Clear float (khắc phục lỗi sập margin/height của cha khi con dùng float).",
    o: ["Tăng tốc độ tải trang.", "Làm chữ đậm hơn.", "Tạo thanh cuộn."],
    e: "Kỹ thuật này gọi là 'BFC' (Block Formatting Context)."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <time> dùng để làm gì?",
    a: "Đánh dấu thời gian/ngày tháng để máy (Google/Trình duyệt) hiểu được.",
    o: ["Hiển thị đồng hồ chạy.", "Đếm ngược thời gian.", "Chỉnh múi giờ."],
    e: "Ví dụ: <time datetime='2025-01-01'>Tết Dương Lịch</time>."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: 'margin: auto' có thể căn giữa phần tử theo chiều dọc (vertical) trong layout bình thường (block)?",
    a: "Sai",
    o: ["Đúng"],
    e: "Trong layout block truyền thống, margin: auto chỉ căn giữa chiều ngang (horizontal). Muốn dọc phải dùng Flexbox/Grid hoặc position."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thuộc tính 'download' trong thẻ <a> có tác dụng gì?",
    a: "Yêu cầu trình duyệt tải file xuống thay vì mở trực tiếp (nếu có thể).",
    o: ["Tăng tốc độ tải.", "Mở file trong tab mới.", "Chặn tải file."],
    e: "<a href='img.jpg' download>Tải ảnh</a>."
  },
  {
    subject: 'css', type: 'mc',
    q: "Để tạo hiệu ứng chuyển động mượt mà cho các thuộc tính CSS, ta dùng?",
    a: "transition",
    o: ["animate", "move", "transform"],
    e: "Ví dụ: transition: all 0.3s ease; giúp hover không bị giật cục."
  },
  {
    subject: 'css', type: 'mc',
    q: "Giá trị 'sticky' trong thuộc tính position hoạt động như thế nào?",
    a: "Kết hợp giữa relative và fixed: cuộn đến điểm ngưỡng thì dính lại.",
    o: ["Dính chặt vào đáy trang.", "Giống hệt absolute.", "Không cho phép cuộn trang."],
    e: "Thường dùng làm thanh menu dính (Sticky Header)."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thẻ <br> là thẻ đóng (có </br>)?",
    a: "Sai",
    o: ["Đúng"],
    e: "<br> là thẻ rỗng (Empty tag/Self-closing tag), không có thẻ đóng và không chứa nội dung."
  },
  {
    subject: 'css', type: 'mc',
    q: "Pseudo-class ':nth-child(even)' chọn các phần tử nào?",
    a: "Các phần tử ở vị trí chẵn (2, 4, 6...)",
    o: ["Các phần tử ở vị trí lẻ (1, 3, 5...)", "Tất cả phần tử.", "2 phần tử đầu tiên."],
    e: "even = chẵn, odd = lẻ."
  },
  // --- CSS NÂNG CAO ---
  {
    subject: 'html', type: 'mc',
    q: "Hiện tượng 'Margin Collapse' (gộp lề) thường xảy ra giữa các phần tử nào?",
    a: "Các phần tử Block nằm liền kề nhau theo chiều dọc",
    o: ["Các phần tử Inline nằm liền kề", "Giữa phần tử cha và con dùng Flexbox", "Các phần tử có float"],
    e: "Khi 2 margin dọc gặp nhau, trình duyệt sẽ gộp chúng lại thành 1 margin lớn nhất thay vì cộng dồn."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thuộc tính 'z-index' có tác dụng trên phần tử có 'position: static'?",
    a: "Sai",
    o: ["Đúng"],
    e: "z-index chỉ hoạt động trên các phần tử đã được định vị (position: relative, absolute, fixed, sticky)."
  },
  {
    subject: 'html', type: 'text',
    q: "Giá trị mặc định của thuộc tính 'position' trong CSS là gì? (Tiếng Anh)",
    a: "static",
    e: "Mặc định tất cả phần tử là static (xuất hiện theo thứ tự trong luồng tài liệu)."
  },
  {
    subject: 'html', type: 'mc',
    q: "Đơn vị 'em' và 'rem' khác nhau cốt lõi ở điểm nào?",
    a: "rem dựa theo root (html), em dựa theo font-size của phần tử cha trực tiếp",
    o: ["rem là đơn vị tĩnh, em là đơn vị động", "rem dùng cho margin, em dùng cho font-size", "Giống hệt nhau"],
    e: "Dùng 'rem' giúp kiểm soát kích thước đồng nhất dễ dàng hơn 'em'."
  },
  {
    subject: 'html', type: 'mc',
    q: "Trong Grid Layout, đơn vị 'fr' có ý nghĩa gì?",
    a: "Phân số (Fraction) của không gian còn trống",
    o: ["Frame rate (Tốc độ khung hình)", "Free space (Không gian tự do)", "Fixed ratio (Tỷ lệ cố định)"],
    e: "VD: '1fr 2fr' nghĩa là cột 2 rộng gấp đôi cột 1 trong khoảng trống cho phép."
  },
  // ========================================================================
  // ĐÀO SÂU: CSS SPECIFICITY (TÍNH TOÁN TRỌNG SỐ) [Source: 283-296]
  // ========================================================================
  {
    subject: 'html', type: 'mc',
    q: "Tính điểm trọng số (Specificity) cho selector: 'div#header .nav li'?",
    a: "111 (1 ID, 1 Class, 2 Tag)",
    o: ["120 (1 ID, 2 Class)", "102 (1 ID, 2 Tag)", "112 (1 ID, 1 Class, 2 Tag)"],
    e: "#header(100) + .nav(10) + div(1) + li(1) = 112 điểm. (Lưu ý: div và li đều là thẻ)."
  },
  {
    subject: 'html', type: 'mc',
    q: "Selector nào sau đây có trọng số cao nhất?",
    a: "#sidebar p (101 điểm)",
    o: [".sidebar .content p (21 điểm)", "div#sidebar (101 điểm - nhưng p cụ thể hơn)", "html body div p (4 điểm)"],
    e: "ID (#) luôn áp đảo Class. Nếu cùng điểm ID, cái nào nhiều Class/Tag hơn sẽ thắng."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Selector '*' (Universal) có trọng số là 1?",
    a: "Sai",
    o: ["Đúng"],
    e: "Selector toàn năng '*' có trọng số là 0. Nó luôn bị ghi đè bởi bất kỳ thẻ nào."
  },

  // ========================================================================
  // ĐÀO SÂU: CÁC THUỘC TÍNH CSS NÂNG CAO [Source: 174-194, 267-272]
  // ========================================================================
  {
    subject: 'html', type: 'mc',
    q: "Kiểu viền 'border-style: inset' tạo hiệu ứng thị giác gì?",
    a: "Toàn bộ hộp bị ấn chìm xuống dưới nền (Góc trên-trái tối, dưới-phải sáng).",
    o: ["Toàn bộ hộp nổi lên trên (Outset).", "Tạo rãnh khắc sâu (Groove).", "Tạo gờ nổi (Ridge)."],
    e: "Inset tạo cảm giác nút bấm đang bị nhấn xuống."
  },
  {
    subject: 'html', type: 'mc',
    q: "Pseudo-element '::selection' (khi bôi đen văn bản) CHỈ cho phép thay đổi các thuộc tính nào?",
    a: "color, background-color, text-shadow (Các thuộc tính trang trí bề mặt).",
    o: ["font-size, margin, padding.", "display, position, float.", "width, height, border."],
    e: "Trình duyệt chặn thay đổi kích thước/bố cục khi bôi đen để tránh vỡ trang web."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thuộc tính 'line-height: 1.5' (số không đơn vị) ưu việt hơn 'line-height: 150%' ở điểm nào?",
    a: "Nó kế thừa hệ số tỷ lệ cho phần tử con, thay vì kế thừa giá trị pixel cố định.",
    o: ["Nó chạy nhanh hơn.", "Nó giúp chữ đậm hơn.", "Hai cái giống hệt nhau."],
    e: "Nếu dùng %, giá trị sẽ được tính ra px ở cha rồi mới truyền cho con (gây lỗi nếu font con khác font cha). Số không đơn vị sẽ tính lại ở từng đời con."
  },
  {
    subject: 'html', type: 'text',
    q: "Thuộc tính nào dùng để chuyển toàn bộ văn bản sang chữ IN HOA? (Tiếng Anh)",
    a: "text-transform",
    e: "Giá trị: uppercase. Khác với font-variant: small-caps (chữ hoa nhỏ)."
  },

  // ========================================================================
  // ĐÀO SÂU: HTML5 SEMANTIC & FORM [Source: 39-55, 166-173]
  // ========================================================================
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <datalist> khác thẻ <select> ở điểm cốt lõi nào?",
    a: "<datalist> chỉ gợi ý nhưng cho phép nhập giá trị mới; <select> bắt buộc chọn trong danh sách.",
    o: ["<datalist> không cho nhập.", "<select> cho phép nhập giá trị mới.", "Hai thẻ giống hệt nhau."],
    e: "Datalist giống như tính năng 'Autocomplete' (Tự động điền) của Google Search."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <kbd> (Keyboard Input) thường hiển thị mặc định kiểu font gì?",
    a: "Monospace (Đơn không gian - như mã code).",
    o: ["Serif (Có chân).", "Sans-serif (Không chân).", "Cursive (Viết tay)."],
    e: "Dùng để mô phỏng phím bấm, ví dụ: Ctrl + C."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thuộc tính 'autocomplete' trong form mặc định là 'off'?",
    a: "Sai",
    o: ["Đúng"],
    e: "Mặc định là 'on'. Trình duyệt sẽ tự động gợi ý lịch sử nhập liệu trừ khi bạn tắt nó."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <dfn> dùng để làm gì?",
    a: "Đánh dấu một thuật ngữ đang được định nghĩa/giải thích trong câu.",
    o: ["Viết tắt (Abbreviation).", "Trích dẫn (Citation).", "Xóa chữ (Deleted)."],
    e: "Ví dụ: <dfn>HTML</dfn> là ngôn ngữ đánh dấu..."
  },

  // ========================================================================
  // PYTHON: CÁC CÂU HỎI "BẪY" (TRICKY QUESTIONS)
  // ========================================================================
  {
    subject: 'python', type: 'text',
    code: "print(type( (1) )) vs print(type( (1,) ))",
    q: "Kiểu dữ liệu của (1) và (1,) lần lượt là gì?",
    a: "int và tuple",
    e: "(1) là số nguyên trong ngoặc. (1,) có dấu phẩy mới được hiểu là Tuple 1 phần tử."
  },
  {
    subject: 'python', type: 'mc',
    code: "a = [1, 2, 3]\nb = a\na = [4, 5, 6]\nprint(b)",
    q: "Kết quả in ra là gì?",
    a: "[1, 2, 3]",
    o: ["[4, 5, 6]", "Lỗi", "None"],
    e: "Khi gán a = [mới], a trỏ sang vùng nhớ mới. b vẫn trỏ vào vùng nhớ cũ [1, 2, 3]."
  },
  {
    subject: 'python', type: 'tf',
    q: "ĐÚNG hay SAI: Dictionary trong Python có thể dùng List làm Key (Khóa)?",
    a: "Sai",
    o: ["Đúng"],
    e: "Key của Dictionary phải là Hashable (bất biến) như chuỗi, số, tuple. List là mutable nên không làm Key được."
  },
  {
    subject: 'python', type: 'mc',
    q: "Hàm lambda trong Python là gì?",
    a: "Hàm vô danh (Anonymous function) được định nghĩa trên 1 dòng.",
    o: ["Hàm đệ quy.", "Hàm xử lý lỗi.", "Hàm nhập dữ liệu."],
    e: "VD: lambda x: x * 2."
  },

  // ========================================================================
  // SQL: TỐI ƯU HÓA & KIẾN THỨC SÂU
  // ========================================================================
  {
    subject: 'sql', type: 'mc',
    q: "Tại sao nên dùng VARCHAR thay vì CHAR cho cột 'HoTen'?",
    a: "VARCHAR tiết kiệm bộ nhớ vì chỉ lưu độ dài thực tế; CHAR luôn chiếm đủ độ dài cố định (thêm khoảng trắng).",
    o: ["CHAR nhanh hơn VARCHAR.", "VARCHAR không lưu được tiếng Việt.", "CHAR chỉ lưu được số."],
    e: "Nếu khai báo CHAR(10) mà nhập 'A', nó sẽ lưu 'A         '. VARCHAR(10) chỉ lưu 'A'."
  },
  {
    subject: 'sql', type: 'tf',
    q: "ĐÚNG hay SAI: Có thể có 2 cột cùng là Primary Key trong một bảng?",
    a: "Sai",
    o: ["Đúng"],
    e: "Một bảng chỉ có DUY NHẤT 1 Primary Key. Nhưng Primary Key đó có thể bao gồm NHIỀU CỘT (Composite Key)."
  },
  {
    subject: 'sql', type: 'mc',
    q: "Lệnh SQL nào dùng để cấp quyền truy cập cho người dùng?",
    a: "GRANT",
    o: ["REVOKE", "DENY", "ALLOW"],
    e: "GRANT SELECT ON Table TO User."
  },

  // ========================================================================
  // MẠNG & HỆ THỐNG: CÁC KHÁI NIỆM TRỪU TƯỢNG
  // ========================================================================
  {
    subject: 'network', type: 'mc',
    q: "NAT (Network Address Translation) dùng để làm gì?",
    a: "Chuyển đổi địa chỉ IP Private (nội bộ) sang IP Public (công cộng) để truy cập Internet.",
    o: ["Tăng tốc độ wifi.", "Chặn virus.", "Lưu trữ web."],
    e: "Giúp tiết kiệm địa chỉ IPv4 và bảo mật mạng nội bộ."
  },
  {
    subject: 'network', type: 'text',
    q: "Tên gọi của đơn vị dữ liệu (PDU) tại Tầng Transport (Tầng 4) là gì? (Tiếng Anh)",
    a: "Segment",
    e: "Layer 1: Bit, Layer 2: Frame, Layer 3: Packet, Layer 4: Segment."
  },
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: Cáp quang truyền tín hiệu bằng dòng điện?",
    a: "Sai",
    o: ["Đúng"],
    e: "Cáp quang truyền tín hiệu bằng ÁNH SÁNG (Light), do đó nhanh hơn và không bị nhiễu điện từ."
  },
  // ========================================================================
  // NIGHTMARE MODE: HTML & CSS (CHI TIẾT KỸ THUẬT SÂU)
  // ========================================================================
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính nào sau đây KHÔNG được kế thừa (not inherited) từ cha sang con?",
    a: "margin",
    o: ["color", "font-family", "line-height"],
    e: "Các thuộc tính liên quan đến hộp (Box Model) như margin, padding, border, width, height mặc định KHÔNG kế thừa."
  },
  {
    subject: 'css', type: 'mc',
    q: "Giá trị 'initial' của thuộc tính CSS có tác dụng gì?",
    a: "Đặt lại giá trị của thuộc tính về giá trị mặc định được định nghĩa trong đặc tả CSS (không phải mặc định của trình duyệt).",
    o: ["Đặt về giá trị của phần tử cha.", "Đặt về 0.", "Đặt về auto."],
    e: "Ví dụ: 'color: initial' thường về màu đen (theo spec), dù trình duyệt có thể set mặc định khác."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <button> nằm trong <form> nhưng không có thuộc tính 'type' sẽ hoạt động như thế nào?",
    a: "Mặc định hoạt động như type='submit' (gửi form).",
    o: ["Không làm gì cả (như type='button').", "Hoạt động như type='reset'.", "Báo lỗi."],
    e: "Rất dễ dính lỗi reload trang ngoài ý muốn. Luôn nhớ set type='button' nếu không muốn submit."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Pseudo-element '::before' và '::after' thực chất nằm BÊN TRONG thẻ cha, không phải bên ngoài?",
    a: "Đúng",
    o: ["Sai"],
    e: "Nó được render bên trong thẻ, ngay trước/sau nội dung (content). Cấu trúc: <tag>::before Content ::after</tag>."
  },
  {
    subject: 'css', type: 'mc',
    q: "Sự khác biệt giữa 'opacity: 0' và 'visibility: hidden' về khả năng tương tác?",
    a: "opacity: 0 vẫn nhận sự kiện chuột (click được), visibility: hidden thì không.",
    o: ["Cả hai đều không click được.", "Cả hai đều click được.", "visibility: hidden vẫn chiếm chỗ nhưng click được."],
    e: "opacity chỉ làm trong suốt (tàng hình) nhưng vật thể vẫn ở đó. visibility làm vật thể biến mất khỏi luồng sự kiện."
  },
  {
    subject: 'css', type: 'text',
    q: "Để sử dụng Flexbox, ta khai báo 'display: ...' cho phần tử cha? (Tiếng Anh)",
    a: "flex",
    e: "display: flex hoặc display: inline-flex."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <input> có thuộc tính 'readonly' khác 'disabled' ở điểm nào?",
    a: "readonly vẫn gửi dữ liệu khi submit, disabled thì không gửi.",
    o: ["readonly không cho copy text.", "disabled vẫn focus được.", "Hai cái giống hệt nhau."],
    e: "Dùng readonly khi muốn người dùng nhìn thấy, không sửa được nhưng vẫn cần lấy giá trị đó."
  },

  // ========================================================================
  // NIGHTMARE MODE: PYTHON (CẠM BẪY TƯ DUY)
  // ========================================================================
  {
    subject: 'python', type: 'mc',
    code: "a = [1, 2, 3]\nb = a\nc = a[:]\na[0] = 99\nprint(b[0], c[0])",
    q: "Kết quả in ra là gì?",
    a: "99 1",
    o: ["99 99", "1 1", "1 99"],
    e: "b = a là tham chiếu (cùng trỏ 1 nơi). c = a[:] là copy (tạo list mới độc lập)."
  },
  {
    subject: 'python', type: 'tf',
    code: "x = 256\ny = 256\nprint(x is y)",
    q: "Kết quả là True hay False?",
    a: "True",
    o: ["False"],
    e: "Python cache các số nguyên nhỏ (từ -5 đến 256) nên chúng cùng id. (Lưu ý: Với số lớn hơn như 1000, kết quả thường là False)."
  },
  {
    subject: 'python', type: 'mc',
    code: "print(type( (1) ))",
    q: "Kiểu dữ liệu trả về là gì?",
    a: "int",
    o: ["tuple", "list", "set"],
    e: "Dấu ngoặc đơn () chỉ được coi là Tuple khi có dấu phẩy đi kèm, VD: (1,). Nếu không nó chỉ là ngoặc toán học."
  },
  {
    subject: 'python', type: 'text',
    q: "Toán tử nào dùng để kiểm tra một phần tử có nằm trong danh sách hay không? (Tiếng Anh)",
    a: "in",
    e: "Ví dụ: if 5 in [1, 2, 3, 4, 5]: ..."
  },

  // ========================================================================
  // NIGHTMARE MODE: SQL (HIỆU NĂNG & NULL)
  // ========================================================================
  {
    subject: 'sql', type: 'mc',
    q: "Kết quả của: SELECT COUNT(CotA) FROM BangX (biết BangX có 10 dòng, CotA có 3 dòng NULL)?",
    a: "7",
    o: ["10", "3", "0"],
    e: "COUNT(Tên_Cột) chỉ đếm các dòng KHÔNG NULL. COUNT(*) mới đếm tất cả (10)."
  },
  {
    subject: 'sql', type: 'mc',
    q: "Điều kiện 'WHERE CotA != 10' có lấy được các dòng mà CotA là NULL không?",
    a: "Không",
    o: ["Có"],
    e: "Trong SQL, so sánh với NULL luôn trả về Unknown (False). Muốn lấy NULL phải dùng 'IS NULL' hoặc 'OR CotA IS NULL'."
  },
  {
    subject: 'sql', type: 'mc',
    q: "Lệnh 'UNION' mặc định có thực hiện việc gì so với 'UNION ALL'?",
    a: "Sắp xếp và loại bỏ trùng lặp (DISTINCT).",
    o: ["Không làm gì cả.", "Chỉ sắp xếp.", "Chỉ loại bỏ trùng lặp mà không sắp xếp."],
    e: "Vì phải check trùng lặp nên UNION chậm hơn UNION ALL."
  },

  // ========================================================================
  // NIGHTMARE MODE: NETWORK (CHI TIẾT GÓI TIN)
  // ========================================================================
  {
    subject: 'network', type: 'mc',
    q: "ARP (Address Resolution Protocol) hoạt động ở lớp nào để ánh xạ IP sang MAC?",
    a: "Layer 2 (Data Link) / Layer 3 (Network)",
    o: ["Layer 4 (Transport)", "Layer 7 (Application)", "Layer 1 (Physical)"],
    e: "ARP là giao thức cầu nối giữa L2 (MAC) và L3 (IP)."
  },
  {
    subject: 'network', type: 'text',
    q: "Lệnh ping sử dụng giao thức nào để gửi tin nhắn? (Viết tắt)",
    a: "ICMP",
    e: "Internet Control Message Protocol."
  },
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: Cổng (Port) 80 và 8080 luôn luôn là HTTP?",
    a: "Sai",
    o: ["Đúng"],
    e: "Đây chỉ là quy ước (convention). Bạn hoàn toàn có thể chạy SSH trên cổng 80 hoặc Web trên cổng 22 nếu cấu hình lại."
  },
// ========================================================================
  // DEEP DIVE: CSS PROPERTIES & VALUES (CHI TIẾT TỪ TÀI LIỆU)
  // ========================================================================
  {
    subject: 'css', type: 'mc',
    q: "Tại sao nên dùng 'line-height: 1.5' (số không đơn vị) thay vì '150%' hay '1.5em'?",
    a: "Số không đơn vị sẽ tính lại giá trị theo font-size của từng phần tử con (tránh lỗi kế thừa).",
    o: ["Số không đơn vị chạy nhanh hơn.", "Đơn vị % không được hỗ trợ.", "Giống hệt nhau, không khác biệt."],
    e: "Nếu dùng % hoặc em, giá trị dòng được tính cố định ở cha rồi mới truyền cho con. Nếu font chữ con thay đổi, dòng sẽ bị chồng chéo ."
  },
  {
    subject: 'css', type: 'text',
    q: "Thuộc tính nào dùng để tạo chữ hoa nhỏ (Small Caps)? (Tiếng Anh)",
    a: "font-variant",
    e: "Giá trị: small-caps. Khác với text-transform: uppercase ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Kiểu viền 'border-style: ridge' tạo hiệu ứng thị giác gì?",
    a: "Gờ nổi (Sống trâu) - Cảm giác đường viền nhô lên khỏi bề mặt.",
    o: ["Khắc chìm (Groove).", "Lõm xuống (Inset).", "Lồi lên (Outset)."],
    e: "Ridge ngược lại với Groove (khắc chìm) ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính 'text-indent' với giá trị âm (VD: -9999px) thường được dùng để làm gì?",
    a: "Giấu văn bản đi để thay thế bằng hình ảnh (Logo, Icon).",
    o: ["Tạo chữ đậm.", "Căn giữa văn bản.", "Thụt đầu dòng đoạn văn."],
    e: "Giá trị âm sẽ đẩy dòng đầu tiên ra khỏi vùng hiển thị của phần tử."
  },
  {
    subject: 'css', type: 'mc',
    q: "Độ đậm 'font-weight: 900' tương ứng với mức độ nào?",
    a: "Black (Rất đậm)",
    o: ["Bold (Đậm vừa - 700).", "Medium (Trung bình - 500).", "Normal (400)."],
    e: "100-300: Light, 400: Normal, 700: Bold, 900: Black."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Thuộc tính 'text-align' có thể dùng để căn giữa một thẻ <div> (block)?",
    a: "Sai",
    o: ["Đúng"],
    e: "text-align chỉ dùng để căn nội dung văn bản (inline) bên trong. Để căn giữa <div> phải dùng margin: auto hoặc Flexbox."
  },

  // ========================================================================
  // DEEP DIVE: HTML SEMANTIC & RARE TAGS (THẺ ÍT GẶP)
  // ========================================================================
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <samp> dùng để đại diện cho nội dung gì?",
    a: "Kết quả mẫu (Sample Output) từ một chương trình máy tính.",
    o: ["Đoạn mã code (<code>).", "Phím bấm (<kbd>).", "Biến số (<var>)."],
    e: "Ví dụ: Error 404: Not Found."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <var> thường được dùng trong ngữ cảnh nào?",
    a: "Biểu thị biến số trong toán học hoặc lập trình.",
    o: ["Biểu thị video.", "Biểu thị hình ảnh.", "Biểu thị trích dẫn."],
    e: "Ví dụ: x + y = z."
  },
  {
    subject: 'html', type: 'mc',
    q: "Sự khác biệt giữa thẻ <ins> và <del> là gì?",
    a: "<ins> gạch chân (nội dung thêm mới), <del> gạch ngang (nội dung bị xóa).",
    o: ["<ins> in đậm, <del> in nghiêng.", "<ins> màu đỏ, <del> màu xanh.", "Hai thẻ giống nhau."],
    e: "Thường dùng để hiển thị lịch sử chỉnh sửa văn bản."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <cite> dùng để làm gì?",
    a: "Đánh dấu tựa đề của một tác phẩm (sách, phim, bài hát...).",
    o: ["Trích dẫn lời nói.", "Đánh dấu địa chỉ.", "Đánh dấu thời gian."],
    e: "Lưu ý: Dùng cho tên tác phẩm (Harry Potter), không dùng cho tên tác giả (J.K. Rowling)."
  },

  // ========================================================================
  // DEEP DIVE: CSS SELECTORS & COMBINATORS
  // ========================================================================
  {
    subject: 'css', type: 'mc',
    q: "Selector 'div > p' khác 'div p' ở điểm nào?",
    a: "div > p chỉ chọn con trực tiếp (cấp 1); div p chọn tất cả con cháu (mọi cấp).",
    o: ["div > p chọn anh em liền kề.", "div p chỉ chọn con trực tiếp.", "Hai cái giống hệt nhau."],
    e: "Dấu '>' là Child Combinator (Cha con trực tiếp) ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Selector 'A + B' chọn phần tử nào?",
    a: "Phần tử B nằm NGAY SAU phần tử A (Anh em liền kề).",
    o: ["Tất cả phần tử B nằm sau A.", "Phần tử B nằm bên trong A.", "Phần tử A nằm trước B."],
    e: "Dấu '+' là Adjacent Sibling (Liền kề) ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Selector 'A ~ B' chọn phần tử nào?",
    a: "Tất cả phần tử B nằm sau A (cùng cha), không cần liền kề.",
    o: ["Chỉ phần tử B đầu tiên.", "Phần tử B nằm ngay sát A.", "Phần tử cha của B."],
    e: "Dấu '~' là General Sibling (Anh em chung) ."
  },
  {
    subject: 'css', type: 'text',
    q: "Tính trọng số (Specificity) của selector: '.test #p11'? (Nhập số)",
    a: "110",
    e: "1 ID (#p11) = 100 điểm + 1 Class (.test) = 10 điểm -> Tổng 110."
  },

  // ========================================================================
  // LOGIC & TRICKY QUESTIONS (PYTHON/SQL)
  // ========================================================================
  {
    subject: 'python', type: 'text',
    code: "x = True\nprint(int(x))",
    q: "Kết quả in ra là gì?",
    a: "1",
    e: "Trong Python, True tương ứng với 1, False tương ứng với 0."
  },
  {
    subject: 'python', type: 'mc',
    code: "a = [1, 2, 3]\na[1:2] = [4, 5]\nprint(a)",
    q: "Kết quả là gì? (Slice assignment)",
    a: "[1, 4, 5, 3]",
    o: ["[1, [4, 5], 3]", "[1, 4, 3]", "Lỗi"],
    e: "Gán vào slice sẽ thay thế đoạn đó bằng các phần tử của list mới (mở rộng list)."
  },
  {
    subject: 'sql', type: 'mc',
    q: "Lệnh 'SELECT * FROM Table WHERE 1=1' có tác dụng gì?",
    a: "Lấy tất cả dữ liệu (thường dùng để nối chuỗi điều kiện động).",
    o: ["Không lấy dữ liệu nào.", "Báo lỗi cú pháp.", "Chỉ lấy dòng đầu tiên."],
    e: "1=1 luôn đúng (True), nên WHERE không lọc bỏ dòng nào cả."
  },
  {
    subject: 'sql', type: 'tf',
    q: "ĐÚNG hay SAI: Cột có ràng buộc UNIQUE được phép chứa giá trị NULL?",
    a: "Đúng",
    o: ["Sai"],
    e: "Hầu hết các hệ CSDL cho phép UNIQUE chứa nhiều giá trị NULL (vì NULL != NULL), trừ một số ngoại lệ."
  },
  // ========================================================================
  // NIGHTMARE MODE: HTML & CSS (CHI TIẾT KỸ THUẬT SÂU)
  // ========================================================================
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính nào sau đây KHÔNG được kế thừa (not inherited) từ cha sang con?",
    a: "margin",
    o: ["color", "font-family", "line-height"],
    e: "Các thuộc tính liên quan đến hộp (Box Model) như margin, padding, border, width, height mặc định KHÔNG kế thừa. "
  },
  {
    subject: 'css', type: 'mc',
    q: "Giá trị 'initial' của thuộc tính CSS có tác dụng gì?",
    a: "Đặt lại giá trị của thuộc tính về giá trị mặc định được định nghĩa trong đặc tả CSS (không phải mặc định của trình duyệt).",
    o: ["Đặt về giá trị của phần tử cha.", "Đặt về 0.", "Đặt về auto."],
    e: "Ví dụ: 'color: initial' thường về màu đen (theo spec), dù trình duyệt có thể set mặc định khác."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <button> nằm trong <form> nhưng không có thuộc tính 'type' sẽ hoạt động như thế nào?",
    a: "Mặc định hoạt động như type='submit' (gửi form).",
    o: ["Không làm gì cả (như type='button').", "Hoạt động như type='reset'.", "Báo lỗi."],
    e: "Rất dễ dính lỗi reload trang ngoài ý muốn. Luôn nhớ set type='button' nếu không muốn submit."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Pseudo-element '::before' và '::after' thực chất nằm BÊN TRONG thẻ cha, không phải bên ngoài?",
    a: "Đúng",
    o: ["Sai"],
    e: "Nó được render bên trong thẻ, ngay trước/sau nội dung (content). Cấu trúc: <tag>::before Content ::after</tag>."
  },
  {
    subject: 'css', type: 'mc',
    q: "Sự khác biệt giữa 'opacity: 0' và 'visibility: hidden' về khả năng tương tác?",
    a: "opacity: 0 vẫn nhận sự kiện chuột (click được), visibility: hidden thì không.",
    o: ["Cả hai đều không click được.", "Cả hai đều click được.", "visibility: hidden vẫn chiếm chỗ nhưng click được."],
    e: "opacity chỉ làm trong suốt (tàng hình) nhưng vật thể vẫn ở đó. visibility làm vật thể biến mất khỏi luồng sự kiện."
  },
  {
    subject: 'css', type: 'text',
    q: "Để sử dụng Flexbox, ta khai báo 'display: ...' cho phần tử cha? (Tiếng Anh)",
    a: "flex",
    e: "display: flex hoặc display: inline-flex."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <input> có thuộc tính 'readonly' khác 'disabled' ở điểm nào?",
    a: "readonly vẫn gửi dữ liệu khi submit, disabled thì không gửi.",
    o: ["readonly không cho copy text.", "disabled vẫn focus được.", "Hai cái giống hệt nhau."],
    e: "Dùng readonly khi muốn người dùng nhìn thấy, không sửa được nhưng vẫn cần lấy giá trị đó."
  },

  // ========================================================================
  // NIGHTMARE MODE: PYTHON (CẠM BẪY TƯ DUY)
  // ========================================================================
  {
    subject: 'python', type: 'mc',
    code: "a = [1, 2, 3]\nb = a\nc = a[:]\na[0] = 99\nprint(b[0], c[0])",
    q: "Kết quả in ra là gì?",
    a: "99 1",
    o: ["99 99", "1 1", "1 99"],
    e: "b = a là tham chiếu (cùng trỏ 1 nơi). c = a[:] là copy (tạo list mới độc lập)."
  },
  {
    subject: 'python', type: 'tf',
    code: "x = 256\ny = 256\nprint(x is y)",
    q: "Kết quả là True hay False?",
    a: "True",
    o: ["False"],
    e: "Python cache các số nguyên nhỏ (từ -5 đến 256) nên chúng cùng id. (Lưu ý: Với số lớn hơn như 1000, kết quả thường là False)."
  },
  {
    subject: 'python', type: 'mc',
    code: "print(type( (1) ))",
    q: "Kiểu dữ liệu trả về là gì?",
    a: "int",
    o: ["tuple", "list", "set"],
    e: "Dấu ngoặc đơn () chỉ được coi là Tuple khi có dấu phẩy đi kèm, VD: (1,). Nếu không nó chỉ là ngoặc toán học."
  },
  {
    subject: 'python', type: 'text',
    q: "Toán tử nào dùng để kiểm tra một phần tử có nằm trong danh sách hay không? (Tiếng Anh)",
    a: "in",
    e: "Ví dụ: if 5 in [1, 2, 3, 4, 5]: ..."
  },

  // ========================================================================
  // NIGHTMARE MODE: SQL (HIỆU NĂNG & NULL)
  // ========================================================================
  {
    subject: 'sql', type: 'mc',
    q: "Kết quả của: SELECT COUNT(CotA) FROM BangX (biết BangX có 10 dòng, CotA có 3 dòng NULL)?",
    a: "7",
    o: ["10", "3", "0"],
    e: "COUNT(Tên_Cột) chỉ đếm các dòng KHÔNG NULL. COUNT(*) mới đếm tất cả (10)."
  },
  {
    subject: 'sql', type: 'mc',
    q: "Điều kiện 'WHERE CotA != 10' có lấy được các dòng mà CotA là NULL không?",
    a: "Không",
    o: ["Có"],
    e: "Trong SQL, so sánh với NULL luôn trả về Unknown (False). Muốn lấy NULL phải dùng 'IS NULL' hoặc 'OR CotA IS NULL'."
  },
  {
    subject: 'sql', type: 'mc',
    q: "Lệnh 'UNION' mặc định có thực hiện việc gì so với 'UNION ALL'?",
    a: "Sắp xếp và loại bỏ trùng lặp (DISTINCT).",
    o: ["Không làm gì cả.", "Chỉ sắp xếp.", "Chỉ loại bỏ trùng lặp mà không sắp xếp."],
    e: "Vì phải check trùng lặp nên UNION chậm hơn UNION ALL."
  },

  // ========================================================================
  // NIGHTMARE MODE: NETWORK (CHI TIẾT GÓI TIN)
  // ========================================================================
  {
    subject: 'network', type: 'mc',
    q: "ARP (Address Resolution Protocol) hoạt động ở lớp nào để ánh xạ IP sang MAC?",
    a: "Layer 2 (Data Link) / Layer 3 (Network)",
    o: ["Layer 4 (Transport)", "Layer 7 (Application)", "Layer 1 (Physical)"],
    e: "ARP là giao thức cầu nối giữa L2 (MAC) và L3 (IP)."
  },
  {
    subject: 'network', type: 'text',
    q: "Lệnh ping sử dụng giao thức nào để gửi tin nhắn? (Viết tắt)",
    a: "ICMP",
    e: "Internet Control Message Protocol."
  },
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: Cổng (Port) 80 và 8080 luôn luôn là HTTP?",
    a: "Sai",
    o: ["Đúng"],
    e: "Đây chỉ là quy ước (convention). Bạn hoàn toàn có thể chạy SSH trên cổng 80 hoặc Web trên cổng 22 nếu cấu hình lại."
  },
  // --- CHI TIẾT GIAO THỨC DNS (Nâng cao)  ---
  {
    subject: 'network', type: 'text',
    q: "Giao thức DoT (DNS over TLS) sử dụng cổng (Port) mặc định nào?",
    a: "853",
    e: "DoT dùng cổng riêng 853 để mã hóa gói tin DNS, khác với DNS thường (53) và DoH (443)."
  },
  {
    subject: 'network', type: 'mc',
    q: "Trong giao thức ARP, gói tin 'ARP Request' được gửi đi dưới dạng nào?",
    a: "Broadcast (Gửi cho tất cả)",
    o: ["Unicast (Gửi đích danh)", "Multicast (Gửi cho một nhóm)", "Anycast"],
    e: "ARP Request hét lên 'Ai có IP này?' nên cần Broadcast (MAC: FF:FF:FF:FF:FF:FF). ARP Reply mới là Unicast ."
  },
  {
    subject: 'network', type: 'mc',
    q: "DNS sử dụng giao thức TCP tại cổng 53 trong trường hợp nào?",
    a: "Khi thực hiện Zone Transfer (đồng bộ dữ liệu giữa các server) hoặc gói tin phản hồi quá lớn (>512 bytes).",
    o: ["Luôn luôn dùng TCP.", "Khi truy vấn tên miền thông thường.", "Khi mạng bị lag."],
    e: "Bình thường DNS dùng UDP cho nhanh, chỉ dùng TCP khi cần độ tin cậy cao hoặc truyền nhiều dữ liệu ."
  },

  // --- MÔ HÌNH MẠNG (TOPOLOGY)  ---
  {
    subject: 'network', type: 'mc',
    q: "Nhược điểm chí mạng của cấu trúc mạng hình Tuyến (Bus Topology) là gì?",
    a: "Nếu dây cáp chính bị đứt ở bất kỳ điểm nào, toàn bộ mạng sẽ ngừng hoạt động.",
    o: ["Tốn nhiều dây cáp nhất.", "Khó lắp đặt.", "Cần thiết bị trung tâm đắt tiền."],
    e: "Dữ liệu đi trên đường độc đạo, đứt là tắc toàn bộ. Cần bộ phận 'terminator' ở 2 đầu dây."
  },
  {
    subject: 'network', type: 'mc',
    q: "Cấu trúc mạng nào được ví như 'Mạng nhện khổng lồ' và là cấu trúc của Internet?",
    a: "Mesh Topology (Hình lưới)",
    o: ["Star Topology (Hình sao)", "Ring Topology (Hình vòng)", "Bus Topology"],
    e: "Các thiết bị kết nối chằng chịt, đảm bảo luôn có đường đi khác nếu một đường bị đứt."
  },
  // ========================================================================
  // EXPERT MODE: NETWORK PROTOCOLS & SECURITY (CƠ CHẾ HOẠT ĐỘNG)
  // ========================================================================
  {
    subject: 'network', type: 'mc',
    q: "Trong quá trình 'Bắt tay 3 bước' (3-way Handshake) của TCP, bước thứ 2 là gì?",
    a: "SYN-ACK (Server gửi xác nhận và yêu cầu kết nối ngược lại)",
    o: ["SYN (Client gửi yêu cầu)", "ACK (Client xác nhận)", "FIN (Ngắt kết nối)"],
    e: "Quy trình: 1. SYN (Khách gõ cửa) -> 2. SYN-ACK (Chủ nhà mở cửa mời vào) -> 3. ACK (Khách bước vào) ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Giao thức DNS over HTTPS (DoH) sử dụng cổng nào để ngụy trang gói tin DNS?",
    a: "443 (Cổng HTTPS)",
    o: ["53 (Cổng DNS gốc)", "853 (Cổng DoT)", "80 (Cổng HTTP)"],
    e: "DoH giấu yêu cầu DNS bên trong luồng dữ liệu web HTTPS (Port 443) khiến các nhà mạng/tường lửa rất khó chặn ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Firewall thế hệ mới (NGFW) khác Firewall truyền thống (Packet Filtering) ở điểm nào?",
    a: "Có khả năng giải mã gói tin (Deep Packet Inspection) để quét virus và nhận diện ứng dụng.",
    o: ["Chỉ kiểm tra IP và Port.", "Chỉ hoạt động ở tầng vật lý.", "Không thể chặn web đen."],
    e: "Firewall cũ chỉ nhìn bìa thư (Header), NGFW bóc thư ra đọc nội dung bên trong (Payload) ."
  },
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: Giao thức UDP có cơ chế gửi lại (retransmit) các gói tin bị mất?",
    a: "Sai",
    o: ["Đúng"],
    e: "UDP hoạt động theo kiểu 'Bắn và Quên' (Fire and Forget), ưu tiên tốc độ hơn độ tin cậy ."
  },
  {
    subject: 'network', type: 'text',
    q: "Giao thức nào dùng để ánh xạ địa chỉ IP (Lớp 3) sang địa chỉ MAC (Lớp 2)? (Viết tắt)",
    a: "ARP",
    e: "Address Resolution Protocol. Nó hét lên 'Ai có IP này?' để tìm MAC tương ứng."
  },

  // ========================================================================
  // EXPERT MODE: AI & MACHINE LEARNING (THUẬT TOÁN & PHÂN LOẠI)
  // ========================================================================
  {
    subject: 'ai', type: 'mc',
    q: "Học tăng cường (Reinforcement Learning) hoạt động dựa trên nguyên tắc nào?",
    a: "Thử và Sai: Nhận Thưởng (Reward) khi làm đúng và Phạt (Punishment) khi làm sai.",
    o: ["Học từ dữ liệu được dán nhãn sẵn (Supervised).", "Tự tìm quy luật trong dữ liệu lộn xộn (Unsupervised).", "Sao chép hành vi con người."],
    e: "Giống như huấn luyện thú cưng bằng 'Cây gậy và Củ cà rốt' ."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Vấn đề 'Hộp đen' (Black Box) trong AI đề cập đến rủi ro gì?",
    a: "Con người không thể giải thích được lý do tại sao AI đưa ra một quyết định cụ thể.",
    o: ["AI bị hacker tấn công.", "AI ăn cắp dữ liệu người dùng.", "AI bị mất điện đột ngột."],
    e: "Đặc biệt nguy hiểm trong y tế/quân sự vì thiếu trách nhiệm giải trình ."
  },
  {
    subject: 'ai', type: 'mc',
    q: "AI Tạo sinh (Generative AI) khác biệt so với AI Phân biệt (Discriminative AI) ở chỗ nào?",
    a: "AI Tạo sinh có thể tạo ra nội dung mới (ảnh, văn bản); AI Phân biệt chỉ phân loại dữ liệu có sẵn.",
    o: ["AI Tạo sinh chạy nhanh hơn.", "AI Tạo sinh không cần dữ liệu.", "Hai loại là một."],
    e: "Ví dụ: ChatGPT (Tạo sinh) vs FaceID (Phân biệt) ."
  },
  {
    subject: 'ai', type: 'tf',
    q: "ĐÚNG hay SAI: Supervised Learning (Học có giám sát) KHÔNG cần dữ liệu được dán nhãn (Label)?",
    a: "Sai",
    o: ["Đúng"],
    e: "Học có giám sát bắt buộc phải có cặp Input-Output (Ví dụ: Ảnh con mèo + Nhãn 'Mèo') để dạy máy ."
  },

  // ========================================================================
  // EXPERT MODE: CSS & HTML (HIỂU SÂU VỀ RENDER)
  // ========================================================================
  {
    subject: 'css', type: 'mc',
    q: "Tại sao nên dùng 'word-spacing' thay vì 'letter-spacing' để chỉnh khoảng cách từ?",
    a: "word-spacing chỉ giãn khoảng cách giữa các TỪ (dấu cách), letter-spacing giãn khoảng cách giữa các KÝ TỰ.",
    o: ["word-spacing dùng cho tiếng Anh, letter-spacing dùng cho tiếng Việt.", "letter-spacing không hỗ trợ số âm.", "Hai thuộc tính này giống nhau."],
    e: "letter-spacing sẽ làm rời rạc các chữ cái trong một từ ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính 'font-variant: small-caps' khác 'text-transform: uppercase' như thế nào?",
    a: "small-caps biến chữ thường thành chữ in hoa NHỎ (giữ nguyên độ cao dòng); uppercase biến thành chữ in hoa LỚN.",
    o: ["small-caps chỉ viết hoa chữ cái đầu.", "uppercase không hoạt động với tiếng Việt.", "Chúng giống hệt nhau."],
    e: "Small-caps là một kiểu chữ nghệ thuật, trong khi uppercase thay đổi ký tự hoàn toàn ."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <section> và <article> nên được sử dụng phân biệt như thế nào?",
    a: "<article> cho nội dung độc lập (có thể tách riêng); <section> cho các phần/chương của một nội dung lớn.",
    o: ["<article> dùng cho ảnh, <section> dùng cho chữ.", "<section> quan trọng hơn <article>.", "Dùng cái nào cũng được."],
    e: "Nếu bạn có thể 'copy-paste' nội dung đó sang web khác mà nó vẫn có nghĩa (như bài blog), hãy dùng <article>."
  },
  {
    subject: 'css', type: 'text',
    q: "Giá trị nào của thuộc tính 'display' giúp phần tử có kích thước (width/height) nhưng vẫn nằm trên cùng một dòng? (Tiếng Anh)",
    a: "inline-block",
    e: "Kết hợp ưu điểm của block (kích thước) và inline (không xuống dòng)."
  },

  // ========================================================================
  // PYTHON: CÁC KHÁI NIỆM CỐT LÕI (CORE CONCEPTS)
  // ========================================================================
  {
    subject: 'python', type: 'mc',
    code: "a = [1, 2, 3]\nb = a\na.append(4)\nprint(b)",
    q: "Hiện tượng nào xảy ra khiến b cũng thay đổi theo a?",
    a: "Reference (Tham chiếu) - Cả a và b cùng trỏ vào một vùng nhớ.",
    o: ["Cloning (Nhân bản).", "Recursion (Đệ quy).", "Bug của Python."],
    e: "Trong Python, phép gán list không tạo ra bản sao mới mà chỉ tạo thêm một 'nhãn' trỏ vào dữ liệu cũ."
  },
  {
    subject: 'python', type: 'text',
    q: "Cấu trúc dữ liệu nào trong Python là 'Mutable' (có thể thay đổi) và dùng ngoặc vuông []?",
    a: "List",
    e: "Tuple dùng (), Set dùng {}, List dùng []."
  },
  // ========================================================================
  // BỔ SUNG TỪ FILE: AI & MẠNG MÁY TÍNH (CHI TIẾT KỸ THUẬT)
  // ========================================================================

  // --- AI: Lịch sử & Đặc trưng ---
  {
    subject: 'ai', type: 'mc',
    q: "Hội thảo nào năm 1956 được coi là nơi khai sinh ra thuật ngữ 'Trí tuệ nhân tạo' (AI)?",
    a: "Hội thảo Dartmouth",
    o: ["Hội thảo Stanford", "Hội nghị Turing", "Hội thảo MIT"],
    e: "Hội thảo tại Đại học Dartmouth năm 1956 đã chính thức mở ra lĩnh vực nghiên cứu này."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Hệ chuyên gia MYCIN (1972) hoạt động dựa trên cơ sở tri thức gồm khoảng bao nhiêu luật suy diễn?",
    a: "600 luật",
    o: ["1000 luật", "1 triệu luật", "100 luật"],
    e: "MYCIN sử dụng khoảng 600 luật dạng 'Nếu... thì...' để chẩn đoán nhiễm trùng máu."
  },
  {
    subject: 'ai', type: 'tf',
    q: "ĐÚNG hay SAI: Một chiếc máy giặt tự quay theo giờ hẹn được coi là có Trí tuệ nhân tạo (AI)?",
    a: "Sai",
    o: ["Đúng"],
    e: "Đó chỉ là Tự động hóa (Automation) - lặp lại thao tác cố định. AI phải có khả năng nhận thức và ra quyết định dựa trên môi trường (VD: máy giặt tự cảm biến độ bẩn)."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Vấn đề 'Hộp đen' (Black Box) trong AI gây ra rủi ro lớn nhất là gì?",
    a: "Thiếu trách nhiệm giải trình (Không biết tại sao AI đưa ra quyết định đó)",
    o: ["AI hoạt động chậm.", "AI tốn điện.", "AI bị virus tấn công."],
    e: "Chúng ta biết đầu vào và đầu ra, nhưng quá trình xử lý ở giữa là vùng tối bí ẩn, gây nguy hiểm trong y tế/quân sự."
  },

  // --- MẠNG: Topology & Phần cứng ---
  {
    subject: 'network', type: 'mc',
    q: "Trong cấu trúc mạng hình Tuyến (Bus Topology), thiết bị nào cần gắn ở hai đầu dây để chặn tín hiệu phản hồi?",
    a: "Terminator",
    o: ["Repeater", "Amplifier", "Connector"],
    e: "Terminator giúp hấp thụ tín hiệu ở cuối đường dây, tránh nhiễu loạn."
  },
  {
    subject: 'network', type: 'mc',
    q: "Nhược điểm chí mạng của cấu trúc mạng hình Vòng (Ring Topology) là gì?",
    a: "Nếu một máy hỏng hoặc dây đứt ở một điểm, toàn bộ vòng tròn bị phá vỡ và mạng sập.",
    o: ["Dữ liệu truyền quá nhanh gây tắc nghẽn.", "Cần quá nhiều dây cáp.", "Bảo mật kém nhất."],
    e: "Dữ liệu chạy theo một chiều khép kín, đứt một mắt xích là hỏng cả chuỗi."
  },
  {
    subject: 'network', type: 'mc',
    q: "Thiết bị Modem thực hiện chức năng 'Biến điệu' (Modulate) để làm gì?",
    a: "Chuyển đổi dữ liệu số (Digital) từ máy tính thành tín hiệu tương tự (Analog) để truyền đi.",
    o: ["Chuyển tín hiệu Analog thành Digital.", "Phát sóng Wifi.", "Lọc gói tin rác."],
    e: "Modulate: Digital -> Analog. Demodulate: Analog -> Digital."
  },

  // --- MẠNG: Giao thức & Bảo mật (Nâng cao) ---
  {
    subject: 'network', type: 'text',
    q: "Quá trình thiết lập kết nối TCP gồm 3 bước: SYN -> ... -> ACK. Bước ở giữa là gì? (Viết tắt)",
    a: "SYN-ACK",
    e: "Bước 2: Máy đích đồng ý (ACK) và gửi lời mời ngược lại (SYN) -> Gói tin SYN-ACK."
  },
  {
    subject: 'network', type: 'mc',
    q: "Giao thức RDP (Remote Desktop Protocol) của Microsoft sử dụng cổng (Port) mặc định nào?",
    a: "3389",
    o: ["22", "23", "443"],
    e: "RDP cho phép điều khiển máy tính từ xa có giao diện đồ họa, chạy trên cổng 3389."
  },
  {
    subject: 'network', type: 'mc',
    q: "Khi chia sẻ file qua mạng LAN (SMB), quyền 'Read' khác 'Full Control' thế nào?",
    a: "Read chỉ cho xem/copy; Full Control cho phép sửa, xóa và thay đổi quyền.",
    o: ["Read cho phép sửa nhưng không xóa.", "Full Control chỉ dành cho Admin.", "Hai quyền này giống nhau."],
    e: "Cấp quyền Full Control cho 'Everyone' là nguyên nhân chính khiến Ransomware lây lan nhanh."
  },
  {
    subject: 'network', type: 'mc',
    q: "Tấn công 'SQL Injection' hoạt động dựa trên nguyên lý nào?",
    a: "Chèn các đoạn mã lệnh SQL độc hại vào ô nhập liệu (Input) để đánh lừa cơ sở dữ liệu.",
    o: ["Gửi quá nhiều yêu cầu làm sập server.", "Giả mạo giao diện trang web.", "Nghe lén gói tin trên đường truyền."],
    e: "Ví dụ điển hình là nhập `' OR '1'='1` để đăng nhập không cần mật khẩu ."
  },

  // ========================================================================
  // BỔ SUNG TỪ FILE: HTML & CSS (CHI TIẾT CÚ PHÁP & TÍNH TOÁN)
  // ========================================================================

  // --- HTML: Thẻ & Thuộc tính ít gặp ---
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <dl> trong HTML dùng để tạo loại danh sách nào?",
    a: "Danh sách mô tả (Description List)",
    o: ["Danh sách có thứ tự (Ordered List)", "Danh sách không thứ tự (Unordered List)", "Danh sách thả xuống (Data List)"],
    e: "<dl> bao gồm <dt> (thuật ngữ) và <dd> (mô tả/định nghĩa) ."
  },
  {
    subject: 'html', type: 'mc',
    q: "Đâu là tập hợp các định dạng file video được thẻ <video> hỗ trợ tốt nhất?",
    a: ".mp4, .webm, .ogg",
    o: [".mp4, .avi, .flv", ".mov, .wmv, .mp4", ".mkv, .mp4, .3gp"],
    e: "Đây là 3 chuẩn nén video chính được HTML5 hỗ trợ mặc định."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thuộc tính 'list-style: square' trong CSS tạo ra dấu đầu dòng hình gì?",
    a: "Hình vuông đặc",
    o: ["Hình tròn rỗng (circle)", "Hình tròn đặc (disc)", "Không có dấu"],
    e: "Square tạo dấu chấm vuông đầu dòng."
  },

  // --- CSS: Màu sắc & Tính toán ---
  {
    subject: 'color', type: 'text',
    q: "Trong hệ màu HSL, góc 240 độ (240°) đại diện cho màu gì? (Tiếng Anh)",
    a: "Blue",
    e: "0°=Red, 60°=Yellow, 120°=Green, 180°=Cyan, 240°=Blue, 300°=Magenta."
  },
  {
    subject: 'color', type: 'text',
    q: "Trong hệ HSL, giá trị Lightness (L) bằng bao nhiêu % thì tạo ra màu Trắng?",
    a: "100%",
    e: "L=0% là Đen, L=50% là màu chuẩn, L=100% là Trắng."
  },
  {
    subject: 'color', type: 'text',
    q: "Giá trị thập phân của mã Hex 'FF' là bao nhiêu?",
    a: "255",
    e: "Cách tính: F(15) * 16 + F(15) = 240 + 15 = 255."
  },

  // --- CSS: Layout & Selectors Nâng cao ---
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính 'align-content' trong Flexbox chỉ có tác dụng khi nào?",
    a: "Khi có nhiều dòng phần tử (phải có flex-wrap: wrap).",
    o: ["Khi chỉ có 1 dòng.", "Khi dùng flex-direction: column.", "Luôn luôn có tác dụng."],
    e: "Ghi nhớ: align-items chỉnh từng item trên 1 dòng, align-content chỉnh khoảng cách giữa các dòng."
  },
  {
    subject: 'css', type: 'text',
    q: "Để thụt lề dòng đầu tiên của đoạn văn bản, ta dùng thuộc tính gì? (Tiếng Anh)",
    a: "text-indent",
    e: "Ví dụ: text-indent: 30px; sẽ thụt dòng đầu vào. Giá trị âm sẽ thụt ra ngoài."
  },
  {
    subject: 'css', type: 'mc',
    q: "Giá trị 'line-height: 1.5' khác gì với 'line-height: 150%'?",
    a: "Số không đơn vị sẽ tính lại chiều cao dòng ở từng phần tử con (tốt hơn).",
    o: ["Số % tốt hơn vì nó cố định.", "Giống hệt nhau.", "Số không đơn vị không hoạt động."],
    e: "Dùng % hoặc em có thể gây lỗi chồng chéo dòng khi phần tử con đổi font-size. Dùng số không đơn vị là an toàn nhất."
  },
  {
    subject: 'css', type: 'mc',
    q: "Tính điểm trọng số (Specificity) của selector: 'p.test em.more'?",
    a: "22 điểm",
    o: ["2 điểm", "20 điểm", "12 điểm"],
    e: "2 thẻ (p, em) = 2 điểm + 2 class (.test, .more) = 20 điểm. Tổng = 22."
  },
  {
    subject: 'css', type: 'mc',
    q: "Pseudo-element '::first-letter' cho phép sử dụng thuộc tính 'float' để làm gì?",
    a: "Tạo hiệu ứng Drop Cap (chữ cái đầu to, văn bản bao quanh).",
    o: ["Đẩy chữ cái đầu ra giữa trang.", "Làm chữ cái đầu biến mất.", "Không có tác dụng gì."],
    e: "Thuộc tính float: left giúp văn bản bao quanh chữ cái đầu tiên một cách gọn gàng."
  },
  // ========================================================================
  // BỔ SUNG: MÔ HÌNH OSI & KIẾN THỨC MẠNG CƠ BẢN (BACK TO BASICS)
  // ========================================================================

  // --- 1. TỔNG QUAN VỀ OSI ---
  {
    subject: 'network', type: 'mc',
    q: "Mô hình OSI chia quá trình truyền tin thành bao nhiêu tầng (Layer)?",
    a: "7 tầng",
    o: ["4 tầng", "5 tầng", "6 tầng"],
    e: "7 tầng từ trên xuống: Application, Presentation, Session, Transport, Network, Data Link, Physical ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Câu thần chú tiếng Anh phổ biến để nhớ thứ tự 7 tầng OSI (từ tầng 7 xuống tầng 1) là gì?",
    a: "All People Seem To Need Data Processing",
    o: ["All People Seem To Need Data Protection", "All People Say To Need Data Processing", "All People Should Try New Data Processing"],
    e: "Tương ứng: Application - Presentation - Session - Transport - Network - Data Link - Physical."
  },

  // --- 2. CHI TIẾT TỪNG TẦNG (LAYER) ---
  {
    subject: 'network', type: 'mc',
    q: "[Tầng 1 - Physical] Dữ liệu ở tầng Vật lý được truyền đi dưới dạng gì?",
    a: "Bit (0 và 1)",
    o: ["Gói tin (Packet)", "Khung (Frame)", "Đoạn (Segment)"],
    e: "Tầng 1 truyền tải dữ liệu thô sơ nhất dưới dạng tín hiệu điện, ánh sáng hoặc sóng (bit 0 và 1)."
  },
  {
    subject: 'network', type: 'mc',
    q: "[Tầng 2 - Data Link] Thiết bị nào hoạt động chủ yếu ở tầng này để chuyển dữ liệu trong mạng nội bộ (LAN)?",
    a: "Switch (Bộ chuyển mạch)",
    o: ["Router", "Hub", "Repeater"],
    e: "Switch hoạt động ở tầng 2, sử dụng địa chỉ MAC để đóng gói dữ liệu thành các Frame."
  },
  {
    subject: 'network', type: 'mc',
    q: "[Tầng 3 - Network] Chức năng quan trọng nhất của tầng Mạng là gì?",
    a: "Định tuyến (Routing) - Tìm đường đi tốt nhất.",
    o: ["Mã hóa dữ liệu.", "Sửa lỗi dữ liệu.", "Hiển thị giao diện."],
    e: "Tầng 3 quyết định đường đi cho gói tin (Packet) dựa trên địa chỉ IP."
  },
  {
    subject: 'network', type: 'mc',
    q: "[Tầng 4 - Transport] Giao thức nào tại tầng này đảm bảo dữ liệu đến nơi đầy đủ và đúng thứ tự (Tin cậy)?",
    a: "TCP",
    o: ["UDP", "IP", "ICMP"],
    e: "TCP đánh số thứ tự gói tin và yêu cầu gửi lại nếu bị mất, đảm bảo độ tin cậy."
  },
  {
    subject: 'network', type: 'mc',
    q: "[Tầng 6 - Presentation] Nhiệm vụ chính của tầng Trình diễn là gì?",
    a: "Đảm bảo định dạng dữ liệu, nén và mã hóa.",
    o: ["Thiết lập kết nối.", "Định tuyến gói tin.", "Hiển thị giao diện người dùng."],
    e: "Ví dụ: Chuyển đổi ảnh sang .jpg hoặc mã hóa mật khẩu trước khi gửi đi."
  },
  {
    subject: 'network', type: 'mc',
    q: "[Tầng 7 - Application] Đây là nơi diễn ra hoạt động gì?",
    a: "Giao diện giữa người dùng và phần mềm (Chrome, Outlook...).",
    o: ["Truyền tín hiệu điện.", "Định tuyến IP.", "Kiểm soát lỗi đường truyền."],
    e: "Là tầng cao nhất, nơi người dùng tương tác trực tiếp với các ứng dụng mạng."
  },

  // --- 3. THIẾT BỊ MẠNG & ĐỊA CHỈ (HARDWARE & ADDRESSING) ---
  {
    subject: 'network', type: 'mc',
    q: "Sự khác biệt cơ bản giữa Hub và Switch là gì?",
    a: "Hub gửi tin cho tất cả (Broadcast), Switch chỉ gửi cho đúng người nhận (Unicast).",
    o: ["Hub thông minh hơn Switch.", "Hub dùng địa chỉ IP, Switch dùng MAC.", "Hub nhanh hơn Switch."],
    e: "Hub 'hét toáng lên' gây ồn ào, Switch 'thầm thì' với đúng thiết bị nhờ bảng MAC table."
  },
  {
    subject: 'network', type: 'mc',
    q: "Router (Bộ định tuyến) khác Switch ở điểm nào?",
    a: "Router kết nối các mạng khác nhau (ra Internet), Switch kết nối thiết bị trong cùng một mạng.",
    o: ["Router chỉ dùng cho wifi.", "Switch có thể thay thế Router để vào mạng.", "Hai thiết bị giống hệt nhau."],
    e: "Switch chỉ biết chuyển tin trong 'ao làng' (LAN), Router biết đường ra 'biển lớn' (Internet)."
  },
  {
    subject: 'network', type: 'mc',
    q: "Địa chỉ MAC (Media Access Control) được ví như cái gì trong đời thực?",
    a: "Số Căn cước công dân (Gắn liền với thiết bị, khó thay đổi).",
    o: ["Địa chỉ nhà (Có thể thay đổi khi chuyển nhà).", "Số điện thoại.", "Tên gọi ở nhà."],
    e: "Mỗi card mạng (NIC) có một MAC duy nhất toàn cầu."
  },
  {
    subject: 'network', type: 'mc',
    q: "Thiết bị Modem có chức năng chính là gì?",
    a: "Phiên dịch tín hiệu số (Digital) sang tín hiệu tương tự (Analog/Quang) và ngược lại.",
    o: ["Phát sóng Wifi.", "Lưu trữ dữ liệu.", "Chặn virus."],
    e: "Modulate (Biến điệu) và Demodulate (Giải điều chế) để máy tính hiểu được tín hiệu nhà mạng."
  },

  // --- 4. TÌNH HUỐNG THỰC TẾ (OSI TRONG SỬA LỖI) ---
  {
    subject: 'network', type: 'mc',
    q: "Khi mạng bị hỏng, việc kiểm tra 'Dây mạng có bị đứt không' là đang kiểm tra tầng nào của OSI?",
    a: "Tầng 1 (Physical - Vật lý)",
    o: ["Tầng 3 (Network)", "Tầng 7 (Application)", "Tầng 4 (Transport)"],
    e: "Tầng vật lý liên quan đến đường truyền vật chất như dây cáp, sóng wifi."
  },
  {
    subject: 'network', type: 'mc',
    q: "Khi máy tính báo 'IP Address Conflict' (Xung đột IP), lỗi này nằm ở tầng nào?",
    a: "Tầng 3 (Network)",
    o: ["Tầng 1 (Physical)", "Tầng 2 (Data Link)", "Tầng 5 (Session)"],
    e: "Địa chỉ IP và định tuyến thuộc về Tầng Network."
  },
  {
    subject: 'network', type: 'mc',
    q: "Dữ liệu tại Tầng 4 (Transport) được gọi là gì?",
    a: "Segment (Đoạn)",
    o: ["Packet (Gói)", "Frame (Khung)", "Bit"],
    e: "Tầng 4 chia nhỏ dữ liệu thành các Segments."
  },
  {
    subject: 'network', type: 'text',
    q: "Đơn vị dữ liệu tại Tầng 3 (Network) được gọi là gì? (Tiếng Anh)",
    a: "Packet",
    e: "Ở tầng Network, dữ liệu được đóng gói kèm địa chỉ IP gọi là Packet."
  },
  // ========================================================================
  // BỔ SUNG: OSI & NETWORK BASIC (ĐA DẠNG LOẠI CÂU HỎI)
  // ========================================================================

  // --- LOẠI 1: NHẬP LIỆU (TEXT INPUT) - Cần nhớ chính xác từ khóa ---
  {
    subject: 'network', type: 'text',
    q: "Đơn vị dữ liệu (PDU) tại Tầng 2 (Data Link) được gọi là gì? (Tiếng Anh)",
    a: "Frame",
    e: "Tại tầng 2, dữ liệu được đóng gói kèm địa chỉ MAC gọi là Frame (Khung)."
  },
  {
    subject: 'network', type: 'text',
    q: "Thiết bị nào được ví như 'Cảnh sát giao thông' hoạt động tại Tầng 3 (Network)?",
    a: "Router",
    e: "Router (Bộ định tuyến) quyết định đường đi cho gói tin giữa các mạng khác nhau."
  },
  {
    subject: 'network', type: 'text',
    q: "Tầng nào trong mô hình OSI chịu trách nhiệm mã hóa và nén dữ liệu? (Tiếng Anh)",
    a: "Presentation",
    e: "Tầng Trình diễn (Layer 6) đảm bảo định dạng dữ liệu (VD: .jpg, mã hóa SSL) ."
  },
  {
    subject: 'network', type: 'text',
    q: "Giao thức nào được sử dụng khi bạn dùng lệnh 'Ping' để kiểm tra kết nối mạng? (Viết tắt)",
    a: "ICMP",
    e: "Internet Control Message Protocol dùng để báo cáo lỗi và kiểm tra trạng thái mạng ."
  },
  {
    subject: 'network', type: 'text',
    q: "Địa chỉ vật lý gồm 48-bit gắn liền với card mạng được gọi là gì? (Viết tắt)",
    a: "MAC",
    e: "Media Access Control address là duy nhất và cố định cho mỗi thiết bị mạng."
  },

  // --- LOẠI 2: ĐÚNG / SAI (TRUE / FALSE) - Kiểm tra hiểu biết ---
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: Hub thông minh hơn Switch vì nó gửi dữ liệu tới tất cả các cổng?",
    a: "Sai",
    o: ["Đúng"],
    e: "Hub 'kém thông minh' vì nó gửi tin broadcast gây ồn ào và tắc nghẽn. Switch thông minh hơn vì chỉ gửi đến đúng đích ."
  },
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: Tầng Vật lý (Physical Layer) truyền tải dữ liệu dưới dạng các Bit (0 và 1)?",
    a: "Đúng",
    o: ["Sai"],
    e: "Tầng 1 truyền tín hiệu thô (điện, ánh sáng, sóng) đại diện cho các bit nhị phân."
  },
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: Giao thức UDP đảm bảo độ tin cậy cao hơn TCP?",
    a: "Sai",
    o: ["Đúng"],
    e: "UDP là giao thức 'phi kết nối' (nhanh nhưng ẩu), không đảm bảo tin cậy. TCP mới là giao thức tin cậy."
  },
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: Router hoạt động ở Tầng 2 (Data Link) của mô hình OSI?",
    a: "Sai",
    o: ["Đúng"],
    e: "Router hoạt động ở Tầng 3 (Network). Switch mới hoạt động ở Tầng 2."
  },
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: HTTP là giao thức thuộc Tầng Ứng dụng (Application Layer)?",
    a: "Đúng",
    o: ["Sai"],
    e: "HTTP, FTP, SMTP đều là các giao thức giao tiếp trực tiếp với phần mềm người dùng ở Tầng 7."
  },

  // --- LOẠI 3: TRẮC NGHIỆM (MULTIPLE CHOICE) - Tư duy tổng hợp ---
  {
    subject: 'network', type: 'mc',
    q: "Khi bạn gửi một email, quá trình đóng gói dữ liệu diễn ra theo thứ tự nào trong mô hình OSI?",
    a: "Từ Tầng 7 xuống Tầng 1 (Application -> Physical)",
    o: ["Từ Tầng 1 lên Tầng 7", "Bắt đầu từ Tầng 4", "Ngẫu nhiên"],
    e: "Quá trình gửi đi là đóng gói (Encapsulation): Dữ liệu đi từ Ứng dụng xuống Dây cáp."
  },
  {
    subject: 'network', type: 'mc',
    q: "Thiết bị nào sau đây giúp kết nối các thiết bị không dây (Laptop, Điện thoại) vào mạng có dây?",
    a: "Access Point",
    o: ["Switch", "Hub", "Modem"],
    e: "Access Point phát sóng Wifi để kết nối thiết bị không dây vào mạng LAN."
  },
  {
    subject: 'network', type: 'mc',
    q: "Tại sao cáp quang (Fiber Optic) lại truyền dữ liệu nhanh hơn cáp đồng?",
    a: "Nó truyền tín hiệu bằng Ánh sáng (Light).",
    o: ["Nó truyền bằng điện.", "Nó to hơn.", "Nó ngắn hơn."],
    e: "Ánh sáng có tốc độ cao và không bị nhiễu điện từ như tín hiệu điện trong cáp đồng."
  },
  {
    subject: 'network', type: 'mc',
    q: "Trong mô hình OSI, 'Session Layer' (Tầng Phiên) có nhiệm vụ gì?",
    a: "Thiết lập, duy trì và kết thúc các phiên làm việc giữa hai máy.",
    o: ["Định tuyến gói tin.", "Hiển thị giao diện.", "Truyền bit."],
    e: "Giống như việc thực hiện cuộc gọi: Bắt đầu alo, nói chuyện và tạm biệt ."
  },
  // ========================================================================
  // BỔ SUNG TỔNG HỢP: SQL - ĐẠO ĐỨC - HTML/CSS - CÔNG NGHỆ MỚI
  // ========================================================================

  // --- 1. SQL & CƠ SỞ DỮ LIỆU (DATABASE) ---
  {
    subject: 'database', type: 'text',
    q: "Câu lệnh SQL nào dùng để LẤY dữ liệu từ bảng? (Tiếng Anh, viết hoa)",
    a: "SELECT",
    e: "Cấu trúc cơ bản: SELECT * FROM ten_bang."
  },
  {
    subject: 'database', type: 'mc',
    q: "Trong cơ sở dữ liệu, 'Khóa chính' (Primary Key) có đặc điểm gì quan trọng nhất?",
    a: "Duy nhất và không được để trống (Unique & Not Null).",
    o: ["Có thể trùng lặp.", "Luôn là số nguyên.", "Dùng để bảo mật bảng."],
    e: "Khóa chính dùng để định danh duy nhất một dòng dữ liệu (ví dụ: CCCD, Mã sinh viên)."
  },
  {
    subject: 'database', type: 'mc',
    q: "Câu lệnh SQL nào dùng để XÓA dữ liệu khỏi bảng?",
    a: "DELETE",
    o: ["DROP", "REMOVE", "CLEAR"],
    e: "DELETE xóa dữ liệu (dòng), còn DROP xóa toàn bộ cấu trúc bảng (xóa sổ)."
  },
  {
    subject: 'database', type: 'tf',
    q: "ĐÚNG hay SAI: SQL là ngôn ngữ lập trình dùng để thiết kế giao diện web?",
    a: "Sai",
    o: ["Đúng"],
    e: "Sai. SQL (Structured Query Language) là ngôn ngữ truy vấn dùng để giao tiếp với Cơ sở dữ liệu. HTML/CSS mới làm giao diện."
  },

  // --- 2. ĐẠO ĐỨC, PHÁP LUẬT & XÃ HỘI (ETHICS & LAW) ---
  {
    subject: 'ethics', type: 'mc',
    q: "Hành vi nào sau đây vi phạm 'Luật An ninh mạng' tại Việt Nam?",
    a: "Đăng tải thông tin sai sự thật gây hoang mang dư luận.",
    o: ["Sử dụng Facebook ẩn danh.", "Gửi email quảng cáo.", "Tải phần mềm miễn phí."],
    e: "Luật An ninh mạng nghiêm cấm việc thông tin sai lệch, kích động bạo lực hoặc chống phá nhà nước."
  },
  {
    subject: 'ethics', type: 'mc',
    q: "Khái niệm 'Bản quyền' (Copyright) bảo vệ điều gì?",
    a: "Quyền sở hữu trí tuệ của tác giả đối với tác phẩm sáng tạo (sách, nhạc, phần mềm).",
    o: ["Quyền riêng tư cá nhân.", "Bảo mật thông tin khách hàng.", "Quyền tự do ngôn luận."],
    e: "Việc sao chép phần mềm hoặc tranh ảnh mà không xin phép là vi phạm bản quyền."
  },
  {
    subject: 'ethics', type: 'tf',
    q: "ĐÚNG hay SAI: AI có thể đưa ra quyết định mang tính định kiến (phân biệt chủng tộc/giới tính) nếu dữ liệu học của nó bị sai lệch?",
    a: "Đúng",
    o: ["Sai"],
    e: "Đây là vấn đề 'Bias in AI'. Nếu dữ liệu đầu vào chứa định kiến, AI sẽ học và áp dụng định kiến đó (Garbage In, Garbage Out)."
  },
  {
    subject: 'ethics', type: 'text',
    q: "Tên gọi của loại giấy phép phần mềm cho phép người dùng xem, sửa đổi và phân phối lại mã nguồn? (Tiếng Anh)",
    a: "Open Source",
    e: "Mã nguồn mở (Open Source) như Linux, Python khuyến khích cộng đồng cùng phát triển."
  },

  // --- 3. HTML & CSS (NÂNG CAO & FORM) ---
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <input> với thuộc tính 'type=\"password\"' có đặc điểm gì?",
    a: "Các ký tự nhập vào bị ẩn đi (thay bằng dấu chấm hoặc sao).",
    o: ["Chữ hiện màu đỏ.", "Chỉ cho nhập số.", "Tự động lưu mật khẩu."],
    e: "Giúp bảo mật mật khẩu khi người dùng nhập liệu trên màn hình."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính 'z-index' trong CSS dùng để làm gì?",
    a: "Quyết định thứ tự xếp chồng (lớp nào nằm trên, lớp nào nằm dưới).",
    o: ["Chỉnh độ trong suốt.", "Chỉnh kích thước theo trục Z.", "Xoay phần tử 3D."],
    e: "z-index càng cao thì phần tử càng nằm đè lên trên các phần tử khác (chỉ hoạt động với position khác static)."
  },
  {
    subject: 'css', type: 'text',
    q: "Để tạo một ô nhập liệu cho phép người dùng chọn NHIỀU phương án cùng lúc, ta dùng input type gì? (Tiếng Anh)",
    a: "checkbox",
    e: "Checkbox (ô vuông) cho chọn nhiều. Radio (hình tròn) chỉ được chọn một trong nhóm."
  },
  {
    subject: 'html', type: 'mc',
    q: "Trong thẻ <table>, thẻ nào dùng để gộp hai ô theo chiều dọc (gộp hàng)?",
    a: "rowspan",
    o: ["colspan", "span", "merge"],
    e: "rowspan='2' sẽ gộp ô hiện tại với ô bên dưới nó. colspan dùng để gộp cột (ngang)."
  },

  // --- 4. CÔNG NGHỆ MỚI: IOT & CLOUD COMPUTING ---
  {
    subject: 'ai', type: 'text',
    q: "Thuật ngữ viết tắt của 'Vạn vật kết nối' - mạng lưới các thiết bị thông minh kết nối qua Internet? (Viết tắt)",
    a: "IoT",
    e: "Internet of Things (IoT) bao gồm camera, tủ lạnh, đèn thông minh... kết nối và điều khiển từ xa."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Điện toán đám mây (Cloud Computing) cung cấp dịch vụ lưu trữ như Google Drive, Dropbox thuộc mô hình nào?",
    a: "SaaS (Software as a Service) - Phần mềm như một dịch vụ.",
    o: ["IaaS (Cơ sở hạ tầng).", "PaaS (Nền tảng).", "Hardware."],
    e: "Người dùng chỉ việc sử dụng phần mềm qua web mà không cần quan tâm cài đặt hay server bên dưới."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Đặc điểm rủi ro lớn nhất của thiết bị IoT (Camera, Smarthome) hiện nay là gì?",
    a: "Bảo mật kém, dễ bị hacker xâm nhập biến thành botnet.",
    o: ["Tốn quá nhiều điện.", "Giá thành quá cao.", "Khó kết nối Wifi."],
    e: "Nhiều thiết bị IoT giá rẻ không được cập nhật bảo mật, giữ mật khẩu mặc định nên dễ bị tấn công."
  },
  // ========================================================================
  // PHẦN "VÉT NỐT": CÁC CÂU HỎI DỄ GÂY TRANH CÃI & NHẦM LẪN
  // ========================================================================

  // --- 1. MẠNG MÁY TÍNH: Những ngoại lệ và hiểu lầm phổ biến ---
  {
    subject: 'network', type: 'mc',
    q: "Hầu hết tài liệu đều nói DNS dùng UDP Port 53. Tuy nhiên, DNS sẽ chuyển sang dùng TCP Port 53 trong trường hợp nào?",
    a: "Khi gói tin phản hồi quá lớn (>512 bytes) hoặc thực hiện Zone Transfer.",
    o: ["Không bao giờ, DNS chỉ dùng UDP.", "Khi mạng bị lag.", "Khi người dùng truy cập web HTTPS."],
    e: "Đây là một ngoại lệ kinh điển. DNS dùng UDP cho tốc độ, nhưng bắt buộc dùng TCP khi cần độ tin cậy cao hoặc dữ liệu lớn."
  },
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: Nếu công ty đã trang bị Firewall (Tường lửa) hiện đại nhất, hệ thống sẽ an toàn tuyệt đối trước mọi mã độc?",
    a: "Sai",
    o: ["Đúng"],
    e: "Firewall chỉ chặn được tấn công từ bên ngoài. Nếu nhân viên cắm USB chứa virus vào máy nội bộ ('Kẻ địch bên trong'), Firewall hoàn toàn vô dụng."
  },
  {
    subject: 'network', type: 'text',
    q: "Để máy in trong mạng LAN có thể tự động gửi Driver cho máy tính cài đặt mà không cần đĩa CD, nó sử dụng tính năng chia sẻ nào? (Tiếng Anh)",
    a: "Printer Sharing",
    e: "Khi kết nối vào máy in được chia sẻ (Shared Printer), máy in sẽ tự động đẩy gói tin chứa Driver qua mạng cho máy khách."
  },
  {
    subject: 'network', type: 'mc',
    q: "Tại sao khi xem Livestream bóng đá (UDP), hình ảnh đôi khi bị vỡ/nhòe nhưng video không bị dừng lại?",
    a: "Vì giao thức UDP ưu tiên tốc độ, chấp nhận mất gói tin chứ không yêu cầu gửi lại.",
    o: ["Vì server bị quá tải.", "Vì giao thức TCP đang sửa lỗi.", "Vì đường truyền cáp quang bị nhiễu."],
    e: "UDP hoạt động theo cơ chế 'Bắn và Quên'. Mất vài gói tin dẫn đến vỡ hình, nhưng đảm bảo dòng video chảy liên tục (Real-time)."
  },

  // --- 2. AI & ĐẠO ĐỨC: Ranh giới mong manh ---
  {
    subject: 'ai', type: 'mc',
    q: "Một chiếc máy giặt tự động cân quần áo, tự chỉnh lượng nước và thời gian giặt dựa trên độ bẩn thực tế. Đây là Tự động hóa hay AI?",
    a: "Trí tuệ nhân tạo (AI)",
    o: ["Tự động hóa (Automation)"],
    e: "Đây là AI vì nó có khả năng 'Nhận thức' (cảm biến độ bẩn) và 'Ra quyết định' linh hoạt. Tự động hóa chỉ là quay theo giờ hẹn cố định."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Nếu một AI tuyển dụng liên tục loại bỏ hồ sơ của ứng viên nữ dù lập trình viên không hề viết lệnh 'kỳ thị nữ giới', nguyên nhân gốc rễ là gì?",
    a: "Dữ liệu huấn luyện (Training Data) trong quá khứ chứa định kiến của con người.",
    o: ["Do lỗi thuật toán.", "Do AI tự phát triển ý thức.", "Do phần cứng bị lỗi."],
    e: "Nguyên lý 'Garbage In, Garbage Out'. AI học từ dữ liệu lịch sử, nếu lịch sử công ty toàn tuyển nam, AI sẽ học theo định kiến đó."
  },
  {
    subject: 'ai', type: 'tf',
    q: "ĐÚNG hay SAI: 'Hộp đen' (Black Box) trong AI nghĩa là hộp ghi dữ liệu máy bay?",
    a: "Sai",
    o: ["Đúng"],
    e: "Trong AI, 'Hộp đen' ám chỉ việc con người không thể giải thích/hiểu được quá trình xử lý bên trong của các lớp ẩn (Hidden Layers) để ra được kết quả cuối cùng."
  },

  // --- 3. CSS: Những cái bẫy về độ ưu tiên & Đơn vị ---
  {
    subject: 'css', type: 'mc',
    q: "Giữa 'line-height: 1.5' (số không đơn vị) và 'line-height: 150%' (phần trăm), cách nào được khuyên dùng hơn? Tại sao?",
    a: "Số không đơn vị (1.5) - Vì nó tính toán lại chiều cao dòng cho từng phần tử con, tránh lỗi thừa kế.",
    o: ["Phần trăm (150%) - Vì nó dễ hiểu hơn.", "Giống hệt nhau, dùng cái nào cũng được.", "Số không đơn vị không hoạt động."],
    e: "Dùng % hoặc em sẽ tính ra giá trị pixel cố định ở cha rồi truyền cho con. Nếu font con to hơn cha, dòng sẽ bị chồng chéo. Số không đơn vị an toàn hơn."
  },
  {
    subject: 'css', type: 'mc',
    q: "Xét độ ưu tiên (Specificity): Selector nào sau đây mạnh nhất?",
    a: "div#header (1 ID + 1 Tag = 101 điểm)",
    o: [".menu .item .link (3 Class = 30 điểm)", "body div p ul li (5 Tags = 5 điểm)", "div.header (1 Class + 1 Tag = 11 điểm)"],
    e: "ID (#) có trọng số 100, Class (.) là 10, Tag là 1. ID luôn áp đảo Class."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Thuộc tính 'text-align: center' có thể dùng để căn giữa một khối <div> (block element)?",
    a: "Sai",
    o: ["Đúng"],
    e: "Rất hay nhầm! 'text-align' chỉ căn giữa nội dung văn bản (inline) bên trong. Muốn căn giữa khối <div>, phải dùng 'margin: auto' hoặc Flexbox."
  },
  {
    subject: 'css', type: 'text',
    q: "Giá trị nào của thuộc tính 'display' giúp phần tử vừa có kích thước (width/height) như khối, nhưng vẫn nằm cùng một dòng? (Tiếng Anh)",
    a: "inline-block",
    e: "Kết hợp ưu điểm của cả inline (không xuống dòng) và block (chỉnh được kích thước)."
  },

  // --- 4. HTML & FORM: Chi tiết nhỏ dễ sai ---
  {
    subject: 'html', type: 'mc',
    q: "Sự khác biệt cốt lõi giữa phương thức 'GET' và 'POST' khi gửi Form là gì?",
    a: "GET hiển thị dữ liệu lên URL (không bảo mật), POST gửi ngầm bên trong (bảo mật hơn).",
    o: ["GET nhanh hơn POST.", "POST chỉ dùng cho file ảnh.", "GET dùng cho mật khẩu, POST dùng cho tìm kiếm."],
    e: "Không bao giờ dùng GET cho mật khẩu vì nó sẽ hiện lù lù trên thanh địa chỉ trình duyệt."
  },
  {
    subject: 'html', type: 'text',
    q: "Để tạo hiệu ứng chữ cái đầu tiên to đùng (Drop Cap) như trong tạp chí, ta dùng Pseudo-element nào? (Cú pháp ::...)",
    a: "::first-letter",
    e: "Pseudo-element ::first-letter kết hợp với float: left tạo hiệu ứng báo chí chuyên nghiệp."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <input> nào cho phép người dùng chọn NHIỀU phương án cùng lúc?",
    a: "Checkbox (Hình vuông)",
    o: ["Radio (Hình tròn)", "Select", "Textarea"],
    e: "Radio chỉ cho chọn 1 (ví dụ Giới tính). Checkbox cho chọn nhiều (ví dụ Sở thích)."
  },

  // --- 5. BẢO MẬT: Tấn công & Phòng thủ ---
  {
    subject: 'network', type: 'mc',
    q: "Hacker thực hiện tấn công 'Man-in-the-Middle' bằng cách giả mạo địa chỉ MAC của Router. Đây là kỹ thuật gì?",
    a: "ARP Spoofing (Đầu độc ARP)",
    o: ["DDoS SYN Flood", "SQL Injection", "Phishing"],
    e: "Hacker lừa máy nạn nhân rằng 'Tôi là Router', khiến toàn bộ dữ liệu nạn nhân gửi đi đều qua máy Hacker."
  },
  {
    subject: 'network', type: 'text',
    q: "Kỹ thuật tấn công nào lợi dụng việc server mở kết nối (SYN-ACK) nhưng không bao giờ nhận được phản hồi cuối cùng (ACK)?",
    a: "SYN Flood",
    e: "Đây là một dạng DDoS, khiến server cạn kiệt tài nguyên vì phải duy trì các kết nối dở dang (Half-open)."
  },
  // ========================================================================
  // CHI TIẾT NÂNG CAO: 4 LOẠI TẤN CÔNG MẠNG (DDoS, Malware, Phishing, SQLi)
  // Nguồn: 
  // ========================================================================

  // --- 1. DDoS (Distributed Denial of Service) ---
  {
    subject: 'network', type: 'mc',
    q: "Trong tấn công DDoS, thuật ngữ 'Botnet' (Mạng máy tính ma) ám chỉ điều gì?",
    a: "Hàng ngàn máy tính/thiết bị IoT bị nhiễm mã độc và bị hacker điều khiển từ xa.",
    o: ["Một phần mềm diệt virus.", "Mạng lưới các máy chủ của Google.", "Các robot làm việc trong nhà máy."],
    e: "Hacker không dùng 1 máy tính mà huy động hàng triệu 'zombies' (máy bị nhiễm) để tấn công đồng loạt."
  },
  {
    subject: 'network', type: 'mc',
    q: "Kỹ thuật tấn công nào thường được sử dụng để thực hiện DDoS, lợi dụng bước bắt tay của giao thức TCP?",
    a: "SYN Flood",
    o: ["SQL Injection", "Phishing", "Ransomware"],
    e: "Hacker gửi hàng loạt lời chào (SYN) giả mạo khiến server mở cổng chờ đợi (Half-open) đến khi sập nguồn."
  },
  {
    subject: 'network', type: 'text',
    q: "Mục đích chính của tấn công DDoS là đánh vào yếu tố nào của hệ thống? (Tiếng Việt: Tính...)",
    a: "Tính sẵn sàng",
    e: "DDoS làm quá tải hệ thống, khiến người dùng thật không thể truy cập dịch vụ (Từ chối dịch vụ)."
  },

  // --- 2. MALWARE (Phần mềm độc hại) ---
  {
    subject: 'network', type: 'mc',
    q: "Sự khác biệt cốt lõi giữa 'Virus' và 'Worm' (Sâu máy tính) là gì?",
    a: "Virus cần vật chủ (file) để lây lan; Worm tự nhân bản và lây lan qua mạng mà không cần vật chủ.",
    o: ["Virus nguy hiểm hơn Worm.", "Worm chỉ tấn công điện thoại.", "Hai loại này là một."],
    e: "Virus giống cúm (cần người lây), Worm tự bò từ máy này sang máy khác qua mạng LAN/Internet."
  },
  {
    subject: 'network', type: 'mc',
    q: "Loại mã độc nào ngụy trang dưới vỏ bọc phần mềm hợp pháp (VD: Crack game) để mở cửa hậu (backdoor) cho hacker?",
    a: "Trojan (Ngựa Troy)",
    o: ["Ransomware", "Adware", "Spyware"],
    e: "Lấy tích từ điển tích Con ngựa gỗ thành Troy: Bên ngoài là quà tặng, bên trong chứa lính (hacker)."
  },
  {
    subject: 'network', type: 'text',
    q: "Tên loại mã độc mã hóa toàn bộ dữ liệu người dùng và yêu cầu thanh toán (thường là Bitcoin) để lấy khóa giải mã? (Tiếng Anh)",
    a: "Ransomware",
    e: "Đây là loại mã độc tống tiền đáng sợ nhất hiện nay."
  },

  // --- 3. PHISHING (Lừa đảo trực tuyến) ---
  {
    subject: 'ethics', type: 'mc',
    q: "Tấn công Phishing nhắm vào điểm yếu nào của hệ thống bảo mật?",
    a: "Yếu tố con người (Sự bất cẩn, thiếu hiểu biết).",
    o: ["Lỗi phần mềm.", "Lỗi phần cứng.", "Đường truyền mạng."],
    e: "Thay vì hack máy móc khó khăn, hacker lừa người dùng tự tay điền mật khẩu vào trang web giả."
  },
  {
    subject: 'ethics', type: 'mc',
    q: "Dấu hiệu nào sau đây là đặc trưng của một trang web Phishing (Lừa đảo)?",
    a: "Đường dẫn (URL) bị thay đổi nhẹ, ví dụ: 'faceb00k.com' thay vì 'facebook.com'.",
    o: ["Trang web tải rất nhanh.", "Trang web có giao diện xấu.", "Trang web yêu cầu cập nhật Chrome."],
    e: "Hacker dùng kỹ thuật 'Lưỡi câu' (Hook) với các tên miền giả mạo gần giống thật để đánh lừa mắt người dùng."
  },

  // --- 4. SQL INJECTION (Tiêm mã độc vào CSDL) ---
  {
    subject: 'sql', type: 'mc',
    q: "Đoạn mã `' OR '1'='1` thường được hacker sử dụng trong kỹ thuật tấn công nào?",
    a: "SQL Injection",
    o: ["DDoS", "Cross-Site Scripting (XSS)", "Brute Force"],
    e: "Kỹ thuật này đánh lừa cơ sở dữ liệu vì biểu thức '1=1' luôn luôn đúng, giúp đăng nhập không cần mật khẩu."
  },
  {
    subject: 'sql', type: 'text',
    q: "SQL Injection tấn công vào thành phần nào của hệ thống web? (Tiếng Anh)",
    a: "Database",
    e: "Nó chèn lệnh SQL độc hại thông qua các ô nhập liệu để thao tác trực tiếp với Cơ sở dữ liệu."
  },
  {
    subject: 'sql', type: 'tf',
    q: "ĐÚNG hay SAI: Firewall thế hệ cũ (Packet Filtering) có thể chặn đứng hoàn toàn tấn công SQL Injection?",
    a: "Sai",
    o: ["Đúng"],
    e: "Firewall cũ chỉ lọc IP/Port. SQL Injection đi qua cổng 80/443 (hợp lệ) và nằm trong nội dung gói tin, cần Web Application Firewall (WAF) mới chặn được."
  },
  // ========================================================================
  // NGUỒN: TONG_TIN_HTML_CSS.TXT (HTML & CSS CHI TIẾT)
  // ========================================================================

  // --- HTML: Định dạng & Thẻ cơ bản ---
  {
    subject: 'html', type: 'mc',
    q: "Có bao nhiêu kiểu định dạng CSS (nhúng CSS) vào trang web?",
    a: "3 kiểu (Inline, Internal, External)",
    o: ["1 kiểu", "2 kiểu", "4 kiểu"],
    e: "Inline (trong thẻ), Internal (trong <style>), External (file .css riêng)."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thuộc tính 'target=\"_blank\"' trong thẻ <a> có tác dụng gì?",
    a: "Mở liên kết trong một tab hoặc cửa sổ mới.",
    o: ["Mở trong tab hiện tại (_self).", "Mở trong khung cha (_parent).", "Tải file xuống."],
    e: "_blank giúp giữ lại trang hiện tại khi người dùng click link."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <dl>, <dt>, <dd> dùng để tạo loại danh sách nào?",
    a: "Danh sách mô tả (Description List).",
    o: ["Danh sách có thứ tự.", "Danh sách không thứ tự.", "Danh sách thả xuống."],
    e: "<dl> là danh sách, <dt> là thuật ngữ, <dd> là mô tả/định nghĩa ."
  },
  {
    subject: 'html', type: 'text',
    q: "Để gộp nhiều HÀNG thành một ô trong bảng, ta dùng thuộc tính gì? (Tiếng Anh)",
    a: "rowspan",
    e: "rowspan='2' gộp 2 hàng. colspan dùng để gộp cột."
  },

  // --- HTML: Form & Input ---
  {
    subject: 'html', type: 'mc',
    q: "Sự khác biệt giữa phương thức 'GET' và 'POST' trong thẻ <form>?",
    a: "GET gửi dữ liệu qua URL (hiện trên thanh địa chỉ), POST gửi ngầm (bảo mật hơn).",
    o: ["GET dùng cho mật khẩu.", "POST nhanh hơn GET.", "Hai phương thức giống nhau."],
    e: "Không dùng GET cho dữ liệu nhạy cảm như mật khẩu ."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <input type='radio'> khác <input type='checkbox'> ở điểm nào?",
    a: "Radio chỉ chọn 1 trong nhiều (hình tròn), Checkbox chọn nhiều (hình vuông).",
    o: ["Radio chọn nhiều.", "Checkbox bắt buộc chọn hết.", "Radio dùng cho nhập văn bản."],
    e: "Để radio hoạt động đúng (chỉ chọn 1), các ô input phải có cùng 'name'."
  },
  {
    subject: 'html', type: 'text',
    q: "Thuộc tính nào giúp hiển thị một văn bản gợi ý mờ bên trong ô input (ví dụ: 'Nhập họ tên...')? (Tiếng Anh)",
    a: "placeholder",
    e: "Placeholder sẽ biến mất khi người dùng bắt đầu gõ."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <fieldset> và <legend> dùng để làm gì trong Form?",
    a: "<fieldset> gom nhóm các phần tử liên quan, <legend> tạo tiêu đề cho nhóm đó.",
    o: ["Tạo đường viền trang trí.", "Tạo danh sách thả xuống.", "Tạo nút bấm."],
    e: "Giúp form mạch lạc hơn, ví dụ gom nhóm 'Thông tin đăng nhập'."
  },

  // --- CSS: Màu sắc & Đơn vị ---
  {
    subject: 'color', type: 'mc',
    q: "Trong hệ màu HSL (Hue, Saturation, Lightness), Lightness = 0% là màu gì?",
    a: "Đen (Black)",
    o: ["Trắng (100%)", "Màu gốc (50%)", "Xám"],
    e: "Lightness là độ sáng: 0% tối đen, 100% trắng tinh, 50% là màu chuẩn."
  },
  {
    subject: 'css', type: 'mc',
    q: "Đơn vị đo 'rem' trong CSS dựa trên cái gì?",
    a: "Kích thước font chữ của phần tử gốc (html).",
    o: ["Kích thước font chữ của phần tử cha (em).", "Kích thước màn hình.", "Pixel cố định."],
    e: "rem (root em) giúp đồng bộ kích thước toàn trang dễ dàng hơn."
  },

  // --- CSS: Selector & Quan hệ ---
  {
    subject: 'css', type: 'mc',
    q: "Selector 'div > p' biểu thị mối quan hệ gì?",
    a: "Cha - Con trực tiếp (Chỉ chọn p là con ruột của div).",
    o: ["Tổ tiên - Hậu duệ (div p).", "Anh em liền kề (div + p).", "Anh em chung (div ~ p)."],
    e: "Dấu '>' chỉ tác động lên con cấp 1, không tác động lên cháu chắt ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Độ ưu tiên (Specificity) sắp xếp từ cao xuống thấp nào là đúng?",
    a: "!important > Inline Style > ID > Class > Tag",
    o: ["ID > Class > !important", "Class > ID > Tag", "Inline > !important > ID"],
    e: "!important là mạnh nhất, phá vỡ mọi quy tắc."
  },
  {
    subject: 'css', type: 'mc',
    q: "Selector 'p::first-letter' dùng để làm gì?",
    a: "Chọn chữ cái đầu tiên của đoạn văn (thường làm hiệu ứng Drop Cap).",
    o: ["Chọn dòng đầu tiên (first-line).", "Chọn đoạn văn đầu tiên.", "Chọn chữ cái cuối cùng."],
    e: "Kết hợp với float: left để tạo chữ cái đầu to đẹp như tạp chí ."
  },
  // ========================================================================
  // NGUỒN: TONG_TIN_AI_AND_MANG_MAY_TINH.TXT (AI & NETWORK)
  // ========================================================================

  // --- AI: Khái niệm & Lịch sử ---
  {
    subject: 'ai', type: 'mc',
    q: "Thuật ngữ 'Trí tuệ nhân tạo' (AI) chính thức ra đời tại sự kiện nào?",
    a: "Hội thảo Dartmouth (1956)",
    o: ["Hội nghị Turing (1950)", "Sự kiện Deep Blue (1997)", "Ra mắt ChatGPT (2022)"],
    e: "Hội thảo tại ĐH Dartmouth năm 1956 được coi là nơi khai sinh ra lĩnh vực AI."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Hệ chuyên gia MYCIN (1972) hoạt động dựa trên cơ sở tri thức nào?",
    a: "Khoảng 600 luật suy diễn dạng 'Nếu... thì...'.",
    o: ["Mạng nơ-ron nhân tạo.", "Học sâu (Deep Learning).", "Dữ liệu lớn (Big Data)."],
    e: "MYCIN chưa dùng Machine Learning mà dùng tập luật do chuyên gia nạp vào."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Sự khác biệt chính giữa AI Phân biệt (Discriminative) và AI Tạo sinh (Generative)?",
    a: "AI Phân biệt dùng để phân loại (VD: Chó hay Mèo); AI Tạo sinh dùng để tạo mới (VD: Vẽ tranh, viết văn).",
    o: ["AI Phân biệt thông minh hơn.", "AI Tạo sinh ra đời trước.", "Hai loại là một."],
    e: "ChatGPT, Midjourney là ví dụ của AI Tạo sinh."
  },

  // --- MẠNG: Giao thức & Mô hình ---
  {
    subject: 'network', type: 'mc',
    q: "Giao thức nào được ví như 'Danh bạ điện thoại' của Internet?",
    a: "DNS (Domain Name System)",
    o: ["IP", "DHCP", "HTTP"],
    e: "DNS dịch tên miền dễ nhớ (google.com) sang địa chỉ IP khó nhớ (142.250...)."
  },
  {
    subject: 'network', type: 'mc',
    q: "Trong mô hình OSI, Router hoạt động tại tầng nào?",
    a: "Tầng 3: Network (Tầng Mạng)",
    o: ["Tầng 2: Data Link", "Tầng 4: Transport", "Tầng 1: Physical"],
    e: "Router định tuyến gói tin dựa trên địa chỉ IP tại tầng 3."
  },
  {
    subject: 'network', type: 'mc',
    q: "Quy trình 'Bắt tay 3 bước' (3-way Handshake) của TCP gồm các bước nào?",
    a: "SYN -> SYN-ACK -> ACK",
    o: ["SYN -> ACK -> SYN-ACK", "ACK -> SYN -> FIN", "SYN -> SYN -> ACK"],
    e: "1. Khách mời (SYN) -> 2. Chủ đồng ý (SYN-ACK) -> 3. Khách xác nhận (ACK)."
  },
  {
    subject: 'network', type: 'text',
    q: "Giao thức nào dùng để cấp phát địa chỉ IP tự động cho các thiết bị trong mạng? (Viết tắt)",
    a: "DHCP",
    e: "Dynamic Host Configuration Protocol đóng vai trò như lễ tân cấp số phòng."
  },

  // --- MẠNG: Phần cứng & Topology ---
  {
    subject: 'network', type: 'mc',
    q: "Sự khác biệt giữa Hub và Switch?",
    a: "Hub gửi dữ liệu đến tất cả các cổng (ồn ào); Switch chỉ gửi đến thiết bị đích (thông minh).",
    o: ["Hub thông minh hơn Switch.", "Hub dùng địa chỉ IP, Switch dùng MAC.", "Hub nhanh hơn Switch."],
    e: "Switch dùng bảng MAC table để chuyển tin 'thầm thì' đúng người ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Nhược điểm lớn nhất của cấu trúc mạng hình Tuyến (Bus Topology) là gì?",
    a: "Nếu dây cáp chính đứt ở bất kỳ đâu, toàn bộ mạng ngừng hoạt động.",
    o: ["Tốn nhiều dây nhất.", "Khó lắp đặt.", "Cần thiết bị trung tâm đắt tiền."],
    e: "Dữ liệu đi trên đường độc đạo."
  },

  // --- BẢO MẬT: Tấn công & Phòng thủ ---
  {
    subject: 'network', type: 'mc',
    q: "Tấn công DDoS (Từ chối dịch vụ phân tán) thường sử dụng mạng lưới gì?",
    a: "Botnet (Mạng máy tính ma - các thiết bị bị nhiễm mã độc).",
    o: ["Siêu máy tính.", "Mạng LAN nội bộ.", "Máy chủ Google."],
    e: "Hacker điều khiển hàng triệu botnet để đánh sập server mục tiêu ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Firewall thế hệ mới (NGFW) vượt trội hơn Firewall truyền thống ở điểm nào?",
    a: "Có khả năng kiểm tra sâu gói tin (Deep Packet Inspection) để chặn virus và nhận diện ứng dụng.",
    o: ["Chỉ lọc được IP và Port.", "Giá rẻ hơn.", "Không cần cập nhật."],
    e: "Firewall cũ chỉ nhìn bìa thư, NGFW bóc thư ra đọc nội dung ."
  },
  {
    subject: 'sql', type: 'mc',
    q: "Kỹ thuật tấn công SQL Injection lợi dụng lỗ hổng nào?",
    a: "Chèn mã lệnh SQL độc hại vào ô nhập liệu (Input) để thao tác với cơ sở dữ liệu.",
    o: ["Gửi quá nhiều yêu cầu làm sập web.", "Lừa người dùng nhập mật khẩu.", "Nghe lén wifi."],
    e: "Ví dụ: Nhập ' OR '1'='1 để đăng nhập trái phép."
  },
  {
    subject: 'network', type: 'text',
    q: "Giao thức nào cho phép điều khiển máy tính từ xa an toàn qua dòng lệnh (thay thế Telnet)? (Viết tắt)",
    a: "SSH",
    e: "Secure Shell (Port 22) mã hóa kết nối điều khiển."
  },
  // ========================================================================
  // PHẦN CUỐI: CÂU HỎI HÓC BÚA & GÂY TRANH CÃI (DEEP DIVE)
  // ========================================================================

  // --- HTML & CSS: Những cái bẫy giao diện ---
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <strong> và thẻ <b> đều làm chữ in đậm. Vậy sự khác biệt về mặt ý nghĩa (Semantic) là gì?",
    a: "<strong> biểu thị nội dung có tầm quan trọng cao (nhấn mạnh), <b> chỉ đơn thuần là in đậm về mặt hình thức.",
    o: ["<strong> dùng cho tiêu đề, <b> dùng cho đoạn văn.", "Hai thẻ này hoàn toàn giống nhau.", "<strong> là thẻ cũ, <b> là thẻ mới."],
    e: "Trình đọc màn hình (Screen Reader) cho người khiếm thị sẽ đọc thẻ <strong> với giọng nhấn mạnh, còn <b> thì không ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Khi ta đặt padding: 10% cho một phần tử, giá trị % này được tính dựa trên cái gì?",
    a: "Dựa trên chiều RỘNG (width) của phần tử cha.",
    o: ["Dựa trên chiều CAO (height) của phần tử cha.", "Dựa trên chính phần tử đó.", "Dựa trên màn hình."],
    e: "Đây là một bẫy kinh điển: Cả padding-top/bottom khi dùng % đều tính theo WIDTH của cha, không phải height."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Thuộc tính 'vertical-align: middle' có tác dụng căn giữa nội dung trong một thẻ <div> (block) bình thường?",
    a: "Sai",
    o: ["Đúng"],
    e: "Sai lầm phổ biến! 'vertical-align' chỉ hoạt động với phần tử inline, inline-block hoặc table-cell (ô bảng). Với div block, nó vô dụng."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <button> mặc định (không có type) khi nằm trong <form> sẽ hành xử như thế nào?",
    a: "Nó tự động trở thành nút Submit (Gửi form).",
    o: ["Nó không làm gì cả.", "Nó trở thành nút Reset.", "Nó báo lỗi."],
    e: "Nếu bạn chỉ muốn một nút bấm bình thường để chạy JS, BẮT BUỘC phải thêm type='button', nếu không nó sẽ reload trang."
  },

  // --- MẠNG MÁY TÍNH: Ranh giới kỹ thuật ---
  {
    subject: 'network', type: 'mc',
    q: "Một Switch (Lớp 2) có địa chỉ IP không?",
    a: "Switch thường (Unmanaged) thì không, nhưng Switch quản lý (Managed) có IP ảo để cấu hình.",
    o: ["Luôn luôn có.", "Không bao giờ có.", "Chỉ có địa chỉ MAC."],
    e: "Về lý thuyết Lớp 2 chỉ dùng MAC. Nhưng thực tế Switch hiện đại cần IP để admin đăng nhập vào cài đặt."
  },
  {
    subject: 'network', type: 'mc',
    q: "Tại sao nói 'Hub tạo ra một Collision Domain (Miền xung đột) khổng lồ'?",
    a: "Vì tất cả thiết bị nối vào Hub đều tranh nhau nói trên một đường truyền chung, dễ gây va chạm dữ liệu.",
    o: ["Vì Hub chia nhỏ mạng ra quá nhiều.", "Vì Hub chặn các gói tin.", "Vì Hub làm hỏng dữ liệu."],
    e: "Switch giải quyết việc này bằng cách chia mỗi cổng là một Collision Domain riêng, cho phép nhiều máy nói chuyện cùng lúc ."
  },
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: HTTPS (HyperText Transfer Protocol Secure) là một giao thức hoàn toàn mới, tách biệt với HTTP?",
    a: "Sai",
    o: ["Đúng"],
    e: "Bản chất nó vẫn là HTTP nhưng được bọc bên trong lớp mã hóa SSL/TLS (HTTP over TLS). Nó không phải là giao thức thay thế hoàn toàn."
  },
  {
    subject: 'network', type: 'text',
    q: "Thiết bị nào có khả năng kết nối mạng LAN với mạng Internet toàn cầu (WAN)? (Tiếng Anh)",
    a: "Router",
    e: "Switch chỉ nối trong nhà (LAN). Để bước ra thế giới (WAN), bắt buộc phải đi qua Cổng mặc định (Default Gateway) là Router ."
  },

  // --- AI & TRÍ TUỆ NHÂN TẠO: Bản chất vấn đề ---
  {
    subject: 'ai', type: 'mc',
    q: "Theo quan điểm kỹ thuật trong tài liệu, ChatGPT thực chất là gì?",
    a: "Một cỗ máy dự đoán từ tiếp theo (Next Token Prediction) dựa trên xác suất thống kê.",
    o: ["Một bộ não có ý thức như con người.", "Một kho dữ liệu tìm kiếm như Google.", "Một phần mềm được lập trình sẵn các câu trả lời."],
    e: "Nó không 'hiểu' nghĩa như con người, nó chỉ tính toán xem từ nào có khả năng xuất hiện cao nhất tiếp theo ."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Mối quan hệ bao hàm nào sau đây là đúng nhất?",
    a: "AI > Machine Learning > Deep Learning",
    o: ["Deep Learning > Machine Learning > AI", "Machine Learning > AI > Deep Learning", "AI = Machine Learning"],
    e: "Deep Learning là tập con của Machine Learning, và Machine Learning là tập con của AI ."
  },
  {
    subject: 'ai', type: 'tf',
    q: "ĐÚNG hay SAI: Deep Learning (Học sâu) bắt buộc phải mô phỏng cấu trúc bộ não con người (Mạng nơ-ron)?",
    a: "Đúng",
    o: ["Sai"],
    e: "Đặc trưng của Deep Learning là sử dụng Neural Networks (Mạng nơ-ron nhân tạo) nhiều lớp để học các đặc trưng dữ liệu ."
  },

  // --- SQL & DỮ LIỆU: Logic gây lú ---
  {
    subject: 'sql', type: 'mc',
    q: "Kết quả của phép so sánh: `NULL = NULL` trong SQL là gì?",
    a: "Unknown (Không xác định/False)",
    o: ["True (Đúng)", "False (Sai)", "Error (Lỗi)"],
    e: "Trong SQL, NULL đại diện cho sự 'không biết'. Một cái 'không biết' không thể bằng một cái 'không biết' khác. Phải dùng `IS NULL`."
  },
  {
    subject: 'sql', type: 'mc',
    q: "Câu lệnh `SELECT COUNT(TenCot)` có đếm các dòng chứa giá trị NULL không?",
    a: "Không",
    o: ["Có"],
    e: "`COUNT(*)` đếm tất cả. `COUNT(TenCot)` sẽ bỏ qua các ô có giá trị NULL."
  },
  {
    subject: 'sql', type: 'text',
    q: "Để đảm bảo một cột không bao giờ nhận giá trị trùng lặp (ví dụ: Email đăng ký), ta dùng ràng buộc gì? (Tiếng Anh)",
    a: "UNIQUE",
    e: "Khác với Primary Key, một bảng có thể có nhiều cột UNIQUE."
  },
  // ========================================================================
  // PHẦN "VÉT SẠCH SÀNH SANH": CHI TIẾT NHỎ & TỔNG HỢP CUỐI CÙNG
  // ========================================================================

  // --- 1. HTML & CSS: Các chi tiết định dạng & URL ---
  {
    subject: 'html', type: 'mc',
    q: "Đường dẫn tuyệt đối (Absolute URL) khác đường dẫn tương đối (Relative URL) ở điểm nào?",
    a: "Đường dẫn tuyệt đối chứa đầy đủ thông tin (gồm domain), đường dẫn tương đối chỉ chứa đường dẫn từ thư mục hiện tại.",
    o: ["Đường dẫn tuyệt đối ngắn hơn.", "Đường dẫn tương đối luôn bắt đầu bằng http://.", "Hai loại này giống hệt nhau."],
    e: "Absolute: 'https://google.com/img.jpg'. Relative: '/images/img.jpg' hoặc '../img.jpg'."
  },
  {
    subject: 'html', type: 'mc',
    q: "Có 3 cách nhúng CSS vào HTML. Cách nào có độ ưu tiên cao nhất (nếu cùng thiết lập 1 thuộc tính)?",
    a: "Inline CSS (Nội tuyến - viết trực tiếp trong thẻ)",
    o: ["Internal CSS (Nội bộ - trong thẻ <style>)", "External CSS (Bên ngoài - file .css)", "Cả 3 có độ ưu tiên bằng nhau"],
    e: "Inline Style nằm gần phần tử nhất nên sẽ ghi đè các style khác (trừ khi dùng !important)."
  },
  {
    subject: 'css', type: 'mc',
    q: "Trong Flexbox, thuộc tính `flex-wrap: wrap` có tác dụng gì?",
    a: "Cho phép các phần tử con tự động xuống dòng khi không đủ chỗ trên một hàng.",
    o: ["Ép các phần tử con luôn nằm trên 1 hàng.", "Đảo ngược thứ tự phần tử.", "Căn giữa phần tử."],
    e: "Nếu không có wrap, các phần tử sẽ bị co nhỏ lại (shrink) để nhét vừa 1 hàng, gây xấu giao diện."
  },
  {
    subject: 'css', type: 'text',
    q: "Để liên kết một file CSS bên ngoài (External) vào trang HTML, ta dùng thẻ gì? (Viết tên thẻ)",
    a: "<link>",
    e: "Cú pháp: <link rel='stylesheet' href='style.css'>."
  },

  // --- 2. AI & TRÍ TUỆ NHÂN TẠO: 5 Đặc trưng & Dữ liệu ---
  {
    subject: 'ai', type: 'mc',
    q: "Tài liệu liệt kê 5 đặc trưng cơ bản của AI. Khả năng 'Nhận thức' (Perception) nghĩa là gì?",
    a: "Cảm nhận và hiểu môi trường xung quanh thông qua các cảm biến (Camera, Micro...).",
    o: ["Khả năng suy luận logic.", "Khả năng hiểu ngôn ngữ.", "Khả năng tự sửa lỗi."],
    e: "Giống như con người dùng mắt/tai, AI dùng Camera/Sensor để 'nhìn' và 'nghe' thế giới."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Câu nói 'Garbage In, Garbage Out' (Rác vào, Rác ra) trong AI ám chỉ điều gì?",
    a: "Chất lượng của dữ liệu đầu vào quyết định chất lượng của mô hình AI.",
    o: ["AI tạo ra rác thải điện tử.", "AI có thể tự dọn rác.", "Dữ liệu càng nhiều thì AI càng thông minh (bất kể chất lượng)."],
    e: "Nếu dạy AI bằng dữ liệu sai lệch hoặc định kiến (Rác), nó sẽ đưa ra kết quả sai lệch hoặc định kiến."
  },
  {
    subject: 'ai', type: 'tf',
    q: "ĐÚNG hay SAI: Alan Turing đưa ra 'Phép thử Turing' vào năm 1956?",
    a: "Sai",
    o: ["Đúng"],
    e: "Alan Turing đưa ra phép thử năm **1950**. Năm 1956 là Hội thảo Dartmouth khai sinh thuật ngữ AI."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Khả năng nào của AI cho phép nó nắm bắt thông tin từ dữ liệu để tự điều chỉnh hành vi (VD: Youtube gợi ý video)?",
    a: "Khả năng Học (Learning)",
    o: ["Khả năng Suy luận.", "Khả năng Giải quyết vấn đề.", "Khả năng Hiểu ngôn ngữ."],
    e: "Máy tính không được lập trình cứng nhắc mà tự 'học' từ lịch sử dữ liệu người dùng."
  },

  // --- 3. TỔNG HỢP KIẾN THỨC CỐT LÕI (FINAL CHECK) ---
  {
    subject: 'network', type: 'text',
    q: "Đơn vị dữ liệu (PDU) tại Tầng 1 (Physical) là gì? (Tiếng Anh/Việt đều được)",
    a: "Bit",
    e: "Tầng thấp nhất truyền tải dòng Bit (010101) qua đường truyền vật lý."
  },
  {
    subject: 'sql', type: 'mc',
    q: "Trong SQL, từ khóa nào dùng để sắp xếp kết quả truy vấn?",
    a: "ORDER BY",
    o: ["SORT BY", "GROUP BY", "ARRANGE BY"],
    e: "Mặc định là tăng dần (ASC), muốn giảm dần thêm DESC."
  },
  {
    subject: 'python', type: 'mc',
    q: "Trong Python, cấu trúc `if __name__ == '__main__':` dùng để làm gì?",
    a: "Kiểm tra xem file đang được chạy trực tiếp hay được import vào file khác.",
    o: ["Khai báo hàm main.", "Bắt lỗi chương trình.", "Tạo vòng lặp vô hạn."],
    e: "Giúp ngăn chặn các đoạn mã thực thi ngoài ý muốn khi module được import."
  },
  {
    subject: 'ethics', type: 'mc',
    q: "Mã độc 'Spyware' (Phần mềm gián điệp) có hành vi đặc trưng nào?",
    a: "Âm thầm thu thập thông tin người dùng (gõ phím, lịch sử web) và gửi về cho hacker.",
    o: ["Mã hóa dữ liệu tống tiền.", "Làm chậm máy tính.", "Hiện quảng cáo liên tục."],
    e: "Khác với Adware (quảng cáo) hay Ransomware (tống tiền), Spyware hoạt động lén lút để đánh cắp thông tin."
  },
  // ========================================================================
  // PHẦN "VÉT CUỐI CÙNG" (PHẦN 2): CHI TIẾT ẨN & VÍ DỤ CỤ THỂ
  // ========================================================================

  // --- 1. CSS & LAYOUT: Chi tiết kỹ thuật từ file [tong_tin_html_css.txt] ---
  {
    subject: 'css', type: 'mc',
    q: "Trong đoạn mã mẫu, tại sao tác giả lại thiết lập `width: 33.33%` cho các ô con?",
    a: "Để chia giao diện thành 3 cột bằng nhau (100% / 3 ≈ 33.33%).",
    o: ["Để tạo khoảng trống cho lề.", "Đây là con số ngẫu nhiên.", "Để tương thích với màn hình điện thoại."],
    e: "Đây là cách chia layout lưới (grid) cơ bản khi chưa dùng Grid System hiện đại."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính `box-sizing: border-box` được sử dụng với mục đích quan trọng gì?",
    a: "Đảm bảo kích thước phần tử bao gồm cả padding và border, giúp layout không bị vỡ.",
    o: ["Tạo đường viền cho hộp.", "Làm cho hộp nhỏ lại.", "Căn giữa nội dung trong hộp."],
    e: "Nếu không có dòng này, khi thêm padding, cái hộp sẽ phình to ra và đẩy các hộp khác xuống dòng."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Thuộc tính `display: flex` cần được đặt ở phần tử CON (.block_3) để nó tự sắp xếp?",
    a: "Sai",
    o: ["Đúng"],
    e: "Sai! `display: flex` là 'câu thần chú' phải đặt ở phần tử CHA (.Row) để điều khiển các con bên trong."
  },
  {
    subject: 'css', type: 'mc',
    q: "Trước khi có Flexbox, các sách giáo khoa cũ thường dùng thuộc tính nào để xếp các thẻ div nằm ngang?",
    a: "float: left",
    o: ["position: absolute", "display: inline", "overflow: hidden"],
    e: "Kỹ thuật 'float' rất phổ biến ngày xưa nhưng gây nhiều lỗi (sập layout) nếu không xử lý kỹ (clearfix)."
  },

  // --- 2. AI & TRÍ TUỆ NHÂN TẠO: Ví dụ & Cơ chế [tong_tin_ai_and_mang_may_tính.txt] ---
  {
    subject: 'ai', type: 'mc',
    q: "Tài liệu lấy ví dụ nào để minh họa sự khác biệt giữa AI Phân biệt (Cũ) và AI Tạo sinh (Mới)?",
    a: "AI Phân biệt: Nhận diện tranh Van Gogh; AI Tạo sinh: Vẽ tranh phong cách Van Gogh.",
    o: ["AI Phân biệt: Lái xe; AI Tạo sinh: Làm thơ.", "AI Phân biệt: Chơi cờ; AI Tạo sinh: Chat.", "Không có ví dụ nào."],
    e: "Sự khác biệt nằm ở: Một bên là 'Phân loại' cái đã có, một bên là 'Sáng tạo' ra cái mới."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Theo tài liệu, cơ chế hoạt động cốt lõi của ChatGPT thực chất là gì?",
    a: "Một cỗ máy dự đoán từ tiếp theo (Next Token Prediction) dựa trên xác suất.",
    o: ["Nó thực sự hiểu ngôn ngữ như con người.", "Nó tra cứu Google để trả lời.", "Nó sao chép câu trả lời có sẵn."],
    e: "Khi bạn viết 'Hôm nay trời...', nó tính toán xem từ 'đẹp' hay 'mưa' có xác suất xuất hiện cao nhất để điền vào."
  },
  {
    subject: 'ai', type: 'text',
    q: "Nếu Thuật toán là động cơ của AI, thì cái gì được ví như 'Xăng' (nhiên liệu)? (Tiếng Việt/Anh)",
    a: "Dữ liệu",
    e: "Hoặc 'Data'. Không có dữ liệu khổng lồ (Big Data) để học, AI sẽ không thể hoạt động thông minh được."
  },

  // --- 3. URL & LIÊN KẾT: Chi tiết nhỏ ---
  {
    subject: 'html', type: 'mc',
    q: "Đường dẫn tương đối (Relative URL) thường được dùng trong trường hợp nào?",
    a: "Khi liên kết đến các file nằm trong cùng một dự án/thư mục web (VD: ảnh, trang con).",
    o: ["Khi liên kết đến trang web của người khác (Google, Facebook).", "Khi gửi email.", "Khi in ra giấy."],
    e: "Nó gọn hơn (VD: 'img.jpg') và không bị lỗi khi đổi tên miền website."
  },
  {
    subject: 'html', type: 'text',
    q: "Thuộc tính `target` trong thẻ `<a>` nhận giá trị gì để mở liên kết ngay tại trang hiện tại (mặc định)? (Bắt đầu bằng dấu _)",
    a: "_self",
    e: "Trái ngược với `_blank` (mở tab mới), `_self` là hành vi mặc định của trình duyệt."
  },
  // ========================================================================
  // PHẦN "VÉT CUỐI CÙNG" (PHẦN 3): CÁC CÂU HỎI HÓC BÚA NHẤT
  // ========================================================================

  // --- 1. CSS NÂNG CAO: Độ ưu tiên & Box Model [tong_tin_html_css.txt] ---
  {
    subject: 'css', type: 'mc',
    q: "Nếu một thẻ <div> có `width: 200px` và `padding: 20px` nhưng KHÔNG có `box-sizing: border-box`, thì tổng chiều rộng thực tế của nó là bao nhiêu?",
    a: "240px",
    o: ["200px", "220px", "160px"],
    e: "Chiều rộng thực = width (200) + padding-left (20) + padding-right (20) = 240px. Đây là lý do ta luôn cần `box-sizing: border-box` để dễ tính toán."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thứ tự ưu tiên (Specificity) nào sau đây là chính xác nhất khi áp dụng CSS?",
    a: "Style nội tuyến (Inline) > ID > Class > Thẻ (Tag)",
    o: ["ID > Class > Style nội tuyến > Thẻ", "!important > Thẻ > ID > Class", "Class > ID > Thẻ > Inline"],
    e: "Inline style (`style='...'`) luôn thắng ID, ID thắng Class, và Class thắng tên thẻ."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Thẻ `<span>` là phần tử dạng khối (block), có thể chỉnh chiều rộng và chiều cao?",
    a: "Sai",
    o: ["Đúng"],
    e: "`<span>` là phần tử nội tuyến (inline), nó chỉ chiếm diện tích vừa đủ nội dung và KHÔNG nhận width/height."
  },

  // --- 2. MẠNG MÁY TÍNH: Các giao thức & Cơ chế [tong_tin_ai_and_mang_may_tính.txt] ---
  {
    subject: 'network', type: 'mc',
    q: "Giao thức nào cho phép ánh xạ từ địa chỉ IP (Lớp 3) sang địa chỉ MAC (Lớp 2)?",
    a: "ARP (Address Resolution Protocol)",
    o: ["DNS", "DHCP", "ICMP"],
    e: "Khi biết IP đích nhưng chưa biết MAC để đóng gói Frame, máy tính sẽ gửi gói tin ARP Broadcast để hỏi."
  },
  {
    subject: 'network', type: 'text',
    q: "Để kiểm tra xem máy tính có kết nối được tới Google hay không, ta thường dùng lệnh gì trong Command Prompt? (Viết lệnh)",
    a: "ping google.com",
    e: "Lệnh `ping` sử dụng giao thức ICMP để đo độ trễ và kiểm tra kết nối."
  },
  {
    subject: 'network', type: 'mc',
    q: "Cổng (Port) mặc định cho giao thức web không bảo mật (HTTP) là bao nhiêu?",
    a: "80",
    o: ["443", "8080", "21"],
    e: "HTTP chạy trên cổng 80, còn HTTPS (bảo mật) chạy trên cổng 443."
  },

  // --- 3. AI & XÃ HỘI: Đạo đức & Ứng dụng [tong_tin_ai_and_mang_may_tính.txt] ---
  {
    subject: 'ai', type: 'mc',
    q: "Vấn đề 'Thiên kiến' (Bias) trong AI thường bắt nguồn từ đâu?",
    a: "Do dữ liệu huấn luyện đầu vào không công bằng hoặc chứa định kiến xã hội.",
    o: ["Do lỗi lập trình của kỹ sư.", "Do AI tự phát sinh ý muốn xấu.", "Do phần cứng máy tính bị hỏng."],
    e: "Ví dụ: Nếu dữ liệu tuyển dụng toàn nam giới, AI sẽ học cách loại bỏ hồ sơ nữ giới (Garbage In, Garbage Out)."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Trong y tế, AI chẩn đoán bệnh dựa trên hình ảnh X-quang là ví dụ của khả năng nào?",
    a: "Khả năng Nhận thức (Computer Vision) và Suy luận.",
    o: ["Khả năng Sáng tạo.", "Khả năng Tự động hóa.", "Khả năng Giao tiếp."],
    e: "AI 'nhìn' (nhận thức) ảnh chụp và 'phân tích' (suy luận) để tìm ra dấu hiệu bệnh."
  },

  // --- 4. TỔNG HỢP KIẾN THỨC CHUNG ---
  {
    subject: 'html', type: 'text',
    q: "Thẻ nào trong HTML dùng để tạo danh sách KHÔNG có thứ tự (các dấu chấm tròn)? (Viết tên thẻ)",
    a: "<ul>",
    e: "<ul> (Unordered List) kết hợp với <li> tạo ra danh sách chấm tròn. <ol> tạo ra số thứ tự."
  },
  {
    subject: 'network', type: 'mc',
    q: "Mạng LAN (Local Area Network) khác mạng WAN (Wide Area Network) ở điểm cốt lõi nào?",
    a: "Phạm vi địa lý (LAN nhỏ hẹp, WAN rộng lớn toàn cầu).",
    o: ["Tốc độ (LAN luôn chậm hơn WAN).", "Thiết bị (LAN không dùng Router).", "Bảo mật (WAN an toàn hơn)."],
    e: "LAN gói gọn trong tòa nhà/phòng, WAN kết nối các thành phố/quốc gia (Internet là mạng WAN lớn nhất)."
  },
  {
    subject: 'ai', type: 'tf',
    q: "ĐÚNG hay SAI: Trí tuệ nhân tạo (AI) hiện nay đã có ý thức và cảm xúc giống hệt con người?",
    a: "Sai",
    o: ["Đúng"],
    e: "AI hiện tại (kể cả ChatGPT) chỉ là các thuật toán thống kê và dự đoán, chưa có ý thức tự chủ hay cảm xúc thực sự."
  },
  // ========================================================================
  // PHẦN "QUÉT SẠCH LẦN CUỐI": CHI TIẾT SỐ LIỆU & THÔNG SỐ KỸ THUẬT
  // ========================================================================

  // --- 1. AI & LỊCH SỬ CÔNG NGHỆ (Số liệu cụ thể) ---
  {
    subject: 'ai', type: 'mc',
    q: "Dịch vụ Google Dịch (Google Translate) chính thức ra mắt vào thời gian nào?",
    a: "Tháng 4 năm 2006",
    o: ["Năm 2010", "Năm 2000", "Năm 1998"],
    e: "Đây là một cột mốc quan trọng trong ứng dụng AI xử lý ngôn ngữ tự nhiên."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Robot hình người Asimo của hãng Honda xuất hiện lần đầu tiên vào năm nào?",
    a: "Năm 1986",
    o: ["Năm 2000", "Năm 1990", "Năm 2010"],
    e: "Asimo là biểu tượng cho kỹ thuật điều khiển robot hình người (Humanoid)."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Trong cấu trúc Mạng nơ-ron (Neural Network), lớp nào chịu trách nhiệm xử lý tính toán chính và tạo ra khái niệm 'Hộp đen'?",
    a: "Lớp ẩn (Hidden Layers)",
    o: ["Lớp đầu vào (Input Layer)", "Lớp đầu ra (Output Layer)", "Lớp tương tác"],
    e: "Các lớp ẩn xử lý ma thuật tính toán phức tạp mà con người khó giải thích được."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Cách học nào của AI được ví như việc dạy trẻ con bằng 'Cây gậy và Củ cà rốt' (Thưởng và Phạt)?",
    a: "Học tăng cường (Reinforcement Learning)",
    o: ["Học có giám sát (Supervised Learning)", "Học không giám sát (Unsupervised Learning)", "Học vẹt"],
    e: "AI tự chơi, nếu làm đúng được cộng điểm (thưởng), làm sai bị trừ điểm (phạt) để tự rút ra chiến thuật ."
  },

  // --- 2. MẠNG MÁY TÍNH: Các cổng (Port) & Chi tiết Topology ---
  {
    subject: 'network', type: 'mc',
    q: "Cổng (Port) số 22 được sử dụng cho giao thức bảo mật nào?",
    a: "SSH (Secure Shell) & SFTP",
    o: ["FTP (21)", "Telnet (23)", "HTTP (80)"],
    e: "Port 22 dùng để điều khiển máy chủ từ xa an toàn, thay thế cho Telnet (Port 23) kém bảo mật."
  },
  {
    subject: 'network', type: 'mc',
    q: "Trong cấu trúc mạng hình Vòng (Ring Topology), cơ chế nào giúp tránh việc các máy tranh nhau truyền dữ liệu gây tắc nghẽn?",
    a: "Thẻ bài (Token Ring)",
    o: ["Cờ hiệu (Flag)", "Gói tin ưu tiên", "Bộ định tuyến"],
    e: "Chỉ máy nào giữ 'Thẻ bài' (Token) mới được quyền nói (gửi dữ liệu) ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Giao thức RDP (Remote Desktop Protocol) của Microsoft chạy mặc định trên cổng nào?",
    a: "3389",
    o: ["443", "8080", "21"],
    e: "Đây là giao thức cho phép điều khiển máy tính từ xa có giao diện đồ họa."
  },
  {
    subject: 'network', type: 'text',
    q: "Lệnh nào dùng để xem bảng địa chỉ MAC (ARP Table) trên máy tính? (Viết lệnh)",
    a: "arp -a",
    e: "Lệnh này hiển thị danh sách các IP và địa chỉ MAC tương ứng đã được máy tính ghi nhớ."
  },

  // --- 3. CSS: Hiệu ứng & Thuộc tính chi tiết ---
  {
    subject: 'css', type: 'mc',
    q: "Cú pháp chuẩn của thuộc tính `box-shadow` (đổ bóng) theo thứ tự là gì?",
    a: "offset-x offset-y blur spread color inset",
    o: ["color blur spread offset-x offset-y", "blur spread color offset-x offset-y", "inset color blur offset-x offset-y"],
    e: "Tương ứng: Lệch ngang - Lệch dọc - Độ mờ - Độ lan - Màu - Bóng trong."
  },
  {
    subject: 'css', type: 'mc',
    q: "Giá trị nào của `border-style` tạo hiệu ứng đường viền 'Khắc chìm' (Rãnh)?",
    a: "groove",
    o: ["ridge (Gờ nổi)", "inset (Lõm toàn bộ)", "outset (Lồi toàn bộ)"],
    e: "Groove tạo cảm giác đường viền được khắc sâu xuống bề mặt."
  },
  {
    subject: 'css', type: 'mc',
    q: "Pseudo-element `::selection` cho phép thay đổi những thuộc tính CSS nào khi người dùng bôi đen văn bản?",
    a: "Chỉ color, background-color, text-shadow",
    o: ["Tất cả thuộc tính (font-size, margin...)", "Chỉ background-color", "Chỉ font-weight"],
    e: "Trình duyệt giới hạn chỉ cho đổi màu để tránh vỡ bố cục khi bôi đen."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính `font-variant: small-caps` có tác dụng gì?",
    a: "Biến chữ thường thành CHỮ IN HOA nhưng kích thước nhỏ hơn chữ hoa thật.",
    o: ["Biến chữ thành in hoa hoàn toàn (giống uppercase).", "Làm chữ nhỏ lại.", "Tạo chữ cái đầu to."],
    e: "Khác với `text-transform: uppercase` (hoa thật), `small-caps` là kiểu chữ hoa nghệ thuật."
  },

  // --- 4. TỔNG HỢP KIẾN THỨC CỐT LÕI (REVIEW) ---
  {
    subject: 'network', type: 'mc',
    q: "Mục đích chính của tấn công 'Phishing' (Lừa đảo) là gì?",
    a: "Đánh lừa người dùng tự cung cấp thông tin nhạy cảm (mật khẩu, thẻ tín dụng).",
    o: ["Làm sập hệ thống mạng.", "Lây nhiễm virus phần cứng.", "Nghe lén đường truyền."],
    e: "Nó tấn công vào yếu tố 'Con người' chứ không phải kỹ thuật máy móc ."
  },
  {
    subject: 'html', type: 'text',
    q: "Thẻ HTML nào dùng để hiển thị các phím bấm bàn phím (Ví dụ: Ctrl + C)? (Viết tên thẻ)",
    a: "<kbd>",
    e: "<kbd> (Keyboard Input) hiển thị văn bản dạng phím bấm."
  },
  {
    subject: 'css', type: 'mc',
    q: "Đơn vị `em` trong CSS được tính dựa trên cái gì?",
    a: "Kích thước font chữ của phần tử CHA trực tiếp.",
    o: ["Kích thước font chữ của phần tử gốc (html).", "Kích thước màn hình.", "Pixel cố định."],
    e: "`rem` mới tính theo html (root), còn `em` tính theo cha."
  },
  // ========================================================================
  // PHẦN BỔ SUNG: HTML SEMANTIC, CSS BEM & QUẢN TRỊ MẠNG CHI TIẾT
  // ========================================================================

  // --- 1. HTML: Các thẻ ngữ nghĩa & Trích dẫn (Semantic Tags)  ---
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <cite> trong HTML được sử dụng đúng nhất cho trường hợp nào?",
    a: "Tên của một tác phẩm sáng tạo (Tên sách, tên phim, tên bài hát).",
    o: ["Tên tác giả (Người viết).", "Trích dẫn một đoạn văn dài.", "Đánh dấu từ khóa quan trọng."],
    e: "Ví dụ: <cite>Harry Potter</cite>. Không dùng cho tên người (như J.K. Rowling) ."
  },
  {
    subject: 'html', type: 'mc',
    q: "Sự khác biệt giữa thẻ <q> và <blockquote> là gì?",
    a: "<q> dùng cho trích dẫn ngắn trong dòng (tự thêm ngoặc kép); <blockquote> dùng cho trích dẫn dài tách thành khối riêng.",
    o: ["<q> là thẻ cũ, <blockquote> là thẻ mới.", "<blockquote> dùng cho thơ, <q> dùng cho văn xuôi.", "Hai thẻ này giống hệt nhau."],
    e: "<q> (quote) là inline, <blockquote> là block element."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <samp> (Sample) dùng để đại diện cho nội dung gì?",
    a: "Kết quả đầu ra (Output) từ một chương trình máy tính.",
    o: ["Đoạn mã lệnh (Input).", "Biến số toán học.", "Phím tắt bàn phím."],
    e: "Ví dụ: Dòng thông báo 'Error 404: Not Found' nên đặt trong thẻ <samp>."
  },
  {
    subject: 'html', type: 'text',
    q: "Thẻ nào dùng để đánh dấu một nội dung MỚI được thêm vào tài liệu (thường có gạch chân)? (Viết tên thẻ)",
    a: "<ins>",
    e: "<ins> (Insert) thường đi cặp với <del> (Delete - nội dung bị xóa) để so sánh phiên bản ."
  },

  // --- 2. CSS: Quy tắc đặt tên & Selector nâng cao  ---
  {
    subject: 'css', type: 'mc',
    q: "Theo phương pháp đặt tên BEM (Block - Element - Modifier), class `.card__title` có ý nghĩa gì?",
    a: "Là một thành phần con (Element) nằm trong khối Card.",
    o: ["Là một biến thể (Modifier) của Card.", "Là khối chính (Block).", "Là một ID."],
    e: "Quy tắc BEM: Block (card) + Element (__title) + Modifier (--red)."
  },
  {
    subject: 'css', type: 'mc',
    q: "Tại sao tài liệu khuyên KHÔNG nên dùng ID (#) để định dạng CSS (Style)?",
    a: "Vì ID có độ ưu tiên quá cao, rất khó ghi đè hoặc sửa chữa sau này.",
    o: ["Vì ID làm chậm trang web.", "Vì ID không hỗ trợ màu sắc.", "Vì trình duyệt không hiểu ID."],
    e: "Nên dùng Class để style vì độ linh hoạt cao hơn. ID dành cho Javascript hoặc Neo liên kết."
  },
  {
    subject: 'css', type: 'mc',
    q: "Selector `em + strong` (Anh em liền kề) sẽ chọn phần tử nào?",
    a: "Thẻ <strong> nằm NGAY SAU thẻ <em> (liền kề nhau).",
    o: ["Mọi thẻ <strong> nằm sau <em>.", "Thẻ <strong> nằm bên trong <em>.", "Thẻ <em> nằm sau <strong>."],
    e: "Dấu cộng (+) đòi hỏi sự liền kề. Dấu ngã (~) thì lỏng lẻo hơn (nằm sau là được) ."
  },

  // --- 3. QUẢN TRỊ MẠNG & BẢO MẬT: Chi tiết cấu hình  ---
  {
    subject: 'network', type: 'mc',
    q: "Khi muốn chia sẻ file trong mạng LAN (SMB), tại sao phải chuyển Network Profile sang 'Private'?",
    a: "Để Windows mở các cổng chia sẻ (như 445) và cho phép các máy khác tìm thấy mình.",
    o: ["Để tăng tốc độ mạng.", "Để ẩn danh tính.", "Để chặn virus."],
    e: "Ở chế độ Public, Windows Firewall sẽ đóng kín cổng để bảo vệ bạn nơi công cộng ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Firewall thế hệ 2 (Stateful Inspection) thông minh hơn thế hệ 1 ở điểm nào?",
    a: "Nó ghi nhớ trạng thái kết nối (biết gói tin này là phản hồi hợp lệ hay là kẻ lạ mặt đột nhập).",
    o: ["Nó quét được virus.", "Nó chặn được SQL Injection.", "Nó dùng AI."],
    e: "Nó biết 'mở cửa' cho gói tin trả về từ Youtube vì trước đó bạn đã gửi yêu cầu đi ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Giao thức IMAP ưu việt hơn POP3 ở điểm nào khi check mail trên nhiều thiết bị?",
    a: "IMAP đồng bộ trạng thái thư (đã đọc/xóa) trên tất cả thiết bị; POP3 tải về và xóa trên server.",
    o: ["IMAP gửi thư nhanh hơn.", "IMAP không cần mật khẩu.", "IMAP tốn ít dung lượng hơn."],
    e: "Dùng POP3 thì điện thoại đọc rồi, về máy tính vẫn thấy thư chưa đọc (rất phiền) ."
  },
  {
    subject: 'network', type: 'text',
    q: "Để biến một thư mục chia sẻ trên mạng thành ổ đĩa ảo (ví dụ ổ Z:) trên máy tính, ta dùng tính năng gì? (Tiếng Anh)",
    a: "Map Network Drive",
    e: "Giúp truy cập thư mục mạng nhanh chóng như một ổ cứng gắn trong."
  },

  // --- 4. CÁC CHI TIẾT NHỎ KHÁC (Vét sạch) ---
  {
    subject: 'html', type: 'text',
    q: "Thẻ <var> trong HTML dùng để đại diện cho cái gì? (Tiếng Việt: Biến...)",
    a: "Biến số",
    e: "Dùng trong công thức toán học hoặc lập trình (ví dụ: x, y, z) ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Giá trị `display: none` khác `visibility: hidden` ở điểm nào?",
    a: "`display: none` xóa hẳn phần tử khỏi bố cục (không chiếm chỗ); `visibility: hidden` chỉ làm tàng hình (vẫn chiếm chỗ).",
    o: ["`display: none` làm mờ phần tử.", "`visibility: hidden` xóa hẳn phần tử.", "Giống hệt nhau."],
    e: "Đây là câu hỏi phỏng vấn kinh điển về CSS Layout."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Trong AI, thuật ngữ 'Fine-tune' (Tinh chỉnh) nghĩa là gì?",
    a: "Lấy một mô hình đã được huấn luyện sẵn (Pre-trained) và dạy thêm cho nó dữ liệu chuyên sâu của một lĩnh vực cụ thể.",
    o: ["Xóa bộ nhớ AI làm lại từ đầu.", "Tăng tốc độ phần cứng.", "Điều chỉnh màu sắc màn hình."],
    e: "Ví dụ: Dạy ChatGPT (đã giỏi tiếng Anh) học thêm tiếng Việt chuyên ngành Y khoa."
  },
  // ========================================================================
  // PHẦN "QUÉT SÂU TOÀN DIỆN": CHI TIẾT SỐ LIỆU, BẢNG BIỂU & CÚ PHÁP
  // ========================================================================

  // --- 1. MẠNG MÁY TÍNH: Bảng các Cổng (Port) & Giao thức  ---
  {
    subject: 'network', type: 'mc',
    q: "Giao thức FTP (File Transfer Protocol) sử dụng cặp cổng nào để hoạt động?",
    a: "20 và 21",
    o: ["21 và 22", "80 và 8080", "23 và 25"],
    e: "Port 21 dùng để điều khiển (lệnh), Port 20 dùng để truyền dữ liệu thực tế ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Để gửi email từ máy khách lên máy chủ, ta dùng giao thức SMTP chạy trên cổng nào?",
    a: "25 hoặc 587",
    o: ["110 hoặc 143", "80 hoặc 443", "22 hoặc 23"],
    e: "SMTP (Simple Mail Transfer Protocol) chuyên dùng để GỬI thư."
  },
  {
    subject: 'network', type: 'mc',
    q: "Giao thức Telnet (Port 23) hiện nay ít được sử dụng vì lý do gì?",
    a: "Nó không mã hóa dữ liệu (truyền text trần), dễ bị nghe lén mật khẩu.",
    o: ["Nó quá chậm.", "Nó không hỗ trợ Windows.", "Nó chỉ dùng cho file ảnh."],
    e: "SSH (Port 22) đã thay thế Telnet để quản trị từ xa an toàn hơn ."
  },
  {
    subject: 'network', type: 'mc',
    q: "DHCP Server và DHCP Client sử dụng cặp cổng UDP nào để giao tiếp?",
    a: "Server dùng 67, Client dùng 68",
    o: ["Server 68, Client 67", "Cả hai dùng 67", "Cả hai dùng 53"],
    e: "Đây là chi tiết kỹ thuật nhỏ nhưng quan trọng khi cấu hình tường lửa cho DHCP."
  },

  // --- 2. AI & LỊCH SỬ: Các cột mốc & Ứng dụng cụ thể  ---
  {
    subject: 'ai', type: 'mc',
    q: "Alan Turing đã đề xuất 'Phép thử Turing' (Turing Test) vào năm nào?",
    a: "Năm 1950",
    o: ["Năm 1956", "Năm 1960", "Năm 1945"],
    e: "Phép thử này nhằm trả lời câu hỏi: 'Máy tính có thể suy nghĩ không?'."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Hệ chuyên gia MYCIN (1972) được thiết kế để chẩn đoán loại bệnh nào?",
    a: "Nhiễm trùng máu và đề xuất kháng sinh.",
    o: ["Ung thư phổi.", "Bệnh tim mạch.", "Chấn thương chỉnh hình."],
    e: "MYCIN sử dụng khoảng 600 luật suy diễn để đưa ra phác đồ điều trị."
  },
  {
    subject: 'ai', type: 'text',
    q: "Tên của chú Robot hình người nổi tiếng do hãng Honda ra mắt năm 1986? (Viết tên)",
    a: "Asimo",
    e: "Asimo có khả năng đi bằng hai chân, nhận diện khuôn mặt và giọng nói ."
  },

  // --- 3. HTML: Form & Input nâng cao  ---
  {
    subject: 'html', type: 'mc',
    q: "Thuộc tính `autocomplete` trong thẻ <form> có giá trị mặc định là gì?",
    a: "on (Bật gợi ý)",
    o: ["off (Tắt gợi ý)", "hidden", "new-password"],
    e: "Mặc định trình duyệt sẽ lưu và gợi ý những gì bạn từng nhập. Muốn tắt phải set `autocomplete='off'`."
  },
  {
    subject: 'html', type: 'mc',
    q: "Để tạo một danh sách gợi ý (khi gõ vào hiện ra list) cho ô input, ta dùng thẻ nào?",
    a: "<datalist>",
    o: ["<select>", "<option>", "<list>"],
    e: "<datalist> kết hợp với input qua thuộc tính `list` giúp tạo gợi ý nhưng vẫn cho phép gõ tự do."
  },
  {
    subject: 'html', type: 'text',
    q: "Để một ô input trở thành bắt buộc (không được để trống khi gửi), ta thêm thuộc tính gì? (Tiếng Anh)",
    a: "required",
    e: "Trình duyệt sẽ tự động báo lỗi nếu người dùng quên nhập."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <textarea> dùng để nhập văn bản nhiều dòng. Hai thuộc tính nào dùng để chỉnh kích thước của nó?",
    a: "rows (số dòng) và cols (số cột)",
    o: ["width và height", "x và y", "size và length"],
    e: "Ví dụ: <textarea rows='4' cols='50'>."
  },

  // --- 4. CSS: Typography & Màu sắc chi tiết  ---
  {
    subject: 'css', type: 'mc',
    q: "Trong thuộc tính `font-weight`, giá trị số 400 tương đương với từ khóa nào?",
    a: "normal",
    o: ["bold (700)", "thin (100)", "medium (500)"],
    e: "400 là độ đậm bình thường của chữ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Màu `Fuchsia` (Hồng cánh sen) có mã Hex là #FF00FF. Mã RGB của nó là gì?",
    a: "rgb(255, 0, 255)",
    o: ["rgb(255, 255, 0)", "rgb(0, 255, 255)", "rgb(128, 0, 128)"],
    e: "FF (Đỏ) + 00 (Xanh lá) + FF (Xanh dương) = Hồng cánh sen."
  },
  {
    subject: 'css', type: 'mc',
    q: "Đơn vị đo `pt` (point) thường dùng trong in ấn, quy đổi ra inch như thế nào?",
    a: "1 pt = 1/72 inch",
    o: ["1 pt = 1/96 inch (px)", "1 pt = 1 inch", "1 pt = 1/10 inch"],
    e: "Trong khi đó 1px = 1/96 inch."
  },

  // --- 5. QUẢN TRỊ MẠNG & AN NINH  ---
  {
    subject: 'network', type: 'mc',
    q: "Tấn công 'ARP Spoofing' (Đầu độc ARP) thường dẫn đến hậu quả gì?",
    a: "Hacker chặn giữa (Man-in-the-Middle) để nghe lén hoặc sửa đổi dữ liệu.",
    o: ["Hacker làm cháy máy tính.", "Hacker xóa bios.", "Hacker làm hỏng màn hình."],
    e: "Hacker lừa máy nạn nhân rằng 'Tôi là Router', khiến nạn nhân gửi hết dữ liệu cho hacker ."
  },
  {
    subject: 'network', type: 'text',
    q: "Lệnh nào dùng để kiểm tra đường đi của gói tin qua các Router? (Tiếng Anh)",
    a: "traceroute",
    e: "Trên Windows lệnh là `tracert`. Nó dùng ICMP để liệt kê các trạm trung chuyển."
  },
  {
    subject: 'network', type: 'mc',
    q: "Trong mô hình bảo mật, 'IPSec' (Internet Protocol Security) hoạt động tại tầng nào?",
    a: "Tầng 3: Network (Tầng Mạng)",
    o: ["Tầng 7: Application", "Tầng 2: Data Link", "Tầng 1: Physical"],
    e: "IPSec mã hóa dữ liệu ngay tại tầng Network, là nền tảng của VPN ."
  },

  // --- 6. CÁC CHI TIẾT "NHỎ NHƯNG CÓ VÕ" KHÁC ---
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <pre> trong HTML có tác dụng đặc biệt gì?",
    a: "Giữ nguyên định dạng văn bản (khoảng trắng, xuống dòng) y như trong code.",
    o: ["Làm chữ in đậm.", "Làm chữ nghiêng.", "Tạo chữ chạy (marquee)."],
    e: "Mặc định HTML sẽ gộp nhiều dấu cách thành 1, nhưng <pre> sẽ hiển thị chính xác những gì bạn gõ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính `text-transform: uppercase` khác gì với gõ chữ in hoa trực tiếp?",
    a: "Nó chỉ thay đổi cách hiển thị (bề ngoài), còn dữ liệu thực tế vẫn là chữ thường (copy paste sẽ thấy).",
    o: ["Nó thay đổi dữ liệu gốc.", "Nó làm file nặng hơn.", "Không khác gì nhau."],
    e: "Dùng CSS để định dạng hiển thị luôn tốt hơn là sửa nội dung gốc."
  },
  {
    subject: 'network', type: 'mc',
    q: "Địa chỉ IPv6 có độ dài bao nhiêu bit?",
    a: "128 bit",
    o: ["32 bit (IPv4)", "64 bit", "256 bit"],
    e: "IPv6 ra đời để giải quyết vấn đề cạn kiệt địa chỉ của IPv4 (32 bit)."
  },
  // ========================================================================
  // PHẦN "VÉT SẠCH LẦN CUỐI": CHI TIẾT KỸ THUẬT & CÚ PHÁP CODE
  // ========================================================================

  // --- 1. CSS: Cú pháp & Hiệu ứng nâng cao  ---
  {
    subject: 'css', type: 'mc',
    q: "Cú pháp chuẩn của thuộc tính `box-shadow` theo thứ tự là gì?",
    a: "offset-x offset-y blur spread color inset",
    o: ["color blur spread offset-x offset-y", "blur spread color offset-x offset-y", "inset color blur offset-x offset-y"],
    e: "Tương ứng: Lệch ngang - Lệch dọc - Độ mờ - Độ lan - Màu - Bóng trong ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Giá trị nào của `border-style` tạo hiệu ứng đường viền 'Khắc chìm' (Rãnh) xuống bề mặt?",
    a: "groove",
    o: ["ridge (Gờ nổi)", "inset (Lõm toàn bộ khối)", "outset (Lồi toàn bộ khối)"],
    e: "`groove` tạo cảm giác đường viền được khắc sâu xuống, ngược lại với `ridge` là gờ nổi lên ."
  },
  {
    subject: 'css', type: 'mc',
    q: "Thuộc tính `letter-spacing` và `word-spacing` khác nhau thế nào?",
    a: "`letter-spacing` chỉnh khoảng cách giữa các KÝ TỰ (chữ cái); `word-spacing` chỉnh khoảng cách giữa các TỪ.",
    o: ["`letter-spacing` dùng cho tiếng Anh, `word-spacing` dùng cho tiếng Việt.", "Hai thuộc tính này là một.", "`word-spacing` chỉnh khoảng cách dòng."],
    e: "`letter-spacing` làm chữ t h ư a ra; `word-spacing` làm các từ   xa   nhau   hơn ."
  },
  {
    subject: 'css', type: 'text',
    q: "Để thụt lề dòng đầu tiên của đoạn văn ngược ra ngoài (Hanging Indent), ta dùng giá trị `text-indent` như thế nào? (Tiếng Việt: Giá trị...)",
    a: "Giá trị âm",
    e: "Ví dụ `text-indent: -20px;` sẽ kéo dòng đầu tiên thụt lùi ra bên trái."
  },

  // --- 2. HTML: Các thẻ & Thuộc tính ít gặp  ---
  {
    subject: 'html', type: 'mc',
    q: "Sự khác biệt giữa thuộc tính `readonly` và `disabled` trong thẻ <input>?",
    a: "`readonly` chỉ cho xem (vẫn gửi dữ liệu đi được); `disabled` vô hiệu hóa hoàn toàn (KHÔNG gửi dữ liệu đi).",
    o: ["`readonly` làm mờ ô input.", "`disabled` vẫn cho phép copy văn bản.", "Hai thuộc tính giống hệt nhau."],
    e: "Nếu dùng `disabled`, dữ liệu trong ô đó sẽ bị server bỏ qua khi submit form ."
  },
  {
    subject: 'html', type: 'text',
    q: "Thẻ HTML nào chuyên dùng để hiển thị các phím bấm bàn phím (Ví dụ: Ctrl + C)? (Viết tên thẻ)",
    a: "<kbd>",
    e: "<kbd> (Keyboard Input) thường hiển thị font monospace để mô phỏng phím bấm."
  },
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <pre> có tác dụng đặc biệt gì so với thẻ <p>?",
    a: "Giữ nguyên định dạng văn bản gốc (bao gồm khoảng trắng và xuống dòng).",
    o: ["Làm chữ in đậm.", "Tự động tô màu code.", "Tạo chữ chạy marquee."],
    e: "HTML thường gộp nhiều dấu cách thành 1, nhưng <pre> (Preformatted) sẽ hiển thị y hệt những gì bạn gõ ."
  },

  // --- 3. MẠNG MÁY TÍNH: Chi tiết Giao thức & Cổng  ---
  {
    subject: 'network', type: 'mc',
    q: "Giao thức FTP (File Transfer Protocol) sử dụng cặp cổng nào để hoạt động?",
    a: "20 và 21",
    o: ["21 và 22", "80 và 8080", "23 và 25"],
    e: "Port 21 dùng để điều khiển (gửi lệnh), Port 20 dùng để truyền dữ liệu thực tế (data) ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Trong các giao thức nhận email, giao thức nào tải thư về máy và XÓA luôn trên server (mặc định)?",
    a: "POP3",
    o: ["IMAP", "SMTP", "HTTP"],
    e: "POP3 thích hợp nếu bạn chỉ dùng 1 thiết bị. IMAP thì đồng bộ (giữ lại trên server) ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Lệnh `traceroute` (hoặc `tracert` trên Windows) sử dụng giao thức nào để dò đường đi qua các Router?",
    a: "ICMP",
    o: ["TCP", "UDP", "HTTP"],
    e: "Nó gửi các gói tin ICMP với TTL tăng dần để xác định từng trạm trung chuyển."
  },
  {
    subject: 'network', type: 'text',
    q: "Giao thức nào giúp chuyển đổi địa chỉ IP (Phần mềm) sang địa chỉ MAC (Phần cứng)? (Viết tắt)",
    a: "ARP",
    e: "Address Resolution Protocol là cầu nối quan trọng giữa Lớp 2 và Lớp 3."
  },

  // --- 4. AI & CÔNG NGHỆ: Chi tiết sâu  ---
  {
    subject: 'ai', type: 'mc',
    q: "Trong cấu trúc Mạng nơ-ron (Neural Network), lớp nào chịu trách nhiệm tính toán chính và tạo ra vấn đề 'Hộp đen'?",
    a: "Lớp ẩn (Hidden Layers)",
    o: ["Lớp đầu vào (Input Layer)", "Lớp đầu ra (Output Layer)", "Lớp tương tác"],
    e: "Các lớp ẩn xử lý hàng tỷ tham số phức tạp mà con người không thể giải thích tường tận."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Cách học 'Cây gậy và Củ cà rốt' (Thưởng/Phạt) là tên gọi khác của phương pháp nào?",
    a: "Học tăng cường (Reinforcement Learning)",
    o: ["Học có giám sát", "Học không giám sát", "Deep Learning"],
    e: "AI tự rút ra chiến thuật chơi game thông qua việc bị trừ điểm (phạt) hoặc cộng điểm (thưởng) ."
  },
  {
    subject: 'ai', type: 'text',
    q: "Nếu Thuật toán là động cơ của AI, thì cái gì được ví như 'Xăng' (nhiên liệu)? (Tiếng Việt)",
    a: "Dữ liệu",
    e: "Hoặc 'Data'. Không có Big Data, AI hiện đại không thể học được."
  },

  // --- 5. BẢO MẬT: Các loại tấn công cụ thể  ---
  {
    subject: 'network', type: 'mc',
    q: "Tấn công 'SYN Flood' lợi dụng điểm yếu nào của giao thức TCP?",
    a: "Quá trình Bắt tay 3 bước (3-way Handshake).",
    o: ["Quá trình mã hóa SSL.", "Quá trình định tuyến IP.", "Lỗi tràn bộ đệm."],
    e: "Hacker gửi hàng loạt lệnh SYN (Bước 1) nhưng không bao giờ gửi ACK (Bước 3), làm server treo cứng ."
  },
  {
    subject: 'sql', type: 'mc',
    q: "Đoạn mã `' OR '1'='1` trong tấn công SQL Injection có tác dụng gì?",
    a: "Tạo ra một mệnh đề luôn ĐÚNG (True) để đánh lừa cơ sở dữ liệu.",
    o: ["Xóa sạch dữ liệu.", "Tạo ra vòng lặp vô hạn.", "Làm sập server."],
    e: "Vì 1 luôn bằng 1, nên điều kiện đăng nhập trở thành 'Đúng', cho phép hacker vượt qua bước nhập mật khẩu ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Tấn công 'Man-in-the-Middle' (Người đứng giữa) thường bắt đầu bằng kỹ thuật nào trong mạng LAN?",
    a: "ARP Spoofing (Đầu độc ARP)",
    o: ["Phishing", "DDoS", "Ransomware"],
    e: "Hacker giả mạo MAC của Router để lừa nạn nhân gửi dữ liệu qua máy hắn ."
  },
  // ========================================================================
  // PHẦN "VÉT SẠCH LẦN CUỐI": TIÊU CHUẨN KỸ THUẬT & CHI TIẾT ẨN
  // ========================================================================

  // --- 1. MẠNG MÁY TÍNH: Các tiêu chuẩn & Giao thức quản lý  ---
  {
    subject: 'network', type: 'mc',
    q: "Giao thức nào cho phép nhiều thiết bị trong mạng LAN dùng chung một địa chỉ IP công cộng (Public IP) để ra Internet?",
    a: "NAT (Network Address Translation)",
    o: ["DHCP", "DNS", "ARP"],
    e: "NAT giúp chuyển đổi giữa IP nội bộ và IP công cộng, giải quyết vấn đề thiếu hụt địa chỉ IPv4."
  },
  {
    subject: 'network', type: 'mc',
    q: "Chuẩn kỹ thuật IEEE 802.11 được dùng cho công nghệ kết nối nào?",
    a: "Wi-Fi (Mạng không dây)",
    o: ["Ethernet (Mạng có dây - 802.3)", "Bluetooth", "4G/5G"],
    e: "Trong khi đó, Ethernet (mạng dây) dùng chuẩn IEEE 802.3 ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Giao thức SNMP (Simple Network Management Protocol) có chức năng chính là gì?",
    a: "Giúp quản trị viên giám sát từ xa tình trạng thiết bị mạng (nhiệt độ, băng thông...).",
    o: ["Truyền file.", "Gửi email.", "Lướt web."],
    e: "Đây là công cụ đắc lực để theo dõi sức khỏe của hệ thống mạng."
  },

  // --- 2. AI & ỨNG DỤNG: Chi tiết tính năng  ---
  {
    subject: 'ai', type: 'mc',
    q: "Ngoài dịch văn bản, Google Dịch (Google Translate) còn có tính năng nâng cao nào liên quan đến hình ảnh?",
    a: "Nhận dạng và dịch chữ trong hình ảnh (OCR) thông qua camera.",
    o: ["Chỉnh sửa ảnh.", "Tạo video từ văn bản.", "Nhận diện khuôn mặt."],
    e: "Tính năng này cực hữu ích khi đi du lịch, chỉ cần giơ camera lên biển báo để dịch."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Phần mềm AI 'IBM Watson for Oncology' nổi tiếng trong lĩnh vực y tế với khả năng gì?",
    a: "Hỗ trợ bác sĩ đưa ra phác đồ điều trị ung thư dựa trên dữ liệu y khoa khổng lồ.",
    o: ["Phẫu thuật tự động.", "Quản lý hồ sơ bệnh án.", "Sản xuất thuốc."],
    e: "Đây là ví dụ điển hình của Hệ chuyên gia hỗ trợ ra quyết định."
  },

  // --- 3. CSS: Trang trí & Font chữ  ---
  {
    subject: 'css', type: 'mc',
    q: "Trong thuộc tính `font-family`, nhóm font `serif` có đặc điểm gì nhận dạng?",
    a: "Là chữ CÓ CHÂN (các đường gạch nhỏ ở đầu/cuối nét chữ).",
    o: ["Là chữ KHÔNG CHÂN (sans-serif).", "Là chữ viết tay (cursive).", "Là chữ đơn không gian (monospace)."],
    e: "Ví dụ: Times New Roman là Serif, Arial là Sans-serif."
  },
  {
    subject: 'css', type: 'mc',
    q: "Giá trị nào của thuộc tính `text-decoration` tạo ra đường gạch ngang xuyên qua chữ (thường dùng cho giá cũ/giảm giá)?",
    a: "line-through",
    o: ["underline (gạch dưới)", "overline (gạch trên)", "none"],
    e: "Tương đương với thẻ HTML <del> hoặc <s>."
  },
  {
    subject: 'css', type: 'text',
    q: "Thuộc tính nào dùng để tạo bóng đổ cho VĂN BẢN (chữ)? (Tiếng Anh)",
    a: "text-shadow",
    e: "Khác với `box-shadow` (đổ bóng cho khối hộp). Cú pháp: `text-shadow: 2px 2px 5px color;`."
  },
  // ========================================================================
  // PHẦN "VÉT SẠCH TỔNG HỢP": CHI TIẾT KỸ THUẬT, SỐ LIỆU & CÚ PHÁP (MEGA BATCH)
  // ========================================================================

  // --- 1. MẠNG MÁY TÍNH: Chi tiết Cổng (Port) & Giao thức  ---
  {
    subject: 'network', type: 'mc',
    q: "Giao thức FTP sử dụng cổng 21 để điều khiển (lệnh). Vậy nó dùng cổng nào để truyền dữ liệu thực tế (Data)?",
    a: "20",
    o: ["22", "80", "25"],
    e: "FTP hoạt động trên 2 cổng: 20 (Data) và 21 (Control) ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Trong giao thức DHCP, máy chủ (Server) và máy khách (Client) sử dụng cặp cổng UDP nào?",
    a: "Server cổng 67, Client cổng 68",
    o: ["Server 68, Client 67", "Cả hai cổng 67", "Cả hai cổng 53"],
    e: "Chi tiết này quan trọng khi cấu hình tường lửa cho DHCP."
  },
  {
    subject: 'network', type: 'mc',
    q: "Giao thức POP3 (dùng để nhận email) mặc định chạy trên cổng số bao nhiêu?",
    a: "110",
    o: ["143", "25", "995"],
    e: "POP3 (Post Office Protocol version 3) chạy trên cổng 110."
  },
  {
    subject: 'network', type: 'mc',
    q: "Giao thức IMAP (đồng bộ email) mặc định chạy trên cổng số bao nhiêu?",
    a: "143",
    o: ["110", "25", "465"],
    e: "IMAP chạy trên cổng 143, cho phép đồng bộ thư trên nhiều thiết bị."
  },
  {
    subject: 'network', type: 'mc',
    q: "Giao thức SMTP (gửi email) thường sử dụng các cổng nào?",
    a: "25 hoặc 587",
    o: ["110 hoặc 143", "80 hoặc 443", "21 hoặc 22"],
    e: "Port 25 là cổng truyền thống, 587 là cổng hiện đại hỗ trợ bảo mật tốt hơn."
  },

  // --- 2. AI & LỊCH SỬ CÔNG NGHỆ: Số liệu & Sự kiện  ---
  {
    subject: 'ai', type: 'mc',
    q: "Dịch vụ Google Dịch (Google Translate) được ra mắt vào thời gian nào?",
    a: "Tháng 4 năm 2006",
    o: ["Tháng 1 năm 2000", "Tháng 9 năm 2010", "Tháng 12 năm 1998"],
    e: "Đây là cột mốc quan trọng của AI trong xử lý ngôn ngữ."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Robot hình người Asimo của Honda ra mắt lần đầu tiên vào năm nào?",
    a: "Năm 1986",
    o: ["Năm 2000", "Năm 1995", "Năm 2005"],
    e: "Asimo là biểu tượng cho kỹ thuật điều khiển robot hình người."
  },
  {
    subject: 'ai', type: 'text',
    q: "Hệ chuyên gia MYCIN (1972) sử dụng khoảng bao nhiêu luật suy diễn để chẩn đoán bệnh? (Nhập số)",
    a: "600",
    e: "Khoảng 600 luật dạng 'Nếu... thì...' được các chuyên gia nạp vào hệ thống."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Alan Turing đã đề xuất 'Phép thử Turing' (Turing Test) vào năm nào?",
    a: "Năm 1950",
    o: ["Năm 1956", "Năm 1960", "Năm 1945"],
    e: "Đây là bài kiểm tra tiêu chuẩn để đánh giá trí thông minh của máy tính."
  },

  // --- 3. CSS: Màu sắc, Đơn vị & Thuộc tính  ---
  {
    subject: 'color', type: 'mc',
    q: "Màu 'Fuchsia' (Hồng cánh sen) có mã Hex #FF00FF tương ứng với mã RGB nào?",
    a: "rgb(255, 0, 255)",
    o: ["rgb(255, 255, 0)", "rgb(0, 255, 255)", "rgb(128, 0, 128)"],
    e: "Pha trộn Đỏ (255) và Xanh dương (255) tạo ra màu Hồng cánh sen."
  },
  {
    subject: 'color', type: 'mc',
    q: "Màu 'Olive' (Xanh ô-liu) có mã Hex là gì?",
    a: "#808000",
    o: ["#008000", "#800000", "#008080"],
    e: "Là sự kết hợp của Đỏ (128) và Xanh lá (128)."
  },
  {
    subject: 'css', type: 'mc',
    q: "Đơn vị đo `pt` (point) trong CSS khi quy đổi ra inch là bao nhiêu?",
    a: "1 pt = 1/72 inch",
    o: ["1 pt = 1/96 inch", "1 pt = 1/10 inch", "1 pt = 1 inch"],
    e: "Khác với px (1/96 inch), pt thường dùng trong in ấn."
  },
  {
    subject: 'css', type: 'mc',
    q: "Trong thuộc tính `font-weight`, giá trị số 500 tương đương với từ khóa nào?",
    a: "medium",
    o: ["normal (400)", "bold (700)", "thin (100)"],
    e: "Mức 500 là mức trung bình."
  },
  {
    subject: 'css', type: 'text',
    q: "Cú pháp chuẩn của thuộc tính `box-shadow`: offset-x offset-y blur spread ...? (Điền giá trị tiếp theo)",
    a: "color",
    e: "Thứ tự: Lệch ngang, Lệch dọc, Độ mờ, Độ lan, Màu, (Inset)."
  },

  // --- 4. HTML: Thẻ & Thuộc tính Form  ---
  {
    subject: 'html', type: 'mc',
    q: "Thẻ <textarea> sử dụng hai thuộc tính nào để định quy định kích thước?",
    a: "rows (số dòng) và cols (số cột)",
    o: ["width và height", "x và y", "size và length"],
    e: "Ví dụ: <textarea rows='4' cols='50'>"
  },
  {
    subject: 'html', type: 'mc',
    q: "Thuộc tính `autocomplete` trong thẻ <form> có tác dụng gì?",
    a: "Bật/tắt tính năng gợi ý dữ liệu đã nhập trước đó của trình duyệt.",
    o: ["Tự động gửi form.", "Tự động sửa lỗi chính tả.", "Tự động điền mật khẩu."],
    e: "Giá trị mặc định là `on`. Muốn tắt gợi ý thì set `off`."
  },
  {
    subject: 'html', type: 'text',
    q: "Thẻ HTML nào dùng để hiển thị các phím bấm (Ví dụ: Ctrl + C)? (Viết tên thẻ)",
    a: "<kbd>",
    e: "Thẻ <kbd> (Keyboard) thường hiển thị font monospace."
  },
  {
    subject: 'html', type: 'mc',
    q: "Sự khác biệt giữa `readonly` và `disabled` trong ô input?",
    a: "`readonly` vẫn gửi dữ liệu đi khi submit; `disabled` KHÔNG gửi dữ liệu đi.",
    o: ["`readonly` làm mờ ô input.", "`disabled` cho phép copy.", "Giống hệt nhau."],
    e: "Nếu dùng `disabled`, server sẽ không nhận được giá trị của ô đó."
  },

  // --- 5. BẢO MẬT & AN NINH MẠNG  ---
  {
    subject: 'network', type: 'mc',
    q: "Tấn công 'SYN Flood' lợi dụng lỗ hổng nào của giao thức TCP?",
    a: "Quá trình Bắt tay 3 bước (3-way Handshake).",
    o: ["Quá trình mã hóa.", "Quá trình định tuyến.", "Lỗi phần mềm."],
    e: "Hacker gửi SYN nhưng không gửi ACK, làm server phải chờ đợi đến kiệt quệ ."
  },
  {
    subject: 'sql', type: 'mc',
    q: "Đoạn mã `' OR '1'='1` trong tấn công SQL Injection có ý nghĩa gì?",
    a: "Tạo ra một điều kiện luôn ĐÚNG (True) để vượt qua xác thực.",
    o: ["Xóa dữ liệu.", "Tạo vòng lặp.", "Làm treo máy."],
    e: "Vì 1=1 luôn đúng, hacker có thể đăng nhập không cần mật khẩu ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Kỹ thuật 'ARP Spoofing' (Đầu độc ARP) thường được hacker dùng để làm gì?",
    a: "Thực hiện tấn công Man-in-the-Middle (Người đứng giữa) trong mạng LAN.",
    o: ["Tấn công DDoS.", "Phát tán virus.", "Bẻ khóa mật khẩu Wifi."],
    e: "Hacker giả danh Router để lừa nạn nhân gửi dữ liệu qua máy hắn ."
  },

  // --- 6. CÁC CHI TIẾT ẨN KHÁC (Hidden Gems) ---
  {
    subject: 'css', type: 'mc',
    q: "Giá trị `groove` của thuộc tính `border-style` tạo hiệu ứng gì?",
    a: "Khắc chìm (Rãnh) xuống bề mặt.",
    o: ["Gờ nổi (Ridge).", "Lõm toàn bộ (Inset).", "Lồi toàn bộ (Outset)."],
    e: "Tạo cảm giác như đường viền được khắc sâu vào trang web."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Phương pháp học 'Cây gậy và Củ cà rốt' trong AI là tên gọi khác của?",
    a: "Học tăng cường (Reinforcement Learning).",
    o: ["Học có giám sát.", "Học không giám sát.", "Deep Learning."],
    e: "AI học qua cơ chế Thưởng (Cà rốt) và Phạt (Gậy)."
  },
  {
    subject: 'network', type: 'text',
    q: "Lệnh nào trên Windows dùng để kiểm tra đường đi của gói tin qua các Router? (Tiếng Anh)",
    a: "tracert",
    e: "Trên Linux/Mac là `traceroute`. Nó liệt kê các trạm trung chuyển gói tin."
  },
  // ========================================================================
  // PHẦN "VÉT SẠCH 1K CÂU": TỔNG HỢP CHI TIẾT NHỎ & CÂU HỎI NHANH
  // ========================================================================

  // --- 1. HTML & FORM: Kiểm tra nhanh thuộc tính  ---
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thuộc tính `required` trong thẻ input có tác dụng ngăn người dùng gửi form nếu ô đó bị bỏ trống?",
    a: "Đúng",
    o: ["Sai"],
    e: "Trình duyệt sẽ hiện thông báo 'Please fill out this field' nếu thiếu."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thẻ `<input type='password'>` sẽ mã hóa mật khẩu gửi đi để hacker không đọc được?",
    a: "Sai",
    o: ["Đúng"],
    e: "Nó chỉ ẩn ký tự trên màn hình (thành dấu *) để người bên cạnh không nhìn thấy. Dữ liệu gửi đi vẫn là text thường nếu không dùng HTTPS."
  },
  {
    subject: 'html', type: 'text',
    q: "Để giới hạn số lượng ký tự tối đa được nhập vào ô text, ta dùng thuộc tính gì? (Tiếng Anh)",
    a: "maxlength",
    e: "Ví dụ: `maxlength='10'` chỉ cho nhập tối đa 10 ký tự."
  },
  {
    subject: 'html', type: 'text',
    q: "Thuộc tính nào dùng để đánh dấu một ô radio hoặc checkbox là 'được chọn sẵn' khi tải trang? (Tiếng Anh)",
    a: "checked",
    e: "Ví dụ: `<input type='checkbox' checked>`."
  },
  {
    subject: 'html', type: 'tf',
    q: "ĐÚNG hay SAI: Thẻ `<datalist>` bắt buộc người dùng phải chọn giá trị trong danh sách gợi ý, không được gõ khác?",
    a: "Sai",
    o: ["Đúng"],
    e: "<datalist> chỉ GỢI Ý. Người dùng vẫn có thể gõ bất kỳ nội dung nào họ muốn. Muốn bắt buộc chọn phải dùng `<select>` ."
  },

  // --- 2. CSS: Chi tiết hiển thị & Đơn vị  ---
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Phần tử có `display: inline` (như thẻ <span>) có thể chỉnh được chiều rộng (width) và chiều cao (height)?",
    a: "Sai",
    o: ["Đúng"],
    e: "Phần tử inline chỉ chiếm diện tích vừa đủ nội dung, không nhận width/height. Muốn chỉnh phải dùng `inline-block` hoặc `block`."
  },
  {
    subject: 'css', type: 'mc',
    q: "Đơn vị `vh` (viewport height) trong CSS đại diện cho cái gì?",
    a: "1% chiều cao của khung nhìn trình duyệt.",
    o: ["1% chiều cao của phần tử cha.", "1 pixel.", "1 cm."],
    e: "100vh = Toàn bộ chiều cao màn hình hiện tại."
  },
  {
    subject: 'css', type: 'text',
    q: "Thuộc tính nào giúp biến đổi văn bản thành chữ IN HOA, chữ thường hoặc Viết Hoa Chữ Cái Đầu? (Tiếng Anh)",
    a: "text-transform",
    e: "Các giá trị: `uppercase`, `lowercase`, `capitalize`."
  },
  {
    subject: 'css', type: 'tf',
    q: "ĐÚNG hay SAI: Giá trị `line-height: 1.5` (không đơn vị) tốt hơn `line-height: 150%`?",
    a: "Đúng",
    o: ["Sai"],
    e: "Số không đơn vị giúp tránh lỗi thừa kế kích thước dòng khi font chữ con thay đổi ."
  },

  // --- 3. MẠNG MÁY TÍNH: Giao thức & Cổng (Port)  ---
  {
    subject: 'network', type: 'text',
    q: "Cổng số 80 là cổng mặc định của giao thức web nào? (Viết tắt)",
    a: "HTTP",
    e: "HTTP chạy port 80 (không bảo mật), HTTPS chạy port 443 (bảo mật)."
  },
  {
    subject: 'network', type: 'text',
    q: "Cổng số 443 là cổng mặc định của giao thức web nào? (Viết tắt)",
    a: "HTTPS",
    e: "HTTPS sử dụng mã hóa SSL/TLS qua cổng 443."
  },
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: Giao thức UDP tin cậy hơn TCP vì nó luôn kiểm tra xem dữ liệu đã đến nơi chưa?",
    a: "Sai",
    o: ["Đúng"],
    e: "Ngược lại! TCP mới tin cậy (kiểm tra kỹ). UDP là 'nhanh nhảu đoảng' (bắn và quên) ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Trong mô hình OSI, 'Switch' là thiết bị đặc trưng của tầng nào?",
    a: "Tầng 2 (Data Link)",
    o: ["Tầng 3 (Network)", "Tầng 1 (Physical)", "Tầng 4 (Transport)"],
    e: "Switch xử lý Frame và địa chỉ MAC tại tầng 2 ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Trong mô hình OSI, 'Router' là thiết bị đặc trưng của tầng nào?",
    a: "Tầng 3 (Network)",
    o: ["Tầng 2 (Data Link)", "Tầng 1 (Physical)", "Tầng 5 (Session)"],
    e: "Router xử lý Packet và địa chỉ IP tại tầng 3 ."
  },

  // --- 4. AI & CÔNG NGHỆ: Kiến thức nền tảng  ---
  {
    subject: 'ai', type: 'tf',
    q: "ĐÚNG hay SAI: 'AI Hẹp' (Weak AI) có khả năng tự ý thức và suy nghĩ giống hệt con người?",
    a: "Sai",
    o: ["Đúng"],
    e: "AI Hẹp chỉ giỏi một việc cụ thể (ví dụ: đánh cờ, nhận diện mặt). AI Tổng quát (Strong AI) mới là loại suy nghĩ như người (chưa có thực) ."
  },
  {
    subject: 'ai', type: 'text',
    q: "Tên của phép thử nổi tiếng năm 1950 dùng để phân biệt máy tính có thông minh hay không? (Tiếng Anh)",
    a: "Turing Test",
    e: "Do Alan Turing đề xuất. Nếu người thẩm định không phân biệt được đang chat với máy hay người thì máy đó thông minh."
  },
  {
    subject: 'ai', type: 'mc',
    q: "Khả năng nào sau đây KHÔNG nằm trong 5 đặc trưng cơ bản của AI được tài liệu liệt kê?",
    a: "Khả năng sinh sản",
    o: ["Khả năng học", "Khả năng suy luận", "Khả năng nhận thức", "Khả năng hiểu ngôn ngữ"],
    e: "AI là phần mềm, không có đặc tính sinh học này ."
  },

  // --- 5. BẢO MẬT & AN NINH: Các loại mã độc  ---
  {
    subject: 'network', type: 'tf',
    q: "ĐÚNG hay SAI: 'Worm' (Sâu máy tính) cần phải có người dùng mở file thì mới lây lan được?",
    a: "Sai",
    o: ["Đúng"],
    e: "Đó là Virus. Worm có khả năng tự động bò từ máy này sang máy khác qua mạng mà không cần ai kích hoạt ."
  },
  {
    subject: 'network', type: 'text',
    q: "Loại mã độc nào chuyên mã hóa dữ liệu người dùng để đòi tiền chuộc? (Tiếng Anh)",
    a: "Ransomware",
    e: "Thường đòi tiền chuộc bằng Bitcoin ."
  },
  {
    subject: 'network', type: 'mc',
    q: "Hành động nào sau đây là ví dụ điển hình của 'Phishing'?",
    a: "Gửi email giả mạo ngân hàng yêu cầu nhập mật khẩu.",
    o: ["Tấn công làm sập trang web.", "Cài virus vào USB.", "Nghe lén Wifi."],
    e: "Phishing là câu nhử người dùng tự lộ thông tin ."
  },

  // --- 6. CÁC CÂU HỎI HỖN HỢP NHANH (Mixed) ---
  {
    subject: 'css', type: 'text',
    q: "Mã màu Hex cho màu Trắng là gì? (Bao gồm dấu #)",
    a: "#FFFFFF",
    e: "Hoặc viết tắt là #FFF."
  },
  {
    subject: 'css', type: 'text',
    q: "Mã màu Hex cho màu Đen là gì? (Bao gồm dấu #)",
    a: "#000000",
    e: "Hoặc viết tắt là #000."
  },
  {
    subject: 'network', type: 'text',
    q: "Lệnh CMD để kiểm tra kết nối mạng đến một địa chỉ IP cụ thể? (Tiếng Anh)",
    a: "ping",
    e: "Ví dụ: `ping google.com`."
  },
  {
    subject: 'network', type: 'text',
    q: "Lệnh CMD để xem địa chỉ IP của máy tính mình đang dùng? (Tiếng Anh)",
    a: "ipconfig",
    e: "Trên Linux/Mac là `ifconfig`."
  },
  // ========================================================================
  // PHẦN 1: 125 CÂU HỎI QUÉT SẠCH (HTML - CSS - MẠNG CƠ BẢN)
  // ========================================================================

  // --- HTML: CÁC THẺ & THUỘC TÍNH CHI TIẾT ---
  { subject: 'html', type: 'text', q: "Thẻ HTML nào dùng để định nghĩa tiêu đề của tài liệu (hiển thị trên tab trình duyệt)?", a: "<title>", e: "Nằm trong thẻ <head>." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để chứa các thông tin meta (như bảng mã, tác giả, mô tả) của trang web?", a: "<meta>", e: "Ví dụ: <meta charset='UTF-8'>." },
  { subject: 'html', type: 'text', q: "Để chèn một đoạn mã Javascript vào trang HTML, ta dùng thẻ nào?", a: "<script>", e: "Có thể viết code trực tiếp hoặc dẫn link file .js." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để tạo một liên kết (hyperlink) đến trang khác?", a: "<a>", e: "Viết tắt của Anchor." },
  { subject: 'html', type: 'text', q: "Thuộc tính nào của thẻ <a> chứa đường dẫn đích đến?", a: "href", e: "Ví dụ: href='https://google.com'." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để chèn hình ảnh vào trang web?", a: "<img>", e: "Là thẻ rỗng (không có thẻ đóng)." },
  { subject: 'html', type: 'text', q: "Thuộc tính nào của thẻ <img> cung cấp văn bản thay thế khi ảnh lỗi?", a: "alt", e: "Rất quan trọng cho SEO và người khiếm thị." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để tạo một đoạn văn bản?", a: "<p>", e: "Viết tắt của Paragraph." },
  { subject: 'html', type: 'text', q: "Thẻ nào tạo tiêu đề lớn nhất trong trang?", a: "<h1>", e: "H1 thường chỉ dùng 1 lần cho tiêu đề chính." },
  { subject: 'html', type: 'text', q: "Thẻ nào tạo tiêu đề nhỏ nhất trong nhóm Heading?", a: "<h6>", e: "Có từ h1 đến h6." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để ngắt dòng (xuống dòng) trong văn bản?", a: "<br>", e: "Thẻ rỗng, viết tắt của Break." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để vẽ một đường kẻ ngang phân cách?", a: "<hr>", e: "Thẻ rỗng, viết tắt của Horizontal Rule." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để định dạng văn bản in đậm (bold) về mặt hình thức?", a: "<b>", e: "Khác với <strong> là nhấn mạnh ngữ nghĩa." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để định dạng văn bản in nghiêng (italic) về mặt hình thức?", a: "<i>", e: "Khác với <em> là nhấn mạnh ngữ nghĩa." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để tạo chỉ số dưới (ví dụ H2O)?", a: "<sub>", e: "Subscript." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để tạo chỉ số trên (ví dụ x bình phương)?", a: "<sup>", e: "Superscript." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để hiển thị một đoạn trích dẫn dài (khối)?", a: "<blockquote>", e: "Thường tự động thụt lề." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để nhóm các phần tử inline lại để định dạng?", a: "<span>", e: "Tương tự <div> nhưng là inline." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để nhóm các phần tử block lại (tạo khối)?", a: "<div>", e: "Viết tắt của Division." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để tạo danh sách có thứ tự (1, 2, 3...)?", a: "<ol>", e: "Ordered List." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để tạo danh sách không thứ tự (dấu chấm tròn)?", a: "<ul>", e: "Unordered List." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để định nghĩa một mục (item) trong danh sách?", a: "<li>", e: "List Item." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để tạo bảng?", a: "<table>", e: "Chứa tr, td, th." },
  { subject: 'html', type: 'text', q: "Thẻ nào định nghĩa một hàng (dòng) trong bảng?", a: "<tr>", e: "Table Row." },
  { subject: 'html', type: 'text', q: "Thẻ nào định nghĩa một ô dữ liệu trong bảng?", a: "<td>", e: "Table Data." },
  { subject: 'html', type: 'text', q: "Thẻ nào định nghĩa một ô tiêu đề trong bảng (in đậm, căn giữa)?", a: "<th>", e: "Table Header." },
  { subject: 'html', type: 'text', q: "Thuộc tính nào của thẻ <td> dùng để gộp cột?", a: "colspan", e: "Column Span." },
  { subject: 'html', type: 'text', q: "Thuộc tính nào của thẻ <td> dùng để gộp hàng?", a: "rowspan", e: "Row Span." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để tạo một biểu mẫu nhập liệu?", a: "<form>", e: "Chứa các input, button." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để tạo nhãn cho các ô input?", a: "<label>", e: "Giúp tăng trải nghiệm người dùng khi click vào chữ." },
  { subject: 'html', type: 'text', q: "Thuộc tính `type` nào của thẻ <input> tạo ra ô nhập mật khẩu?", a: "password", e: "Ẩn ký tự." },
  { subject: 'html', type: 'text', q: "Thuộc tính `type` nào của thẻ <input> tạo ra nút tròn chọn 1 phương án?", a: "radio", e: "Cần cùng `name` để hoạt động." },
  { subject: 'html', type: 'text', q: "Thuộc tính `type` nào của thẻ <input> tạo ra ô vuông chọn nhiều phương án?", a: "checkbox", e: "Chọn độc lập." },
  { subject: 'html', type: 'text', q: "Thuộc tính `type` nào của thẻ <input> tạo ra nút gửi form?", a: "submit", e: "Gửi dữ liệu đi." },
  { subject: 'html', type: 'text', q: "Thuộc tính `type` nào của thẻ <input> tạo ra nút xóa trắng form?", a: "reset", e: "Khôi phục giá trị mặc định." },
  { subject: 'html', type: 'text', q: "Thẻ nào tạo ra một danh sách thả xuống (Dropdown list)?", a: "<select>", e: "Chứa các <option>." },
  { subject: 'html', type: 'text', q: "Thẻ nào định nghĩa một lựa chọn trong danh sách thả xuống?", a: "<option>", e: "Nằm trong <select>." },
  { subject: 'html', type: 'text', q: "Thẻ nào tạo ra vùng nhập văn bản nhiều dòng?", a: "<textarea>", e: "Kích thước chỉnh bằng rows, cols." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để nhúng một trang web khác vào trang hiện tại?", a: "<iframe>", e: "Inline Frame." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để phát nhạc/âm thanh?", a: "<audio>", e: "Hỗ trợ mp3, ogg, wav." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để phát video?", a: "<video>", e: "Hỗ trợ mp4, webm." },
  { subject: 'html', type: 'text', q: "Thuộc tính nào giúp hiển thị các nút điều khiển (play, pause) cho video/audio?", a: "controls", e: "Nếu thiếu thuộc tính này, video có thể không phát được." },
  { subject: 'html', type: 'text', q: "Thẻ nào dùng để vẽ đồ họa (2D, 3D) thông qua Script?", a: "<canvas>", e: "Như một tờ giấy trắng để JS vẽ lên." },
  { subject: 'html', type: 'text', q: "Thẻ HTML5 nào định nghĩa phần đầu trang (chứa logo, menu)?", a: "<header>", e: "Khác với <head>." },
  { subject: 'html', type: 'text', q: "Thẻ HTML5 nào định nghĩa phần chân trang (bản quyền, liên hệ)?", a: "<footer>", e: "Thường nằm cuối cùng." },
  { subject: 'html', type: 'text', q: "Thẻ HTML5 nào định nghĩa khu vực điều hướng (menu)?", a: "<nav>", e: "Navigation." },
  { subject: 'html', type: 'text', q: "Thẻ HTML5 nào định nghĩa một nội dung độc lập (bài báo, blog)?", a: "<article>", e: "Có thể tách riêng mà vẫn có nghĩa." },
  { subject: 'html', type: 'text', q: "Thẻ HTML5 nào định nghĩa nội dung bên lề (quảng cáo, sidebar)?", a: "<aside>", e: "Nội dung phụ." },
  { subject: 'html', type: 'tf', q: "ĐÚNG hay SAI: HTML phân biệt chữ hoa chữ thường với tên thẻ (ví dụ <P> khác <p>)?", a: "Sai", o: ["Đúng"], e: "HTML không phân biệt, nhưng khuyến khích dùng chữ thường." },
  { subject: 'html', type: 'tf', q: "ĐÚNG hay SAI: Thuộc tính `id` phải là duy nhất trong một trang HTML?", a: "Đúng", o: ["Sai"], e: "ID là định danh duy nhất." },
  { subject: 'html', type: 'tf', q: "ĐÚNG hay SAI: Một thẻ HTML có thể có nhiều `class`?", a: "Đúng", o: ["Sai"], e: "Ví dụ: class='btn btn-primary'." },
  { subject: 'html', type: 'tf', q: "ĐÚNG hay SAI: Thẻ `<!DOCTYPE html>` là bắt buộc để khai báo chuẩn HTML5?", a: "Đúng", o: ["Sai"], e: "Nó giúp trình duyệt render đúng chế độ." },

  // --- CSS: THUỘC TÍNH & GIÁ TRỊ CHI TIẾT ---
  { subject: 'css', type: 'text', q: "Thuộc tính nào dùng để đổi màu chữ?", a: "color", e: "Ví dụ: color: red." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào dùng để đổi màu nền?", a: "background-color", e: "Ví dụ: background-color: #fff." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào dùng để chỉnh kích thước chữ?", a: "font-size", e: "Đơn vị: px, em, rem, %." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào dùng để chỉnh độ đậm của chữ?", a: "font-weight", e: "Ví dụ: bold, 400, 700." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào dùng để chỉnh kiểu chữ nghiêng?", a: "font-style", e: "Ví dụ: italic." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào dùng để chọn loại font chữ (Time New Roman, Arial...)?", a: "font-family", e: "Nên có font dự phòng." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào căn lề văn bản (trái, phải, giữa)?", a: "text-align", e: "Ví dụ: center, justify." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào gạch chân, gạch ngang văn bản?", a: "text-decoration", e: "Ví dụ: underline, line-through, none." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào chuyển đổi văn bản sang in hoa/thường?", a: "text-transform", e: "Ví dụ: uppercase, lowercase, capitalize." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào chỉnh khoảng cách giữa các dòng?", a: "line-height", e: "Thường dùng số không đơn vị (1.5)." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào chỉnh khoảng cách giữa các ký tự?", a: "letter-spacing", e: "Ví dụ: 1px." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào chỉnh khoảng cách giữa các từ?", a: "word-spacing", e: "Ví dụ: 2px." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào thụt lề dòng đầu tiên?", a: "text-indent", e: "Ví dụ: 30px." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào tạo bóng đổ cho chữ?", a: "text-shadow", e: "Cú pháp: x y blur color." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào chỉnh độ rộng của phần tử?", a: "width", e: "px, %, vw." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào chỉnh độ cao của phần tử?", a: "height", e: "px, %, vh." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào chỉnh khoảng cách từ viền đến nội dung (đệm bên trong)?", a: "padding", e: "Khoảng cách bên trong." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào chỉnh khoảng cách từ viền ra ngoài (lề bên ngoài)?", a: "margin", e: "Khoảng cách bên ngoài." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào tạo đường viền?", a: "border", e: "Ví dụ: 1px solid black." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào bo tròn góc?", a: "border-radius", e: "Ví dụ: 50% để làm hình tròn." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào tạo bóng đổ cho hộp (khối)?", a: "box-shadow", e: "Cú pháp: x y blur spread color." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào quyết định cách hiển thị (block, inline, flex)?", a: "display", e: "Quyết định layout." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào ẩn phần tử nhưng vẫn chiếm chỗ?", a: "visibility", e: "Giá trị: hidden." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào làm phần tử trong suốt?", a: "opacity", e: "Giá trị từ 0 đến 1." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào kiểm soát nội dung bị tràn ra ngoài?", a: "overflow", e: "Ví dụ: hidden, scroll, auto." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào dùng để xếp lớp (lớp nào nằm trên)?", a: "z-index", e: "Chỉ tác dụng với position khác static." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào dùng để định vị phần tử (tương đối, tuyệt đối)?", a: "position", e: "relative, absolute, fixed, sticky." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào đẩy phần tử sang trái hoặc phải (cũ)?", a: "float", e: "left, right." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào dùng để ngắt float?", a: "clear", e: "both, left, right." },
  { subject: 'css', type: 'text', q: "Trong Flexbox, thuộc tính nào căn chỉnh theo trục chính (ngang)?", a: "justify-content", e: "center, space-between..." },
  { subject: 'css', type: 'text', q: "Trong Flexbox, thuộc tính nào căn chỉnh theo trục phụ (dọc)?", a: "align-items", e: "center, stretch..." },
  { subject: 'css', type: 'text', q: "Trong Flexbox, thuộc tính nào cho phép xuống dòng?", a: "flex-wrap", e: "wrap, nowrap." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào thay đổi con trỏ chuột khi di vào?", a: "cursor", e: "pointer, default, text." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào dùng để thay đổi kiểu danh sách (dấu chấm, số)?", a: "list-style", e: "none, disc, circle." },
  { subject: 'css', type: 'tf', q: "ĐÚNG hay SAI: `padding: 10px 20px` nghĩa là trên-dưới 10px, trái-phải 20px?", a: "Đúng", o: ["Sai"], e: "Theo chiều kim đồng hồ." },
  { subject: 'css', type: 'tf', q: "ĐÚNG hay SAI: `margin: 0 auto` dùng để căn giữa khối block theo chiều ngang?", a: "Đúng", o: ["Sai"], e: "Yêu cầu phải có width." },
  { subject: 'css', type: 'tf', q: "ĐÚNG hay SAI: Đơn vị `em` phụ thuộc vào font-size của phần tử cha?", a: "Đúng", o: ["Sai"], e: "Khác với rem phụ thuộc html." },
  { subject: 'css', type: 'tf', q: "ĐÚNG hay SAI: Màu `#000` là màu Trắng?", a: "Sai", o: ["Đúng"], e: "Là màu Đen. Trắng là #FFF." },

  // --- MẠNG: CỔNG & GIAO THỨC (Ôn tập nhanh) ---
  { subject: 'network', type: 'text', q: "Cổng mặc định của FTP Data?", a: "20", e: "Truyền dữ liệu." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của FTP Control?", a: "21", e: "Điều khiển." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của SSH?", a: "22", e: "Bảo mật." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của Telnet?", a: "23", e: "Kém bảo mật." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của SMTP (Gửi mail)?", a: "25", e: "Hoặc 587." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của DNS?", a: "53", e: "UDP/TCP." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của DHCP Server?", a: "67", e: "UDP." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của DHCP Client?", a: "68", e: "UDP." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của HTTP (Web)?", a: "80", e: "Không mã hóa." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của POP3 (Nhận mail)?", a: "110", e: "Tải về máy." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của IMAP (Nhận mail)?", a: "143", e: "Đồng bộ." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của HTTPS (Web bảo mật)?", a: "443", e: "Có SSL/TLS." },
  { subject: 'network', type: 'text', q: "Cổng mặc định của RDP (Remote Desktop)?", a: "3389", e: "Microsoft." },
  { subject: 'network', type: 'mc', q: "Giao thức nào dùng để gán IP tự động?", a: "DHCP", o: ["DNS", "ARP", "NAT"], e: "Dynamic Host Configuration Protocol." },
  { subject: 'network', type: 'mc', q: "Giao thức nào dịch tên miền sang IP?", a: "DNS", o: ["DHCP", "HTTP", "FTP"], e: "Domain Name System." },
  { subject: 'network', type: 'mc', q: "Giao thức nào truyền file tin cậy?", a: "FTP", o: ["UDP", "RTP", "IP"], e: "File Transfer Protocol." },
  { subject: 'network', type: 'mc', q: "Giao thức nào dùng để kiểm tra kết nối (ping)?", a: "ICMP", o: ["TCP", "UDP", "IGMP"], e: "Internet Control Message Protocol." },
  { subject: 'network', type: 'mc', q: "Địa chỉ IPv4 có bao nhiêu bit?", a: "32 bit", o: ["64 bit", "128 bit", "16 bit"], e: "4 octet x 8 bit." },
  { subject: 'network', type: 'mc', q: "Địa chỉ IPv6 có bao nhiêu bit?", a: "128 bit", o: ["32 bit", "64 bit", "256 bit"], e: "Hexadecimal." },
  { subject: 'network', type: 'mc', q: "Địa chỉ MAC có bao nhiêu bit?", a: "48 bit", o: ["32 bit", "64 bit", "12 bit"], e: "Gắn cứng trên NIC." },
  { subject: 'network', type: 'tf', q: "ĐÚNG hay SAI: Switch hoạt động ở tầng Network (Layer 3)?", a: "Sai", o: ["Đúng"], e: "Switch thường ở Layer 2 (Data Link)." },
  { subject: 'network', type: 'tf', q: "ĐÚNG hay SAI: Router hoạt động ở tầng Network (Layer 3)?", a: "Đúng", o: ["Sai"], e: "Định tuyến dựa trên IP." },
  { subject: 'network', type: 'tf', q: "ĐÚNG hay SAI: Hub gửi dữ liệu đến tất cả các cổng?", a: "Đúng", o: ["Sai"], e: "Broadcast, gây xung đột." },
  { subject: 'network', type: 'tf', q: "ĐÚNG hay SAI: Cáp quang truyền tín hiệu bằng điện?", a: "Sai", o: ["Đúng"], e: "Truyền bằng ánh sáng." },
  { subject: 'network', type: 'text', q: "Lệnh CMD kiểm tra thông tin IP của máy?", a: "ipconfig", e: "Windows." },
  { subject: 'network', type: 'text', q: "Lệnh CMD kiểm tra kết nối mạng?", a: "ping", e: "Gửi gói ICMP." },
  { subject: 'network', type: 'text', q: "Lệnh CMD kiểm tra đường đi gói tin?", a: "tracert", e: "Trace Route." },
  { subject: 'network', type: 'text', q: "Lệnh CMD xem bảng MAC (ARP)?", a: "arp -a", e: "Address Resolution Protocol." },
  // ========================================================================
  // PHẦN 2: 125 CÂU HỎI TIẾP THEO (CSS NÂNG CAO - AI - BẢO MẬT)
  // ========================================================================

  // --- CSS NÂNG CAO: FLEXBOX, SELECTOR & ĐỘ ƯU TIÊN ---
  { subject: 'css', type: 'mc', q: "Selector `div > p` chọn phần tử nào?", a: "Thẻ <p> là con trực tiếp của <div>", o: ["Thẻ <p> nằm trong <div> (cả cháu chắt)", "Thẻ <p> nằm ngay sau <div>", "Thẻ <p> có id là div"], e: "Quan hệ cha-con trực tiếp ." },
  { subject: 'css', type: 'mc', q: "Selector `div + p` chọn phần tử nào?", a: "Thẻ <p> nằm liền kề ngay sau <div>", o: ["Thẻ <p> nằm bên trong <div>", "Mọi thẻ <p> nằm sau <div>", "Thẻ <p> là cha của <div>"], e: "Quan hệ anh em liền kề ." },
  { subject: 'css', type: 'mc', q: "Selector `div ~ p` chọn phần tử nào?", a: "Mọi thẻ <p> nằm sau <div> (có cùng cha)", o: ["Chỉ thẻ <p> liền kề", "Thẻ <p> bên trong <div>", "Thẻ <p> đứng trước <div>"], e: "Quan hệ anh em chung ." },
  { subject: 'css', type: 'text', q: "Trong Flexbox, giá trị nào của `justify-content` giúp các phần tử dãn đều, 2 phần tử ngoài cùng sát mép?", a: "space-between", e: "Khoảng cách ở giữa các phần tử bằng nhau." },
  { subject: 'css', type: 'text', q: "Trong Flexbox, giá trị nào của `justify-content` tạo khoảng cách đều xung quanh mỗi phần tử?", a: "space-around", e: "Khoảng cách bao quanh mỗi item." },
  { subject: 'css', type: 'text', q: "Để các phần tử Flex tự động xuống dòng khi hết chỗ, ta dùng lệnh gì?", a: "flex-wrap: wrap", e: "Mặc định là nowrap (ép trên 1 dòng)." },
  { subject: 'css', type: 'text', q: "Thuộc tính `align-items: center` căn giữa theo trục nào trong Flexbox mặc định?", a: "Trục dọc (Cross Axis)", e: "Trục phụ." },
  { subject: 'css', type: 'text', q: "Thuộc tính `justify-content: center` căn giữa theo trục nào trong Flexbox mặc định?", a: "Trục ngang (Main Axis)", e: "Trục chính." },
  { subject: 'css', type: 'mc', q: "Độ ưu tiên (Specificity) của ID (#id) là bao nhiêu điểm?", a: "100", o: ["10", "1", "1000"], e: "ID mạnh hơn Class." },
  { subject: 'css', type: 'mc', q: "Độ ưu tiên của Class (.class) là bao nhiêu điểm?", a: "10", o: ["100", "1", "0"], e: "Class mạnh hơn Element." },
  { subject: 'css', type: 'mc', q: "Độ ưu tiên của Element (thẻ) là bao nhiêu điểm?", a: "1", o: ["10", "100", "0"], e: "Thẻ yếu nhất." },
  { subject: 'css', type: 'mc', q: "Độ ưu tiên của `!important` là như thế nào?", a: "Cao nhất, ghi đè tất cả.", o: ["Thấp nhất.", "Bằng với ID.", "Chỉ cao hơn Class."], e: "Nên hạn chế dùng vì khó sửa lỗi." },
  { subject: 'css', type: 'tf', q: "ĐÚNG hay SAI: `Inline Style` (viết trong thẻ) có độ ưu tiên cao hơn ID?", a: "Đúng", o: ["Sai"], e: "Inline style chỉ thua !important." },
  { subject: 'css', type: 'text', q: "Pseudo-class nào chọn phần tử khi người dùng di chuột vào? (Tiếng Anh)", a: ":hover", e: "Ví dụ a:hover." },
  { subject: 'css', type: 'text', q: "Pseudo-class nào chọn đường link đã từng truy cập? (Tiếng Anh)", a: ":visited", e: "Ví dụ a:visited." },
  { subject: 'css', type: 'text', q: "Pseudo-element nào chọn dòng đầu tiên của đoạn văn? (Tiếng Anh)", a: "::first-line", e: "Ví dụ p::first-line." },
  { subject: 'css', type: 'text', q: "Pseudo-element nào chọn chữ cái đầu tiên (làm Drop Cap)? (Tiếng Anh)", a: "::first-letter", e: "Ví dụ p::first-letter." },
  { subject: 'css', type: 'mc', q: "Trong hệ màu HSL, chữ S (Saturation) đại diện cho cái gì?", a: "Độ bão hòa (Độ rực màu)", o: ["Độ sáng", "Sắc thái màu", "Độ trong suốt"], e: "100% là rực rỡ, 0% là xám." },
  { subject: 'css', type: 'mc', q: "Trong hệ màu HSL, chữ L (Lightness) đại diện cho cái gì?", a: "Độ sáng", o: ["Độ bão hòa", "Màu sắc", "Độ mờ"], e: "0% đen, 100% trắng." },
  { subject: 'css', type: 'text', q: "Mã Hex rút gọn của `#FF0000` là gì?", a: "#F00", e: "Rút gọn khi 2 ký tự giống nhau." },
  { subject: 'css', type: 'text', q: "Mã Hex rút gọn của `#00FF00` là gì?", a: "#0F0", e: "Màu xanh lá." },

  // --- MẠNG MÁY TÍNH: OSI, TOPOLOGY & PHẦN CỨNG ---
  { subject: 'network', type: 'mc', q: "Mô hình OSI có bao nhiêu tầng?", a: "7 tầng", o: ["4 tầng", "5 tầng", "6 tầng"], e: "Từ Physical đến Application." },
  { subject: 'network', type: 'text', q: "Tầng 1 của OSI là gì? (Tiếng Anh)", a: "Physical", e: "Tầng Vật lý." },
  { subject: 'network', type: 'text', q: "Tầng 2 của OSI là gì? (Tiếng Anh)", a: "Data Link", e: "Tầng Liên kết dữ liệu." },
  { subject: 'network', type: 'text', q: "Tầng 3 của OSI là gì? (Tiếng Anh)", a: "Network", e: "Tầng Mạng." },
  { subject: 'network', type: 'text', q: "Tầng 4 của OSI là gì? (Tiếng Anh)", a: "Transport", e: "Tầng Giao vận." },
  { subject: 'network', type: 'text', q: "Tầng 7 của OSI là gì? (Tiếng Anh)", a: "Application", e: "Tầng Ứng dụng." },
  { subject: 'network', type: 'mc', q: "Dữ liệu tại tầng Transport được gọi là gì?", a: "Segment (Đoạn)", o: ["Packet", "Frame", "Bit"], e: "TCP chia nhỏ dữ liệu thành Segment." },
  { subject: 'network', type: 'mc', q: "Dữ liệu tại tầng Network được gọi là gì?", a: "Packet (Gói)", o: ["Segment", "Frame", "Bit"], e: "Thêm địa chỉ IP thành Packet." },
  { subject: 'network', type: 'mc', q: "Dữ liệu tại tầng Data Link được gọi là gì?", a: "Frame (Khung)", o: ["Packet", "Segment", "Bit"], e: "Thêm MAC thành Frame." },
  { subject: 'network', type: 'mc', q: "Thiết bị nào có chức năng 'Biến điệu' và 'Giải điều chế'?", a: "Modem", o: ["Router", "Switch", "Hub"], e: "Modulator & Demodulator." },
  { subject: 'network', type: 'mc', q: "Cấu trúc mạng nào có một thiết bị trung tâm (Hub/Switch)?", a: "Hình Sao (Star)", o: ["Hình Tuyến (Bus)", "Hình Vòng (Ring)", "Hình Lưới"], e: "Phổ biến nhất hiện nay." },
  { subject: 'network', type: 'mc', q: "Cấu trúc mạng nào dùng chung một dây cáp trục chính?", a: "Hình Tuyến (Bus)", o: ["Hình Sao", "Hình Vòng", "Hình Lưới"], e: "Tiết kiệm dây nhưng dễ sập." },
  { subject: 'network', type: 'mc', q: "Cấu trúc mạng nào kết nối thành vòng tròn khép kín?", a: "Hình Vòng (Ring)", o: ["Hình Sao", "Hình Tuyến", "Hình Lưới"], e: "Dùng thẻ bài Token." },
  { subject: 'network', type: 'mc', q: "Cấu trúc mạng nào kết nối chằng chịt, đảm bảo an toàn nhất?", a: "Hình Lưới (Mesh)", o: ["Hình Sao", "Hình Tuyến", "Hình Vòng"], e: "Internet dùng Mesh." },
  { subject: 'network', type: 'mc', q: "Quy trình kết nối TCP gồm mấy bước?", a: "3 bước (3-way handshake)", o: ["2 bước", "4 bước", "1 bước"], e: "SYN -> SYN-ACK -> ACK." },
  { subject: 'network', type: 'mc', q: "Trong TCP, cờ SYN dùng để làm gì?", a: "Yêu cầu kết nối (đồng bộ)", o: ["Xác nhận", "Kết thúc", "Hủy bỏ"], e: "Synchronize." },
  { subject: 'network', type: 'mc', q: "Trong TCP, cờ ACK dùng để làm gì?", a: "Xác nhận đã nhận (Acknowledge)", o: ["Yêu cầu", "Kết thúc", "Khởi động"], e: "Acknowledge." },

  // --- AI & TRÍ TUỆ NHÂN TẠO: CHI TIẾT ---
  { subject: 'ai', type: 'mc', q: "Sự kiện nào năm 1956 khai sinh ra thuật ngữ AI?", a: "Hội thảo Dartmouth", o: ["Hội nghị Turing", "Hội thảo Stanford", "Sự kiện Google"], e: "Tại ĐH Dartmouth, Mỹ." },
  { subject: 'ai', type: 'mc', q: "Hệ chuyên gia MYCIN ra đời năm nào?", a: "1972", o: ["1956", "1990", "2000"], e: "Tại ĐH Stanford." },
  { subject: 'ai', type: 'mc', q: "Robot Asimo của Honda ra đời năm nào?", a: "1986", o: ["2000", "1990", "2010"], e: "Biểu tượng robot hình người." },
  { subject: 'ai', type: 'mc', q: "Google Dịch ra mắt năm nào?", a: "2006", o: ["2010", "2000", "1998"], e: "Ứng dụng xử lý ngôn ngữ." },
  { subject: 'ai', type: 'mc', q: "Loại AI nào chỉ giỏi một việc cụ thể (ví dụ chơi cờ)?", a: "AI Hẹp (Weak AI)", o: ["AI Tổng quát", "AI Siêu việt", "AI Tạo sinh"], e: "Phổ biến hiện nay." },
  { subject: 'ai', type: 'mc', q: "Loại AI nào có trí tuệ toàn diện như con người (chưa đạt được)?", a: "AI Tổng quát (Strong AI)", o: ["AI Hẹp", "AI Yếu", "Machine Learning"], e: "Mục tiêu tương lai." },
  { subject: 'ai', type: 'mc', q: "Loại AI nào có khả năng SÁNG TẠO nội dung mới (vẽ tranh, viết văn)?", a: "AI Tạo sinh (Generative AI)", o: ["AI Phân biệt", "AI Hẹp", "Robot"], e: "Ví dụ ChatGPT, Midjourney." },
  { subject: 'ai', type: 'mc', q: "Loại AI nào dùng để PHÂN LOẠI (ví dụ: đây là chó hay mèo)?", a: "AI Phân biệt (Discriminative AI)", o: ["AI Tạo sinh", "AI Tổng quát", "Chatbot"], e: "Công nghệ cũ hơn." },
  { subject: 'ai', type: 'text', q: "Phương pháp học máy nào cần dữ liệu CÓ NHÃN (ví dụ ảnh có ghi chú 'mèo')? (Tiếng Anh)", a: "Supervised Learning", e: "Học có giám sát." },
  { subject: 'ai', type: 'text', q: "Phương pháp học máy nào tự tìm quy luật từ dữ liệu KHÔNG NHÃN? (Tiếng Anh)", a: "Unsupervised Learning", e: "Học không giám sát." },
  { subject: 'ai', type: 'text', q: "Phương pháp học máy nào dựa trên Thưởng và Phạt? (Tiếng Anh)", a: "Reinforcement Learning", e: "Học tăng cường." },
  { subject: 'ai', type: 'mc', q: "Trong mạng nơ-ron, lớp nào gây ra vấn đề 'Hộp đen'?", a: "Lớp ẩn (Hidden Layers)", o: ["Lớp đầu vào", "Lớp đầu ra", "Lớp ngoài"], e: "Nơi xử lý phức tạp bí ẩn." },
  { subject: 'ai', type: 'tf', q: "ĐÚNG hay SAI: ChatGPT hoạt động dựa trên việc dự đoán từ tiếp theo?", a: "Đúng", o: ["Sai"], e: "Next Token Prediction." },
  { subject: 'ai', type: 'tf', q: "ĐÚNG hay SAI: Dữ liệu huấn luyện bị sai lệch sẽ dẫn đến AI có định kiến?", a: "Đúng", o: ["Sai"], e: "Garbage In, Garbage Out." },

  // --- BẢO MẬT & AN NINH MẠNG: CÁC LOẠI TẤN CÔNG & PHÒNG THỦ ---
  { subject: 'network', type: 'mc', q: "Tấn công làm quá tải hệ thống bằng hàng loạt yêu cầu giả gọi là gì?", a: "DDoS", o: ["Phishing", "Malware", "SQL Injection"], e: "Distributed Denial of Service." },
  { subject: 'network', type: 'mc', q: "Mạng lưới các máy tính bị nhiễm mã độc do hacker điều khiển gọi là gì?", a: "Botnet", o: ["Internet", "Intranet", "Ethernet"], e: "Dùng để tấn công DDoS." },
  { subject: 'network', type: 'mc', q: "Loại mã độc nào ngụy trang thành phần mềm hợp pháp?", a: "Trojan", o: ["Virus", "Worm", "Spyware"], e: "Ngựa gỗ thành Troy." },
  { subject: 'network', type: 'mc', q: "Loại mã độc nào tự lây lan qua mạng mà không cần vật chủ?", a: "Worm (Sâu)", o: ["Virus", "Trojan", "Adware"], e: "Tự nhân bản." },
  { subject: 'network', type: 'mc', q: "Tấn công giả mạo trang web để lừa lấy mật khẩu gọi là gì?", a: "Phishing", o: ["DDoS", "Spoofing", "Sniffing"], e: "Câu cá lừa đảo." },
  { subject: 'sql', type: 'mc', q: "Tấn công chèn mã lệnh vào ô nhập liệu để thao tác database gọi là gì?", a: "SQL Injection", o: ["XSS", "CSRF", "DDoS"], e: "Ví dụ ' OR '1'='1." },
  { subject: 'network', type: 'mc', q: "Tấn công đứng giữa nghe lén trong mạng LAN gọi là gì?", a: "Man-in-the-Middle", o: ["DDoS", "Phishing", "Brute Force"], e: "Thường dùng ARP Spoofing." },
  { subject: 'network', type: 'mc', q: "Firewall thế hệ 1 lọc gói tin dựa trên cái gì?", a: "IP và Port (Bìa thư)", o: ["Nội dung gói tin", "Trạng thái kết nối", "Virus"], e: "Packet Filtering." },
  { subject: 'network', type: 'mc', q: "Firewall thế hệ 2 có tính năng gì nổi bật?", a: "Kiểm tra trạng thái (Stateful Inspection)", o: ["Quét virus", "Lọc ứng dụng", "Chặn DDOS"], e: "Ghi nhớ kết nối." },
  { subject: 'network', type: 'mc', q: "Firewall thế hệ 3 (NGFW) có khả năng gì?", a: "Kiểm tra sâu gói tin (DPI) và lọc ứng dụng", o: ["Chỉ lọc IP", "Chỉ chặn cổng", "Không cần cập nhật"], e: "Đọc nội dung thư." },

  // --- CÁC CHI TIẾT NHỎ & THÚ VỊ KHÁC ---
  { subject: 'ai', type: 'text', q: "Siêu máy tính Deep Blue đánh bại vua cờ Kasparov năm nào? (Ngoài lề)", a: "1997", e: "Sự kiện lịch sử AI." }, // Kiến thức phổ biến liên quan
  { subject: 'network', type: 'text', q: "Chuẩn Wifi 6 có tên kỹ thuật là gì? (IEEE 802.11...)", a: "ax", e: "IEEE 802.11ax." },
  { subject: 'network', type: 'text', q: "Cáp mạng LAN thông thường sử dụng đầu nối chuẩn gì?", a: "RJ45", e: "Kiến thức thực tế." },
  { subject: 'html', type: 'tf', q: "ĐÚNG hay SAI: Thẻ <canvas> tự nó có thể vẽ hình mà không cần Javascript?", a: "Sai", o: ["Đúng"], e: "Nó chỉ là khung tranh, cần JS làm bút vẽ." },
  { subject: 'css', type: 'tf', q: "ĐÚNG hay SAI: `display: none` sẽ xóa phần tử khỏi DOM?", a: "Sai", o: ["Đúng"], e: "Nó vẫn trong DOM, chỉ là không hiển thị." },
  { subject: 'network', type: 'tf', q: "ĐÚNG hay SAI: HTTPS sử dụng cổng 80?", a: "Sai", o: ["Đúng"], e: "Cổng 443. Cổng 80 là HTTP." },
  { subject: 'ai', type: 'tf', q: "ĐÚNG hay SAI: AI hiện tại đã có cảm xúc thực sự?", a: "Sai", o: ["Đúng"], e: "Chưa có AI nào có cảm xúc." },

  // --- CÁC CÂU HỎI VỀ ĐẠO ĐỨC & XÃ HỘI ---
  { subject: 'ai', type: 'mc', q: "Rủi ro 'Bias' trong AI nghĩa là gì?", a: "Sự thiên kiến/định kiến trong ra quyết định", o: ["Lỗi phần mềm", "Tốc độ chậm", "Tốn điện"], e: "Do dữ liệu đầu vào không công bằng." },
  { subject: 'ai', type: 'mc', q: "Vấn đề 'Deepfake' liên quan chủ yếu đến rủi ro nào?", a: "Xâm phạm quyền riêng tư và tin giả", o: ["Thất nghiệp", "An ninh mạng", "Lỗi phần cứng"], e: "Ghép mặt trái phép." },
  { subject: 'ai', type: 'mc', q: "Trong tương lai, AI được dự báo sẽ thay thế con người ở những công việc nào?", a: "Công việc lặp lại và nguy hiểm", o: ["Mọi công việc", "Chỉ công việc sáng tạo", "Không thay thế gì cả"], e: "Tự động hóa giúp giải phóng sức lao động." },
  { subject: 'ai', type: 'tf', q: "ĐÚNG hay SAI: Hacker có thể tấn công AI bằng cách làm nhiễu dữ liệu đầu vào?", a: "Đúng", o: ["Sai"], e: "Adversarial Attack." },
  
  // --- TỔNG HỢP KIẾN THỨC CỐT LÕI CUỐI CÙNG ---
  { subject: 'html', type: 'text', q: "Thẻ <script> nên đặt ở đâu để tối ưu tốc độ tải trang?", a: "Cuối thẻ <body>", e: "Để HTML hiển thị trước rồi mới tải JS." },
  { subject: 'css', type: 'text', q: "Muốn ưu tiên CSS cho thiết bị di động trước, ta dùng từ khóa gì? (Tiếng Anh)", a: "Mobile-first", e: "Thiết kế cho màn hình nhỏ trước." },
  { subject: 'network', type: 'text', q: "Địa chỉ IP đặc biệt `127.0.0.1` được gọi là gì? (Tiếng Anh)", a: "Localhost", e: "Địa chỉ loopback của chính máy đó." },
  { subject: 'network', type: 'text', q: "VPN là viết tắt của từ gì? (Tiếng Anh)", a: "Virtual Private Network", e: "Mạng riêng ảo." },
  { subject: 'ai', type: 'text', q: "GPU là viết tắt của từ gì? (Tiếng Anh)", a: "Graphics Processing Unit", e: "Bộ xử lý đồ họa, rất quan trọng để chạy AI." },
  // ========================================================================
  // PHẦN CUỐI CÙNG: 48 CÂU VỀ ĐÍCH (HTML - CSS - MẠNG - AI)
  // ========================================================================

  // --- HTML & FORM: CÁC CHI TIẾT CÒN LẠI ---
  { subject: 'html', type: 'mc', q: "Thẻ <input type='reset'> có tác dụng gì trong Form?", a: "Xóa toàn bộ dữ liệu người dùng vừa nhập về trạng thái ban đầu.", o: ["Gửi dữ liệu đi.", "Tắt form.", "Làm mới trang web."], e: "Nút Reset giúp người dùng nhập lại từ đầu nếu sai quá nhiều." },
  { subject: 'html', type: 'mc', q: "Thẻ <input type='date'> hiển thị giao diện gì?", a: "Một bộ lịch để chọn ngày tháng năm.", o: ["Một đồng hồ.", "Một bản đồ.", "Một ô nhập văn bản thường."], e: "Định dạng hiển thị thường là mm/dd/yyyy." },
  { subject: 'html', type: 'mc', q: "Thẻ <input type='file'> cho phép người dùng làm gì?", a: "Mở File Explorer để chọn tệp tin từ máy tính tải lên.", o: ["Tạo file mới.", "Xóa file.", "Đổi tên file."], e: "Nút thường có tên là 'Choose File' ." },
  { subject: 'html', type: 'text', q: "Thuộc tính `for` trong thẻ <label> dùng để liên kết với thuộc tính nào của thẻ <input>? (Tiếng Anh)", a: "id", e: "Khi nhấm vào nhãn, ô input có id tương ứng sẽ được focus." },
  { subject: 'html', type: 'text', q: "Thẻ <legend> được sử dụng bên trong thẻ nào để tạo tiêu đề cho nhóm form? (Tiếng Anh)", a: "<fieldset>", e: "<fieldset> gom nhóm, <legend> đặt tên nhóm." },
  { subject: 'html', type: 'tf', q: "ĐÚNG hay SAI: Thẻ <select> cho phép chọn nhiều phương án nếu thêm thuộc tính `multiple`?", a: "Đúng", o: ["Sai"], e: "Người dùng có thể giữ Ctrl để chọn nhiều option." },
  { subject: 'html', type: 'tf', q: "ĐÚNG hay SAI: Giá trị của thuộc tính `name` chính là 'chìa khóa' để server nhận diện dữ liệu?", a: "Đúng", o: ["Sai"], e: "Ví dụ: name='user' -> server nhận biến 'user'." },

  // --- CSS: CÁC THUỘC TÍNH HIỂN THỊ & VỊ TRÍ ---
  { subject: 'css', type: 'mc', q: "Thuộc tính `overflow: hidden` có tác dụng gì?", a: "Ẩn phần nội dung bị tràn ra ngoài kích thước của phần tử cha.", o: ["Tạo thanh cuộn.", "Hiển thị nội dung tràn.", "Xóa nội dung."], e: "Thường dùng để cắt ảnh hoặc sửa lỗi float." },
  { subject: 'css', type: 'mc', q: "Thuộc tính `overflow: scroll` có tác dụng gì?", a: "Luôn hiển thị thanh cuộn (ngang/dọc) kể cả khi nội dung không tràn.", o: ["Ẩn thanh cuộn.", "Chỉ hiện khi cần thiết.", "Không làm gì cả."], e: "Khác với `auto` (chỉ hiện khi cần)." },
  { subject: 'css', type: 'mc', q: "Giá trị `position: absolute` định vị phần tử dựa trên cái gì?", a: "Dựa trên phần tử cha gần nhất có thuộc tính position (khác static).", o: ["Luôn dựa trên màn hình.", "Dựa trên dòng văn bản.", "Dựa trên chính nó."], e: "Nếu không có cha nào có position, nó sẽ dựa theo body." },
  { subject: 'css', type: 'mc', q: "Giá trị `position: fixed` định vị phần tử dựa trên cái gì?", a: "Dựa trên cửa sổ trình duyệt (viewport), luôn đứng yên khi cuộn trang.", o: ["Dựa trên phần tử cha.", "Dựa trên đầu trang.", "Dựa trên cuối trang."], e: "Thường dùng làm menu cố định hoặc nút 'Back to top'." },
  { subject: 'css', type: 'text', q: "Thuộc tính nào dùng để làm mờ (trong suốt) một phần tử? (Tiếng Anh)", a: "opacity", e: "Giá trị từ 0 (trong suốt) đến 1 (rõ nhất)." },
  { subject: 'css', type: 'text', q: "Thuộc tính `cursor: pointer` biến con trỏ chuột thành hình gì?", a: "Bàn tay", e: "Thường dùng cho nút bấm hoặc liên kết để báo hiệu có thể click." },
  { subject: 'css', type: 'tf', q: "ĐÚNG hay SAI: `z-index` càng lớn thì phần tử càng nằm dưới?", a: "Sai", o: ["Đúng"], e: "Càng lớn càng nằm trên (gần mắt người xem hơn)." },

  // --- MẠNG MÁY TÍNH: CHI TIẾT LỆNH & GIAO THỨC ---
  { subject: 'network', type: 'mc', q: "Lệnh `ipconfig /all` khác gì với `ipconfig` thường?", a: "Hiển thị chi tiết hơn, bao gồm cả địa chỉ MAC (Physical Address) và DNS Server.", o: ["Chỉ hiện IP.", "Reset lại mạng.", "Đổi IP."], e: "Dùng khi cần xem MAC address." },
  { subject: 'network', type: 'mc', q: "Địa chỉ `127.0.0.1` (Localhost) dùng để làm gì?", a: "Để máy tính tự kết nối với chính nó (kiểm tra card mạng hoạt động không).", o: ["Kết nối Google.", "Kết nối máy in.", "Hack mạng."], e: "Gọi là địa chỉ Loopback." },
  { subject: 'network', type: 'text', q: "Giao thức nào cho phép ta ánh xạ ổ đĩa mạng (Map Network Drive)? (Viết tắt)", a: "SMB", e: "Server Message Block dùng để chia sẻ file/in ấn ." },
  { subject: 'network', type: 'text', q: "Trên Windows, để mở cửa sổ 'Run' ta dùng tổ hợp phím nào? (Phím chữ)", a: "Windows + R", e: "Sau đó gõ lệnh ping hoặc ipconfig." },
  { subject: 'network', type: 'tf', q: "ĐÚNG hay SAI: Cáp quang (Fiber Optic) bị nhiễu bởi sóng điện từ (nam châm, điện)?", a: "Sai", o: ["Đúng"], e: "Vì nó truyền ánh sáng (thủy tinh/nhựa), không dẫn điện." },
  { subject: 'network', type: 'tf', q: "ĐÚNG hay SAI: Mạng Mesh (Lưới) tốn kém nhất về chi phí dây cáp?", a: "Đúng", o: ["Sai"], e: "Vì các máy nối chằng chịt với nhau." },
  { subject: 'network', type: 'mc', q: "Trong mô hình Client-Server, ai là người cung cấp dịch vụ?", a: "Server (Máy chủ)", o: ["Client (Máy khách)", "Switch", "Hub"], e: "Client gửi yêu cầu, Server trả lời." },

  // --- AI & CÔNG NGHỆ: LỊCH SỬ & KHÁI NIỆM ---
  { subject: 'ai', type: 'mc', q: "Trước khi có Deep Learning, hệ thống AI như MYCIN được gọi là gì?", a: "Hệ chuyên gia (Expert System) hoặc Rule-based AI.", o: ["Neural Network.", "Generative AI.", "Weak AI."], e: "Dựa trên luật do người nạp vào ." },
  { subject: 'ai', type: 'mc', q: "Siêu máy tính Deep Blue của IBM nổi tiếng vì điều gì?", a: "Đánh bại vua cờ vua Garry Kasparov năm 1997.", o: ["Đánh bại cờ vây.", "Lái xe tự động.", "Viết văn."], e: "Cột mốc máy tính thắng con người ở môn trí tuệ." },
  { subject: 'ai', type: 'text', q: "Thuật ngữ 'Big Data' nghĩa là gì? (Tiếng Việt)", a: "Dữ liệu lớn", e: "Nguồn nhiên liệu để huấn luyện AI." },
  { subject: 'ai', type: 'text', q: "GPU (Card đồ họa) quan trọng với AI vì nó giỏi làm việc gì? (Tính toán...)", a: "Tính toán song song", e: "Xử lý hàng nghìn phép tính cùng lúc, tốt cho ma trận của AI." },
  { subject: 'ai', type: 'tf', q: "ĐÚNG hay SAI: AI có thể tự chịu trách nhiệm pháp lý nếu gây tai nạn?", a: "Sai", o: ["Đúng"], e: "Hiện tại luật pháp quy trách nhiệm cho con người (nhà sản xuất/người dùng)." },

  // --- AN NINH MẠNG: CÁC KHÁI NIỆM CUỐI ---
  { subject: 'network', type: 'mc', q: "Hành động 'Scan Port' (Quét cổng) của hacker nhằm mục đích gì?", a: "Tìm xem máy chủ đang mở những cổng nào (dịch vụ gì) để tìm lỗ hổng tấn công.", o: ["Làm sập máy.", "Ăn cắp mật khẩu ngay lập tức.", "Gửi virus."], e: "Ví dụ thấy cổng 23 mở là biết có thể tấn công Telnet." },
  { subject: 'network', type: 'mc', q: "VPN (Mạng riêng ảo) giúp bảo vệ người dùng như thế nào khi dùng Wifi công cộng?", a: "Mã hóa toàn bộ dữ liệu truyền đi, khiến hacker nghe lén chỉ thấy rác.", o: ["Tăng tốc độ wifi.", "Chặn quảng cáo.", "Diệt virus."], e: "Tạo đường hầm an toàn (Tunnel)." },
  { subject: 'network', type: 'text', q: "Giao thức nào dùng để quản lý, giám sát thiết bị mạng từ xa? (Viết tắt)", a: "SNMP", e: "Simple Network Management Protocol." },
  { subject: 'network', type: 'tf', q: "ĐÚNG hay SAI: Đặt mật khẩu '123456' là an toàn nếu máy tính có Firewall?", a: "Sai", o: ["Đúng"], e: "Firewall không chặn được việc đăng nhập đúng mật khẩu. Hacker có thể đoán ra ngay." },

  // --- CÁC CÂU HỎI TỔNG HỢP (Review) ---
  { subject: 'css', type: 'mc', q: "Để reset toàn bộ margin và padding của trình duyệt về 0, ta dùng selector nào?", a: "* (Universal Selector)", o: ["body", "html", "div"], e: "*{ margin: 0; padding: 0; }" },
  { subject: 'css', type: 'mc', q: "Đơn vị `vw` (viewport width) tương ứng với cái gì?", a: "1% chiều rộng của cửa sổ trình duyệt.", o: ["1% chiều rộng trang in.", "1 pixel.", "100 pixel."], e: "50vw là một nửa màn hình." },
  { subject: 'html', type: 'text', q: "Thẻ <meta charset='UTF-8'> có tác dụng gì? (Hiển thị...)", a: "Hiển thị tiếng Việt", e: "Bảng mã ký tự hỗ trợ đa ngôn ngữ." },
  { subject: 'html', type: 'text', q: "Thuộc tính `lang='vi'` trong thẻ <html> dùng để làm gì?", a: "Khai báo ngôn ngữ trang web là tiếng Việt", e: "Giúp công cụ tìm kiếm và trình đọc màn hình hiểu." },
  { subject: 'network', type: 'text', q: "Lệnh `shutdown -s -t 0` trên Windows dùng để làm gì?", a: "Tắt máy ngay lập tức", e: "Hẹn giờ tắt máy." },
  { subject: 'network', type: 'text', q: "Phím tắt `F5` trên trình duyệt dùng để làm gì?", a: "Tải lại trang (Refresh)", e: "Ctrl + F5 là tải lại và xóa cache." },
  { subject: 'network', type: 'mc', q: "Cổng 8080 thường được dùng làm gì?", a: "Cổng thay thế cho Web Server (Proxy, Testing).", o: ["FTP.", "Email.", "DNS."], e: "Thường gặp khi chạy web server cục bộ." },
  { subject: 'network', type: 'mc', q: "Địa chỉ IP `192.168.x.x` thuộc lớp mạng nào?", a: "Mạng nội bộ (Private IP - Class C).", o: ["Mạng công cộng.", "Mạng quân sự.", "Mạng chính phủ."], e: "Dùng trong gia đình, văn phòng." },
  { subject: 'css', type: 'text', q: "Mã màu Hex `#0000FF` là màu gì? (Tiếng Việt)", a: "Xanh dương", e: "Blue." },
  { subject: 'css', type: 'text', q: "Mã màu Hex `#FFFF00` là màu gì? (Tiếng Việt)", a: "Vàng", e: "Đỏ + Xanh lá = Vàng." },
  { subject: 'html', type: 'text', q: "Thẻ <br> là thẻ rỗng hay thẻ đôi?", a: "Thẻ rỗng", e: "Không có thẻ đóng </br>." },
  { subject: 'html', type: 'text', q: "Thẻ <div> là thẻ block hay inline?", a: "Block", e: "Chiếm toàn bộ chiều rộng." },
  { subject: 'html', type: 'text', q: "Thẻ <span> là thẻ block hay inline?", a: "Inline", e: "Chỉ chiếm diện tích nội dung." },
  { subject: 'ai', type: 'tf', q: "ĐÚNG hay SAI: AlphaGo là sản phẩm của Google DeepMind?", a: "Đúng", o: ["Sai"], e: "Chương trình chơi cờ vây nổi tiếng." },
  { subject: 'ai', type: 'tf', q: "ĐÚNG hay SAI: Siri là trợ lý ảo của Samsung?", a: "Sai", o: ["Đúng"], e: "Siri của Apple. Samsung là Bixby." },
  // ========================================================================
  // PHẦN BÙ: 3 CÂU CUỐI CÙNG (VÉT SẠCH CHI TIẾT NHỎ)
  // ========================================================================

  {
    subject: 'css',
    type: 'mc',
    q: "Thuộc tính `font-variant: small-caps` sẽ biến đổi văn bản thành dạng nào?",
    a: "Chữ IN HOA nhưng có kích thước nhỏ hơn chữ in hoa chuẩn.",
    o: ["Chữ in hoa hoàn toàn (giống uppercase).", "Chữ thường.", "Chữ cái đầu in hoa."],
    e: "Đây là kiểu chữ hoa nghệ thuật, giữ nguyên hình dáng chữ in hoa nhưng độ cao chỉ bằng chữ thường ."
  },
  {
    subject: 'html',
    type: 'text',
    q: "Thẻ HTML nào dùng để đánh dấu một biến số trong toán học hoặc lập trình? (Ví dụ: x, y, z). Viết tên thẻ.",
    a: "<var>",
    e: "Thẻ <var> (Variable) thường hiển thị chữ nghiêng để phân biệt biến số với văn bản thường ."
  },
  {
    subject: 'network',
    type: 'mc',
    q: "Trong mạng máy tính, lệnh `nslookup` thường được dùng để làm gì? (Kiến thức thực tế liên quan đến DNS)",
    a: "Tra cứu thông tin tên miền (DNS) để tìm địa chỉ IP tương ứng.",
    o: ["Kiểm tra tốc độ mạng.", "Xem địa chỉ MAC.", "Tắt máy từ xa."],
    e: "Giúp kiểm tra xem hệ thống DNS có đang phân giải đúng tên miền thành IP hay không ."
  }
];

// --- DANH SÁCH CHỦ ĐỀ ---
const TOPICS = [
  { id: 'all', title: "TỔNG HỢP KIẾN THỨC", icon: <Sparkles size={40} />, color: "from-cyan-400 to-blue-600", border: "group-hover:border-cyan-400" },
  { id: 'color', title: "MÀU SẮC (FULL 16 MÀU)", icon: <Palette size={32} />, color: "from-fuchsia-500 to-purple-600", border: "group-hover:border-fuchsia-400" },
  { id: 'html', title: "HTML & CSS", icon: <Globe size={32} />, color: "from-orange-400 to-red-500", border: "group-hover:border-orange-400" },
  { id: 'ai', title: "Trí tuệ nhân tạo", icon: <Brain size={32} />, color: "from-pink-500 to-rose-500", border: "group-hover:border-pink-400" },
  { id: 'network', title: "Mạng máy tính", icon: <Wifi size={32} />, color: "from-emerald-400 to-cyan-500", border: "group-hover:border-emerald-400" },
  { id: 'python', title: "Lập trình Python", icon: <Code2 size={32} />, color: "from-blue-500 to-indigo-600", border: "group-hover:border-blue-400" },
  { id: 'sql', title: "Cơ sở dữ liệu", icon: <Database size={32} />, color: "from-violet-500 to-purple-600", border: "group-hover:border-violet-400" },
];

const ITQuizGame = () => {
  const [mode, setMode] = useState('menu');
  const [currentTopic, setCurrentTopic] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  // State quản lý đáp án
  const [selectedOpt, setSelectedOpt] = useState(null); // Trắc nghiệm + TF
  const [userInput, setUserInput] = useState('');       // Nhập liệu
  
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

    const preparedQuestions = questions.map(q => {
      if (q.type === 'text') return q; 
      return {
        ...q,
        options: [...(q.o || []), q.a].sort(() => Math.random() - 0.5)
      };
    });

    setShowGrid(false);
    setActiveQuestions(preparedQuestions);
    setCurrentTopic(topic);
    setCurrentQIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedOpt(null);
    setUserInput('');
    setMode('playing');
  };

  // --- XỬ LÝ TRẮC NGHIỆM & TF ---
  const handleOptionSelect = (opt) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOpt(opt);
    if (opt === activeQuestions[currentQIndex].a) setScore(s => s + 10);
  };

  // --- XỬ LÝ NHẬP LIỆU ---
  const handleSubmitText = (e) => {
    e.preventDefault();
    if (isAnswered || !userInput.trim()) return;
    
    setIsAnswered(true);
    const correctAns = activeQuestions[currentQIndex].a;
    
    // So sánh không phân biệt hoa thường
    if (userInput.trim().toLowerCase() === correctAns.toLowerCase()) {
        setScore(s => s + 10);
        setSelectedOpt('correct'); 
    } else {
        setSelectedOpt('wrong');   
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOpt(null);
      setUserInput('');
    } else {
      setMode('result');
    }
  };

  const renderColorBox = (colorCode) => {
    if (!colorCode) return null;
    return (
      <div className="flex flex-col items-center justify-center my-6 animate-in zoom-in duration-500">
        <div className="relative group">
            <div 
              className="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-white/20 transition-transform group-hover:scale-110 z-10 relative"
              style={{ backgroundColor: colorCode }}
            ></div>
            <div 
              className="absolute inset-0 rounded-full blur-xl opacity-60 -z-0" 
              style={{ backgroundColor: colorCode }}
            ></div>
        </div>
        <div className="mt-4 px-4 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 font-mono text-lg text-cyan-300">
            {colorCode}
        </div>
      </div>
    );
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
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
            <Terminal size={24} className="text-white" />
          </div>
          <h1 className="hidden md:block text-2xl md:text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
            IT QUIZ PRO
          </h1>
        </div>
        <div className="flex items-center gap-4">
            {mode === 'playing' && (
                <button onClick={() => setMode('menu')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-sm font-bold text-slate-300">
                    <ChevronLeft size={18}/> Menu
                </button>
            )}
            <button onClick={() => setShowGrid(true)} className="p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <LayoutGrid size={24} />
            </button>
        </div>
      </header>

      {/* GRID OVERLAY MENU */}
      {showGrid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowGrid(false)}></div>
            <div className="relative z-10 w-full max-w-5xl bg-[#0a0a1a] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-90 duration-300 overflow-y-auto max-h-[90vh]">
                <button onClick={() => setShowGrid(false)} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400"><X size={24} /></button>
                <h2 className="text-3xl font-black mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">Chọn chủ đề</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {TOPICS.map((topic) => (
                        <div key={topic.id} onClick={() => startExam(topic)} className={cn("group relative aspect-square rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:shadow-xl", topic.color.replace('from-', 'hover:shadow-'))}>
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
        
        {/* === MENU MODE === */}
        {mode === 'menu' && (
          <div className="w-full flex flex-col gap-12 animate-in fade-in duration-1000">
            <div className="text-center px-4">
                <h2 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">Dòng chảy Tri thức</h2>
                <p className="text-cyan-200/60 text-lg uppercase tracking-[0.3em] font-bold">Chọn chủ đề để khởi hành</p>
            </div>
            
            {/* === MARQUEE ANIMATION (DI CHUYỂN TỰ ĐỘNG) === */}
            <div className="relative w-full py-10 group/track overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#050511] to-transparent z-10"></div>
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#050511] to-transparent z-10"></div>
                
                <div className="flex w-max gap-8 animate-scroll group-hover/track:pause px-8">
                    {[...TOPICS, ...TOPICS].map((topic, index) => (
                        <div key={`${topic.id}-${index}`} onClick={() => startExam(topic)} className={cn("relative w-72 h-72 shrink-0 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md p-8 cursor-pointer transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] group overflow-hidden flex flex-col justify-between", topic.border)}>
                            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br", topic.color)}></div>
                            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-white/5 shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-300 z-10", topic.color.replace('from-', 'bg-'))}>{topic.icon}</div>
                            <div className="relative z-10 mt-auto">
                                <h3 className="text-2xl font-bold leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all">{topic.title}</h3>
                                <div className="h-1 w-0 bg-cyan-400 mt-3 group-hover:w-full transition-all duration-500 ease-out"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* === PLAYING MODE === */}
        {mode === 'playing' && (
          <div className="w-full max-w-4xl mx-auto animate-in zoom-in-95 duration-300 px-4 relative z-30">
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              
              <div className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-500" 
                   style={{width: `${((currentQIndex + 1) / activeQuestions.length) * 100}%`}}></div>
              
              <div className="mb-6 flex justify-between text-base font-bold text-slate-400 uppercase tracking-widest">
                <span className="text-cyan-400">Câu {currentQIndex + 1} / {activeQuestions.length}</span>
                <span className="flex items-center gap-2"><Trophy size={18} className="text-yellow-500"/> {score} Điểm</span>
              </div>

              {/* VISUALIZER CHO MÀU SẮC */}
              {activeQuestions[currentQIndex].colorCode && (
                 renderColorBox(activeQuestions[currentQIndex].colorCode)
              )}

              <h3 className="text-2xl md:text-3xl font-black mb-8 leading-snug drop-shadow-md text-center">
                {activeQuestions[currentQIndex].q}
              </h3>

              {/* === LOGIC RENDER: TEXT / MC / TF === */}
              
              {/* TRƯỜNG HỢP 1: NHẬP LIỆU (TEXT) */}
              {activeQuestions[currentQIndex].type === 'text' ? (
                <form onSubmit={handleSubmitText} className="w-full max-w-lg mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            disabled={isAnswered}
                            placeholder="Nhập đáp án..."
                            className={cn(
                                "w-full bg-black/30 border-2 rounded-2xl p-5 pl-12 text-xl md:text-2xl font-bold outline-none transition-all placeholder:text-white/20 text-center",
                                isAnswered 
                                    ? selectedOpt === 'correct' 
                                        ? "border-green-500 text-green-400 bg-green-900/20" 
                                        : "border-red-500 text-red-400 bg-red-900/20"
                                    : "border-white/20 focus:border-cyan-500 focus:bg-black/50"
                            )}
                            autoFocus
                        />
                        <Keyboard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={24}/>
                        {isAnswered && selectedOpt === 'correct' && <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={28} />}
                        {isAnswered && selectedOpt === 'wrong' && <X className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" size={28} />}
                    </div>
                    {!isAnswered && (
                        <button type="submit" className="w-full mt-4 py-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold uppercase tracking-widest transition-all">
                            Kiểm tra
                        </button>
                    )}
                </form>

              ) : (
                // TRƯỜNG HỢP 2 & 3: TRẮC NGHIỆM (MC) VÀ ĐÚNG/SAI (TF)
                <div className={cn("grid gap-4 mb-8", activeQuestions[currentQIndex].type === 'tf' ? "grid-cols-2" : "grid-cols-1")}>
                    {activeQuestions[currentQIndex].options.map((opt, i) => {
                        const isSelected = opt === selectedOpt;
                        const isCorrect = opt === activeQuestions[currentQIndex].a;
                        let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30";
                        
                        if (isAnswered) {
                            if (isCorrect) btnClass = "bg-green-500/20 border-green-500 text-green-300";
                            else if (isSelected) btnClass = "bg-red-500/20 border-red-500 text-red-300";
                            else btnClass = "bg-white/5 opacity-50";
                        }

                        return (
                            <button key={i} disabled={isAnswered} onClick={() => handleOptionSelect(opt)}
                            className={cn("w-full p-5 rounded-2xl border text-left text-lg font-bold transition-all flex justify-between items-center group shadow-md", btnClass)}>
                            <span>{opt}</span>
                            {isAnswered && isCorrect && <Check size={24} className="text-green-400 shrink-0 ml-3" />}
                            {isAnswered && isSelected && !isCorrect && <X size={24} className="text-red-400 shrink-0 ml-3" />}
                            </button>
                        );
                    })}
                </div>
              )}

              {/* GIẢI THÍCH VÀ NEXT */}
              {isAnswered && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={cn("mb-6 p-6 rounded-2xl border", selectedOpt === 'correct' || (activeQuestions[currentQIndex].type !== 'text' && selectedOpt === activeQuestions[currentQIndex].a) ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30")}>
                    <div className="flex items-center gap-2 mb-2 font-bold uppercase text-xs tracking-wider opacity-80">
                      <Lightbulb size={18} /> {selectedOpt === 'correct' || (activeQuestions[currentQIndex].type !== 'text' && selectedOpt === activeQuestions[currentQIndex].a) ? "Chính xác!" : `Đáp án đúng: ${activeQuestions[currentQIndex].a}`}
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

        {/* === RESULT MODE === */}
        {mode === 'result' && (
          <div className="text-center animate-in zoom-in-90 duration-300 max-w-2xl w-full mx-auto relative z-30">
            <div className="bg-white/5 border border-white/10 p-12 md:p-16 rounded-[4rem] backdrop-blur-xl relative overflow-hidden">
              <Trophy size={100} className="mx-auto text-yellow-400 mb-8 drop-shadow-[0_0_25px_rgba(250,204,21,0.6)]" />
              <h2 className="text-3xl md:text-5xl font-black mb-4">Hoàn thành!</h2>
              <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-300 mb-4">
                {score}
              </div>
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
        /* Ẩn thanh cuộn nhưng vẫn cho phép cuộn */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default ITQuizGame;
