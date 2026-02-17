export async function doRegister() {
    console.log("calling api register");
    const response = {};
    await Promise(r => setTimeout(r, 2000));
    response["message"] = "ok byar";
    console.log(response)
    return response;
}