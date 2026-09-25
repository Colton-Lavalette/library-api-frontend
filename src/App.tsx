import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import Genres from "./pages/Genres";
import Members from "./pages/Members";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/books" element={<Books />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/members" element={<Members />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;