function to_flashcard(obj) {
  return {
    qeustion: obj.question ? obj.question : "",
    answer: obj.answer ? obj.answer : "",
    note: obj.note ? obj.note : "",
    tags: obj.tags ? obj.tags : [],
    img_url: obj.img_url ? obj.img_url : "",
  }
}

export default {
  to_flashcard,
}
