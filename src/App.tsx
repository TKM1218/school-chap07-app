import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { PostIndex } from "./pages/PostIndex/index";
import { PostShow } from "./pages/PostShow/index";
import { Contact } from "./pages/Contact/index";

function App() {
  return (
    <BrowserRouter>
      <header className="bg-[#333333] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <p className="text-lg font-bold">Blog</p>
          <Link to="/contact" className="text-sm font-bold hover:opacity-80">
            お問い合わせ
          </Link>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<PostIndex />} />
        <Route path="/posts/:id" element={<PostShow />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
