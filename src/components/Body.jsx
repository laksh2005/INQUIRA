import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Landing from "./Landing"
import Login from "./Login";
import Info from "./Info"
import ContactUs from "./ContactUs"
import AboutUs from "./AboutUs"
import Guide from "./Guide"

const Body = () => {

    const appRouter= createBrowserRouter([
        {
            path:"/",
            element: <Landing />,
        },
        {
            path:"/login",
            element: <Login />
        },
        {
            path:"/contactus",
            element: <ContactUs />
        },
        {
            path:"/aboutus",
            element: <AboutUs />
        },
        {
            path:"/info",
            element: <Info />
        },
        {
            path:"/guide",
            element: <Guide />
        }
    ])
    
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body