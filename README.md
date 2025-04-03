# Project Gutenberg Book Analyzer

![Project Screenshot](/app/opengraph-image.png)

A Next.js application that analyzes books from Project Gutenberg using Groq's LLM and visualizes character interactions with React Flow.

### Features

- 📚 Fetch any book from Project Gutenberg by ID
- 🤖 Analyze book content using Groq's powerful LLM (https://console.groq.com/docs/models)

- 🎨 Interactive visualization of character interactions with React Flow
- 📊 Sentiment analysis of key quotes
- 🚀 Built with Next.js 15 and server actions
- ✨ Modern UI with Shadcn components

### Live Demo

The application is deployed on Vercel:  
[View Live Demo](https://project-gutenberg.lucasfranzolin.dev)

### Video Walkthrough

Watch a short demo explaining the application and technical choices:  
[Loom Walkthrough](https://www.loom.com/share/abdda3de54b74e248fe6c5283a886be7)

### How It Works

1. **Book Fetching**:

   - Enter a Project Gutenberg book ID
   - The app fetches raw text content from Gutenberg's API
   - First 6,000 characters are processed

> Due to the constraints of Groq's free tier, only the first 6,000 characters of the book are processed. This allows for a quick demonstration of the application's capabilities while keeping API usage within the free limits.

2. **LLM Analysis**:

   - Content is sent to Groq's `llama-3.3-70b-versatile`

> The `llama-3.3-70b-versatile` model was chosen for its balance between performance and cost within Groq's free tier. It provides high accuracy in character identification and sentiment analysis without compromising application speed.

- The LLM identifies:
  - All major characters
  - Their relationships/interactions
  - Key quotes per character
  - Sentiment analysis for each interaction

3. **Data Processing**:

   - Interactions are counted and weighted
   - Characters are ranked by importance
   - Sentiment scores are normalized (-1 to 1 scale)

4. **Visualization**:
   - React Flow displays characters as nodes
   - Edges show interactions
   - Color-coded sentiment analysis

### Try These Book IDs

For quick testing:

- `1342` - Pride and Prejudice, by Jane Austen
- `84` - Frankenstein, by Mary Wollstonecraft Shelley
- `11` - Alice's Adventures in Wonderland, by Lewis Carroll
- `1661` - The Adventures of Sherlock Holmes, by Arthur Conan Doyle

### Getting Started

#### Prerequisites

- Node.js 22+
- pnpm
- [Groq API key](https://console.groq.com/keys) (free tier available)

#### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory and add your Groq API key:

```bash
GROQ_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
pnpm dev
```
