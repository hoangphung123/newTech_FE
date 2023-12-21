// import React, { useState } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import pdfjs from 'pdfjs-dist';

// const UserGuidePage = () => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <h1>User Guide Page</h1>
//       <div style={{ width: '600px' }}>
//         <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
//           <Viewer file="guestuser/guide.pdf" onLoadSuccess={onDocumentLoadSuccess} />
//         </Worker>
//       </div>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// };

// export default UserGuidePage;
