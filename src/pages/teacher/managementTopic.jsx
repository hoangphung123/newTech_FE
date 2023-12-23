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
import EventNoteIcon from "@mui/icons-material/EventNote";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DoneIcon from "@mui/icons-material/Done";

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
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleUpdateDialogOpen = (assignment) => {
    setSelectedAssignment(assignment);
    setUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
    setSelectedAssignment(null);
  };

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

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      // timeZoneName: "short",
    };

    const dateTime = new Date(dateTimeString);
    const formattedDateTime = dateTime
      .toLocaleDateString("en-US", options)
      .replace(",", "");

    return formattedDateTime;
  }

  const fetchAsigementData = async () => {
    try {
      const accessTokens = JSON.parse(
        localStorage.getItem("access_token_user")
      );

      // Call the GetAssignmentByTopicId function
      const assignments = await Userserver.GetAssignmentByTopicId(
        accessTokens,
        selectedArea
      );

      // Update the state with the fetched assignment data
      setAsigementData(assignments.listData);
    } catch (error) {
      console.error("Error while fetching assignments:", error.message);
    }
  };

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

      fetchAsigementData();

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

  const handleDeleteAsigement = async (assignmentId) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token_user"));

      // Call the DeleteAsigement function
      const deletionResult = await Userserver.DeleteAsigement(
        accessToken,
        assignmentId
      );

      fetchAsigementData();

      // Handle the result as needed
      console.log("Assignment deleted successfully:", deletionResult);

      // Now you can update your state or perform any other necessary actions
      fetchAsigementData();
    } catch (error) {
      console.error("Error deleting assignment:", error.message);
      // Handle the error as needed
    }
  };

  const handleUpdateTask = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token_user"));

      const updateData = {
        title: title,
        description: description,
        startAt: startAt,
        finishAt: finishAt,
        status: status,
      };

      // Assuming you have an UpdateAssignment function in Userserver
      const result = await Userserver.UpdateAsigement(
        accessToken,
        selectedAssignment.id,
        updateData
      );

      fetchAsigementData();

      // Handle the result as needed
      console.log("Assignment updated successfully:", result);
    } catch (error) {
      console.error("Error updating assignment:", error.message);
    }

    setUpdateDialogOpen(false);
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
                <div className="iconContents">
                  <EventNoteIcon color="primary"></EventNoteIcon>
                </div>
                <div className="contentsAsigement">
                  <p>Title: {assignment.title}</p>
                  <p>Description: {assignment.description}</p>
                  <p>Start Date: {formatDateTime(assignment.startAt)}</p>
                  <p>Finish Date: {formatDateTime(assignment.finishAt)}</p>
                </div>
              </div>
              <div className="contentAssigement_Asigement">
                <div className="iconContents">
                  <FolderOpenIcon sx={{ color: "orange" }}></FolderOpenIcon>
                </div>
              </div>
              <div className="contentAssigement_score">
                <div className="iconContents">
                  <DoneIcon color="success"></DoneIcon>
                </div>
              </div>
              <div className="contentAssigement_button">
                <div
                  className="button_content1"
                  onClick={() => handleDeleteAsigement(assignment.id)}
                >
                  <DeleteIcon sx={{ color: "white" }}></DeleteIcon>
                </div>
                <div
                  className="button_content2"
                  onClick={() => handleUpdateDialogOpen(assignment)}
                >
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
      {/* Update Dialog */}
      <Dialog open={updateDialogOpen} onClose={handleUpdateDialogClose}>
        <DialogTitle>Cập Nhật Bài Tập</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={title || selectedAssignment?.title || ""}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginTop: "16px" }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description || selectedAssignment?.description || ""}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginTop: "16px" }}
          />
          <TextField
            fullWidth
            size="small"
            type="datetime-local"
            value={startAt || formatDateTime(selectedAssignment?.startAt) || ""}
            onChange={(e) => setStartAt(e.target.value)}
            style={{ marginTop: "16px" }}
          />
          <TextField
            fullWidth
            size="small"
            type="datetime-local"
            value={
              finishAt || formatDateTime(selectedAssignment?.finishAt) || ""
            }
            onChange={(e) => setFinishAt(e.target.value)}
            style={{ marginTop: "16px", marginBottom: "16px" }}
          />
          <Select
            value={status || selectedAssignment?.status || 1}
            onChange={handleStatusChange}
          >
            <MenuItem value={1}>ACTIVE</MenuItem>
            <MenuItem value={0}>INACTIVE</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button onClick={handleUpdateTask} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TopicManagement;
