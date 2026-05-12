import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenteesPage from "./pages/MenteesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import AcademyPage from "./pages/AcademyPage";
import MentorshipPage from "./pages/MentorshipPage";
import BookMentorPage from "./pages/BookMentorPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentees" element={<MenteesPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/academy" element={<AcademyPage />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/selecionar-mentora" element={<BookMentorPage />} />
        <Route path="/book" element={<BookMentorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
