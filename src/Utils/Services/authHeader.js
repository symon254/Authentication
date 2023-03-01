class TokenService {
	getLocalAccessToken() {
		const user = JSON.parse(localStorage.getItem("user"));
		return user?.Token;
	}
}

export default new TokenService();
