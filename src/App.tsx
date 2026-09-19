import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/books" element={<Books />} />
                <Route path="/authors" element={<Authors />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;