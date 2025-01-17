import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!name || !email || !ticketType) {
      setMessage('Semua kolom harus diisi!');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, ticketType }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Tiket berhasil dibeli!');
      } else {
        setMessage(data.message || 'Terjadi kesalahan!');
      }
    } catch (error) {
      setMessage('Gagal terhubung ke server!');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-700 text-white">
      <Head>
        <title>LoptaTick</title>
      </Head>

      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">LoptaTick</h1>
        <nav>
          <a href="#" className="text-lg mx-4 hover:underline">Home</a>
          <a href="#" className="text-lg mx-4 hover:underline">Tiket</a>
        </nav>
      </header>

      <main className="p-6 text-center">
        <section className="py-12">
          <h2 className="text-4xl font-bold mb-4">LOPTASIKU 9</h2>
          <p className="text-lg mb-6">Mengukir prestasi dengan langkah mengukur prestasi dengan budaya</p>
          <div>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mx-2">Beli Tiket</button>
            <button className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded mx-2">Selengkapnya</button>
          </div>
        </section>

        <section className="bg-white text-black rounded-lg p-8 mx-auto shadow-md max-w-md">
          <h3 className="text-2xl font-semibold mb-4">Tiket</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Nama</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="Masukkan nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Pilih Tiket</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
              >
                <option value="">Pilih tipe tiket</option>
                <option value="Regular - 100,000">Regular - 100,000</option>
                <option value="VIP - 250,000">VIP - 250,000</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Sedang memproses...' : 'Bayar'}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-lg font-semibold">{message}</p>
          )}
        </section>
      </main>

      <footer className="mt-12 p-6 bg-blue-800 text-center text-sm">
        <p>Mediapartner & Sponsorship</p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <img src="/logo1.png" alt="Logo 1" className="h-8 mx-auto" />
          <img src="/logo2.png" alt="Logo 2" className="h-8 mx-auto" />
          <img src="/logo3.png" alt="Logo 3" className="h-8 mx-auto" />
        </div>
        <p className="mt-8 text-xs">&copy; 2025 LoptaTick. All rights reserved.</p>
      </footer>
    </div>
  );
}
