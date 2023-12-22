import React from 'react';
import './NotificationPage.scss';

const NotificationPage = () => {
  return (
    <div>
      <h1>Danh sách đề tài</h1>
      <div className="notification-container">
        <div className="notification">
          <h3>Title</h3>
          <p>Decrption</p>
          <a href="https://aao.hcmute.edu.vn/ArticleId/f66690f3-aa61-4d19-9489-3283a2507fef/danh-sach-sinh-vien-du-kien-duoc-cong-nhan-tot-nghiep-dot-2-thang-01-2023-2024-cap-nhat-ngay-20-12-2023" target="_blank" rel="noopener noreferrer" className="button-link">
            Chi tiết
          </a>
        </div>
        {/* Thêm các khung thông báo khác tại đây */}
      </div>
    </div>
  );
};

export default NotificationPage;
