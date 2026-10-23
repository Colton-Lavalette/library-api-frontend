import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar/Navbar";
/* import Home from "./pages/Home"; */
import Books from "./pages/Books";
/* import BookDetail from "./pages/BookDetail"; */
import Authors from "./pages/Authors";
import Genres from "./pages/Genres";
import Members from "./pages/Members";

/*
// Uncomment when these pages exist.
import MemberDetail from "./pages/MemberDetail";
import Circulation from "./pages/Circulation";
import NotFound from "./pages/NotFound";
*/

const tickerItems: string[] = [];

function App() {
    return (
        <BrowserRouter>
            <Navbar tickerItems={tickerItems} />
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/books" element={<Books />} />
                {/* <Route path="/books/:id" element={<BookDetail />} /> */}
                <Route path="/authors" element={<Authors />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/members" element={<Members />} />

                {/* Add these routes when the pages are implemented. */}
                {/*
                <Route path="/members/:id" element={<MemberDetail />} />
                <Route path="/circulation" element={<Circulation />} />
                <Route path="*" element={<NotFound />} />
                */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;