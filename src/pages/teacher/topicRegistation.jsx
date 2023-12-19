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
import ModalSelectStudent from "../../components/common/ModalSelectStudent";
import * as Usersever from "../../server/teacherstore";
import "./topicRegistation.scss";

function AccountManagement() {
  const [name, setName] = useState("");
  const [isOpenModalSelectStudent, setIsOpenModalSelectStudent] =
    useState(false);
  const [listClass, setListClass] = useState([]);
  const [majorUpdate, setMajorUpdate] = useState({});
  const [majorName, setMajorName] = useState("");
  const [Majors, setMajors] = useState([]);
  const [startYear, setStartYear] = useState("");
  const [finishYear, setFinishYear] = useState("");
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const [dataTopic, setDataTopic] = useState([]);
  const [idUpdate, setIdUpdate] = useState("");
  const [userRole] = useState("");
  const [selectedTopicData, setSelectedTopicData] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);

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
              variant="contained"
              size="small"
              onClick={() => {
                setSelectedTopicId(params.row.id);
                setIsOpenModalSelectStudent(true);
                setIdUpdate(params.row.id);
                setSelectedTopicData(params.row);
                console.log("userRole", userRole);
              }}
            >
              Registration
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

  const handleMajorChange = async (event) => {
    setMajorName(event.target.value);
    const majorNames = event.target.value;
    // const selectedMajor = Majors.find((major) => major.id === selectedMajorId);

    try {
      const accessToken = JSON.parse(
        localStorage.getItem("access_token_teacher")
      );

      // Call the getTopicByMajorId function
      const topicsByMajor = await Usersever.getTopicByKeyword(
        accessToken,
        majorNames
      );

      // Update the Majors state with the data returned
      setDataTopic(topicsByMajor.listData);
    } catch (error) {
      console.error("Error while fetching topics by major:", error.message);
      // Handle error if needed
    }
  };

  useEffect(() => {
    const getMajorData = async () => {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem("access_token_teacher")
        );
        const MajorData = await Usersever.GetAllMajorDropDown(accessToken);
        setMajors(MajorData.listData);
      } catch (error) {
        console.error("Error while fetching classes:", error.message);
      }
    };
    const fetchTopicData = async () => {
      try {
        // Fetch user data using getAllUsers function
        const accessToken = JSON.parse(
          localStorage.getItem("access_token_teacher")
        );
        const TopicsData = await Usersever.GetAllTopic(accessToken);
        setDataTopic(TopicsData.listData);
      } catch (error) {
        console.error("Error while fetching users:", error.message);
        // Handle error if needed
      }
    };

    getMajorData();
    fetchTopicData();
  }, []);

  return (
    <div className="topicRegistation">
      {/* <Box> */}
      <Box className="Box1r">
        <Box mt={2}>
          <Grid container spacing={2} component={"form"}>
            <Grid item xs={6}>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                justifyContent={"flex-start"}
                height={"100%"}
              >
                <h3>Tìm kiếm topic theo chuyên ngành</h3>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Select
                // label="Lớp học"
                fullWidth
                size="small"
                value={majorName}
                onChange={handleMajorChange}
                required
              >
                {Majors.map((MajorItem) => (
                  <MenuItem key={MajorItem.id} value={MajorItem.name}>
                    {MajorItem.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Box>
        <Box height={"70vh"} width={"100%"} mt={4}>
          <DataGrid rows={dataTopic} columns={columns} hideFooter={true} />
        </Box>
        <Box>
          <ConfirmDelete
            open={isOpenConfirmDelete}
            // handleOk={handleDelete}
            handleClose={() => setIsOpenConfirmDelete(false)}
          />
        </Box>
        <ModalSelectStudent
          open={isOpenModalSelectStudent}
          handleClose={() => setIsOpenModalSelectStudent(false)}
          // handleOk={handleUpdateMajor}
        >
          <Typography variant="subtitle2" my={2}>
            Gmail của sinh viên:
          </Typography>
          <div className="student">
            <div className="students">
              <TextField
                fullWidth
                label="leader"
                size="small"
                value={majorUpdate?.name}
                onChange={(e) =>
                  setMajorUpdate({ ...majorUpdate, name: e.target.value })
                }
              />
            </div>
            <div className="students">
              <TextField
                fullWidth
                label="member"
                size="small"
                value={majorUpdate?.name}
                onChange={(e) =>
                  setMajorUpdate({ ...majorUpdate, name: e.target.value })
                }
              />
            </div>
            <div className="students">
              <TextField
                fullWidth
                label="member"
                size="small"
                value={majorUpdate?.name}
                onChange={(e) =>
                  setMajorUpdate({ ...majorUpdate, name: e.target.value })
                }
              />
            </div>
          </div>
        </ModalSelectStudent>
      </Box>
      {/* </Box> */}
    </div>

    //
  );
}

export default AccountManagement;
