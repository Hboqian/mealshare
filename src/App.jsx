import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomePage, CreateEvent } from "./Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create-event",
    element: <CreateEvent/>,
  },
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
