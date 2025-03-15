import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Todos from "@/pages/Todos"
import SignUp from "@/pages/SignUp"
import SignIn from "@/pages/SignIn"

function App() {
  // didnt do protected routes but i could have done
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
