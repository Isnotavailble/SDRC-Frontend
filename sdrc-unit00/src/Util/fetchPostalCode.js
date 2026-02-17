//simulated fetch
export async function fetchPotstalCodes() {
    const p = [10001, 110, 111, 230, 3456, 34];
    console.log("getting postal code...")
    await new Promise(r => setTimeout(r, 2000));
    console.log("postal code fetched");
    return p;

}