import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmDelete from "../../../common/ConfirmDelete";
import { notify } from "../../../../untils/helpers/notify";
import ModalUpdate from "../../../common/ModalUpdate";
import * as Userserver from "../../../../server/adminstore";

function InfoAccount({ data, setList }) {
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  const [idDelete, setIdDelete] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [userRole] = useState("");
  const [selectedTopicData, setSelectedTopicData] = useState(null);
  const [name, setName] = useState("");
  const [majorId, setMajorId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [detail, setDetail] = useState("");
  const [majors, setMajor] = useState([]);
  

  const columns = [
    {
      field: "name",
      headerName: "Tên",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "detail",
      headerName: "Chi tiết",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "startDate",
      headerName: "Ngày bắt đầu",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return formatDate(params.row.startDate);
      },
    },
    {
      field: "finishDate",
      headerName: "Ngày kết thúc",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return formatDate(params.row.finishDate);
      },
    },
    {
      field: "admin.username",
      headerName: "Admin",
      width: 100,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.row.admin?.username || "";
      },
    },
    {
      field: "major.name",
      headerName: "Ngành",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.row.major?.name || "";
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box display={"flex"} gap={2} alignItems={"center"}>
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
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setIsOpenModalUpdate(true);
                setIdUpdate(params.row.id);
                setSelectedTopicData(params.row);
                console.log("userRole", userRole);
              }}
            >
              Cập nhật
            </Button>
          </Box>
        );
      },
    },
  ];

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // Pad single-digit day and month with leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  useEffect(() => {
    const fetchMajorData = async () => {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem("access_token_admin")
        );
        const MajorData = await Userserver.GetAllMajor(accessToken);
        setMajor(MajorData.listData);
      } catch (error) {
        console.error("Error while fetching classes:", error.message);
      }
    };

    fetchMajorData();
  }, []);


  const handleDelete = async () => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("access_token_admin")
      );
      await Userserver.deleteTopic(accessToken, idDelete);
      notify("success", "Xóa Đề tài thành công");
      setIsOpenConfirmDelete(false);
      const TopicData = await Userserver.GetAllTopic(accessToken);
      setList(TopicData.listData);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = async (e) => {
    try {
      const topicData = {
        name,
        detail,
        majorId,
        startDate,
        finishDate,
      };

      const accessToken = JSON.parse(
        localStorage.getItem("access_token_admin")
      );
      await Userserver.updateTopic(
        accessToken,
        idUpdate,
        topicData
      );
      const TopicData = await Userserver.GetAllTopic(accessToken);
      setList(TopicData.listData);
      setIsOpenModalUpdate(false);
      
      
      notify( "success", "Topic upadate successfully");
      
        
    } catch (error) {
      notify("error", "An error occurred while update the Topic");
    }
  };

  function formatDateForInput(inputDate) {
    const date = new Date(inputDate);
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  useEffect(() => {
    if (selectedTopicData) {
      console.log("selectedTopicData", selectedTopicData);
      setName(selectedTopicData.name);
      setDetail(selectedTopicData.detail);
      setStartDate(selectedTopicData.startDate);
      setFinishDate(selectedTopicData.finishDate);

      const selectedMajor = majors.find((major) => major.id === selectedTopicData.major?.id);

      if (selectedMajor) {
        setMajorId(selectedMajor.id);
      }
    }
  }, [selectedTopicData,majors]);

  return (
    <Box mt={8}>
      <Typography textAlign={"center"} variant="h6" fontWeight={"bold"}>
        DANH SÁCH ĐỀ TÀI
      </Typography>
      <Box height={"70vh"} width={"100%"} mt={4}>
        <DataGrid rows={data} columns={columns} hideFooter={true} />
      </Box>
      <ConfirmDelete
        open={isOpenConfirmDelete}
        handleOk={handleDelete}
        handleClose={() => setIsOpenConfirmDelete(false)}
      />
      <ModalUpdate
        open={isOpenModalUpdate}
        handleClose={() => setIsOpenModalUpdate(false)}
        handleOk={handleUpdate}
      >
        <Grid container spacing={2} py={2}>
        <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="Start_Date-label">Ngày Bắt đầu</InputLabel>
            <TextField
              fullWidth
              size="small"
              //   label="Ngày bắt đầu"
              type="datetime-local"
              value={formatDateForInput(startDate)}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="Finish_Date-label">Ngày kết thúc</InputLabel>
            <TextField
              fullWidth
              size="small"
              //   label="Ngày kết thúc"
              type="datetime-local"
              value={formatDateForInput(finishDate)}
              onChange={(e) => setFinishDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="major-label">Ngành học</InputLabel>
            <Select
              fullWidth
              size="small"
              value={majorId}
              onChange={(e) => setMajorId(e.target.value)}
              required
            >
              {majors.map((majorItem) => (
                <MenuItem key={majorItem.id} value={majorItem.id}>
                  {majorItem.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </ModalUpdate>
    </Box>
  );
}

export default InfoAccount;
