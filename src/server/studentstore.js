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