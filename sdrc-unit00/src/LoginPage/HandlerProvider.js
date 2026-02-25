import { doLogin } from "../Util/fetchAuth";

export async function loginFormHandler({ setError, e, setLoading, navigate, setUser }) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const isLogin = localStorage.getItem("user_token") ? true : false;
    const current_user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    if (isLogin && data["phonenumber"].trim() === current_user?.phone_number) {
        console.log("Already log in this account");
        setError("already login this account");
        return;
    }
    const res_data = await doLogin(data["phonenumber"], data["password"], setLoading, setError);

    if (res_data) {
        setUser(p => ({ ...p, login: true }));
        navigate(res_data.user.role === "admin" ? "/admin/overview" : "/responder/home");
    }

}
