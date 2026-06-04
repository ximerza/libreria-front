'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import {
  BookOpen,
  Users,
  Heart,
  Star,
  Search,
  TrendingUp,
  Sparkles,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: 'Tu Biblioteca Personal',
      description: 'Rastrea tus lecturas, guarda tus libros favoritos y organiza tu historial de lectura.'
    },
    {
      icon: Users,
      title: 'Clubs de Lectura',
      description: 'Únete a comunidades de lectores, discute libros y haz nuevos amigos.'
    },
    {
      icon: Search,
      title: 'Busca Libros',
      description: 'Encuentra cualquier libro usando nuestra integración con APIs gratuitas.'
    },
    {
      icon: Star,
      title: 'Califica y Reseña',
      description: 'Califica tus libros favoritos y escribe reseñas para compartir con la comunidad.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6 animate-pulse">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">¡Comienza tu viaje literario hoy!</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Encuentra tu próximo
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                libro favorito
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Únete a miles de lectores, descubre nuevos libros, participa en clubs de lectura y construye tu biblioteca digital personal.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Empezar Ahora
                  <ArrowRight className="inline-block ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/login"
                  className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-md hover:shadow-lg"
                >
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>

          {/* Stats */}
          {isAuthenticated && (
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { label: 'Lectores Activos', value: '15K+' },
                { label: 'Libros Registrados', value: '50K+' },
                { label: 'Clubs de Lectura', value: '230+' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Qué puedes hacer?</h2>
            <p className="text-xl text-gray-600">Explora todas las funcionalidades de EntrePáginas</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-b from-blue-50 to-white rounded-3xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              ¿Listo para empezar tu aventura literaria?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Únete gratuitamente y comienza a explorar miles de libros y clubs de lectura.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full font-semibold text-lg transition-all shadow-xl hover:shadow-2xl"
            >
              Crear Cuenta Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">EntrePáginas</span>
            </div>
            <div className="flex space-x-8 text-sm">
              <Link href="#" className="hover:text-white transition-colors">Sobre Nosotros</Link>
              <Link href="#" className="hover:text-white transition-colors">Ayuda</Link>
              <Link href="#" className="hover:text-white transition-colors">Términos</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            © 2024 EntrePáginas. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
