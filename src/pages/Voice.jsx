import React, { useState } from "react";

const Voice = () => {
  const [transcript, setTranscript] = useState("");
  const [correctedText, setCorrectedText] = useState("");

  const startVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = async (event) => {
      const voiceText = event.results[0][0].transcript;
      setTranscript(voiceText);

      // Send the text to the backend for correction
      const response = await fetch("http://localhost:3000/auth/check-voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: voiceText }),
      });

      const data = await response.json();
      setCorrectedText(data.correctedText);
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: ", event.error);
    };
  };

  return (
    <div>
      <h1>Voice Correction Example</h1>
      <button onClick={startVoiceRecognition}>Start Voice Recognition</button>
      <p>Transcript: {transcript}</p>
      <p>Corrected Text: {correctedText}</p>
    </div>
  );
};

export default Voice;
