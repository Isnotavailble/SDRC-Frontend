import { fetchPotstalCodes } from "../Util/fetchPostalCode";
export async function formHandler(e , {setError,setLoading,navigate}) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    if (data.password !== data.confirm_password) {
        console.log("password not match");
        setError("password not match");
        return;
    }
    setLoading("register loading");
    await new Promise(r => setTimeout(r,2000));
    console.log("form registered");
    setError(null);
    setLoading(null);
    localStorage.setItem("is_login" , "true");
    localStorage.setItem("user_phone",data["phonenumber"]);
    localStorage.setItem("user_role","responder");
    navigate("/responder/centre");
    
}
//simulated fetch
export async function postalHandler({ postalCodes, setPostalCodes, loading, setLoading }) {

    if (postalCodes?.length > 0)
        return;
    setLoading("postal_code");
    console.log("getting...")
    const data = await fetchPotstalCodes();
    console.log("done");
    setPostalCodes(data);
    setLoading(null);


}

