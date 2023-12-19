import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { DataGrid } from "@mui/x-data-grid";
import {
  deleteTopicByManagement,
  findTopic,
  list,
  update,
} from "../../untils/api/topic";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import ModalUpdate from "../../components/common/ModalUpdate";
import { notify } from "../../untils/helpers/notify";

function AdminHome() {
  const [listTopic, setListTopic] = useState([]);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  const [idDelete, setIdDelete] = useState("");
  const [idUpdate, setIdUpdate] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [infoTopicUpdate, setInfoTopicUpdate] = useState({});

  const columns = [
    {
      field: "id",
      headerName: "Mã đề tài",
      width: 150,
    },
    { field: "title", headerName: "Tên đề tài", width: 150 },
    { field: "description", headerName: "Mô tả", width: 150 },
    {
      field: "approveByManagement",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => {
        const label =
          params.row.approveByManagement == 0
            ? "Chưa được phê duyệt"
            : "Đã được phê duyệt";
        const color = params.row.approveByManagement == 0 ? "error" : "success";
        return <Chip label={label} color={color} />;
      },
    },
    {
      field: "",
      headerName: "Hành động",
      width: 250,
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setIsOpenModalUpdate(true);
                setIdUpdate(params.row._id);
              }}
            >
              Chi tiết
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => {
                setIsOpenConfirmDelete(true);
                setIdDelete(params.row._id);
              }}
            >
              Hủy đề tài
            </Button>
          </Box>
        );
      },
    },
  ];

  const handleDelete = async () => {
    try {
      await deleteTopicByManagement(idDelete);
      notify("success", "Xóa đề tài thành công");
      setIsOpenConfirmDelete(false);
      setListTopic(listTopic?.filter((e) => e._id !== idDelete));
    } catch (error) {
      throw error;
    }
  };

  const getListTopic = async () => {
    try {
      const res = await list();
      setListTopic(res.data?.map((e) => ({ id: e._id, ...e })));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await update(idUpdate, { title, description });
      notify("success", "Cập nhật đề tài thành công");
      setIsOpenModalUpdate(false);
      getListTopic();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListTopic();
  }, []);

  useEffect(() => {
    const getTopicById = async () => {
      try {
        const res = await findTopic(idUpdate);
        setInfoTopicUpdate(res.data);
        setTitle(res?.data?.title);
        setDescription(res?.data?.description);
      } catch (error) {
        console.log(error);
      }
    };
    idUpdate && getTopicById();
  }, [idUpdate]);

  return (
    <MainLayout type="teacher">
      <Button fullWidth size="large" variant="contained">
        Quản lý đề tài
      </Button>
      <Box height={"70vh"} width={"100%"} mt={4}>
        <DataGrid rows={listTopic} columns={columns} hideFooter={true} />
      </Box>
      <ConfirmDelete
        title={"Hủy đề tài"}
        content={"Bạn có chắc chắn muốn hủy đề tài này không ?"}
        open={isOpenConfirmDelete}
        handleOk={handleDelete}
        handleClose={() => setIsOpenConfirmDelete(false)}
      />
      <ModalUpdate
        open={isOpenModalUpdate}
        handleClose={() => setIsOpenModalUpdate(false)}
        handleOk={handleUpdate}
        title={"Hộp thoại chi tiết"}
      >
        <Grid container spacing={2} py={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên đề tài"
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mô tả đề tài"
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Chuyên ngành: {infoTopicUpdate?.major?.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Giáo viên hướng dẫn:{" "}
              {infoTopicUpdate?.teacher
                ? infoTopicUpdate?.teacher?.name
                : "Không có"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Sinh viên thực hiện:{" "}
              {infoTopicUpdate?.student
                ? infoTopicUpdate?.student?.name
                : "Không có"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Giáo viên phản biện:{" "}
              {infoTopicUpdate?.teacherReview
                ? infoTopicUpdate?.teacherReview?.name
                : "Không có"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              Trạng thái:{" "}
              {infoTopicUpdate?.approveByManagement === 1
                ? "Đã được phê duyệt"
                : "Chưa được phê duyệt"}
            </Typography>
          </Grid>
        </Grid>
      </ModalUpdate>
    </MainLayout>
  );
}

export default AdminHome;
