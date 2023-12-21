import React from 'react';
import './ContactPage.scss';

const contacts = [
  { id: 1, name: 'Nguyen Dang Quang', position: 'CEO', image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' },
  { id: 2, name: 'Nguyen Tran Thi Van', position: 'CTO', image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' },
  { id: 3, name: 'Huynh Xuan Phung', position: 'CTO', image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' },
  { id: 4, name: 'Le Van Vinh', position: 'CTO', image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' },
  { id: 5, name: 'Hoang Van Dung', position: 'CTO', image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' },
  { id: 6, name: 'Le Vinh Thinh', position: 'CTO', image: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png' },
];

const ContactPage = () => {
  return (
    <div className="contact-page">
      {contacts.map((contact) => (
        <div key={contact.id} className="contact-item">
          <img src={contact.image} alt={contact.name} className="contact-image" />
          <div className="contact-details">
            <h3>{contact.name}</h3>
            <p>{contact.position}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactPage;
