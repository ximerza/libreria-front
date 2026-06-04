'use client';

import { ProtectedRoute } from '../../components/ProtectedRoute';
import Link from 'next/link';
import { BookOpen, Plus } from 'lucide-react';

export default function BooksPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Libros</h1>
            <p className="text-xl text-gray-600">Busca y añade libros a tu biblioteca personal</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link
              href="/books/search"
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Buscar Libros</h3>
              <p className="text-gray-600">
                Encuentra cualquier libro usando nuestra integración con la API de Open Library
              </p>
            </Link>

            <Link
              href="/my-library"
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mi Biblioteca</h3>
              <p className="text-gray-600">
                Ve todos tus libros, tu progreso de lectura y gestiona tu colección
              </p>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
