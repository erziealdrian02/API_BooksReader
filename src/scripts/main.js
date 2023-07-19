function main() {
   const baseUrl = "https://book-crud-service-6dmqxfovfq-et.a.run.app/";

   const getBooks = async () => {
      try {
         const response = await fetch(`${baseUrl}api/books`, {
            headers: {
               Accept: "application/json",
               Authorization:
                  "Bearer 897|rBpy7VblhQvIloXdjbPQX3uRBOCGGOcRNOLx1B7C",
            },
         });
         const responseJson = await response.json();
         if (response.ok) {
            renderAllBooks(responseJson.data);
         } else {
            showResponseMessage(responseJson.message);
         }
      } catch (error) {
         showResponseMessage(error);
      }
   };

   const insertBook = async (book) => {
      try {
         const response = await fetch(`${baseUrl}api/books/add`, {
            method: "POST",
            headers: {
               Accept: "application/json",
               Authorization:
                  "Bearer 897|rBpy7VblhQvIloXdjbPQX3uRBOCGGOcRNOLx1B7C",
               "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
         });
         const responseJson = await response.json();
         showResponseMessage(responseJson.message);
         getBooks();
      } catch (error) {
         showResponseMessage(error);
      }
   };

   const updateBook = async (book) => {
      try {
         const response = await fetch(`${baseUrl}api/books/${book.id}/edit`, {
            method: "PUT",
            headers: {
               Accept: "application/json",
               Authorization:
                  "Bearer 897|rBpy7VblhQvIloXdjbPQX3uRBOCGGOcRNOLx1B7C",
               "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
         });
         const responseJson = await response.json();
         showResponseMessage(responseJson.message);
         getBooks();
      } catch (error) {
         showResponseMessage(error);
      }
   };

   const removeBook = (bookId) => {
      fetch(`${baseUrl}api/books/${bookId}`, {
         method: "DELETE",
         headers: {
            Accept: "application/json",
            Authorization:
               "Bearer 897|rBpy7VblhQvIloXdjbPQX3uRBOCGGOcRNOLx1B7C",
         },
      })
         .then((response) => response.json())
         .then((responseJson) => {
            showResponseMessage(responseJson.message);
            getBooks();
         })
         .catch((error) => {
            showResponseMessage(error);
         });
   };

   const renderAllBooks = (books) => {
      const listBookElement = document.querySelector("#listBook");
      listBookElement.innerHTML = "";

      books.forEach((book) => {
         listBookElement.innerHTML += `
      <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
        <div class="card">
          <div class="card-body">
            <h5>(${book.id}) ${book.user_id}</h5>
            <p>${book.isbn}</p><br>
            <p>${book.title}</p><br>
            <p>${book.subtitle}</p><br>
            <p>${book.author}</p><br>
            <p>${book.published}</p><br>
            <p>${book.publisher}</p><br>
            <p>${book.pages}</p><br>
            <p>${book.description}</p><br>
            <p>${book.website}</p><br>
            <p>${book.created_at}</p><br>
            <p>${book.updated_at}</p><br>
            <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
          </div>
        </div>
      </div>
    `;
      });

      const buttons = document.querySelectorAll(".button-delete");
      buttons.forEach((button) => {
         button.addEventListener("click", (event) => {
            const bookId = event.target.id;
            removeBook(bookId);
         });
      });
   };

   const showResponseMessage = (message = "Check your internet connection") => {
      alert(message);
   };

   document.addEventListener("DOMContentLoaded", () => {
      const inputBookId = document.querySelector("#inputBookId");
      const inputBookTitle = document.querySelector("#inputBookTitle");
      const inputBookAuthor = document.querySelector("#inputBookAuthor");
      const inputBookuser_id = document.querySelector("#inputBookuser_id");
      const inputBookisbn = document.querySelector("#inputBookisbn");
      const inputBooksubtitle = document.querySelector("#inputBooksubtitle");
      const inputBookpublished = document.querySelector("#inputBookpublished");
      const inputBookpublisher = document.querySelector("#inputBookpublisher");
      const inputBookpages = document.querySelector("#inputBookpages");
      const inputBookdescription = document.querySelector(
         "#inputBookdescription"
      );
      const inputBookwebsite = document.querySelector("#inputBookwebsite");
      const buttonSave = document.querySelector("#buttonSave");
      const buttonUpdate = document.querySelector("#buttonUpdate");

      buttonSave.addEventListener("click", () => {
         const book = {
            id: Number.parseInt(inputBookId.value),
            title: inputBookTitle.value,
            author: inputBookAuthor.value,
            isbn: inputBookisbn.value,
            subtitle: inputBooksubtitle.value,
            published: inputBookpublished.value,
            publisher: inputBookpublisher.value,
            pages: inputBookpages.value,
            description: inputBookdescription.value,
            website: inputBookwebsite.value,
            user_id: inputBookuser_id.value,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
         };

         insertBook(book);
      });

      buttonUpdate.addEventListener("click", () => {
         const book = {
            id: Number.parseInt(inputBookId.value),
            title: inputBookTitle.value,
            author: inputBookAuthor.value,
            isbn: inputBookisbn.value,
            subtitle: inputBooksubtitle.value,
            published: inputBookpublished.value,
            publisher: inputBookpublisher.value,
            pages: inputBookpages.value,
            description: inputBookdescription.value,
            website: inputBookwebsite.value,
            user_id: inputBookuser_id.value,
            updated_at: new Date().toISOString(),
         };

         updateBook(book);
      });

      getBooks();
   });
}

export default main;
