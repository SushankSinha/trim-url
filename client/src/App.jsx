import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StatsPage from "./pages/StatsPage";
import HealthPage from "./pages/HealthPage";
import RedirectPage from "./pages/RedirectPage";
import Header from "./components/Headers";
import "./index.css";

export default function App() {
  return (
    <Router>
      <div className="app-wrap">
        <Header />
        <main className="page-pad">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/:code" element={<RedirectPage />} />
            <Route path="/code/:code" element={<StatsPage />} />
            <Route path="/healthz" element={<HealthPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}