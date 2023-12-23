import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import * as Userserver from "../../server/teacherstore";
import "./management.scss";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

function TopicManagement() {
  const [selectedArea, setSelectedArea] = useState("");
  const [topicData, setTopicData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [asigementData, setAsigementData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startAt, setStartAt] = useState(new Date());
  const [finishAt, setFinishAt] = useState(new Date());
  const [status, setStatus] = useState(1);

  useEffect(() => {
    // Gọi hàm GetTopicOnGoing và cập nhật state topicData
    const fetchTopicData = async () => {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem("access_token_user")
        );

        const user = JSON.parse(localStorage.getItem("user"));

        const teacherId = user.id;
        // Thay thế bằng ID giáo viên của bạn

        const onGoingTopics = await Userserver.GetTopicOnGoing(
          accessToken,
          teacherId
        );
        setTopicData(onGoingTopics.listData);
      } catch (error) {
        console.error("Error while fetching ongoing topics:", error.message);
      }
    };

    fetchTopicData();
  }, []);

  const handleChange = async (event) => {
    const selectedTopicId = event.target.value;
    setSelectedArea(selectedTopicId);

    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token_user"));
      const projects = await Userserver.GetProject(
        accessToken,
        selectedTopicId
      );
      setProjectData(projects.listData);
    } catch (error) {
      console.error("Error while fetching projects:", error.message);
    }

    try {
      const accessTokens = JSON.parse(
        localStorage.getItem("access_token_user")
      );

      // Call the GetAssignmentByTopicId function
      const assignments = await Userserver.GetAssignmentByTopicId(
        accessTokens,
        selectedTopicId
      );

      // Update the state with the fetched assignment data
      setAsigementData(assignments.listData);
    } catch (error) {
      console.error("Error while fetching assignments:", error.message);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateTask = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token_user"));

      // Sample assignment data
      const assignmentData = {
        title: title,
        description: description,
        startAt: startAt,
        finishAt: finishAt,
        topicId: selectedArea,
        status: status,
      };

      const result = await Userserver.CreateAssignment(
        accessToken,
        assignmentData
      );

      // Handle the result as needed
      console.log("Assignment created successfully:", result);
    } catch (error) {
      console.error("Error creating assignment:", error.message);
    }
    // Implement the logic to create a task using the provided data (title, description, startAt, finishAt)
    console.log("Creating task:", { title, description, startAt, finishAt });
    // Close the dialog
    setOpenDialog(false);
  };

  const handleStatusChange = (event) => {
    // Update the status state when the user selects an option
    setStatus(event.target.value);
  };

  return (
    <div className="managementTopic">
      <div className="Left">
        <div className="selected_Topic">
          <FormControl className="customFormControl">
            <InputLabel className="selectedAreaLabel">chọn đề tài</InputLabel>
            <Select
              labelId="selectedAreaLabel"
              id="selectedArea"
              value={selectedArea}
              label="Khu vực select"
              onChange={handleChange}
            >
              {topicData.map((topic) => (
                <MenuItem key={topic.id} value={topic.id}>
                  {topic.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="contents">
          {projectData.map((project) => (
            <div className="contents_student" key={project.id}>
              <p>Name: {project.studentInfor.name}</p>
              <p>Role: {project.role}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        <div className="button_create">
          <Button variant="contained" size="small" onClick={handleOpenDialog}>
            Tạo Bài Tập
          </Button>
        </div>
        <div className="contentAssigement">
          {asigementData.map((assignment) => (
            <div className="Task" key={assignment.id}>
              <div key={assignment.id} className="contentAssigement_contents">
                <p>Title: {assignment.title}</p>
                <p>Description: {assignment.description}</p>
                <p>Start Date: {assignment.startAt}</p>
                <p>Finish Date: {assignment.finishAt}</p>
                {/* <p>Status: {assignment.status === 1 ? "ACTIVE" : "INACTIVE"}</p> */}
                {/* Add the rest of the content for each assignment as needed */}
              </div>
              <div className="contentAssigement_Asigement">
                <p>Title: {assignment.title}</p>
              </div>
              <div className="contentAssigement_score"></div>
              <div className="contentAssigement_button">
                <div className="button_content1">
                  <DeleteIcon sx={{ color: "white" }}></DeleteIcon>
                </div>
                <div className="button_content2">
                  <DriveFileRenameOutlineIcon
                    sx={{ color: "white" }}
                  ></DriveFileRenameOutlineIcon>
                </div>
              </div>
            </div>
          ))}
          {/* Rest of your Task component */}
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Tạo Bài Tập</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginTop: "16px" }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginTop: "16px" }}
          />
          <TextField
            fullWidth
            size="small"
            //   label="Ngày bắt đầu"
            type="datetime-local"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            style={{ marginTop: "16px" }}
          />
          <TextField
            fullWidth
            size="small"
            //   label="Ngày bắt đầu"
            type="datetime-local"
            value={finishAt}
            onChange={(e) => setFinishAt(e.target.value)}
            style={{ marginTop: "16px", marginBottom: "16px" }}
          />
          <Select value={status} onChange={handleStatusChange}>
            <MenuItem value={1}>ACTIVE</MenuItem>
            <MenuItem value={0}>INACTIVE</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateTask} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TopicManagement;
