# Báo cáo kiểm toán website Đức Dũng Travel

## Tóm tắt

Đã rà soát mã nguồn website tĩnh và kiểm tra bản đang công khai tại `https://ducdungtravel.vercel.app/`. Không phát hiện lỗi JavaScript khi kiểm tra các tương tác chính. Có hai vấn đề nội dung quan trọng chưa thể tự sửa an toàn: số điện thoại gọi khác với số hiển thị, và giá giữa các phần trên trang không thống nhất.

Các sửa đổi kỹ thuật đã thực hiện ở local gồm bổ sung metadata SEO/chia sẻ, `robots.txt`, `sitemap.xml`, tối ưu ảnh và loại bỏ một số hình ảnh/thông tin quảng cáo cũ hoặc khẳng định chưa có căn cứ. **Các thay đổi chưa được deploy, commit hoặc push.**

## Phát hiện cần chủ website xác nhận

| Mức độ | Phát hiện | Bằng chứng và tác động | Trạng thái |
|---|---|---|---|
| Đã xử lý | Số hiển thị không khớp số điện thoại khi bấm gọi | Website hiển thị `083.580.2222` nhưng các liên kết `tel:` trước đó trỏ tới `0928176666` tại header, menu mobile, footer, thanh gọi nhanh và hộp thoại Zalo. | Chủ website xác nhận hotline gọi điện là `0835802222`; đã đồng bộ toàn bộ liên kết `tel:` trong `index.html`. |
| Cao | Giá giữa các mục trên trang mâu thuẫn | Thẻ dịch vụ nêu xe ghép từ 250K/người, xe riêng từ 700K/lượt và sân bay từ 900K/lượt; bảng giá theo huyện có các mức khác; FAQ lại nêu giá sân bay từ 450K và mức ghép 250K/280K/300K. Chưa rõ các giá theo một chiều/khứ hồi, mỗi người/tổng chuyến hay có điều kiện đi kèm. | Người dùng bỏ qua việc xác nhận giá; giữ nguyên, không tự chọn hoặc sửa giá. |
| Trung bình | Một số tuyên bố dịch vụ/chính sách cần nguồn xác nhận | Nội dung có các cam kết 24/7, chạy mỗi 30 phút, đón trả tận nhà, thời gian đi 1,5–2 giờ, giá đã gồm BOT/xăng/lương tài xế và không phụ thu. Đây là các thông tin có thể ảnh hưởng quyết định đặt xe; chưa có dữ liệu độc lập để xác minh trong phạm vi kiểm toán. | Chưa kết luận đúng/sai; cần chủ website xác nhận trước khi coi là thông tin đã kiểm chứng. |
| Thấp | Không có biểu mẫu đặt xe trên trang | Kiểm tra DOM không tìm thấy form; các CTA đặt chuyến mở hộp thoại QR/Zalo. Khách cần hoàn tất liên hệ ngoài website. | Ghi nhận hành vi hiện tại, không tự thêm biểu mẫu hoặc luồng thu thập dữ liệu. |

## Hạng mục đã sửa ở local

- Bổ sung canonical URL, Open Graph, Twitter Card và preload ảnh banner để cải thiện chia sẻ liên kết và tải ảnh đầu trang.
- Thay ảnh giới thiệu có hotline/giá in sẵn đã cũ bằng ảnh xe không chứa thông tin giá hoặc liên hệ; tạo bản WebP 800 × 600.
- Dùng logo WebP cho header/footer; thu nhỏ PNG favicon/Apple touch icon từ 512 × 512 xuống 192 × 192.
- Thêm `robots.txt` và `sitemap.xml` cho trang chủ.
- Gỡ một số số liệu và lời khẳng định chưa có căn cứ đã xuất hiện trong nội dung, đồng thời thay mô tả đời xe/model cụ thể bằng nội dung trung tính hơn.
- Không thêm schema Review/Offer/LocalBusiness vì chưa đủ dữ liệu xác minh.

## Kiểm tra

- Bản production mở được; đã rà soát các kích thước 375 × 812, 390 × 844, 768 × 1024, 1366 × 768 và 1920 × 1080, không thấy tràn ngang.
- Trên bản local, đã kiểm tra các kích thước trên; không thấy tràn ngang. Đã xác nhận menu mobile mở/đóng, carousel đội xe đổi nội dung, hộp thoại Zalo mở và ảnh QR tải được.
- Đã kiểm tra HTML có thể parse, `script.js` qua `node --check`, sitemap XML parse được, robots khai báo sitemap và `git diff --check` không báo lỗi.
- Đã chạy kiểm tra ảnh: logo mới 59,664 byte, favicon 68,157 byte, ảnh giới thiệu mới 137,212 byte. Ảnh giới thiệu mới không chứa số hotline/giá in cũ.
- Kho mã không có bộ test hoặc script build/lint đã cấu hình; trình chạy test không tìm thấy test. Chưa chạy Lighthouse nên không báo điểm hiệu năng/accessibility.
- Kiểm tra hành vi trên trang production được thực hiện trước các chỉnh sửa local; chưa có bản production sau chỉnh sửa để kiểm tra.

## Cần xác nhận trước khi chỉnh tiếp

1. Bảng giá chuẩn cho xe ghép, thuê xe 5/7 chỗ và sân bay là gì? Vui lòng cho biết giá áp dụng theo người hay theo chuyến, một chiều hay khứ hồi, cùng các điều kiện/phụ phí (nếu có). Việc xác nhận giá đã được bỏ qua; các mức đang công bố vẫn còn mâu thuẫn.
2. Các thông tin về giờ hoạt động/tần suất chuyến, thời gian di chuyển, đón trả, hành lý, hủy chuyến và các khoản đã bao gồm trong giá có còn chính xác không?

## Phạm vi triển khai

Đây là báo cáo và sửa đổi local. Không deploy production, commit hoặc push theo phạm vi kiểm toán hiện tại.
