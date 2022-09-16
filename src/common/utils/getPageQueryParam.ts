export default (url: string): string | null => {
  const generatedURL = new URL(url);
  const searchParams = new URLSearchParams(generatedURL.search);
  return searchParams.get("page");
};
