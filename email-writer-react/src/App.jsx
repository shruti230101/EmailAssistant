import { useState } from "react";
import { Container, Box, TextField } from "@mui/material";
import EmailInput from "./components/EmailInput";
import ToneSelector from "./components/ToneSelector";
import GenerateButton from "./components/GenerateButton";
import GeneratedReply from "./components/GeneratedReply";
import ErrorMessage from "./components/ErrorMessage";
import { generateEmail } from "./services/api";
import Header from "./components/Header";
import InputNames from "./components/InputNames";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await generateEmail(
        emailContent,
        tone,
        senderName,
        receiverName
      );
      setGeneratedReply(response.data);
    } catch {
      setError("Failed to generate email reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Header title="Email Reply Generator" />
      <Box>
        <EmailInput
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <InputNames
            senderName={senderName}
            setSenderName={setSenderName}
            receiverName={receiverName}
            setReceiverName={setReceiverName}
          />
        </Box>
        <ToneSelector value={tone} onChange={(e) => setTone(e.target.value)} />
        <GenerateButton
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          loading={loading}
        />
        <ErrorMessage message={error} />
        {generatedReply && <GeneratedReply reply={generatedReply} />}
      </Box>
    </Container>
  );
}

export default App;
