import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmDelete from "../../../common/ConfirmDelete";
import { getColor } from "../../../../untils/helpers/getRole";
import { notify } from "../../../../untils/helpers/notify";
import ModalUpdate from "../../../common/ModalUpdate";
import * as Userserver from "../../../../server/adminstore";

function InfoAccount({ data, setList }) {
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);

  const [idDelete, setIdDelete] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [startYear, setStartYear] = useState("");
  const [finishYear, setFinishYear] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [selectedUserData, setSelectedUserData] = useState(null);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Họ tên",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "Username",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "clas.name",
      headerName: "Lớp",
      width: 100,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.row.clas?.name || "";
      },
    },
    {
      field: "startYear",
      headerName: "startYear",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "finishYear",
      headerName: "finishYear",
      width: 100,
      align: "center",
    },
    {
      field: "role.name",
      headerName: "Vai trò",
      width: 140,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Chip
            label={params.row.role.name || ""}
            color={
              params.row.role.name ? getColor(params.row.role.name) : "default"
            }
          />
        );
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
                setUserRole(params.row.role.name);
                setSelectedUserData(params.row);
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

  useEffect(() => {
    const fetchClassesData = async () => {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem("access_token_admin")
        );
        const classesData = await Userserver.GetAllClasses(accessToken);
        setClasses(classesData.listData);
      } catch (error) {
        console.error("Error while fetching classes:", error.message);
      }
    };

    fetchClassesData();
  }, []);

  useEffect(() => {
    const selectedClass = classes.find((classItem) => classItem.id === classId);
    if (selectedClass) {
      setStartYear(selectedClass.startYear);
      setFinishYear(selectedClass.finishYear);
    }
  }, [classId, classes]);

  const handleDelete = async () => {
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("access_token_admin")
      );
      await Userserver.deleteUser(accessToken, idDelete);
      notify("success", "Xóa tài khoản thành công");
      setIsOpenConfirmDelete(false);
      const usersData = await Userserver.getAllUsers(accessToken);
      setList(usersData.listData);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = async (e) => {
    try {
      // Assuming createNewUser function takes an object as an argument
      const userData = {
        name,
        username,
        password,
        email,
        startYear,
        finishYear,
        classId,
      };

      // Call the createNewUser function with the user data
      const accessToken = JSON.parse(
        localStorage.getItem("access_token_admin")
      );
      const response = await Userserver.updateUser(
        accessToken,
        idUpdate,
        userData
      );
      const usersData = await Userserver.getAllUsers(accessToken);
      setList(usersData.listData);
      setIsOpenModalUpdate(false);
      // Handle the response accordingly
      
      notify("success","User upadate successfully");
      
    } catch (error) {
      console.error("Error while update user:", error.message);
      notify("An error occurred while update the user", "error");
    }
  };

  useEffect(() => {
    if (selectedUserData) {
      setName(selectedUserData.name);
      setUsername(selectedUserData.username);
      setPassword(""); // Optionally, set the initial password value
      setEmail(selectedUserData.email);
      setStartYear(selectedUserData.startYear);
      setFinishYear(selectedUserData.finishYear);
      const selectedClass = classes.find((classs) => classs.id === selectedUserData.clas?.id);

      if (selectedClass) {
        setClassId(selectedClass.id);
      }
    }
  }, [selectedUserData, classes]);

  return (
    <Box mt={8}>
      <Typography textAlign={"center"} variant="h6" fontWeight={"bold"}>
        DANH SÁCH TÀI KHOẢN
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
              label="Họ và tên"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Username"
              size="small"
              value={username}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              size="small"
              value={email}
              disabled
            />
          </Grid>
          {userRole === "STUDENT" && (
            <>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Năm bắt đầu"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  required={userRole === "STUDENT"}
                  disabled={userRole === "STUDENT"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Năm kết thúc"
                  value={finishYear}
                  onChange={(e) => setFinishYear(e.target.value)}
                  required={userRole === "STUDENT"}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  label="Lớp học"
                  fullWidth
                  size="small"
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  required
                >
                  {classes.map((classItem) => (
                    <MenuItem key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </>
          )}
        </Grid>
      </ModalUpdate>
    </Box>
  );
}

export default InfoAccount;
