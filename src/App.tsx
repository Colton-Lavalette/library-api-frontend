import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import Genres from "./pages/Genres";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/books" element={<Books />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/genres" element={<Genres />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;