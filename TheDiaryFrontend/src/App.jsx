import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateNote from "./pages/CreateNote";
import NotesGrid from "./pages/NotesGrid";
import Layout from "./components/Layout";
import Note from "./pages/Note";
import Calendar from "./pages/Calendar";
import Finances from "./pages/Finances";
import LogFinanceTransaction from "./pages/LogFinanceTranscation";
import Nutrition from "./pages/Nutrition";
import ViewFinanceTransaction from "./pages/ViewFinanceTransaction";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/notes/create" element={<CreateNote />} />
          <Route path="/notes" element={<NotesGrid />} />
          <Route path="/note/:id" element={<Note />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/finances/create" element={<LogFinanceTransaction />} />
          <Route path="/finances/:id" element={<ViewFinanceTransaction />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;