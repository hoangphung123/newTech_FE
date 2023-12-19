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
  Select,
  MenuItem,
} from "@mui/material";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import { notify } from "../../untils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";
import ModalUpdate from "../../components/common/ModalUpdate";
import * as Usersever from "../../server/adminstore";
import "./MajorManagement.scss";

function ClassManagement() {
  const [name, setName] = useState("");
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [listClass, setListClass] = useState([]);
  const [majorUpdate, setMajorUpdate] = useState({});
  const [majorId, setMajorId] = useState("");
  const [Majors, setMajors] = useState([]);
  const [startYear, setStartYear] = useState("");
  const [finishYear, setFinishYear] = useState("");
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Lớp",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "startYear",
      headerName: "Năm bắt đầu",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "finishYear",
      headerName: "Năm kết thúc",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "createdAt",
    //   headerName: "Ngày tạo",
    //   width: 200,
    //   renderCell: (params) => new Date(params.row.createdAt).toLocaleString(),
    // },
    // {
    //   field: "updatedAt",
    //   headerName: "Ngày cập nhật",
    //   width: 200,
    //   renderCell: (params) => new Date(params.row.updatedAt).toLocaleString(),
    // },
    {
      field: "admin",
      headerName: "Admin",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography>
          {params.row.admin ? params.row.admin.username : ""}
        </Typography>
      ),
    },
    {
      field: "major",
      headerName: "Chuyên ngành",
      width: 270,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Typography>{params.row.major ? params.row.major.name : ""}</Typography>
      ),
    },
    {
      field: "",
      headerName: "Hành động",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setIsOpenModalUpdate(true);
              setMajorUpdate(listClass?.find((i) => i.id === params.row.id));
            }}
          >
            Cập nhật
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => {
              setIsOpenConfirmDelete(true);
              setIdDelete(params.row.id);
            }}
          >
            Xóa
          </Button>
        </Box>
      ),
    },
  ];

  const handleCreateClass = async (e) => {
    try {
      e.preventDefault();
      const ClassData = {
        name,
        startYear,
        finishYear,
        majorId,
      };
      const accessToken = JSON.parse(
        localStorage.getItem("access_token_admin")
      );
      await Usersever.createNewClass(accessToken, ClassData);
      handleReset();
      const response = await Usersever.GetAllClass(accessToken);
      setListClass(response.listData);
      notify("success", "Tạo chuyên ngành thành công");
    } catch (error) {
      console.log(error);
      notify("error", error?.response?.data?.message);
    }
  };

  const handleReset = () => {
    setName("");
    setStartYear("");
    setFinishYear("");
    setMajorId("");
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
    const getListClass = async () => {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem("access_token_admin")
        );
        const res = await Usersever.GetAllClass(accessToken);
        setListClass(res.listData);
      } catch (error) {
        throw error;
      }
    };
    const getMajorData = async () => {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem("access_token_admin")
        );
        const MajorData = await Usersever.GetAllMajor(accessToken);
        setMajors(MajorData.listData);
      } catch (error) {
        console.error("Error while fetching classes:", error.message);
      }
    };
    getListClass();
    getMajorData();
  }, []);

  return (
    <div className="MajorManagement">
      {/* <Box> */}
      <Button
        className="MajorManagement_button"
        fullWidth
        size="large"
        variant="contained"
      >
        Quản lý chuyên ngành
      </Button>
      <Box className="Box1">
        <Box mt={2}>
          <Grid
            container
            spacing={2}
            component={"form"}
            onSubmit={handleCreateClass}
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
              <TextField
                fullWidth
                size="small"
                label="Năm bắt đầu"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="Năm kết thúc"
                value={finishYear}
                onChange={(e) => setFinishYear(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                label="Lớp học"
                fullWidth
                size="small"
                value={majorId}
                onChange={(e) => setMajorId(e.target.value)}
                required
              >
                {Majors.map((MajorItem) => (
                  <MenuItem key={MajorItem.id} value={MajorItem.id}>
                    {MajorItem.name}
                  </MenuItem>
                ))}
              </Select>
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
                  Thêm Lớp
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box height={"70vh"} width={"100%"} mt={4}>
          <DataGrid rows={listClass} columns={columns} hideFooter={true} />
        </Box>
        <Box>
          <ConfirmDelete
            open={isOpenConfirmDelete}
            // handleOk={handleDelete}
            handleClose={() => setIsOpenConfirmDelete(false)}
          />
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

export default ClassManagement;
