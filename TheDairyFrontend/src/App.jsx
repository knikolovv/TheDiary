import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNote from './pages/CreateNote';
import NotesGrid from './pages/NotesGrid';
import Layout from './components/Layout';
import Note from './pages/Note';
import Calendar from './pages/Calendar'
// import NotesList from './pages/NotesList';
// import ViewNote from './pages/ViewNote';
// import EditNote from './pages/EditNote';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/notes/create" element={<CreateNote />} />
          <Route path="/notes" element={<NotesGrid />} />
          <Route path="/note/:id" element={<Note />} />
          <Route path="/calendar" element={<Calendar />} />
          {/* <Route path="/food" element={<Food />} /> */}
          {/* <Route path="/finances" element={<Finances />} /> */}
          {/* <Route path="/note/:id/edit" element={<EditNote />} />  */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;