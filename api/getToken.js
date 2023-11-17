// import axios from 'axios/dist/node/axios.cjs';
import axios from 'axios';

class API42
{
    #baseURL = "https://api.intra.42.fr";
	#token;

	#formatURL(params)
	{
		if (!params)
			return ("");
		let url = "";
        for(let key of Object.keys(params))
			url += (url == "" ? "?" : "&") + key + "=" + params[key];
		return (url);
	}

    async post(path, params)
    {
		try {
			let url = path + this.#formatURL(params);
			let response = await axios.post(this.#baseURL + url);
			return (response.data);
		} catch(e) {
			throw new Error(e);
		}
    }
    async get(path, params)
    {
		try {
			let url = path + this.#formatURL(params);
			let response = await axios.get(this.#baseURL + url,
				{
					headers: {
						Authorization: `Bearer ${this.#token}`,
					}
				});
			return (response.data);
		} catch(e) {
			throw new Error(e);
		}
    }

	setToken(token)
	{
		this.#token = token;
	}
	
	getToken()
	{
		return this.#token
	}
}

let api42 = new API42();

export default async (req, res) => {
	try {
		let code = req.body.code;
		let response = await api42.post("/oauth/token", {
			"grant_type": "authorization_code",
			"client_id": process.env.CLIENT_ID,
			"client_secret": process.env.CLIENT_SECRET,
			"code": code,
			//  "redirect_uri": "https://www.42rank.xyz"
			 "redirect_uri": "http://localhost:3000"
		})
		api42.setToken(response.access_token);
		let user = await api42.get("/v2/me");
		let users = await getAllUsers();
		res.status(200).json({ user, users }); 
	} catch (error) {
		if (error.response && error.response.data)
    		res.status(500).json({ error: error.response.data }); 
		else
    		res.status(500).json({ error: 'Something went wrong here' });
	}
};

async function getAllUsers(){
	let users = [];
	let loop = true;
	let page = 1;
	while (loop) {
		let response = await api42.get("/v2/cursus/9/cursus_users", {
			"sort": "-level",
			"filter[campus_id]": "48",
			"filter[active]": "true",
			"page[size]": "50",
			"page[number]": page++
		});
		if (response.length === 0)
			loop = false;
		else
			users.push(response.filter(user => user.user.kind === "student" 
				&& !user.user["staff?"]
				&& (Date.now() - new Date(user.begin_at).getTime()) < (1000 * 60 * 60 * 24 * 31)));
	}
	return (users);
}

