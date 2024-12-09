// src/App.jsx
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./Routes/HomePage"
import { CreateEvent } from "./Routes/CreateEvent"
import { ManageEvent } from "./Routes/ManageEvent"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create-event",
    element: <CreateEvent/>,
  },
  {
    path: "/manage-event",
    element: <ManageEvent/>,
  },
  {
    path: "/profile",
    element: <div><p>Profile Page (TODO)</p></div>,
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
