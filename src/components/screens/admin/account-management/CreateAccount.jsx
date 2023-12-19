import { Box, Button, Grid, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import React, { useState, useEffect } from "react";
import { create } from "../../../../untils/api/user";
import { notify } from "../../../../untils/helpers/notify";
import * as userServer from "../../../../server/adminstore";

function CreateAccount({ setList }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [startYear, setStartYear] = useState("");
  const [finishYear, setFinishYear] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);

  const handleReset = () => {
    setName("");
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("");
    setStartYear("");
    setFinishYear("");
    setClassId("");
  };

  useEffect(() => {
    const fetchClassesData = async () => {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem("access_token_admin")
        );
        const classesData = await userServer.GetAllClasses(accessToken);
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

  const handleCreateUser = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      // Assuming createNewUser function takes an object as an argument
      const userData = {
        name,
        username,
        password,
        email,
        role,
        startYear,
        finishYear,
        classId,
      };
  
      // Call the createNewUser function with the user data
      const accessToken = JSON.parse(localStorage.getItem("access_token_admin"));
      const response = await userServer.createNewUser(accessToken, userData);
      const usersData = await userServer.getAllUsers(accessToken);
      setList(usersData.listData);
      handleReset()
  
      // Handle the response accordingly
      if (response.success) {
        notify("User created successfully", "success");
      } else {
        notify(`Error: ${response.message}`, "error");
      }
    } catch (error) {
      console.error("Error while creating user:", error.message);
      notify("An error occurred while creating the user", "error");
    }
  };

  return (
    <Box>
      <Button fullWidth size="large" variant="contained">
        Quản lý tài khoản
      </Button>
      <Box mt={2} component={"form"}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel id="role-label">Vai trò</InputLabel>
            <Select
              // label="Vaitro"
              fullWidth
              size="small"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={"STUDENT"}>Sinh Viên</MenuItem>
              <MenuItem value={"TEACHER"}>Giảng Viên</MenuItem>
            </Select>
          </Grid>
          {role === "STUDENT" && (
            <>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Năm bắt đầu"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  required={role === "STUDENT"}
                  disabled={role === "STUDENT"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Năm kết thúc"
                  value={finishYear}
                  onChange={(e) => setFinishYear(e.target.value)}
                  required={role === "STUDENT"}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
              <InputLabel id="role-label">Lớp</InputLabel>
                <Select
                  // label="Lớp học"
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
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          mt={2}
        >
          <Button variant="contained" type="submit" onClick={handleCreateUser}>
            Thêm tài khoản
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateAccount;
