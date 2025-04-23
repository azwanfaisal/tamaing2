// app/page.tsx
'use client'

import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Hotel, Shield, Users, CreditCard, Star } from 'lucide-react'

export default function Home() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard')
    }
  }, [isLoggedIn, router])

  if (isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Kelola <span className="text-blue-600">Hotel</span> Anda Dengan Mudah
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sistem manajemen hotel modern yang membantu Anda mengelola reservasi, kamar, dan tamu dengan efisien.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/login"
                className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Mulai Sekarang <ArrowRight size={20} />
              </Link>
              <Link
                href="/auth/register"
                className="px-8 py-3 text-lg font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent z-10"></div>
          <img 
            src="/hotel-management.jpg" 
            alt="Hotel Management Dashboard"
            className="w-full max-w-5xl mx-auto rounded-t-xl shadow-2xl border border-gray-200"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Fitur Unggulan Kami</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Solusi lengkap untuk manajemen hotel modern
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Hotel className="w-8 h-8 text-blue-600" />,
                title: "Manajemen Kamar",
                description: "Kelola ketersediaan kamar, harga, dan fasilitas dengan mudah"
              },
              {
                icon: <CreditCard className="w-8 h-8 text-blue-600" />,
                title: "Sistem Pembayaran",
                description: "Proses pembayaran yang aman dan terintegrasi"
              },
              {
                icon: <Users className="w-8 h-8 text-blue-600" />,
                title: "Manajemen Tamu",
                description: "Catatan tamu dan preferensi yang terorganisir"
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: "Keamanan Data",
                description: "Proteksi data dengan sistem keamanan terbaik"
              },
              {
                icon: <Star className="w-8 h-8 text-blue-600" />,
                title: "Review Tamu",
                description: "Kelola dan pantau ulasan dari tamu hotel"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Apa Kata Pengguna Kami?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Budi Santoso",
                position: "Manager, Grand Hotel",
                content: "Sistem ini sangat membantu operasional harian kami. Antarmuka yang intuitif dan fitur yang lengkap.",
                rating: 5
              },
              {
                name: "Ani Wijaya",
                position: "Owner, Boutique Hotel",
                content: "Pelayanan pelanggan sangat baik dan sistem selalu diperbarui dengan fitur-fitur terbaru.",
                rating: 4
              },
              {
                name: "Cahyo Pratama",
                position: "Front Office Manager",
                content: "Dari semua sistem yang pernah kami coba, ini yang paling mudah digunakan oleh staf kami.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Siap Mengubah Cara Anda Mengelola Hotel?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Bergabunglah dengan ratusan hotel yang telah mempercayai sistem kami
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-8 py-3 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              Daftar Gratis
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-3 text-lg font-medium text-white border border-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Hotel Management</h3>
              <p className="text-gray-400">
                Solusi terbaik untuk manajemen hotel modern dan efisien.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Fitur</a></li>
                <li><a href="#" className="hover:text-white">Harga</a></li>
                <li><a href="#" className="hover:text-white">Integrasi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Karir</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@hotelmanagement.com</li>
                <li>+62 123 4567 890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Hotel Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}