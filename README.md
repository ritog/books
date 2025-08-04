# 📚 My Book Gallery

A beautiful, responsive book gallery website to showcase your reading collection. Features a grid layout with hover effects, filtering by tags and languages, and easy data management through JSON.

## ✨ Features

- **Beautiful Grid Layout**: Responsive book cover grid that adapts to any screen size
- **Hover Effects**: Book details appear on hover with smooth animations
- **Advanced Filtering**: Filter by tags, languages, and reading status
- **Search Functionality**: Search through titles, authors, and tags
- **Multi-language Support**: Display books in different languages
- **Reading Statistics**: Track total books, read, and want-to-read counts
- **Easy Data Management**: Simple JSON format for adding/removing books
- **Zero Maintenance**: Static site that works without any backend

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in your browser
3. **Start customizing** by editing `books.json`

That's it! The site works immediately with sample data.

## 📖 How to Use

### Adding Books

Edit the `books.json` file to add your books:

```json
{
  "books": [
    {
      "title": "Book Title",
      "author": "Author Name",
      "cover": "https://example.com/cover.jpg",
      "rating": 5,
      "dateRead": "2024-01-15",
      "tags": ["Fantasy", "Adventure"],
      "language": "EN",
      "status": "read",
      "review": "https://goodreads.com/review/123"
    }
  ]
}
```

### Book Data Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Book title | "Dune" |
| `author` | string | Author name | "Frank Herbert" |
| `cover` | string | Cover image URL | "https://example.com/cover.jpg" |
| `rating` | number | Your rating (1-5) | 5 |
| `dateRead` | string/null | Date finished (YYYY-MM-DD) | "2024-01-15" |
| `tags` | array | Book categories | ["Sci-Fi", "Classic"] |
| `language` | string | Language code | "EN", "ES", "FR" |
| `status` | string | "read" or "want-to-read" | "read" |
| `review` | string/null | Review link | "https://goodreads.com/..." |

### Supported Languages

- `EN` - English
- `ES` - Spanish  
- `FR` - French
- `DE` - German
- `IT` - Italian
- `PT` - Portuguese
- `RU` - Russian
- `JA` - Japanese
- `KO` - Korean
- `ZH` - Chinese

## 🌐 Deployment

### GitHub Pages (Recommended)

1. **Create a new repository** on GitHub
2. **Upload all files** to the repository
3. **Go to Settings → Pages**
4. **Select source**: "Deploy from a branch"
5. **Choose branch**: `main` or `master`
6. **Save** - Your site will be live at `https://username.github.io/repository-name`

### Cloudflare Pages

1. **Sign up** for Cloudflare Pages
2. **Connect your GitHub repository**
3. **Deploy** - Your site will be live instantly

### Netlify

1. **Drag and drop** the folder to [netlify.com](https://netlify.com)
2. **Your site is live** immediately

## 🎨 Customization

### Colors and Styling

Edit `styles.css` to customize:
- Background gradient
- Card colors
- Hover effects
- Typography

### Layout

Modify the grid layout in `styles.css`:
```css
.books-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
}
```

### Adding Features

The JavaScript in `script.js` is modular and easy to extend:
- Add new filter types
- Implement sorting
- Add book details modal
- Create reading lists

## 📱 Mobile Responsive

The site automatically adapts to:
- **Desktop**: Full grid layout
- **Tablet**: Adjusted spacing and sizing
- **Mobile**: Single column layout

## 🔧 Troubleshooting

### Images Not Loading
- Check that cover URLs are accessible
- Use placeholder images for missing covers
- Ensure URLs are HTTPS for security

### JSON Errors
- Validate your JSON at [jsonlint.com](https://jsonlint.com)
- Check for missing commas or brackets
- Ensure all required fields are present

### Local Development
- Use a local server to avoid CORS issues
- Python: `python -m http.server 8000`
- Node.js: `npx serve .`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share your customized version

## 📞 Support

If you need help:
1. Check the troubleshooting section
2. Look at the sample data in `books.json`
3. Open an issue on GitHub

---

**Happy Reading! 📚✨** 