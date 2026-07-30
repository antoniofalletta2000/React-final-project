import {BrowserRouter, Routes, Route} from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import Departments from "./pages/Departments"
import Employees from "./pages/Employees"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/dipartimenti" element={<Departments/>} />
            <Route path="/dipendenti" element={<Employees/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
