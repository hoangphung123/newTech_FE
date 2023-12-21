import React from 'react';
import './NotificationPage.scss';

const NotificationPage = () => {
  return (
    <div>
      <h1>Thông báo</h1>
      <div className="notification-container">
        <div className="notification">
          <h3>Danh sách sinh viên Dự kiến được công nhận tốt nghiệp đợt 2 Tháng 01/2023_2024 cập nhật ngày 20/12/2023</h3>
          <p>Sinh viên xem danh sách dự kiến được công nhận tốt nghiệp đợt 2 tháng 01/2023_2024 cập nhật ngày 20/12/2023 tại đây.

            - Yêu cầu sinh viên tự kiểm tra thông tin cá nhân của mình bao gồm : Họ và tên, Ngày tháng năm sinh, Nơi sinh( chỉ để tên tỉnh), Giới tính, Quốc tịch.
            Nếu thông tin chưa đúng yêu cầu SV liên hệ cô Thảo phòng TS&CTSV gmail thanhthao@hcmute.edu.vn để được điểu chỉnh thông tin.
            - Sinh viên có tên trong danh sách dự kiến được công nhận tốt nghiệp ngày 20/12/2023 tiếp tục theo dõi thông tin trên  file danh sách ĐƯỢC CÔNG NHẬN TỐT NGHIỆP. Nếu SV có tên trong danh sách này nhưng không có tên trong các danh sách ĐƯỢC CÔNG NHẬN TỐT NGHIỆP liên hệ cô Quỳnh PĐT A1-201 qua gmail quynhbt@hcmute.edu.vn TRƯỚC 17H Ngày 22/12/2023. Mọi phản hồi sau 17h ngày 22/12/2023 sẽ được giải quyết vào đợt xét tốt nghiệp tiếp theo.

            - Sinh viên còn nợ sách Thư viện hoàn tất thủ tục trước khi tốt nghiệp.</p>
            <a href="https://aao.hcmute.edu.vn/ArticleId/f66690f3-aa61-4d19-9489-3283a2507fef/danh-sach-sinh-vien-du-kien-duoc-cong-nhan-tot-nghiep-dot-2-thang-01-2023-2024-cap-nhat-ngay-20-12-2023" target="_blank" rel="noopener noreferrer" className="button-link">
            Chi tiết
          </a>
        </div>
        <div className="notification">
          <h3>Sơ đồ bố trí chỗ ngồi tham gia Lễ Tốt nghiệp tháng 12/2023 (cập nhật 21/12/2023)</h3>
          <p>
            Sơ đồ bố trí chỗ ngồi trong hội trường xem tại đây.

            Số thứ tự chỗ ngồi tân Tiến sĩ, Thạc sĩ, Kỹ sư, Cử nhân và Kiến trúc sư dự lễ & Danh sách tân Kỹ sư/Cử nhân/Kiến trúc sư dự lễ nhận khen thưởng xem tại đây.

          </p>
          <a href="https://drive.google.com/file/d/1uMfBOhWj73TYmjD7_Asqz6JES89sSSBP/view" target="_blank" rel="noopener noreferrer" className="button-link">
            Chi tiết
          </a>
        </div>
        <div className="notification">
          <h3>Thông báo về việc nhận bằng Tốt nghiệp đại học hệ chính quy Đợt tốt nghiệp tháng 10/2023</h3>
          <p>Sinh viên xem thông báo tại đây. Sinh viên điền vào phiếu khảo sát Sinh viên tốt nghiệp tại đây.
          </p>
          <a href="https://aao.hcmute.edu.vn/ArticleId/8cbaa816-1089-4391-9aa1-a911348f6544/thong-bao-ve-viec-nhan-bang-tot-nghiep-dai-hoc-he-chinh-quy-dot-tot-nghiep-thang-10-2023" target="_blank" rel="noopener noreferrer" className="button-link">
            Chi tiết
          </a>        </div>
        {/* Thêm các khung thông báo khác tại đây */}
      </div>
    </div>
  );
};

export default NotificationPage;
