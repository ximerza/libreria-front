'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import Link from 'next/link';
import { BookOpen, BookMarked, CheckCircle, Plus, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function MyLibraryPage() {
  const [filter, setFilter] = useState('all');
  const { libraryTrigger, getLibrary, updateReadingStatus } = useAuth();
  const readings = getLibrary();

  const filteredReadings = filter === 'all'
    ? readings
    : readings.filter((r) => {
        if (filter === 'reading') return r.status === 'CURRENTLY_READING';
        if (filter === 'finished') return r.status === 'READ';
        if (filter === 'want-to-read') return r.status === 'WANT_TO_READ';
        return true;
      });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'CURRENTLY_READING': return 'Leyendo';
      case 'READ': return 'Terminado';
      case 'WANT_TO_READ': return 'Pendiente';
      default: return 'Pendiente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CURRENTLY_READING': return 'bg-blue-500';
      case 'READ': return 'bg-green-500';
      case 'WANT_TO_READ': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/books" className="text-gray-600 hover:text-blue-600 font-medium flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Atrás
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Mi Biblioteca</h1>
                  <p className="text-gray-600 mt-1">Gestiona tu progreso de lectura</p>
                </div>
              </div>
              <Link
                href="/books/search"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-full font-medium flex items-center space-x-2 shadow-md"
              >
                <Plus className="h-5 w-5" />
                Agregar Libro
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-10">
            {[
              { key: 'all', label: 'Todos', icon: BookOpen },
              { key: 'reading', label: 'Leyendo', icon: BookMarked },
              { key: 'finished', label: 'Terminados', icon: CheckCircle },
              { key: 'want-to-read', label: 'Pendientes', icon: Plus }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                  filter === tab.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {filteredReadings.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredReadings.map((reading) => (
                <div
                  key={reading.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative aspect-[2/3] bg-gradient-to-br from-blue-100 to-indigo-100">
                    {reading.book.coverUrl ? (
                      <img
                        src={reading.book.coverUrl}
                        alt={reading.book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`text-white px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reading.status)}`}>
                        {getStatusLabel(reading.status)}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 line-clamp-2 mb-1">
                      {reading.book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{reading.book.author}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => updateReadingStatus(reading.id, 'CURRENTLY_READING')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                          reading.status === 'CURRENTLY_READING'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                        }`}
                      >
                        Leyendo
                      </button>
                      <button
                        onClick={() => updateReadingStatus(reading.id, 'READ')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                          reading.status === 'READ'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                        }`}
                      >
                        Terminado
                      </button>
                      <button
                        onClick={() => updateReadingStatus(reading.id, 'WANT_TO_READ')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                          reading.status === 'WANT_TO_READ'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                        }`}
                      >
                        Pendiente
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No tienes libros en esta categoría
              </h3>
              <p className="text-gray-500 mb-6">
                ¡Empieza a agregar libros a tu biblioteca!
              </p>
              <Link
                href="/books/search"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-medium shadow-md"
              >
                <Plus className="h-5 w-5 mr-2" />
                Buscar Libros
              </Link>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
