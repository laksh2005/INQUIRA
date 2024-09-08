import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Landing from "./Landing"
import Login from "./Login";
import Explore from "./Explore"
import ContactUs from "./ContactUs"
import Collaborators from "./Collaborators";
import Guide from "./Guide"
import Bot from "./Bot";

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
            path:"/collab",
            element: <Collaborators />
        },
        {
            path:"/explore",
            element: <Explore />
        },
        {
            path:"/guide",
            element: <Guide />
        },
        {
            path:"/chatbot",
            element: <Bot />
        }
    ])
    
  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body