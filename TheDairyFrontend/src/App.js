import './App.css';
import Appbar from './components/Appbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNote from './pages/CreateNote';
import Notes from './pages/Notes';
// import NotesList from './pages/NotesList';
// import ViewNote from './pages/ViewNote';
// import EditNote from './pages/EditNote';

function App() {
  return (
    <Router>
      <Appbar />
      <Routes>
        <Route path="/note/create" element={<CreateNote />} />
        {<Route path="/notes" element={<Notes />} />
        /*<Route path="/note/:id" element={<ViewNote />} />
        <Route path="/note/:id/edit" element={<EditNote />} />*/ }
      </Routes>
    </Router>
  );
}

export default App;