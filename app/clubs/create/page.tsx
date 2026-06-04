'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import Link from 'next/link';
import { Plus, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

export default function CreateClubPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const { addToClubs } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);

    const newClub = {
      id: Date.now().toString(),
      name,
      description,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      members: 1
    };
    
    addToClubs(newClub);
    setSuccessMessage('¡Club creado con éxito!');
    
    setTimeout(() => {
      router.push('/clubs');
    }, 1500);
    
    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/clubs" className="text-gray-600 hover:text-purple-600 font-medium mb-8 inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver a Clubs
          </Link>

          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center text-green-700">
              <CheckCircle className="h-5 w-5 mr-3" />
              {successMessage}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Crear Club de Lectura</h1>
                <p className="text-gray-600 mt-1">Crea una comunidad para lectores</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Club
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                  placeholder="Ej: Amantes de la Literatura"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                  placeholder="¿De qué trata tu club?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de Imagen (opcional)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                  placeholder="https://"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Plus className="h-6 w-6" />}
                <span>Crear Club</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
