//importer les autres pages
//page d'accueil => sign in ou register ou remote authentification
//langue

// import register from "./auth/register/register.js";
import {login} from "./auth/signIn/signIn";
// import { return_home } from "./home/home.js";

const appContainer = document.querySelector<HTMLDivElement>("#app")!;

// async function starting()
// {
// 	const path = window.location.pathname;

// 	switch (path)
// 	{
// 		case ("/"):
// 			return_home;
// 			break ;
// 		// case ("/register"):
// 		// 	register ;
// 		// 	break ;
// 		case ("/login"):
// 			login(appContainer);
// 			break;
// 	}

// }

// 	window.addEventListener("popstate", starting);
// 	history.pushState({}, "", "/about");

async function change_page(path: string)
{

}
login(appContainer);
export {change_page};

import { register_form } from "./auth/register/register";

register_form();

