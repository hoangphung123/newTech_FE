import {
  Box,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { notify } from "../../../../untils/helpers/notify";
import * as userServer from "../../../../server/adminstore";

function CreateAccount({ setList }) {
  const [name, setName] = useState("");
  const [majorId, setMajorId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [detail, setDetail] = useState("");
  const [majors, setMajor] = useState([]);

  const handleReset = () => {
    setName("");
    setDetail("");
    setMajorId("");
    setStartDate("");
    setFinishDate("");
  };

  useEffect(() => {
    const fetchMajorData = async () => {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem("access_token_admin")
        );
        const MajorData = await userServer.GetAllMajor(accessToken);
        setMajor(MajorData.listData);
      } catch (error) {
        console.error("Error while fetching classes:", error.message);
      }
    };

    fetchMajorData();
  }, []);

  const handleCreateTopic = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      // Extracting data from the component's state
      const topicData = {
        name,
        detail,
        majorId,
        startDate,
        finishDate,
      };
  
      // Call the createTopic function with the topic data
      const accessToken = JSON.parse(
        localStorage.getItem("access_token_admin")
      );
      await userServer.createNewTopic(accessToken, topicData);
      const topicsData = await userServer.GetAllTopic(accessToken);
      setList(topicsData.listData);
      handleReset();
      notify("success", "Topic created successfully");
    } catch (error) {
      // Handle unexpected errors
      console.error("Error while creating topic:", error.message);
      notify("error", "Topic created Error");
    }
  };
  

  return (
    <Box>
      <Button fullWidth size="large" variant="contained">
        Tạo Đề Tài
      </Button>
      <Box mt={2} component={"form"}>
        <Grid container spacing={2}>
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
              value={startDate}
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
              value={finishDate}
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
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          mt={2}
        >
          <Button variant="contained" type="submit" onClick={handleCreateTopic}>
            Thêm Đề tài
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateAccount;
