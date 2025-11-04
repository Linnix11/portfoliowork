import { Mail, Github, Linkedin, Briefcase, Code, Award } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: 'error', text: 'Merci de remplir tous les champs.' });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json().catch(async () => {
        try { return { error: await res.text() }; } catch { return {}; }
      });
      if (!res.ok) {
        const reason = typeof data?.error === 'string' && data.error.trim() ? data.error : 'Échec de l\'envoi.';
        throw new Error(`HTTP ${res.status} - ${reason}`);
      }
      setStatus({ type: 'success', text: 'Message envoyé avec succès. Merci !' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      const message = typeof err?.message === 'string' ? err.message : 'Une erreur est survenue.';
      setStatus({ type: 'error', text: message });
      console.error('Erreur envoi formulaire:', err);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Portfolio</h1>
          <div className="flex gap-4">
            <a href="#about" className="text-slate-600 hover:text-slate-900 transition">À propos</a>
            <a href="#projects" className="text-slate-600 hover:text-slate-900 transition">Projets</a>
            <a href="#skills" className="text-slate-600 hover:text-slate-900 transition">Compétences</a>
            <a href="#contact" className="text-slate-600 hover:text-slate-900 transition">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">Développeur Web</h2>
          <p className="text-xl text-slate-600 mb-8">Création d'expériences numériques modernes et performantes</p>
          <div className="flex gap-4 justify-center">
            <a href="#contact" className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition">Me contacter</a>
            <a href="#projects" className="border-2 border-slate-900 text-slate-900 px-6 py-3 rounded-lg hover:bg-slate-900 hover:text-white transition">Voir mes projets</a>
          </div>
        </section>

        <section id="about" className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">À propos</h3>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Passionné par le développement web, je crée des applications modernes et intuitives.
                Mon objectif est de transformer des idées en solutions numériques performantes.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Je maîtrise les technologies front-end et back-end, ce qui me permet de développer
                des projets complets de A à Z.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Projets</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Briefcase className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Application E-commerce</h4>
                  <p className="text-slate-600 mb-4">Plateforme de vente en ligne avec gestion des paiements et des stocks</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">React</span>
                    <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Node.js</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Code className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Dashboard Analytics</h4>
                  <p className="text-slate-600 mb-4">Interface de visualisation de données en temps réel</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">TypeScript</span>
                    <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Tailwind</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Award className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Application Mobile</h4>
                  <p className="text-slate-600 mb-4">Application cross-platform pour la gestion de tâches</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">React Native</span>
                    <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Firebase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Compétences</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-slate-700" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Front-end</h4>
                <p className="text-slate-600">React, TypeScript, Tailwind CSS, HTML5, CSS3</p>
              </div>
              <div className="text-center">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-slate-700" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Back-end</h4>
                <p className="text-slate-600">Node.js, Supabase, PostgreSQL, REST APIs</p>
              </div>
              <div className="text-center">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-slate-700" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Outils</h4>
                <p className="text-slate-600">Git, Vite, npm, VS Code, Figma</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Contact</h3>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <p className="text-slate-600 mb-6">Intéressé par une collaboration ? Envoyez-moi un message :</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                      placeholder="Votre nom"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 h-32 resize-y focus:outline-none focus:ring-2 focus:ring-slate-400"
                      placeholder="Votre message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  {status && (
                    <div className={status.type === 'success' ? 'text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2' : 'text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2'}>
                      {status.text}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi...' : 'Envoyer'}
                  </button>
                </form>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <p className="text-slate-600 mb-6">Ou contactez-moi via :</p>
                <div className="flex flex-col gap-4">
                  <a href="mailto:arthur.champagne-forterre@epitech.digital" className="flex items-center gap-3 p-4 rounded-lg hover:bg-slate-50 transition">
                    <Mail className="w-6 h-6 text-slate-700" />
                    <span className="text-slate-800">arthur.champagne-forterre@epitech.digital</span>
                  </a>
                  <a href="https://github.com/Linnix11" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg hover:bg-slate-50 transition">
                    <Github className="w-6 h-6 text-slate-700" />
                    <span className="text-slate-800">github.com/Linnix11</span>
                  </a>
                  <a href="https://www.linkedin.com/in/arthur-champagne-forterre-629877317" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg hover:bg-slate-50 transition">
                    <Linkedin className="w-6 h-6 text-slate-700" />
                    <span className="text-slate-800">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>© 2025 Portfolio. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
