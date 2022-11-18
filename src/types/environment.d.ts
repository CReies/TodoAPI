export { };

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string | number;
			MONGO_URI: string;
			JWT_ENCRYPT: string;
		}
	}
}
