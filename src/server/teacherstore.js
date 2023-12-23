import axios from "axios";

const api_url = "http://127.0.0.1:3500/api/v1";

// export const loginAdmin = async (loginData) => {
//   try {
//     const response = await axios.post(`${api_url}/auth/admin/login`, loginData);
//     const loggedInAdmin = response.data;
//     return loggedInAdmin;
//   } catch (error) {
//     console.error("Error while logging in:", error.message);
//     throw error;
//   }
// };

// export const GetAllClasses = async (accessToken) => {
//   try {
//     const response = await axios.get(`${api_url}/class/filter`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const classes = response.data;
//     return classes;
//   } catch (error) {
//     console.error("Error while fetching classes:", error.message);
//     throw error;
//   }
// }

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
};

// export const GetAllClass = async (accessToken) => {
//   try {
//     const response = await axios.get(`${api_url}/class/filter`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const className = response.data;
//     return className;
//   } catch (error) {
//     console.error("Error while fetching majors:", error.message);
//     throw error;
//   }
// }

export const GetAllTopicByMajorId = async (accessToken) => {
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
};

export const GetAllTopic = async (accessToken) => {
  try {
    const response = await axios.get(`${api_url}/topic/teacher`, {
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
};

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
};

export const GetAllTopicMajorHead = async (accessToken) => {
  try {
    const response = await axios.get(`${api_url}/topic/major-head`, {
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
};

export const getTopicByMajorId = async (accessToken, majorId) => {
  try {
    const response = await axios.get(`${api_url}/topic/${majorId}/filter`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const topicData = response.data;
    return topicData;
  } catch (error) {
    console.error("Error while fetching topics by majorId:", error.message);
    throw error;
  }
};

export const getTopicByKeyword = async (accessToken, keyword) => {
  try {
    const response = await axios.get(
      `${api_url}/topic/teacher?majorId=${keyword}`,
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
};

export const getTopicByMajorHead = async (accessToken, keyword) => {
  try {
    const response = await axios.get(
      `${api_url}/topic/major-head?majorId=${keyword}`,
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
};

export const RegistationTopicTeacher = async (accessToken, RegisData) => {
  try {
    const response = await axios.post(
      `${api_url}/topic-registration/teacher`,
      RegisData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const registrationResult = response.data;
    return registrationResult;
  } catch (error) {
    console.error("Error while registering topic for teacher:", error.message);
    throw error;
  }
};

export const DeleteRegisTopicTeacher = async (accessToken, registrationId) => {
  try {
    const response = await axios.delete(
      `${api_url}/topic-registration/cancellation/${registrationId}/teacher`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const cancellationResult = response.data;
    return cancellationResult;
  } catch (error) {
    console.error("Error while canceling topic registration:", error.message);
    throw error;
  }
};

export const GetTopicOnGoing = async (accessToken, teacherId) => {
  try {
    const response = await axios.get(
      `${api_url}/topic/on-going?teacherId=${teacherId}`,
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
};

export const EvaluateTopic = async (
  accessToken,
  registrationId,
  evaluationData
) => {
  try {
    const response = await axios.patch(
      `${api_url}/topic-registration/${registrationId}/teacher/evaluate`,
      evaluationData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const evaluationResult = response.data;
    return evaluationResult;
  } catch (error) {
    console.error("Error while evaluating topic registration:", error.message);
    throw error;
  }
};

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
};

export const CreateAssignment = async (accessToken, assignmentData) => {
  try {
    const response = await axios.post(`${api_url}/assignment`, // Replace with the actual endpoint for creating assignments
      assignmentData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const assignmentResult = response.data;
    return assignmentResult;
  } catch (error) {
    console.error("Error while creating assignment:", error.message);
    throw error;
  }
}

export const GetAssignmentByTopicId = async (accessToken, topicId) => {
  try {
    const response = await axios.get(
      `${api_url}/assignment/filter?topicId=${topicId}`,
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

export const DeleteAsigement = async (accessToken, assignmentId) => {
  try {
    const response = await axios.delete(
      `${api_url}/assignment/${assignmentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const deletionResult = response.data;
    return deletionResult;
  } catch (error) {
    console.error("Error while deleting assignment:", error.message);
    throw error;
  }
}

export const UpdateAsigement = async (accessToken, assignmentId, updateData) => {
  try {
    const response = await axios.patch(
      `${api_url}/assignment/${assignmentId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const updateResult = response.data;
    return updateResult;
  } catch (error) {
    console.error("Error while updating assignment:", error.message);
    throw error;
  }
}

export const getProfile = async (accessToken) => {
  try {
    const response = await axios.get(`${api_url}/user/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userProfile = response.data;
    return userProfile;
  } catch (error) {
    console.error("Error while fetching user profile:", error.message);
    throw error;
  }
}


