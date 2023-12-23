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
import * as Userserver from "../../server/studentstore";
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
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState({});
  const [file, setFile] = useState(null);

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

  //   const fetchAsigementData = async () => {
  //     try {
  //       const accessTokens = JSON.parse(
  //         localStorage.getItem("access_token_user")
  //       );

  //       // Call the GetAssignmentByTopicId function
  //       const assignments = await Userserver.GetAssignmentByTopicId(
  //         accessTokens,
  //         selectedArea
  //       );

  //       const scoresFromServer = {};
  //       for (const assignment of assignments.listData) {
  //         if (assignment.score !== null && assignment.score !== undefined) {
  //           scoresFromServer[assignment.id] = assignment.score;
  //         }
  //       }
  //       setScores(scoresFromServer);

  //       // Update the state with the fetched assignment data
  //       setAsigementData(assignments.listData);
  //     } catch (error) {
  //       console.error("Error while fetching assignments:", error.message);
  //     }
  //   };

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

      //   const scoresFromServer = {};
      //   for (const assignment of assignments.listData) {
      //     if (assignment.score !== null && assignment.score !== undefined) {
      //       scoresFromServer[assignment.id] = assignment.score;
      //     }
      //   }
      //   setScores(scoresFromServer);

      // Update the state with the fetched assignment data
      setAsigementData(assignments.listData);
    } catch (error) {
      console.error("Error while fetching assignments:", error.message);
    }
  };

  //   const handleOpenDialog = () => {
  //     setOpenDialog(true);
  //   };

  //   const handleCloseDialog = () => {
  //     setOpenDialog(false);
  //   };

  //   const handleCreateTask = async () => {
  //     try {
  //       const accessToken = JSON.parse(localStorage.getItem("access_token_user"));

  //       // Sample assignment data
  //       const assignmentData = {
  //         title: title,
  //         description: description,
  //         startAt: startAt,
  //         finishAt: finishAt,
  //         topicId: selectedArea,
  //         status: status,
  //       };

  //       const result = await Userserver.CreateAssignment(
  //         accessToken,
  //         assignmentData
  //       );

  //       fetchAsigementData();

  //       // Handle the result as needed
  //       console.log("Assignment created successfully:", result);
  //     } catch (error) {
  //       console.error("Error creating assignment:", error.message);
  //     }
  //     // Implement the logic to create a task using the provided data (title, description, startAt, finishAt)
  //     console.log("Creating task:", { title, description, startAt, finishAt });
  //     // Close the dialog
  //     setOpenDialog(false);
  //   };

  //   const handleStatusChange = (event) => {
  //     // Update the status state when the user selects an option
  //     setStatus(event.target.value);
  //   };

  const handleFileUpload = async (assignmentId) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token_user"));

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", file);

      // Call the server API to upload the file
      const result = await Userserver.uploadFile(
        accessToken,
        assignmentId,
        formData
      );

      // Handle the result as needed
      console.log("File uploaded successfully:", result);

      // Optionally, you can update the state or perform additional actions
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
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
                {assignment.resultFile ? (
                  // Render the file if it exists
                  <a
                    href={`http://localhost:3500/${assignment.resultFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>
                ) : (
                  // Render file input and upload button if resultFile doesn't exist
                  <div className="fileInput">
                    <input
                      type="file"
                      accept=".pdf, .doc, .docx"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleFileUpload(assignment.id)}
                    >
                      Upload
                    </Button>
                  </div>
                )}
              </div>
              <div className="contentAssigement_score">
                <div className="iconContents">
                  <DoneIcon color="success"></DoneIcon>
                </div>
                <div className="ScoreAsigement"></div>
              </div>
            </div>
          ))}
          {/* Rest of your Task component */}
        </div>
      </div>
    </div>
  );
}

export default TopicManagement;
