import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Todos from "@/pages/Todos"
import SignUp from "@/pages/SignUp"
import SignIn from "@/pages/SignIn"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/todos" element={<Todos />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
