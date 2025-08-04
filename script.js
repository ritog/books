// Book Gallery JavaScript
class BookGallery {
    constructor() {
        this.books = [];
        this.filteredBooks = [];
        this.filters = {
            tags: [],
            languages: [],
            status: 'read', // Default to showing read books
            sortBy: 'dateRead',
            searchTerm: ''
        };
        
        this.init();
    }
    
    async init() {
        await this.loadBooks();
        this.setupEventListeners();
        this.populateFilters();
        this.applyFilters();
        this.updateStats();
    }
    
    async loadBooks() {
        try {
            const response = await fetch('books.json');
            const data = await response.json();
            this.books = data.books || [];
            this.filteredBooks = [...this.books];
        } catch (error) {
            console.error('Error loading books:', error);
            // Fallback to sample data if books.json doesn't exist
            this.books = this.getSampleBooks();
            this.filteredBooks = [...this.books];
        }
    }
    
    getSampleBooks() {
        return [
            {
                title: "Dune",
                author: "Frank Herbert",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
                rating: 5,
                dateRead: "2024-01-15",
                tags: ["Sci-Fi", "Classic", "Epic"],
                language: "EN",
                status: "read",
                review: "https://www.goodreads.com/book/show/44767458-dune"
            },
            {
                title: "The Three-Body Problem",
                author: "Liu Cixin",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1415428227i/20518872.jpg",
                rating: 4,
                dateRead: "2024-02-20",
                tags: ["Sci-Fi", "Chinese", "Physics"],
                language: "EN",
                status: "read",
                review: "https://www.goodreads.com/book/show/20518872-the-three-body-problem"
            },
            {
                title: "Le Petit Prince",
                author: "Antoine de Saint-Exupéry",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1367545443i/157993.jpg",
                rating: 5,
                dateRead: "2024-03-10",
                tags: ["Classic", "Philosophy", "Children"],
                language: "FR",
                status: "read",
                review: "https://www.goodreads.com/book/show/157993.le-petit-prince"
            },
            {
                title: "Norwegian Wood",
                author: "Haruki Murakami",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327942880i/11297.jpg",
                rating: 4,
                dateRead: null,
                tags: ["Contemporary", "Japanese", "Coming-of-age"],
                language: "EN",
                status: "want-to-read",
                review: null
            },
            {
                title: "1984",
                author: "George Orwell",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781257i/61439040.jpg",
                rating: 5,
                dateRead: "2023-12-01",
                tags: ["Dystopian", "Classic", "Political"],
                language: "EN",
                status: "read",
                review: "https://www.goodreads.com/book/show/61439040-1984"
            },
            {
                title: "Don Quixote",
                author: "Miguel de Cervantes",
                cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/3836.jpg",
                rating: 4,
                dateRead: "2023-11-15",
                tags: ["Classic", "Spanish", "Adventure"],
                language: "ES",
                status: "read",
                review: "https://www.goodreads.com/book/show/3836.Don_Quixote"
            }
        ];
    }
    
    setupEventListeners() {
        // Checkbox filters
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('filter-checkbox')) {
                this.updateFilters();
            }
            if (e.target.classList.contains('sort-radio')) {
                this.filters.sortBy = e.target.value;
                this.applyFilters();
            }
        });
        
        // Status buttons
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleStatusChange(e.target.dataset.status);
            });
        });
        
        // Search bar
        document.getElementById('search').addEventListener('input', (e) => {
            this.filters.searchTerm = e.target.value.toLowerCase();
            this.applyFilters();
        });
        
        // Clear filters button
        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearAllFilters();
        });
    }
    
    populateFilters() {
        const tags = new Set();
        const languages = new Set();
        
        this.books.forEach(book => {
            book.tags.forEach(tag => tags.add(tag));
            languages.add(book.language);
        });
        
        // Populate tag checkboxes
        const tagFilters = document.getElementById('tagFilters');
        tagFilters.className = 'checkbox-group tags';
        tags.forEach(tag => {
            const label = document.createElement('label');
            label.className = 'checkbox-label';
            label.innerHTML = `
                <input type="checkbox" value="${tag}" class="filter-checkbox">
                <span class="checkmark"></span>
                ${tag}
            `;
            tagFilters.appendChild(label);
        });
        
        // Populate language checkboxes
        const languageFilters = document.getElementById('languageFilters');
        languages.forEach(lang => {
            const label = document.createElement('label');
            label.className = 'checkbox-label';
            label.innerHTML = `
                <input type="checkbox" value="${lang}" class="filter-checkbox">
                <span class="checkmark"></span>
                ${this.getLanguageName(lang)}
            `;
            languageFilters.appendChild(label);
        });
    }
    
    getLanguageName(code) {
        const languages = {
            'SA': 'Sanskrit',
            'EN': 'English',
            'BN': 'Bengali',
            'ES': 'Spanish',
            'DE': 'German',
            'HI': 'Hindi',
        };
        return languages[code] || code;
    }
    
    updateFilters() {
        // Get all checked checkboxes
        const checkedTags = Array.from(document.querySelectorAll('#tagFilters .filter-checkbox:checked')).map(cb => cb.value);
        const checkedLanguages = Array.from(document.querySelectorAll('#languageFilters .filter-checkbox:checked')).map(cb => cb.value);
        
        this.filters.tags = checkedTags;
        this.filters.languages = checkedLanguages;
        
        this.applyFilters();
    }
    
    handleStatusChange(status) {
        // Update active button
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Update filter
        this.filters.status = status;
        this.applyFilters();
    }
    
    clearAllFilters() {
        // Uncheck all checkboxes
        document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
        
        // Reset filters
        this.filters.tags = [];
        this.filters.languages = [];
        this.filters.status = 'read'; // Reset to default
        this.filters.sortBy = 'dateRead';
        this.filters.searchTerm = '';

        // Clear search bar
        document.getElementById('search').value = '';
        
        // Reset active button
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('[data-status="read"]').classList.add('active');

        // Reset sort radio
        document.querySelector('input[name="sort"][value="dateRead"]').checked = true;
        
        this.applyFilters();
    }
    
    applyFilters() {
        this.filteredBooks = this.books.filter(book => {
            // Search filter
            if (this.filters.searchTerm) {
                const searchTerm = this.filters.searchTerm;
                const titleMatch = book.title.toLowerCase().includes(searchTerm);
                const authorMatch = book.author.toLowerCase().includes(searchTerm);
                if (!titleMatch && !authorMatch) return false;
            }

            // Tag filter (union - OR logic)
            if (this.filters.tags.length > 0) {
                const hasMatchingTag = this.filters.tags.some(filterTag => 
                    book.tags.includes(filterTag)
                );
                if (!hasMatchingTag) return false;
            }
            
            // Language filter (union - OR logic)
            if (this.filters.languages.length > 0) {
                if (!this.filters.languages.includes(book.language)) {
                    return false;
                }
            }
            
            // Status filter
            if (this.filters.status !== 'all' && book.status !== this.filters.status) {
                return false;
            }
            
            return true;
        });

        this.applySorting();
        this.renderBooks();
        this.updateStats();
    }

    applySorting() {
        if (this.filters.sortBy === 'dateRead') {
            this.filteredBooks.sort((a, b) => {
                if (a.dateRead && b.dateRead) {
                    return new Date(b.dateRead) - new Date(a.dateRead);
                }
                return a.dateRead ? -1 : 1;
            });
        } else if (this.filters.sortBy === 'rating') {
            this.filteredBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }
    }
    
    renderBooks() {
        const grid = document.getElementById('booksGrid');
        const noResults = document.getElementById('noResults');
        
        if (this.filteredBooks.length === 0) {
            grid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        grid.innerHTML = this.filteredBooks.map(book => this.createBookCard(book)).join('');
    }
    
    createBookCard(book) {
        const stars = '★'.repeat(book.rating) + '☆'.repeat(5 - book.rating);
        const tags = book.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        const dateDisplay = book.dateRead ? this.formatDate(book.dateRead) : 'Not read yet';
        const reviewLink = book.review ? `<a href="${book.review}" target="_blank" class="review-link"><i class="fas fa-external-link-alt"></i> Read Review</a>` : '';
        
        return `
            <div class="book-card">
                <div class="book-status status-${book.status}">
                    ${book.status === 'read' ? 'Read' : 'Want to Read'}
                </div>
                <img src="${book.cover}" alt="${book.title}" class="book-cover" onerror="this.src='https://via.placeholder.com/200x280/cccccc/666666?text=No+Cover'">
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">by ${book.author}</p>
                    <div class="book-details">
                        <div class="book-rating">
                            <span class="stars">${stars}</span>
                            <span>${book.rating}/5</span>
                        </div>
                        <div class="book-date">
                            <i class="fas fa-calendar"></i>
                            ${dateDisplay}
                        </div>
                        <div class="book-language">
                            <i class="fas fa-globe"></i>
                            ${this.getLanguageName(book.language)}
                        </div>
                        <div class="book-tags">
                            ${tags}
                        </div>
                        ${reviewLink ? `<div class="book-review">${reviewLink}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    updateStats() {
        const totalBooks = this.books.length;
        const readBooks = this.books.filter(book => book.status === 'read').length;
        const wantToReadBooks = this.books.filter(book => book.status === 'want-to-read').length;
        
        document.getElementById('totalBooks').textContent = totalBooks;
        document.getElementById('readBooks').textContent = readBooks;
        document.getElementById('wantToReadBooks').textContent = wantToReadBooks;
    }
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BookGallery();
}); 