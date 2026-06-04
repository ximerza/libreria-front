'use client';

import { useState } from 'react';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import Link from 'next/link';
import { Search, BookOpen, Plus, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';

interface Book {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
  cover_i: number;
}

export default function BookSearchPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [addingBook, setAddingBook] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { addToLibrary: addToLibraryContext } = useAuth();

  const searchBooks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
      );
      const data = await response.json();
      setBooks(data.docs || []);
    } catch (error) {
      console.error('Error al buscar libros:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const addToLibrary = async (book: Book) => {
    setAddingBook(book.key);
    setSuccessMessage(null);
    
    const newReading = {
      id: Date.now().toString(),
      status: 'WANT_TO_READ',
      book: {
        id: Date.now().toString(),
        title: book.title,
        author: book.author_name?.[0] || 'Desconocido',
        coverUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : undefined
      }
    };
    
    addToLibraryContext(newReading);
    setSuccessMessage(`"${book.title}" agregado a tu biblioteca!`);
    setTimeout(() => setSuccessMessage(null), 3000);
    setAddingBook(null);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Link href="/books" className="text-gray-600 hover:text-blue-600 font-medium flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Atrás
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Buscar Libros</h1>
                  <p className="text-gray-600 mt-1">Encuentra cualquier libro usando la API de Open Library</p>
                </div>
              </div>
            </div>

            <form onSubmit={searchBooks} className="max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Busca por título, autor o ISBN..."
                  className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-lg transition-all shadow-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-2 rounded-full font-medium transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Buscar'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center text-green-700">
              <CheckCircle className="h-5 w-5 mr-3" />
              {successMessage}
            </div>
          )}

          {searching && books.length > 0 && (
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Resultados para: "{query}"
            </h2>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
              <p className="text-xl text-gray-600 mt-4">Buscando libros...</p>
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {books.map((book) => (
                <div
                  key={book.key}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative aspect-[2/3] bg-gradient-to-br from-blue-100 to-indigo-100">
                    {book.cover_i ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 line-clamp-2 mb-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-1">
                      {book.author_name?.[0] || 'Autor desconocido'}
                    </p>
                    <button
                      onClick={() => addToLibrary(book)}
                      disabled={addingBook === book.key}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-xl font-medium flex items-center justify-center space-x-1 transition-all disabled:opacity-50"
                    >
                      {addingBook === book.key ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : searching ? (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No se encontraron libros para "{query}"</p>
              <p className="text-gray-500 mt-2">Intenta con otra búsqueda</p>
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600">¡Empieza a buscar libros!</p>
              <p className="text-gray-500 mt-2">Escribe un título, autor o palabra clave</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
