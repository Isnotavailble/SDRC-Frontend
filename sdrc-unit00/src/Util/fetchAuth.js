export async function doRegister() {
    console.log("calling api register");
    const response = {};
    await new Promise(r => setTimeout(r, 2000));
    response["message"] = "ok byar";
    console.log(response)
    return response;
}
export async function doLogin() {
    console.log("calling api for login");
    await new Promise(r => setTimeout(r, 2000));
    console.log("login completed");
    
    return "ok" ;
}