import { fetchPotstalCodes } from "../Util/fetchPostalCode";
export function formHandler(e , {setError}) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    if (data.password !== data.confirm_password) {
        console.log("password not match");
        setError("password not match");
        return;
    }
    console.log("form registered");
    setError(null);
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

