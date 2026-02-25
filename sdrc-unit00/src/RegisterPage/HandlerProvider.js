import { useAuthContext } from "../AuthContext/AuthContextProvider";
import { doRegister } from "../Util/fetchAuth";
import { getRegions } from "../Util/fetchPostalCode";
export async function formHandler(e, { setError, setLoading, navigate,setUser }) {
    e.preventDefault();
    const form = new FormData(e.target);
    
    const data = Object.fromEntries(form.entries());
    const dto = {
        "role": "responder",
        "full_name": data.username,
        "phone_number": data.phonenumber,
        "password": data.password,
        "region_id": data.region
    }
    console.log(dto);
    if (data.password !== data.confirm_password) {
        console.log("password not match");
        console.log(data.password);
        console.log(data.confirm_password);
        setError("password not match");
        return;
    }

    const ok = await doRegister(dto, setLoading, setError);
    console.log("form registered");
    setError(null);
    setLoading(null);
    if (ok) {
        setUser(p => ({ ...p, login: true }));
        navigate("/responder/home");
    }

}
//simulated fetch
export async function postalHandler({ regions, setRegions, loading, setLoading }) {

    if (regions?.length > 0)
        return;
    setLoading("postal_code");
    console.log("getting...")
    const data = await getRegions();
    console.log("done");
    setRegions(data);
    setLoading(null);
}

