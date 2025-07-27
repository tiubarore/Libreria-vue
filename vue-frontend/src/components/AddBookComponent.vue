<template>
  <h3 class="text-3xl">Aggiungi un Nuovo Libro</h3>
  <form @submit.prevent="addBook">
    <input
      v-model="title"
      name="title"
      placeholder="Titolo"
      required
      class="py-2 px-4 border rounded-md"
    />
    <br />
    <input
      v-model="author"
      name="author"
      placeholder="Autore"
      required
      class="py-2 px-4 border rounded-md"
    />
    <br />
    <button
      type="submit"
      class="py-2 px-4 border rounded-md cursor-pointer bg-green-700 hover:bg-green-900"
    >
      Aggiungi un Libro
    </button>
  </form>
  <div v-if="errorMsg" class="text-red-700">{{ errorMsg }}</div>
  <ul>
    <li v-for="book in books" :key="book.id">
      <span class="text-2xl">{{ book.title }} - {{ book.author }}</span>
      <span v-if="book.isAvailable" style="color: green" class="text-2xl">(Disponibile)</span>
      <span v-else class="text-2xl text-red-700">
        (In prestito a {{ book.borrowerName }} dal {{ formatDate(book.loanDate) }})
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Book } from '@/model/Book'
import { onMounted, ref } from 'vue'

let title = ref('')
let author = ref('')
let books = ref<Book[]>([])
let errorMsg = ref('')

// const addTask = async (event: Event) => {
//   event.preventDefault();

//   if (!title.value || !author.value) {
//     errorMsg.value = 'Tutti i campi sono obbligatori';
//     return;
//   }

//   try {
//     const newTask = {
//       title: title.value,
//       author: author.value,
//       completed: false
//     };

//     const response = await fetch('http://localhost:8080/api/task', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newTask)
//     });

//     if (!response.ok) throw new Error(`Errore server: ${response.status}`);

//     const addedTask = await response.json();
//     tasks.value.push(addedTask);

//     // Reset del form
//     title.value = '';
//     author.value = '';
//     errorMsg.value = '';

//   } catch (err) {
//     console.error('Errore nell\'aggiunta della task:', err);
//     errorMsg.value = 'Errore durante l\'aggiunta della task';
//   }
// };

// format per displayare meglio le date
const formatDate = (dateString: string) => {
  if (!dateString) return 'data sconosciuta'
  const date = new Date(dateString)
  return date.toLocaleDateString('it-IT')
}

const loadBook = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/book')

    if (!response.ok) throw new Error(`Errore server: ${response.status}`)

    books.value = await response.json()

    errorMsg.value = ''
  } catch (err) {
    console.error('Errore nella fetch:', err)
    errorMsg.value = 'Errore nel caricamento dei libri'
  }
}

const addBook = async () => {
  if (!title.value || !author.value) {
    errorMsg.value = 'Tutti i campi sono obbligatori'
    return
  }

  try {
    // const newBook: Book = {
    //   title: title.value,
    //   author: author.value,
    //   completed: false,
    //   id: 0,
    // }

    const response = await fetch('http://localhost:8080/api/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title.value, author: author.value, isAvailable: true }),
    })

    if (!response.ok) throw new Error(`Errore server: ${response.status}`)

    const addedBook = await response.json()
    books.value.push(addedBook)

    // Reset del form
    title.value = ''
    author.value = ''
    errorMsg.value = ''
  } catch (err) {
    console.error("Errore nell'aggiunta del libro:", err)
    errorMsg.value = "Errore durante l'aggiunta del libro"
  }
}

onMounted(loadBook)
</script>
