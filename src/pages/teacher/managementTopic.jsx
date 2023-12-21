import React, { useEffect, useState } from "react";
import CreateAccount from "../../components/screens/admin/account-management/CreateAccount";
import InfoAccount from "../../components/screens/admin/account-management/InfoAccount";
import MainLayout from "../../components/layout/MainLayout";
import "./management.scss";
import * as Userserver from "../../server/teacherstore";
import { MenuItem, Select, InputLabel, FormControl, Button } from "@mui/material";

function TopicManagement() {
  const [selectedArea, setSelectedArea] = useState("");
  const [topicData, setTopicData] = useState([]);

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

  const handleChange = (event) => {
    setSelectedArea(event.target.value);
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
        <div className="contents"></div>
      </div>
      <div className="right">
        <div className="button_create">
        <Button>Tạo Bài Tập</Button>
        </div>
        <div className="contentAssigement"></div>
      </div>
    </div>

    //
  );
}

export default TopicManagement;
