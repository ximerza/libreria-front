'use client';

import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import {
  BookOpen,
  Users,
  TrendingUp,
  Plus,
  BookMarked,
  CheckCircle,
  Clock,
  BookHeart
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Leyendo Ahora', value: '3', icon: BookMarked, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Terminados', value: '12', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Lista de Deseos', value: '8', icon: BookHeart, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Clubs', value: '2', icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' }
  ];

  const recentBooks = [
    { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez', status: 'reading' },
    { id: 2, title: '1984', author: 'George Orwell', status: 'finished' },
    { id: 3, title: 'El principito', author: 'Antoine de Saint-Exupéry', status: 'want-to-read' }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Hola, {user?.name?.split(' ')[0] || 'Lector'}! 👋
                </h1>
                <p className="text-gray-600 mt-1">Bienvenido de nuevo a tu biblioteca personal</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/books/search"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-full font-medium flex items-center space-x-2 transition-all shadow-md hover:shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  <span>Buscar Libros</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.bg} p-4 rounded-xl`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Books Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Tu Progreso de Lectura
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {recentBooks.map((book, idx) => (
                    <div key={idx} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{book.title}</h3>
                          <p className="text-sm text-gray-500">{book.author}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {book.status === 'reading' && (
                          <span className="flex items-center text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                            <Clock className="h-4 w-4 mr-1" />
                            Leyendo
                          </span>
                        )}
                        {book.status === 'finished' && (
                          <span className="flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Terminado
                          </span>
                        )}
                        {book.status === 'want-to-read' && (
                          <span className="flex items-center text-purple-600 bg-purple-100 px-3 py-1 rounded-full text-sm font-medium">
                            <BookHeart className="h-4 w-4 mr-1" />
                            Pendiente
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 bg-gray-50">
                  <Link
                    href="/my-library"
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                  >
                    Ver toda tu biblioteca →
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions & Clubs */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
                <div className="space-y-3">
                  <Link
                    href="/books/search"
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Plus className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">Agregar Libro</span>
                  </Link>
                  <Link
                    href="/clubs"
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-purple-50 transition-colors"
                  >
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="font-medium text-gray-900">Explorar Clubs</span>
                  </Link>
                  <Link
                    href="/clubs/create"
                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Plus className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-900">Crear Club</span>
                  </Link>
                </div>
              </div>

              {/* Reading Goals */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Meta de Lectura 2024</h2>
                <div className="bg-white/20 rounded-full h-3 mb-4">
                  <div className="bg-white h-3 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>12/20 libros</span>
                  <span>60% completado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
