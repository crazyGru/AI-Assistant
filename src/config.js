const dev = {
	baseURL: "http://localhost:3080/api/",
	landingPageUrl: "http://localhost:3080",
	stripe: {
		free: "price_1NEMdAH6D6mILpKsqcl47qyC",
		entry: "price_1NEMVEH6D6mILpKsl2H8oRQP",
		pro: "price_1NFoAzH6D6mILpKsPc09hZ03"
	},
};
  
const prod = {
	baseURL: '/api/',
	landingPageUrl: "https://app.openaitemplate.com",
	stripe: {
		free: "price_1NEMdAH6D6mILpKsqcl47qyC",
		entry: "price_1NEMVEH6D6mILpKsl2H8oRQP",
		pro: "price_1NFoAzH6D6mILpKsPc09hZ03"
	},
};
  
const config = process.env.NODE_ENV === 'development'
	? dev
	: prod;
  
export default config;