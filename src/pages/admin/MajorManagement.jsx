import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import { notify } from "../../untils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";
import ModalUpdate from "../../components/common/ModalUpdate";
import * as Usersever from "../../server/adminstore"
import './MajorManagement.scss'

function MajorManagement() {
  const [name, setName] = useState("");
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [listMajor, setListMajor] = useState([]);
  const [majorUpdate, setMajorUpdate] = useState({});

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },
    { field: "name", headerName: "Tên chuyên ngành", width: 300 },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 200,
      renderCell: (params) => new Date(params.row.createdAt).toLocaleString(),
    },
    {
      field: "updatedAt",
      headerName: "Ngày cập nhật",
      width: 200,
      renderCell: (params) => new Date(params.row.updatedAt).toLocaleString(),
    },
    {
      field: "admin",
      headerName: "Admin",
      width: 250,
      renderCell: (params) => (
        <Typography>
          {params.row.admin ? params.row.admin.username : ""}
        </Typography>
      ),
    },
    {
      field: "",
      headerName: "Hành động",
      width: 250,
      renderCell: (params) => (
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setIsOpenModalUpdate(true);
              setMajorUpdate(listMajor?.find((i) => i.id === params.row.id));
            }}
          >
            Cập nhật
          </Button>
        </Box>
      ),
    },
  ];

  const handleCreateMajor = async (e) => {
    try {
      e.preventDefault();
      const accessToken = JSON.parse(localStorage.getItem("access_token_admin"));
      await Usersever.createNewMajor(accessToken, { name });
      setName("");
      const response = await Usersever.GetAllMajor(accessToken);
      setListMajor(response.listData);
      notify("success", "Tạo chuyên ngành thành công");
    } catch (error) {
      console.log(error);
      notify("error", error?.response?.data?.message);
    }
  };

  // const handleUpdateMajor = async () => {
  //   try {
  //     const { _id, ...rest } = majorUpdate;

  //     const res = await update(_id, {
  //       ...rest,
  //     });

  //     notify("success", "Cập nhật thành công");
  //     const newData = listMajor?.map((i) => {
  //       if (i._id === _id) return { id: res?.data?._id, ...res?.data };
  //       else return i;
  //     });
  //     setListMajor(newData);
  //     setIsOpenModalUpdate(false);
  //   } catch (error) {
  //     console.log("hello");
  //   }
  // };

  useEffect(() => {
    const getListMajor = async () => {
      try {
        const accessToken = JSON.parse(localStorage.getItem("access_token_admin"));
        const res = await Usersever.GetAllMajor(accessToken);
        setListMajor(res.listData);
      } catch (error) {
        throw error;
      }
    };
    getListMajor();
  }, []);

  return (
    <div className="MajorManagement">
      {/* <Box> */}
        <Button className="MajorManagement_button" fullWidth size="large" variant="contained">
          Quản lý chuyên ngành
        </Button>
        <Box className="Box1" >
        <Box mt={2}>
          <Grid
            container
            spacing={2}
            component={"form"}
            onSubmit={handleCreateMajor}
          >
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                justifyContent={"center"}
                height={"100%"}
              >
                <Button variant="contained" type="submit">
                  Thêm chuyên ngành
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box height={"70vh"} width={"100%"} mt={4}>
          <DataGrid rows={listMajor} columns={columns} hideFooter={true} />
        </Box>
        <ModalUpdate
          open={isOpenModalUpdate}
          handleClose={() => setIsOpenModalUpdate(false)}
          // handleOk={handleUpdateMajor}
        >
          <Typography variant="subtitle2" my={2}>
            Tên chuyên ngành:
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={majorUpdate?.name}
            onChange={(e) =>
              setMajorUpdate({ ...majorUpdate, name: e.target.value })
            }
          />
          <Typography variant="subtitle2" my={2}>
            Trạng thái
          </Typography>
          <RadioGroup
            row
            value={majorUpdate?.isBlock}
            onChange={(e) =>
              setMajorUpdate({ ...majorUpdate, isBlock: e.target.value })
            }
          >
            <FormControlLabel
              value={1}
              control={<Radio size="small" />}
              label="Mở"
            />
            <FormControlLabel
              value={0}
              control={<Radio size="small" />}
              label="Đóng"
            />
          </RadioGroup>
        </ModalUpdate>
        </Box>
      {/* </Box> */}
    </div>
  );
}

export default MajorManagement;
