import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../controllers/axiosInstance";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch lessons if user is authenticated
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`/home/?userId=${user.userId}`);
        setChapters(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
        setChapters([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, [user, navigate]);

  const enterToLesson = (lessonId) => {
    console.log(lessonId);
  };

  const handleCommunityChat = () => { window.location = '/chat' }
  
  return (
    <div>
      <h5 onClick={() => handleCommunityChat()}>Community Chat</h5>
      <h1>Home Page</h1>
      {user && <p>Hi {user.username}</p>}
      {chapters && chapters.map((chapter, index) => (
        <div key={index}>
          <h1>{chapter.Name}</h1>
          {chapter.Lessons?.map((lesson, lessonIndex) => (
            <div onClick={() => enterToLesson(lesson._id)} key={lessonIndex}>
              {lesson.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
