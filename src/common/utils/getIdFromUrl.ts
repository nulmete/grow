export default (url: string, prefix: string): string => {
  // SWAPI provides URLs like: https://swapi.dev/api/planets/1/
  // Split the string, so that we can get rid of everything except the id
  // After splitting, we end up with: ["", "1/"]
  const idWithSlash = url.split(prefix)[1];
  // Get rid of the "/" from "1/"
  return idWithSlash.split("/")[0];
};
