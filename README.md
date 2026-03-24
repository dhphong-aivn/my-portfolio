# Vibe Coding - Digital Twin Portfolio 🚀

![Portfolio Preview](./public/favicon.svg) <!-- *Bạn có thể thêm ảnh chụp màn hình dự án vào thư mục public và thay link tại đây* -->

Đây là dự án **Trang web cá nhân (Portfolio)** được thiết kế và xây dựng theo phong cách "Vibe Coding" cực kỳ tối giản nhưng mang đậm tính tương tác. Dự án hướng tới những người làm việc trong ngành công nghệ như **AI Researcher, Data Scientist, hoặc Developer**.

## ✨ Tính Năng Nổi Bật

- 🤖 **AI Digital Twin**: Tích hợp một trợ lý ảo (sử dụng Gemini API của Google) ngay trên giao diện web. Trợ lý này đại diện cho bạn, có thể trò chuyện và giải đáp các thắc mắc của nhà tuyển dụng hoặc khách truy cập.
- ⌨️ **Command Menu (Cmd + K)**: Điều hướng siêu tốc bằng bàn phím. Chỉ cần nhấn `Cmd + K` (hoặc `Ctrl + K` trên Windows), một thanh tìm kiếm phong cách MacOS sẽ hiện ra để lướt qua các trang.
- 🎨 **Smart Theming**: Chế độ Tối (Dark), Sáng (Light) và đặc biệt là **Chế độ Tự Động (Auto)**. Chế độ Auto sẽ phân tích hình ảnh đại diện (avatar) của bạn và tự động nội suy ra mã màu chủ đạo để áp dụng cho toàn bộ trang web.
- ⚡ **Siêu Tinh Gọn**: Xây dựng dựa trên Vite, React 19 và TailwindCSS. Cấu trúc thư mục được thiết kế theo tư duy Atomic Design thu gọn, giúp bạn dễ dàng tuỳ biến hoặc thêm mới tính năng.

## 📂 Kiến Trúc Mã Nguồn

Dự án đã được tái cấu trúc (Refactored) để đạt chuẩn Clean Code:

```text
src/
├── components/          # Các hook/UI tái sử dụng
│   ├── ChatWidget.jsx   # Khung chat với AI
│   ├── CommandMenu.jsx  # Menu điều hướng nhanh
│   ├── Header.jsx       # Phần tiêu đề có ảnh đại diện và links
│   └── TypewriterMessage.jsx # Hiệu ứng gõ phím cho AI
├── constants/
│   └── data.js          # Chứa toàn bộ nội dung tĩnh (Thông tin, Dự án, Links)
├── services/
│   └── ai.js            # Chứa logic kết nối Gemini API
├── views/               # Các trang nội dung chính
│   ├── GalleryView.jsx  
│   ├── HomeView.jsx     
│   ├── TimelineView.jsx 
│   └── VaultView.jsx    
├── App.jsx              # Trái tim của ứng dụng, kết nối các module
└── index.css            # Cài đặt Tailwind và Custom Scrollbar
```

## 🚀 Hướng Dẫn Cài Đặt và Chạy Thử nghiệm

**Bước 1:** Clone dự án này về máy của bạn.
```bash
git clone <url-cua-kho-chua>
cd my-portfolio
```

**Bước 2:** Cài đặt các thư viện (Dependencies).
```bash
npm install
```

**Bước 3:** Cấu hình API Key (Cực kỳ quan trọng).
- Đi tới trang [Google AI Studio](https://aistudio.google.com/) để lấy một API Key miễn phí.
- Mở file `src/services/ai.js`.
- Gán Key của bạn vào biến `API_KEY`.
```javascript
const API_KEY = "ĐIỀN_KEY_CỦA_BẠN_VÀO_ĐÂY";
```

**Bước 4:** Chạy môi trường phát triển (Development Server).
```bash
npm run dev
```

## 💡 Hướng Dẫn Tuỳ Biến (Customization)

Bạn muốn thay đổi nội dung (Tên, Ảnh, Kinh nghiệm, Dự án) thành của riêng mình?
rất đơn giản! Chỉ cần mở file **`src/constants/data.js`** và chỉnh sửa các mảng dữ liệu. Giao diện sẽ tự động cập nhật mà không cần bạn phải can thiệp vào logic code.

---
*Được phát triển với tình yêu thương mãnh liệt dành cho công nghệ và tính sáng tạo.* 
