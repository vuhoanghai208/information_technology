// data.js
export const COURSES = [
  {
    id: "network_ai",
    title: "Mạng máy tính & AI",
    icon: "Network",
    chapters: [
      {
        id: "protocols",
        title: "Bài 1: Giao thức (TCP/UDP)",
        content: `
### Bản chất Giao thức
- **TCP:** Giao hàng đảm bảo. Bắt tay 3 bước. Chậm nhưng chắc. Dùng cho: Web, Email, Tải file.
- **UDP:** Giao hàng nhanh (Bắn và quên). Chấp nhận mất gói tin. Dùng cho: Livestream, Game.
        `,
        questions: [
          {
            id: 101,
            question: "Tại sao Livestream dùng UDP mà không dùng TCP?",
            options: ["Bảo mật cao hơn", "Ưu tiên tốc độ, chấp nhận vỡ hình", "Không bao giờ mất gói tin", "Tiết kiệm điện"],
            correct: 1,
            explain: "UDP bắn dữ liệu liên tục không cần xác nhận, phù hợp với video thời gian thực (real-time)."
          }
        ]
      },
      {
        id: "ai_intro",
        title: "Bài 2: Bản chất AI",
        content: `
### AI vs Tự động hóa
- **Tự động hóa:** Lặp lại quy trình cố định (Rule-based).
- **AI:** Có khả năng học (Machine Learning), suy luận và nhận thức.
### Hộp đen (Black Box)
- Ta biết đầu vào/đầu ra, nhưng không biết tại sao AI ra quyết định đó.
        `,
        questions: [
          {
            id: 201,
            question: "Rủi ro lớn nhất của 'Hộp đen' trong AI y tế là gì?",
            options: ["AI tốn điện", "Thiếu trách nhiệm giải trình khi sai sót", "Bác sĩ thất nghiệp", "AI quá chậm"],
            correct: 1,
            explain: "Nếu bác sĩ không hiểu tại sao AI chẩn đoán bệnh như vậy, họ không thể chịu trách nhiệm khi có sự cố."
          }
        ]
      }
    ]
  },
  {
    id: "html_css",
    title: "HTML & CSS",
    icon: "Code",
    chapters: [
      {
        id: "css_basic",
        title: "Bài 1: CSS Cơ bản",
        content: "Có 3 kiểu: Inline, Internal, External. Thứ tự ưu tiên: Inline > ID > Class > Tag.",
        questions: [
          {
            id: 1,
            question: "Độ ưu tiên cao nhất trong CSS (không tính !important)?",
            options: ["Class", "ID", "Inline Style", "Thẻ HTML"],
            correct: 2,
            explain: "Inline style viết trực tiếp trong thẻ nên có độ ưu tiên cao hơn ID và Class."
          }
        ]
      }
    ]
  }
];