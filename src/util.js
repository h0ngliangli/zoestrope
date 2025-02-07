
// read blob file and returns blob data
export async function blobUrlToBlob(blobUrl) {
  console.log("blobUrlToBlob", blobUrl)
  const response = await fetch(blobUrl)
  return await response.blob()
}