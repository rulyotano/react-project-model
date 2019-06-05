import importedUrlJoin from "url-join";

export const urlJoin = (...urlParts)=>{
  let joinedUrl = importedUrlJoin(...urlParts);
  if (firstPartStartWithSlash(urlParts) && !joinedUrl.startsWith("/"))
    joinedUrl = `/${joinedUrl}`;
  return joinedUrl;
};

const firstPartStartWithSlash = (parts) => parts.length > 0 && parts[0] && parts[0].startsWith("/");