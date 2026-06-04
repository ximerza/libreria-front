'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { Users, Plus, BookOpen, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function ClubsPage() {
  const { clubsTrigger, getClubs } = useAuth();
  const clubs = getClubs();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Clubs de Lectura</h1>
                <p className="text-gray-600 mt-1">Únete a comunidades de lectores apasionados</p>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-purple-600 font-medium flex items-center"
                >
                  ← Volver
                </Link>
                <Link
                  href="/clubs/create"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-full font-medium flex items-center space-x-2 transition-all shadow-md hover:shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  <span>Crear Club</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {clubs.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
                Clubs disponibles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clubs.map((club) => (
                  <Link
                    key={club.id}
                    href={`/clubs/${club.id}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="relative h-48">
                      <img
                        src={club.imageUrl}
                        alt={club.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{club.name}</h3>
                        <div className="flex items-center text-white/90 text-sm">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{club.members} miembros</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-2">{club.description}</p>
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-center py-3 rounded-xl font-medium transition-all">
                        Ver Club
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <Users className="h-20 w-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No hay clubs todavía
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                ¡Crea el primer club de lectura y empieza una comunidad!
              </p>
              <Link
                href="/clubs/create"
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium text-lg"
              >
                <Plus className="h-6 w-6 mr-2" />
                Crear primer club
              </Link>
            </div>
          )}

          {/* Only show events section if there are clubs */}
          {clubs.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-orange-600" />
                Próximos encuentros
              </h2>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: '¡Crea tu primer encuentro',
                    club: 'Tu primer club',
                    date: 'Cuando crees el club',
                    location: 'Virtual'
                  }
                ].map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.club}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{event.date}</div>
                      <div className="text-sm text-gray-500 flex items-center justify-end">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
