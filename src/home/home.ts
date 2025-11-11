import { change_page } from "../main.js";

class Home 
{
	private container: HTMLDivElement;

	constructor(container: HTMLDivElement)
	{
		this.container = container;
	}

	public createPage()
	{
		this.container.innerHTML = "";

		const mainContainer = document.createElement('div');

		const transcendence = document.createElement('div');
		transcendence.className = "flex items-center p-4 space-y-6";
		const transcendence_logo = document.createElement('img');
		transcendence_logo.src = "assets/images/title";
		transcendence.appendChild(transcendence_logo);

		const signIn = document.createElement('button');
		signIn.type = "button";
		signIn.className = "flex items-center rounded-lg bg-black text-yellow text-base px-4 py-2";
		signIn.textContent = "Sign In"; //adapter aux langues
		signIn.addEventListener('click', () => change_page("/login"))

		const Register = document.createElement('button');
		Register.type = "button";
		Register.className = "flex items-center rounded-lg bg-black text-yellow text-base px-4 py-2";
		Register.textContent = "Register"; //adapter aux langues
		Register.addEventListener('click', () => change_page("/register"))
	}
}

function return_home(container: HTMLDivElement)
{
	const home_page = new Home(container);
	home_page.createPage();
	return (home_page);
}

export {return_home}
