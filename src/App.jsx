// src/App.jsx
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { 
  HomePage, 
  CreateEvent,
  ManageEvent,
  LoginPage,
  SignupPage
} from "./Routes"

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
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>
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
