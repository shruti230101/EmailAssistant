import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/email";

export const generateEmail = async (emailContent, tone, senderName, receiverName) => {
  const requestBody = {
    emailContent: emailContent,
    tone: tone,
    senderName: senderName,
    receiverName: receiverName,
  };
  return await axios.post(`${API_BASE_URL}/generate-email`, requestBody);
};