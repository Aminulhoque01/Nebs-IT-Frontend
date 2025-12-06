import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateNotice from "./page/AddNotice/AddNotice";
import SingleNotice from "./page/SingleNotice/SingleNotice";
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateNotice />} />
        <Route path="/notice/:id" element={<SingleNotice />} />
      </Routes>
    </Router>
  );
}

export default App;
