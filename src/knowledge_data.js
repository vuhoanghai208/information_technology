// knowledge_data.js

export const KNOWLEDGE_DB = [
  // ==================== HTML ====================
  {
    id: 'html-1',
    term: '<!DOCTYPE html>',
    category: 'HTML',
    desc: 'Khai báo cho trình duyệt biết đây là file HTML5.',
    code: '<!DOCTYPE html>'
  },
  {
    id: 'html-2',
    term: '<a>',
    category: 'HTML',
    desc: 'Thẻ tạo liên kết (Anchor). Href là địa chỉ muốn đến.',
    code: '<a href="https://google.com" target="_blank">Google</a>'
  },
  {
    id: 'html-3',
    term: '<table>',
    category: 'HTML',
    desc: 'Thẻ tạo bảng. Đi kèm với <tr> (hàng), <th> (tiêu đề), <td> (dữ liệu).',
    code: '<table>\n  <tr>\n    <th>Tên</th>\n    <th>Tuổi</th>\n  </tr>\n  <tr>\n    <td>Nam</td>\n    <td>18</td>\n  </tr>\n</table>'
  },
  {
    id: 'html-4',
    term: '<ul> và <ol>',
    category: 'HTML',
    desc: '<ul>: Danh sách không thứ tự (dấu chấm).\n<ol>: Danh sách có thứ tự (1, 2, 3).\n<li>: Là từng mục bên trong.',
    code: '<ul>\n  <li>Gà</li>\n  <li>Vịt</li>\n</ul>'
  },
  {
    id: 'html-5',
    term: '<form>',
    category: 'HTML',
    desc: 'Tạo biểu mẫu để gửi dữ liệu đi. Method="GET" (gửi lộ qua URL) hoặc "POST" (gửi ngầm).',
    code: '<form action="/login" method="POST">\n  ...\n</form>'
  },
  {
    id: 'html-6',
    term: '<input>',
    category: 'HTML',
    desc: 'Thẻ nhập liệu đa năng. Type quyết định hình dáng.',
    code: '<input type="text"> (nhập chữ)\n<input type="password"> (ẩn ***)\n<input type="radio"> (chọn 1)\n<input type="checkbox"> (chọn nhiều)'
  },
  {
    id: 'html-7',
    term: '<dl>, <dt>, <dd>',
    category: 'HTML',
    desc: 'Danh sách mô tả.\n<dl>: Bao ngoài.\n<dt>: Từ cần định nghĩa.\n<dd>: Lời giải thích.',
    code: '<dl>\n  <dt>HTML</dt>\n  <dd>Là khung xương web</dd>\n</dl>'
  },
  {
    id: 'html-8',
    term: 'rowspan / colspan',
    category: 'HTML',
    desc: 'Thuộc tính của bảng.\nrowspan: Gộp nhiều hàng dọc.\ncolspan: Gộp nhiều cột ngang.',
    code: '<td colspan="2">Ô này chiếm 2 cột</td>'
  },

  // ==================== CSS ====================
  {
    id: 'css-1',
    term: 'margin vs padding',
    category: 'CSS',
    desc: 'Margin: Khoảng cách bên NGOÀI viền (đẩy đối tượng khác ra xa).\nPadding: Khoảng cách bên TRONG viền (làm mập đối tượng lên).',
    code: 'margin: 10px;\npadding: 20px;'
  },
  {
    id: 'css-2',
    term: 'display: flex',
    category: 'CSS',
    desc: 'Biến thẻ cha thành "dẻo", giúp dàn trang con nằm ngang dọc tùy ý cực dễ.',
    code: 'display: flex;\njustify-content: center; (căn giữa ngang)\nalign-items: center; (căn giữa dọc)'
  },
  {
    id: 'css-3',
    term: 'position',
    category: 'CSS',
    desc: 'Quy định vị trí:\n- relative: So với chính nó.\n- absolute: So với cha (cần cha có relative).\n- fixed: Dính chặt vào màn hình (như nút Chat).',
    code: 'position: absolute;\ntop: 0; left: 0;'
  },
  {
    id: 'css-4',
    term: 'Mức độ ưu tiên (Specificity)',
    category: 'CSS',
    desc: 'Thứ tự mạnh yếu khi tranh chấp style:\n!important > Inline Style > ID (#) > Class (.) > Tag (div)',
    code: '#id { color: red; } /* Thắng */\n.class { color: blue; } /* Thua */'
  },
  {
    id: 'css-5',
    term: ':hover',
    category: 'CSS',
    desc: 'Pseudo-class (lớp giả). Kích hoạt khi di chuột vào phần tử.',
    code: 'button:hover {\n  background: red;\n}'
  },
  {
    id: 'css-6',
    term: 'Đơn vị đo (px, rem, %)',
    category: 'CSS',
    desc: '- px: Cố định (pixel).\n- rem: Theo cỡ chữ gốc của HTML (thường là 16px).\n- %: Theo kích thước thẻ cha.',
    code: 'font-size: 1.5rem; /* = 24px */'
  },
  {
    id: 'css-7',
    term: 'border-style',
    category: 'CSS',
    desc: 'Kiểu đường viền:\n- solid: Nét liền.\n- dashed: Nét đứt.\n- dotted: Nét chấm.\n- double: Nét đôi.',
    code: 'border: 1px solid red;'
  },

  // ==================== AI (TRÍ TUỆ NHÂN TẠO) ====================
  {
    id: 'ai-1',
    term: 'Tự động hóa vs AI',
    category: 'AI',
    desc: '- Tự động hóa: Làm việc chăm chỉ, lặp lại máy móc, không tư duy.\n- AI: Làm việc thông minh, biết học, suy luận và nhận thức.',
    code: 'Máy giặt hẹn giờ = Tự động hóa\nMáy giặt soi quần áo bẩn = AI'
  },
  {
    id: 'ai-2',
    term: 'Machine Learning (Học máy)',
    category: 'AI',
    desc: 'Thay vì viết luật (If...then), ta nạp dữ liệu cho máy tự tìm ra quy luật. Chia làm 3 loại: Có giám sát (dạy kèm), Không giám sát (tự ngẫm), Tăng cường (thưởng/phạt).',
    code: 'Dữ liệu -> Máy học -> Mô hình'
  },
  {
    id: 'ai-3',
    term: 'Hộp đen (Black Box)',
    category: 'AI',
    desc: 'Rủi ro của AI. Ta biết đầu vào và đầu ra, nhưng không biết tại sao AI lại quyết định như vậy (quá trình ở giữa bí ẩn).',
    code: 'Khó giải trình trách nhiệm khi sai sót.'
  },
  {
    id: 'ai-4',
    term: 'AI Tạo sinh (Generative AI)',
    category: 'AI',
    desc: 'AI không chỉ phân biệt (chó/mèo) mà có thể SÁNG TẠO ra cái mới (văn bản, ảnh, nhạc) dựa trên dữ liệu đã học (Ví dụ: ChatGPT).',
    code: 'Prompt: "Vẽ con mèo kiểu Van Gogh"'
  },
  {
    id: 'ai-5',
    term: 'Phép thử Turing',
    category: 'AI',
    desc: 'Bài kiểm tra năm 1950: Nếu người chat không phân biệt được đang chat với máy hay người -> Máy đó có trí tuệ.',
    code: 'Alan Turing (Cha đẻ AI)'
  },

  // ==================== MẠNG MÁY TÍNH ====================
  {
    id: 'net-1',
    term: 'IP Address',
    category: 'Network',
    desc: 'Địa chỉ nhà. Dùng để định danh thiết bị trên mạng (đổi được).',
    code: '192.168.1.1'
  },
  {
    id: 'net-2',
    term: 'MAC Address',
    category: 'Network',
    desc: 'Số Căn cước công dân. Gắn cứng vào phần cứng (card mạng), không đổi được.',
    code: 'A8:5E:45:XX:XX:XX'
  },
  {
    id: 'net-3',
    term: 'DNS',
    category: 'Network',
    desc: 'Danh bạ điện thoại. Dịch tên miền (google.com) sang số IP (142.x.x.x) để máy tính hiểu.',
    code: 'Port 53 (UDP/TCP)'
  },
  {
    id: 'net-4',
    term: 'TCP',
    category: 'Network',
    desc: 'Giao thức truyền tin CẨN THẬN. Đảm bảo dữ liệu đến đủ, đúng thứ tự. Chậm mà chắc.',
    code: 'Dùng cho: Web, Email, Tải file.'
  },
  {
    id: 'net-5',
    term: 'UDP',
    category: 'Network',
    desc: 'Giao thức truyền tin NHANH NHẢU. Bắn tin liên tục không cần biết bên kia nhận được chưa. Nhanh nhưng hay rơi rớt.',
    code: 'Dùng cho: Livestream, Game, Video call.'
  },
  {
    id: 'net-6',
    term: 'DDoS',
    category: 'Security',
    desc: 'Tấn công từ chối dịch vụ. Hacker dùng ngàn máy tính (Botnet) truy cập cùng lúc làm sập server (như tắc đường).',
    code: 'Tấn công "Đánh hội đồng"'
  },
  {
    id: 'net-7',
    term: 'Firewall (Tường lửa)',
    category: 'Security',
    desc: 'Bác bảo vệ gác cổng. Kiểm tra IP, Port xem có cho phép gói tin đi vào/ra hay không.',
    code: 'Chặn kết nối trái phép.'
  }
];