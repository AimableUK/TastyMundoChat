import { Routes, Route } from "react-router-dom";

// main ones
import AppLayout from "./App/Main/AppLayout";
import ChatInterface from "./App/AICHAT/ChatInterface";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="c" element={<ChatInterface />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
