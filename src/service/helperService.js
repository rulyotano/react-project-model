import urljoin from "url-join";

export const urlJoin = (...parts)=>{
    let result = urljoin(...parts);
    //if parts start with / and result doesn't start with / add it
    if (parts.length > 0 && parts[0] && parts[0].startsWith("/") && !result.startsWith("/"))
        result = `/${result}`
    return result;
}