import Barplot from "./Barplot";
import "./App.css";
import { useEffect, useState } from "react";

const data = [
  { country: "United States", students: 68 },
  { country: "France", students: 21 },
  { country: "United Kingdom", students: 21 },
  { country: "Germany", students: 20 },
  { country: "Switzerland", students: 13 },
  { country: "Spain", students: 10 },
  { country: "Netherlands", students: 9 },
  { country: "India", students: 9 },
  { country: "Singapore", students: 8 },
  { country: "Ireland", students: 8 },
  { country: "Sweden", students: 7 },
  { country: "Australia", students: 7 },
  { country: "Canada", students: 6 },
  { country: "Finland", students: 5 },
  { country: "Mexico", students: 4 },
  { country: "Brazil", students: 4 },
  { country: "Saudi Arabia", students: 3 },
  { country: "Romania", students: 3 },
  { country: "Philippines", students: 3 },
  { country: "New Zealand", students: 3 },
];

function App() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page">
      <div className="app-container">
        <Barplot data={data} />
      </div>

      <div
        className="footer-container"
        style={{
          opacity: showFooter ? 1 : 0,
          transform: showFooter ? "translateY(0px)" : "translateY(10px)",
          transition: "all 0.8s ease",
        }}
      >
        <p>A portfolio project by Merri Hookway</p>
        <p>© 2026</p>
      </div>
    </div>
  );
}

export default App;
