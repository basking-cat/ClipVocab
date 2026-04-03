import React, { useState } from 'react';
import { Play, Pause, Volume2, Bookmark, CheckCircle2, MessageSquare, BookOpen, Ear, ArrowRight, RotateCcw } from 'lucide-react';

// Logo mark — tilted play sticker + split wordmark
function LogoMark({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const boxSize = size === 'sm' ? 'w-6 h-6 rounded-md border shadow-[1.5px_1.5px_0_#1C1917]' : 'w-8 h-8 rounded-lg border-2 shadow-[2.5px_2.5px_0_#1C1917]';
  const iconSize = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5';
  const textSize = size === 'sm' ? 'text-[13px]' : 'text-[17px]';
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`rotate-[-4deg] bg-[#C8623E] border-[#1C1917] ${boxSize} flex items-center justify-center shrink-0`}>
        <svg viewBox="0 0 16 16" className={`${iconSize} text-white translate-x-[1px]`} xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="currentColor" />
        </svg>
      </div>
      <span style={{ fontFamily: 'Playfair Display, serif' }} className={`${textSize} tracking-tight text-[#1C1917] leading-none`}>
        <span className="font-normal text-[#6B6660]">Clip</span><span className="font-bold">Vocab</span>
      </span>
    </div>
  );
}

export function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedWords, setSavedWords] = useState<string[]>(['reckon', 'cut to the chase']);
  const [activeTab, setActiveTab] = useState<'transcript' | 'notes'>('transcript');

  const toggleSaveWord = (word: string) => {
    setSavedWords(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  return (
    <div
      className="min-h-screen bg-[#F8F6F2] text-[#1C1917] pb-24"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 max-w-7xl mx-auto border-b border-[#E8E5DF]">
        <LogoMark />
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-[#6B6660]">
          <a href="#" className="hover:text-[#1C1917] transition-colors">Philosophy</a>
          <a href="#" className="hover:text-[#1C1917] transition-colors">Library</a>
          <a href="#" className="hover:text-[#1C1917] transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-[#52504B] px-4 py-2 rounded-lg hover:bg-[#E8E5DF] transition-colors">
            Log in
          </button>
          {/* Primary nav CTA — sticker shadow accent */}
          <button className="text-sm font-bold text-white bg-[#1C1917] px-5 py-2 rounded-lg border border-[#1C1917] shadow-[2px_2px_0_#6B4226] hover:shadow-[1px_1px_0_#6B4226] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
            Start free
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Hero */}
        <section className="py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            {/* Announcement — sticker accent */}
            <div className="inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded border border-[#1C1917] bg-amber-200 text-[#1C1917] shadow-[1.5px_1.5px_0_#1C1917]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8623E]" />
              New: Conversational Nuance series
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-[#1C1917]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Learn English<br />
              <span className="relative inline-block">
                the way it's
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#C8623E] opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span><br />
              actually spoken.
            </h1>

            <p className="text-lg text-[#52504B] leading-relaxed max-w-md font-light">
              Stop drilling textbook grammar. Absorb real phrases, slang, and cultural context from hand-picked YouTube clips with native speakers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* Hero CTA — sticker shadow accent */}
              <button className="flex items-center justify-center gap-2 bg-[#C8623E] hover:bg-[#A34E2E] text-white px-7 py-3.5 text-base font-bold rounded-xl border border-[#A34E2E] shadow-[3px_3px_0_#6B4226] hover:shadow-[2px_2px_0_#6B4226] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                Try a lesson <ArrowRight className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center gap-2 bg-white text-[#52504B] px-7 py-3.5 text-sm font-medium rounded-xl border border-[#DDD9D2] hover:border-[#A09890] transition-colors">
                See how it works
              </button>
            </div>

            <div className="flex items-center gap-4 pt-4 text-sm text-[#6B6660] font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F8F6F2] bg-[#E8E5DF] overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=E8E5DF`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span>Join 12,000+ adult learners</span>
            </div>
          </div>

          <div className="relative">
            {/* Hero card — clean frame, floating sticker accent */}
            <div className="relative rounded-2xl overflow-hidden border border-[#DDD9D2] bg-white p-2 rotate-1 hover:rotate-0 transition-transform duration-500 shadow-sm">
              <div className="aspect-video bg-[#1C1917] rounded-xl flex items-center justify-center">
                <Play className="w-12 h-12 text-white/40 fill-white/20" />
              </div>
              {/* Floating sticker quote */}
              <div className="absolute -right-4 -top-4 bg-amber-300 px-3 py-2 rounded-lg border border-[#1C1917] shadow-[3px_3px_0_#1C1917] rotate-[5deg]">
                <span className="font-bold text-sm text-[#1C1917]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  "Cut to the chase"
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature / Live Clip Demo */}
        <section className="py-20 border-t border-[#E8E5DF]">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1C1917]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Like having a native friend pause the video for you.
            </h2>
            <p className="text-[#52504B] text-base">We take real cultural moments and break them down so you understand the nuance, not just the vocabulary.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">

            {/* Left: Video Player */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DDD9D2] overflow-hidden">
              <div className="aspect-video bg-[#1C1917] relative group overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516280440502-8eb47963286b?q=80&w=1000&auto=format&fit=crop"
                  className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
                  alt="Video frame"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white hover:bg-white/25 transition-all"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </button>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70">
                  <div className="flex items-center gap-3 text-white">
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <div className="flex-1 h-1 bg-white/25 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C8623E] w-1/3 rounded-full" />
                    </div>
                    <span className="text-[11px] font-mono text-white/70">0:14 / 0:42</span>
                    <Volume2 className="w-4 h-4 text-white/70" />
                  </div>
                </div>
              </div>

              {/* Tags row */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8E5DF]">
                <div className="flex items-center gap-2">
                  {/* Word type tags — sticker accent */}
                  {['Idioms', 'Business'].map(tag => (
                    <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-200 text-[#1C1917] border border-[#1C1917] shadow-[1px_1px_0_#1C1917]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-[#A09890] hover:text-[#1C1917] transition-colors"><RotateCcw className="w-4 h-4" /></button>
                  <button className="text-[#A09890] hover:text-[#C8623E] transition-colors"><Bookmark className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Transcript */}
              <div className="p-5">
                <div className="flex gap-5 mb-5 border-b border-[#E8E5DF] pb-3">
                  {(['transcript', 'notes'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-sm font-semibold pb-1 border-b-2 transition-colors capitalize ${
                        activeTab === tab
                          ? 'border-[#C8623E] text-[#1C1917]'
                          : 'border-transparent text-[#A09890] hover:text-[#6B6660]'
                      }`}
                    >
                      {tab === 'notes' ? 'Cultural Notes' : 'Transcript'}
                    </button>
                  ))}
                </div>

                {activeTab === 'transcript' ? (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] font-bold text-[#A09890] uppercase tracking-wider block mb-0.5">Speaker 1</span>
                      <p className="text-sm text-[#6B6660] leading-relaxed font-light">
                        So we've been going back and forth on these mockups for weeks now. I mean, I love the direction, but we're running out of time.
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-[#A09890] uppercase tracking-wider block mb-0.5">Speaker 2</span>
                      <p className="text-sm text-[#1C1917] leading-relaxed">
                        Yeah, I agree. Let's just{' '}
                        {/* Phrase highlight — sticker accent */}
                        <mark className="not-italic bg-amber-300 text-[#1C1917] font-bold px-1 py-0.5 rounded border border-[#1C1917] shadow-[1px_1px_0_#1C1917] cursor-help group relative">
                          cut to the chase
                        </mark>
                        . Are we launching this feature on Tuesday or not?
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-[#A09890] uppercase tracking-wider block mb-0.5">Speaker 1</span>
                      <p className="text-sm text-[#6B6660] leading-relaxed font-light">
                        I <span className="border-b border-dashed border-[#A09890] hover:border-[#1C1917] hover:text-[#1C1917] cursor-pointer transition-colors">reckon</span> we can, if engineering gets the staging environment stable today.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-[#52504B]">
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <h4 className="font-semibold text-[#1C1917] mb-1 flex items-center gap-2 text-sm">
                        <MessageSquare className="w-3.5 h-3.5 text-[#C8623E]" />
                        Workplace Directness
                      </h4>
                      <p className="text-sm leading-relaxed">In American business culture, saying "let's cut to the chase" is acceptable when time is short, but it can sound abrupt. It's usually softened with "Yeah, I agree" or used among equals.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Learning Panel */}
            <div className="lg:col-span-5 space-y-5">

              {/* Key phrase card — dark bg, sticker save button */}
              <div className="bg-[#1C1917] rounded-2xl p-6 text-white">
                <span className="text-[#C8623E] text-xs font-bold uppercase tracking-widest mb-2 block" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Key phrase
                </span>
                <h3 className="text-xl font-bold mb-4">Cut to the chase</h3>
                <div className="flex items-center gap-3 mb-5">
                  <button className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Volume2 className="w-3.5 h-3.5 text-[#DDD9D2]" />
                  </button>
                  <span className="text-xs text-white/60 font-mono">/kʌt tə ðə tʃeɪs/</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5 border-l-2 border-[#C8623E] pl-3">
                  Originates from early silent films, when boring dialogue scenes would cut to an exciting chase scene.
                </p>
                <div className="bg-white/5 rounded-xl p-3 text-sm mb-5 border border-white/10">
                  <strong className="text-white block mb-1 text-xs">A native might say:</strong>
                  <span className="text-white/60 italic text-xs">"We only have 5 minutes, so let's cut to the chase."</span>
                </div>
                {/* Save button — sticker accent */}
                <button
                  onClick={() => toggleSaveWord('cut to the chase')}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                    savedWords.includes('cut to the chase')
                      ? 'bg-emerald-400 border-emerald-500 text-[#1C1917]'
                      : 'bg-[#C8623E] border-[#A34E2E] text-white shadow-[3px_3px_0_#6B4226] hover:shadow-[2px_2px_0_#6B4226] hover:translate-x-[1px] hover:translate-y-[1px]'
                  }`}
                >
                  {savedWords.includes('cut to the chase') ? (
                    <><CheckCircle2 className="w-4 h-4" /> Saved to your deck</>
                  ) : (
                    <><Bookmark className="w-4 h-4" /> Save to my vocab deck</>
                  )}
                </button>
              </div>

              {/* Progress card — clean */}
              <div className="bg-white border border-[#DDD9D2] rounded-2xl p-5">
                <h4 className="font-semibold text-[#1C1917] mb-4 text-sm">Today's Progress</h4>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-[#E8E5DF]" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-[#C8623E]" strokeWidth="3" strokeDasharray="60, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-xs font-bold text-[#1C1917]">3/5</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1C1917]">Idioms & Expressions</p>
                    <p className="text-xs text-[#A09890] mt-0.5">2 more phrases to reach your daily goal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Method Section */}
        <section className="py-20 border-t border-[#E8E5DF]">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Ear,       title: 'Active Listening',    desc: 'Train your ear to catch linked words, dropped sounds, and natural pacing that textbooks ignore.' },
              { icon: BookOpen,  title: 'Cultural Context',    desc: 'Language is culture. Understand the humor, politeness levels, and unspoken rules behind the words.' },
              { icon: RotateCcw, title: 'Spaced Repetition',  desc: 'Save phrases you want to use. We\'ll remind you to review them just before you\'re likely to forget.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-[#DDD9D2] rounded-2xl p-7">
                {/* Icon box — sticker accent */}
                <div className="w-10 h-10 rounded-lg bg-amber-100 border border-[#1C1917] shadow-[2px_2px_0_#1C1917] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#C8623E]" />
                </div>
                <h3
                  className="text-lg font-bold text-[#1C1917] mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {title}
                </h3>
                <p className="text-[#52504B] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 mb-12 rounded-2xl bg-[#1C1917] text-center px-8">
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-5"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Sound like yourself, in English.
            </h2>
            <p className="text-[#A09890] text-base mb-9 max-w-lg mx-auto font-light">
              Join thousands of learners who have ditched the textbook to learn real, conversational English.
            </p>
            {/* CTA — sticker accent */}
            <button className="inline-flex items-center gap-2 bg-[#C8623E] hover:bg-[#A34E2E] text-white px-10 py-4 text-base font-bold rounded-xl border border-[#A34E2E] shadow-[4px_4px_0_#6B4226] hover:shadow-[2px_2px_0_#6B4226] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
              Start learning for free <ArrowRight className="w-4 h-4" />
            </button>
            <p className="mt-5 text-xs text-[#6B6660]">No credit card required. Cancel anytime.</p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E5DF] py-10 text-center text-[#A09890] text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <LogoMark size="sm" />
            <span className="text-[#A09890]">© 2024</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#1C1917] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#1C1917] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#1C1917] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#1C1917] transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
