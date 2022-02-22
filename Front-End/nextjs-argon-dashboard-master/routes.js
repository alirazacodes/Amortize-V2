// import { userSession } from "./components/auth";

import { userSession } from "./pages/_app";

// import { isSuperUser } from "./components/contractCalls";

// import { superUser } from "./components/auth";

var routesGuest = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    layout: "/admin",
  },

  {
    path: "/tables",
    name: "Stats",
    icon: "ni ni-bullet-list-67 text-red",
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    layout: "/auth",
  },
];

var routesUser = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    layout: "/admin",
  },
  {
    path: "/home-reg",
    name: "Home Registration",
    icon: "ni ni-circle-08 text-pink",
    layout: "/admin",
  },
  {
    path: "/equity-info",
    name: "Equity Information",
    icon: "ni ni-circle-08 text-pink",
    layout: "/admin",
  },
  {
    path: "/agent-select",
    name: "Agent Ownership",
    icon: "ni ni-circle-08 text-pink",
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Stats",
    icon: "ni ni-bullet-list-67 text-red",
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    layout: "/auth",
  },

];

var routesSuperUser = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    layout: "/admin",
  },
  {
    path: "/home-reg",
    name: "Home Registration",
    icon: "ni ni-circle-08 text-pink",
    layout: "/admin",
  },
  {
    path: "/equity-info",
    name: "Equity Information",
    icon: "ni ni-circle-08 text-pink",
    layout: "/admin",
  },
  {
    path: "/agent-select",
    name: "Agent Ownership",
    icon: "ni ni-circle-08 text-pink",
    layout: "/admin",
  },
  {
    path: "/agent-reg",
    name: "Agent Registration",
    icon: "ni ni-single-02 text-yellow",
    layout: "/admin",
  },
  {
    path: "/agent-approval",
    name: "Equity Approval",
    icon: "ni ni-single-02 text-yellow",
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Stats",
    icon: "ni ni-bullet-list-67 text-red",
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    layout: "/auth",
  },


];

// const getRoutes = () =>
// {
//   if (userSession != null || userSession != undefined)
//   {
//     if (userSession.isUserSignedIn())
//     {
//       return routesUser;
//     }
//     else
//     {
//       return routesGuest;
//     }
//   }

// };
var superUser = false;
export function setSuperUser(value){
  superUser = value;
}
const getRoutes = () => {
  if (userSession !== undefined) {
    if (userSession.isUserSignedIn()) {
      // const isSupUser = true;
      // if (superUser == true) {
      //   console.log("super user found");
      //   return routesSuperUser;
      // }
      // else {
      //   return routesUser;
      // }
      return routesSuperUser;
    }
    else {
      return routesGuest;
    }
  }

  return routesGuest;

};

export default getRoutes;
