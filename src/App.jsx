import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import Departments from "./pages/Departments"
import Employees from "./pages/Employees"
import SingleDepartment from "./pages/SingleDepartment"
import SingleEmployee from "./pages/SingleEmployee"
import NotFound from "./components/NotFound"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/dipartimenti" element={<Departments />} />
            <Route path="/dipartimenti/:id" element={<SingleDepartment />} />
            <Route path="/dipendenti" element={<Employees />} />
            <Route path="/dipendenti/:id" element={<SingleEmployee />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
