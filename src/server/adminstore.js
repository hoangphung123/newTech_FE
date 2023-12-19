import axios from "axios";

const api_url = "http://127.0.0.1:3500/api/v1";

export const loginAdmin = async (loginData) => {
  try {
    const response = await axios.post(`${api_url}/auth/admin/login`, loginData);
    const loggedInAdmin = response.data;
    return loggedInAdmin;
  } catch (error) {
    console.error("Error while logging in:", error.message);
    throw error;
  }
};

export const GetAllClasses = async (accessToken) => {
  try {
    const response = await axios.get(`${api_url}/class/filter`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const classes = response.data;
    return classes;
  } catch (error) {
    console.error("Error while fetching classes:", error.message);
    throw error;
  }
}

export const createNewUser = async (accessToken, userData) => {
    try {
      const response = await axios.post(`${api_url}/admin/user`, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const newUser = response.data;
      return newUser;
    } catch (error) {
      console.error("Error while creating a new user:", error.message);
      throw error;
    }
}

export const getAllUsers = async (accessToken) => {
    try {
      const response = await axios.get(`${api_url}/admin/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const allUsers = response.data;
      return allUsers;
    } catch (error) {
      console.error("Error while fetching all users:", error.message);
      throw error;
    }
}

export const deleteUser = async (accessToken, userId) => {
    try {
      const response = await axios.delete(`${api_url}/admin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const deletedUser = response.data;
      return deletedUser;
    } catch (error) {
      console.error("Error while deleting user:", error.message);
      throw error;
    }
}

export const updateUser = async (accessToken, userId, updatedUserData) => {
    try {
      const response = await axios.patch(`${api_url}/admin/user/${userId}`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedUser = response.data;
      return updatedUser;
    } catch (error) {
      console.error("Error while updating user:", error.message);
      throw error;
    }
}

export const GetAllMajor = async (accessToken) => {
    try {
      const response = await axios.get(`${api_url}/major/filter`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const majors = response.data;
      return majors;
    } catch (error) {
      console.error("Error while fetching majors:", error.message);
      throw error;
    }
}

export const createNewMajor = async (accessToken, majorData) => {
  try {
    const response = await axios.post(`${api_url}/major`, majorData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const newMajor = response.data;
    return newMajor;
  } catch (error) {
    console.error("Error while creating a new major:", error.message);
    throw error;
  }
}

export const createNewClass = async (accessToken, classData) => {
  try {
    const response = await axios.post(`${api_url}/class`, classData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const newClass = response.data;
    return newClass;
  } catch (error) {
    console.error("Error while creating a new major:", error.message);
    throw error;
  }
}

export const GetAllClass = async (accessToken) => {
  try {
    const response = await axios.get(`${api_url}/class/filter`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const className = response.data;
    return className;
  } catch (error) {
    console.error("Error while fetching majors:", error.message);
    throw error;
  }
}

export const createNewTopic= async (accessToken, topicData) => {
  try {
    const response = await axios.post(`${api_url}/topic`, topicData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const newTopic = response.data;
    return newTopic;
  } catch (error) {
    console.error("Error while creating a new Topic:", error.message);
    throw error;
  }
}

export const GetAllTopic= async (accessToken) => {
  try {
    const response = await axios.get(`${api_url}/topic/filter`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const TopicData = response.data;
    return TopicData;
  } catch (error) {
    console.error("Error while fetching majors:", error.message);
    throw error;
  }
}

export const updateTopic = async (accessToken, TopicId, updatedTopicData) => {
  try {
    const response = await axios.patch(`${api_url}/topic/${TopicId}`, updatedTopicData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const updatedTopic = response.data;
    return updatedTopic;
  } catch (error) {
    console.error("Error while updating user:", error.message);
    throw error;
  }
}

export const deleteTopic = async (accessToken, TopicId) => {
  try {
    const response = await axios.delete(`${api_url}/topic/${TopicId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const deletedTopic = response.data;
    return deletedTopic;
  } catch (error) {
    console.error("Error while deleting user:", error.message);
    throw error;
  }
}

