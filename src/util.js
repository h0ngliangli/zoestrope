// read blob file and returns blob data
export async function blobUrlToBlob(blobUrl) {
  console.log("blobUrlToBlob", blobUrl)
  const response = await fetch(blobUrl)
  return await response.blob()
}

// next flashcard
export async function nextFlashcard() {
  // return {
  //   question: "What is the capital of France?",
  //   answer: "Paris",
  //   tags: ["geography", "capital"],
  //   note: "The capital of France is Paris.",
  //   img_url: "https://freesvg.org/storage/img/thumb/salvor-cat-1.png",
  // }
  const res = await fetch("http://localhost:3000/flashcard/practice")
  const flashcard = await res.json()
  return flashcard
}
