import { URL_REGISTER } from "../../config";

interface User {
	username: string;
	email: string;
	password: string;
}

const app = document.querySelector<HTMLDivElement>("#app")!;

export function register_form() {

	app.innerHTML = `
	<div class="bg-[url('../../../assets/images/background.jpg')] bg-cover bg-center bg-no-repeat min-h-screen">
		<div class="flex flex-col items-center">
			<img src="../../../assets/images/title.png" alt="title" class="w-4/5 max-w-[800px] mt-10 md:mt-16 lg:mt-20">
			<div class="grid justify-center mt-16 md:mt-20 lg:mt-32 bg-[#816444] rounded-[29px] min-w-[500px] border border-[#816444] max-w-[500px] w-auto max-h-[700px] h-auto">
				<div class="flex flex-auto justify-center text-center text-[#E2CC76]">
					<h2>Register</h2>
				</div>
				<div class="flex flex-auto justify-center text-left text-[#E2CC76]">
					<form id="register-form" class="space-y-5">
						<div class="flex flex-auto justify-center">
							<label for="username">Username </label>
							<input class="id" type="text" placeholder="Username">
						</div>

						<div class="flex flex-auto justify-center">
							<label for="email">Email </label>
							<input class="id" type="text" placeholder="Email">
						</div>

						<div class="flex flex-auto justify-center">
							<label for="password">Password </label>
							<input class="id" type="password" placeholder="**********">
						</div>

						<div class="flex flex-auto justify-center">
							<label for="check_password">Password confirmation </label>
							<input class="id" type="password" placeholder="**********">
						</div>

						<div class="text-center flex justify-center text-[#E2CC76] bg-[#816444]">
							<button class="button" type="submit" name="submit">Register</button>
						</div>
					</form>
					<div class="flex flex-auto justify-center text-center text-xs text-[#E2CC76]">
						<p class="text-center text-sm text-gray-400 mt-2">
							Already have an account ?
							<a href="#" class="text-[#816444] hover:underline">Log In</a>
						</p>
						<div class="h-px w-16 bg-gray-200"></div>
							<span class="mx-2 text-sm text-gray-200">or</span>
						<div class="h-px w-16 bg-gray-200"></div>
					</div>

					<div class="flex flex-auto justify-start">
						<button type="button" class="flex items-center justify-start gap-2 inline-flex rounded-md border border-slate-700 bg-slate-800 py-2 px-4 text-sm font-medium text-slate-300 hover:bg-slate-700">
							<svg class="w-6 h-6" viewBox="0 0 48 48">
								<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
								<path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
								<path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
								<path fill="#1976D2" d="M43.611,20.083l-0.011-0.004H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.904,36.213,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
							</svg> 
							Register with Google
						</button>
					</div>			
				</div>	
			</div>
		</div>
	</div>
	`;


	const form = document.querySelector<HTMLFormElement>("#register-form")!;
	form.addEventListener("submit", handleRegister);
}

async function handleRegister(event: SubmitEvent) {
	event.preventDefault(); //permet de controler le comportement du form

	const data = {
		username: (document.querySelector("#username") as HTMLInputElement).value,
		email: (document.querySelector("#email") as HTMLInputElement).value,
		password: (document.querySelector("#password") as HTMLInputElement).value,
		check_password: (document.querySelector("#check_password") as HTMLInputElement).value,
	};

	if (data.password !== data.check_password) {
		alert("Passwords do not match!");
		return;
	}
	console.log(data);

	const sending_data = {
		username: data.username,
		email: data.email,
		password: data.password
	};

	// pour envoyer les donnees au back
	const response = await fetch(URL_REGISTER, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(sending_data)
	});

	if (response.ok) {
		const results = await response.json();
		console.log("Backend Response", results);
		alert("Register Succeed")
	}
	else {
		const error = await response.json();
		alert("Register failed: " + error.message);
	}
	register_form();
}


