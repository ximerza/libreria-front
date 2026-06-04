'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../../components/ProtectedRoute';
import { Users, Send, ArrowLeft, Plus } from 'lucide-react';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';

export default function ClubDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getClubs } = useAuth();
  const [club, setClub] = useState<any>(null);
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [isMember, setIsMember] = useState(true);
  const [joining, setJoining] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clubs = getClubs();
    const foundClub = clubs.find(c => c.id === id);
    if (foundClub) {
      setClub(foundClub);
    }
    setLoading(false);
  }, [id, getClubs]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Cargando club...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!club) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">Club no encontrado</p>
            <button
              onClick={() => router.push('/clubs')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium"
            >
              Volver a clubs
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const handleJoinClub = async () => {
    setJoining(true);
    try {
      await api.post(`/clubs/${id}/join`);
      setIsMember(true);
    } catch (error) {
      console.error(error);
    } finally {
      setJoining(false);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const addedPost = {
      id: Date.now(),
      user: { name: 'Tú' },
      content: newPost,
      createdAt: new Date().toISOString(),
      comments: []
    };
    setPosts([addedPost, ...posts]);
    setNewPost('');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/clubs')}
                  className="text-gray-600 hover:text-purple-600 font-medium flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Atrás
                </button>
                <h1 className="text-3xl font-bold text-gray-900">{club.name}</h1>
              </div>
              {!isMember && (
                <button
                  onClick={handleJoinClub}
                  disabled={joining}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-full font-medium flex items-center space-x-2 shadow-md disabled:opacity-50"
                >
                  {joining ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                  <span>Unirse al Club</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <img
                  src={club.imageUrl}
                  alt={club.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{club.description}</p>
                  <div className="flex items-center text-gray-600 space-x-2 mb-4">
                    <Users className="h-5 w-5" />
                    <span>{club.members} miembros</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {isMember && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <form onSubmit={handleCreatePost} className="flex items-end space-x-4">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="¿Qué quieres compartir con el club?"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 resize-none"
                      rows={2}
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-xl flex items-center justify-center transition-all"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              )}

              {posts.length > 0 ? (
                <div className="space-y-6">
                  {posts.map((post: any) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {post.user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No hay publicaciones todavía
                  </h3>
                  <p className="text-gray-500">
                    ¡Escribe la primera publicación!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
