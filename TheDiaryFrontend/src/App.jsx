import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CreateNote from "./pages/CreateNote";
import NotesGrid from "./pages/NotesGrid";
import Note from "./pages/Note";
import Calendar from "./pages/Calendar";
import Finances from "./pages/Finances";
import LogFinanceTransaction from "./pages/LogFinanceTranscation";
import ViewFinanceTransaction from "./pages/ViewFinanceTransaction";
import Nutrition from "./pages/Nutrition";
import LogFood from "./pages/LogFood";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/notes/create" element={<CreateNote />} />
          <Route path="/notes" element={<NotesGrid />} />
          <Route path="/note/:id" element={<Note />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/finances/log-transaction" element={<LogFinanceTransaction />} />
          <Route path="/finances/:id" element={<ViewFinanceTransaction />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/nutrition/log-food" element={<LogFood />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;