import axios from "axios";

const api_url = "http://127.0.0.1:3500/api/v1";


export const GetAllTopicStudent = async (accessToken) => {
    try {
      const response = await axios.get(`${api_url}/topic/student`, {
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

export const createTopicRegis = async (accessToken, topicRegistrationData) => {
    try {
      const response = await axios.post(`${api_url}/topic-registration/student`, topicRegistrationData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const createdTopicRegis = response.data;
      return createdTopicRegis;
    } catch (error) {
      console.error("Error while creating topic registration:", error.message);
      throw error;
    }
}

export const deleteRegis = async (accessToken, registrationId) => {
    try {
      const response = await axios.delete(`${api_url}/topic-registration/cancellation/${registrationId}/student`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const deletedRegis = response.data;
      return deletedRegis;
    } catch (error) {
      console.error("Error while deleting topic registration:", error.message);
      throw error;
    }
}

export const GetAllMajorDropDown = async (accessToken) => {
    try {
      const response = await axios.get(`${api_url}/major/dropdown/filter`, {
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

export const getTopicByKeyword = async (accessToken, keyword) => {
    try {
      const response = await axios.get(
        `${api_url}/topic/student?keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const topicData = response.data;
      return topicData;
    } catch (error) {
      console.error("Error while fetching topics by keyword:", error.message);
      throw error;
    }
}

export const GetTopicOnGoing = async (accessToken, studentProjectId) => {
    try {
      const response = await axios.get(
        `${api_url}/topic/on-going?studentProjectId=${studentProjectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const topicOnGoingData = response.data;
      return topicOnGoingData;
    } catch (error) {
      console.error("Error while fetching ongoing topics:", error.message);
      throw error;
    }
}

export const GetProject = async (accessToken, topicId) => {
    try {
      const response = await axios.get(
        `${api_url}/student-project/filter?topicId=${topicId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const projectData = response.data;
      return projectData;
    } catch (error) {
      console.error("Error while fetching projects:", error.message);
      throw error;
    }
}

export const GetAssignmentByTopicId = async (accessToken, topicId) => {
    try {
      const response = await axios.get(
        `${api_url}/assignment/filter?status=1&topicId=${topicId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const assignmentData = response.data;
      return assignmentData;
    } catch (error) {
      console.error("Error while fetching assignments by topicId:", error.message);
      throw error;
    }
}

export const getWaitingRegis = async (accessToken, topicId) => {
    try {
      const response = await axios.get(
        `${api_url}/topic-registration/waiting-student-confirm/${topicId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const waitingRegisData = response.data;
      return waitingRegisData;
    } catch (error) {
      console.error("Error while fetching waiting registrations:", error.message);
      throw error;
    }
}

export const uploadFile = async (accessToken, assignmentId, fileData) => {
    try {
      const response = await axios.post(
        `${api_url}/upload/assignment/${assignmentId}`,
        fileData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedFileData = response.data;
      return uploadedFileData;
    } catch (error) {
      console.error("Error while uploading file:", error.message);
      throw error;
    }
}
  