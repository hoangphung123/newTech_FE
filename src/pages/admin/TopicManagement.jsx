import React, { useEffect, useState } from "react";
import CreateTopic from "../../components/screens/admin/topic/createTopic";
import TableTopic from "../../components/screens/admin/topic/tableTopic";
import './Management.scss'
import * as Userserver from "../../server/adminstore";


function AccountManagement() {
  const [dataTopic, setDataTopic] = useState([]);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        // Fetch user data using getAllUsers function
        const accessToken = JSON.parse(
          localStorage.getItem("access_token_admin")
        );
        const TopicsData = await Userserver.GetAllTopic(accessToken);
        setDataTopic(TopicsData.listData);
      } catch (error) {
        console.error("Error while fetching users:", error.message);
        // Handle error if needed
      }
    };

    fetchTopicData();
  }, []);;
  return (
    <div className="management">
      <CreateTopic setList={setDataTopic}/>
      <TableTopic data={dataTopic} setList={setDataTopic} />   
    </div>
      
      
    // 
  );
}

export default AccountManagement;
