import React, { useEffect, useState } from "react";
import CreateAccount from "../../components/screens/admin/account-management/CreateAccount";
import InfoAccount from "../../components/screens/admin/account-management/InfoAccount";
import MainLayout from "../../components/layout/MainLayout";
import './Management.scss'
import * as Userserver from "../../server/adminstore";


function AccountManagement() {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        // Fetch user data using getAllUsers function
        const accessToken = JSON.parse(
          localStorage.getItem("access_token_admin")
        );
        const usersData = await Userserver.getAllUsers(accessToken);
        setDataUser(usersData.listData);
      } catch (error) {
        console.error("Error while fetching users:", error.message);
        // Handle error if needed
      }
    };

    fetchUsersData();
  }, []);;
  return (
    <div className="management">
      <CreateAccount setList={setDataUser} />  
      <InfoAccount data={dataUser} setList={setDataUser} />   
    </div>
      
      
    // 
  );
}

export default AccountManagement;
