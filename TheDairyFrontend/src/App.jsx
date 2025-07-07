import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNote from './pages/CreateNote';
import Notes from './pages/Notes';
import Layout from './components/Layout';
// import NotesList from './pages/NotesList';
// import ViewNote from './pages/ViewNote';
// import EditNote from './pages/EditNote';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/notes/create" element={<CreateNote />} />
          <Route path="/notes" element={<Notes />} />
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          {/* <Route path="/food" element={<Food />} /> */}
          {/* <Route path="/finances" element={<Finances />} /> */}
          {/* <Route path="/note/:id" element={<ViewNote />} /> */}
          {/* <Route path="/note/:id/edit" element={<EditNote />} />  */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;