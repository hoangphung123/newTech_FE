import { Box, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <>
      <Box bgcolor={"#1a5792"} color={"#fff"} padding={2} width={"100%"}>
        <Typography fontSize={12}>
          Copyright © 2013, Trường Đại Học Sư Phạm Kỹ Thuật - Tp.HCM
        </Typography>
        <Box mt={1}>
          <Typography fontSize={12}>
            Địa chỉ: 1 Võ Văn Ngân, Phường Linh Chiểu, Thành phố Thủ Đức, Thành
            phố Hồ Chí Minh.
          </Typography>
          <Typography fontSize={12}>
            Điện thoại: (+84 - 028) 38968641 - (+84 -028) 38961333 - (+84 -028)
            37221223
          </Typography>
          <Typography fontSize={12}>
            Hotline Tư vấn tuyển sinh: (+84 - 028) 37222764
          </Typography>
          <Typography fontSize={12}> Fax: (+84 - 028) 38964922</Typography>
          <Typography fontSize={12}> E-mail: ptchc@hcmute.edu.vn</Typography>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
