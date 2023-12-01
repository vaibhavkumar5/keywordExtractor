import { Container, Box } from "@chakra-ui/react";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import { useState } from "react";
import Modals from "./components/Modals";

function App() {
  const [keyword, setKeyword] = useState([]);
  const [isOpen, SetIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const extractKeywords = async (text) => {
    setLoading(true);
    SetIsOpen(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
        Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct",
        prompt:
          "Extract keywords from this text. Make the first letter of each word uppercasr and seperate with commas:\n\n" +
          text +
          "",
        temperature: 0.5,
        max_tokens: 60,
        frequency_penalty: 0.8,
        presence_penalty: 0.0,
      }),
    };
    try {
      const response = await fetch(import.meta.env.OPENAI_API_URL, options);
      const json = await response.json();
      console.log(json.choices[0].text.trim());
      setKeywords(json.choices[0].text.trim());
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const closeModal = () => {
    SetIsOpen(false);
  };

  return (
    <Box bg="blue.600" color="white" height="100vh" paddingTop={130}>
      <Container maxW="3xl" centerContent>
        <Header />
        <TextInput extractKeywords={extractKeywords} />
      </Container>
      <Modals
        keywords={keyword}
        loading={loading}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Box>
  );
}

export default App;
