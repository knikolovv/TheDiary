import './App.css';
import Appbar from './components/Appbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNote from './pages/CreateNote';
// import NotesList from './pages/NotesList';
// import ViewNote from './pages/ViewNote';
// import EditNote from './pages/EditNote';

function App() {
  return (
    <Router>
      <Appbar/>
      <Routes>
        <Route path="/create" element={<CreateNote />} />
        {/* <Route path="/notes" element={<NotesList />} />
        <Route path="/note/:id" element={<ViewNote />} />
        <Route path="/note/:id/edit" element={<EditNote />} /> */}
        asd
      </Routes>
    </Router>
  );
}

export default App;