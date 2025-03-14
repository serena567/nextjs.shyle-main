import { createUrl, get, isStoredJwt, post, setStoredJwt } from "./api-client";


export const signUp = async (
    username: string,
    password: string) => {
        try {
            const result = await post(createUrl("/api/signup!"),{
                username,
                password,
                firstName:"demo",
                lastName:"shyle",
            });
            if (!result) {
                return alert("Could not sign up!");
            }
            setStoredJwt(result.accessToken);
            return me();
        } catch (error) {
        console.log(error);
        }
    };
    export const me = async () => {
        return isStoredJwt() ? await get(createUrl("/api/me"))?.data : null;
    };
