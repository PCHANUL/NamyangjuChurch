export function createStore() {
  console.log('welcome')
  return {
    notes: [],
    addNote(text) {
      this.notes.push(text);
    }
  }
}