
const books = [
    {
        id: "1",
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-help",
        price: 450,
        rating: 4.8,
        isbn: "9780735211292",
        description: "A practical guide to building good habits, breaking bad ones, and making small improvements that lead to remarkable results."
    },
    {
        id: "2",
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Novel",
        price: 350,
        rating: 4.7,
        isbn: "9780062315007",
        description: "An inspiring story about a young shepherd who follows his dreams and discovers the meaning of his personal journey."
    },
    {
        id: "3",
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technical",
        price: 650,
        rating: 4.9,
        isbn: "9780132350884",
        description: "A guide to writing readable, maintainable, and professional-quality software code."
    },
    {
        id: "4",
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        category: "Academic",
        price: 850,
        rating: 4.8,
        isbn: "9780262046305",
        description: "A comprehensive textbook covering important algorithms and their analysis."
    },
    {
        id: "5",
        title: "The Pragmatic Programmer",
        author: "David Thomas",
        category: "Technical",
        price: 720,
        rating: 4.7,
        isbn: "9780135957059",
        description: "Practical techniques for becoming a better and more effective programmer."
    },
    {
        id: "6",
        title: "Wings of Fire",
        author: "A. P. J. Abdul Kalam",
        category: "Academic",
        price: 280,
        rating: 4.9,
        isbn: "9788173711466",
        description: "The autobiography of Dr. A. P. J. Abdul Kalam."
    },
    {
        id: "7",
        title: "Quantitative Aptitude",
        author: "R. S. Aggarwal",
        category: "Competitive Exams",
        price: 550,
        rating: 4.6,
        isbn: "9789352534026",
        description: "A practice-oriented book covering quantitative aptitude for competitive examinations."
    },
    {
        id: "8",
        title: "Let Us C",
        author: "Yashavant Kanetkar",
        category: "Technical",
        price: 400,
        rating: 4.5,
        isbn: "9788183331630",
        description: "A beginner-friendly introduction to C programming concepts and problem-solving."
    }
];

// Get the latest book list, including admin changes
function getStoreBooks() {
    const savedBooks = localStorage.getItem("booknestBooks");

    return savedBooks ? JSON.parse(savedBooks) : books;
}

// Get a book using its ID
function getBookById(bookId) {
    return getStoreBooks().find(book => book.id === bookId);
}

// Add a book to wishlist
function addBookToWishlist(book) {
    let wishlist = JSON.parse(
        localStorage.getItem("booknestWishlist")
    ) || [];

    const alreadyExists = wishlist.some(
        item => item.id === book.id
    );

    if (alreadyExists) {
        alert("This book is already in your wishlist!");
        return;
    }

    wishlist.push(book);

    localStorage.setItem(
        "booknestWishlist",
        JSON.stringify(wishlist)
    );

    alert("Book added to your wishlist!");
}

// Get cart
function getCart() {
    return JSON.parse(localStorage.getItem("booknestCart")) || [];
}

// Add a book to cart
function addBookToCart(book) {
    let cart = getCart();

    const existingBook = cart.find(
        item => item.id === book.id
    );

    if (existingBook) {
        existingBook.quantity += 1;
    } else {
        cart.push({
            ...book,
            quantity: 1
        });
    }

    localStorage.setItem(
        "booknestCart",
        JSON.stringify(cart)
    );

    alert("Book added to cart!");
}

// Update cart counter
function updateCartCount() {
    const cart = getCart();

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const counter = document.getElementById("cartCount");

    if (counter) {
        counter.textContent = count;
    }
}
