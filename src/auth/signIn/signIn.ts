import {change_page} from "../../main";

declare global
{
	interface Window 
	{
		google : any;
	}
}

class signIn
{
	private container : HTMLDivElement;

	constructor(container: HTMLDivElement)
	{
		this.container = container;
	}

	private async google_signIn()
	{
		try
		{
			const response = await fetch("http://localhost:8080/login/auth/google");
			if (!response.ok)
				throw new Error(`Response status: ${response.status}`);
			const result = await response.json();
			console.log(result);
			//comment gerer les erreurs ?
		}
		catch (error)
		{
			const e = error as Error;
			console.error(e.message);
		}
	}

	private async handleSubmit(event: SubmitEvent)
	{ 
		event.preventDefault(); //empeche le comportement par defaut de la page = recharger la page
		const form = event.target as HTMLFormElement;
		const SignInData = new FormData(form);
		const username = SignInData.get("username");
		const password = SignInData.get("password");

		const request = new Request("https://localhost:3000/login",
			{
				method: "POST",
				body: `username = ${username} ; password = ${password}`
			});
		try
		{
			const response = await fetch(request);
			if (!response.ok)
				throw new Error(`Response status: ${response.status}`);
			const result = await response.json();
			console.log(result);
			//si double authentification ==> changer l'affichage
			//si c'est le bon username et pwd => change_page("/profile")
			//sinon: message d'erreur
		}
		catch (error) 
		{
			const e = error as Error;
			console.error(e.message);
		}
		
	}

	public createPage() 
	{
		console.log("creating page");
		this.container.innerHTML = ""; //efface le contenu precedent

		const mainContainer = document.createElement('div');
		mainContainer.className = "flex flex-col items-center space-y-6";

		// const transcendence = document.createElement('div');
		const transcendence_logo = document.createElement('img');
		transcendence_logo.src = "assets/images/title.png";
		transcendence_logo.className = "w-screen";
		mainContainer.appendChild(transcendence_logo);

		//home button
		const homeButton = document.createElement('button');
		const home = document.createElement('img');
		home.src = "assets/images/house.jpg";
		home.className = "flx justify-end items-end size-16";
		homeButton.appendChild(home);
		homeButton.addEventListener('click', () => change_page("/"))

		//creer une "boite"
		const formBox = document.createElement('div');
		formBox.className = "mx-auto flex flex-col max-w-sm items-center p-4 space-y-6 bg-brown rounded-lg border border-black";
		const title = document.createElement('h1');
		title.className = "text-wl text-xl text-yellow";
		title.textContent = "Sign In"; //adapter pour les langues
		const form = document.createElement('form');
		form.className = "space-y-6";
		form.innerHTML = `
			<input type="text" id="username" name="username" required class="text-yellow text-base border-b border-black px-4 py-2" placeholder="Username"><br>

			<input type="password" id="password" name="Password" required class="text-yellow text-base border-b border-black px-4 py-2" placeholder="Password"><br>

			<button type="submit" name="submit" class="flex justify-center rounded-full bg-black text-yellow text-base px-4 py-2">Sign In</button>
		</form>
	`;

		form.addEventListener('submit', (event) => this.handleSubmit(event));
		
		const line = document.createElement('div');
		line.className = "flex items-center w-64 border-b border-black";

		//signin with google ; <svg class> ? ; verifier que google est pret ?
		const google_signIn = document.createElement('button');
		google_signIn.type = "button";
		google_signIn.className = "flex items-center rounded-full bg-white text-black text-base px-4 py-2 w-24";
		const logo = document.createElement('img');
		logo.src = "assets/images/google_logo.jpg";
		// logo.alt = "Google logo";
		logo.className = "size-6 mr-3";
		google_signIn.appendChild(logo);
		const text = document.createElement('span');
		text.textContent = "Sign in with Google"; //adapter aux langues
		google_signIn.appendChild(text);
		google_signIn.addEventListener('click', () => this.google_signIn());

		//signin with 42 ?

		formBox.appendChild(title);
		formBox.appendChild(form);
		formBox.appendChild(line);
		formBox.appendChild(google_signIn);
		mainContainer.appendChild(homeButton);
		mainContainer.appendChild(formBox);
		this.container.appendChild(mainContainer);
	}
}

export function login(container: HTMLDivElement)
{
	const signinForm = new signIn(container);
	signinForm.createPage();
	// return (signinForm);
}

// export {login};

