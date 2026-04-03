import React, { useState } from 'react';
import { Play, Pause, Volume2, Bookmark, CheckCircle2, ChevronRight, MessageSquare, BookOpen, Ear, ArrowRight, RotateCcw, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C2A29] font-['Inter'] selection:bg-[#E27058] selection:text-white pb-24 relative overflow-hidden">
      
      {/* Subtle background grain */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E27058] flex items-center justify-center text-white font-bold font-['Playfair_Display'] italic">C</div>
          <span className="font-['Playfair_Display'] font-bold text-xl tracking-tight">ClipLingo</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-[#5C5856]">
          <a href="#" className="hover:text-[#2C2A29] transition-colors">Philosophy</a>
          <a href="#" className="hover:text-[#2C2A29] transition-colors">Library</a>
          <a href="#" className="hover:text-[#2C2A29] transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="font-medium text-[#2C2A29] hover:bg-[#F2EFE9] rounded-full px-6">Log in</Button>
          <Button className="bg-[#2C2A29] hover:bg-[#1A1918] text-white rounded-full px-6 font-medium shadow-sm">Start free</Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2EFE9] border border-[#E8E4DB] text-sm font-medium text-[#5C5856]">
              <span className="w-2 h-2 rounded-full bg-[#E27058] animate-pulse"></span>
              New: Conversational Nuance series
            </div>
            
            <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold leading-[1.05] tracking-tight text-[#1A1918]">
              Learn English <br/>
              <span className="relative inline-block">
                the way it's
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#E27058] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span> <br/>
              actually spoken.
            </h1>
            
            <p className="text-lg md:text-xl text-[#5C5856] leading-relaxed max-w-md font-light">
              Stop drilling textbook grammar. Absorb real phrases, slang, and cultural context from hand-picked YouTube clips with native speakers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-[#E27058] hover:bg-[#D15F43] text-white rounded-full px-8 py-6 text-lg font-medium shadow-[0_4px_14px_0_rgba(226,112,88,0.39)] transition-all hover:shadow-[0_6px_20px_rgba(226,112,88,0.23)] hover:-translate-y-0.5">
                Try a lesson
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 pt-8 text-sm text-[#827D79] font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#FDFBF7] bg-[#E8E4DB] flex items-center justify-center overflow-hidden`}>
                     <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=E8E4DB`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span>Join 12,000+ adult learners</span>
            </div>
          </div>
          
          <div className="relative">
            {/* Organic shape blob behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#F5EEDC] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10 blur-3xl opacity-60 mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
            
            <div className="relative rounded-2xl overflow-hidden border border-[#E8E4DB] shadow-2xl shadow-[#2C2A29]/5 bg-white p-2 md:p-4 rotate-1 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/__mockup/images/hero-illustration.png" 
                alt="ClipLingo Learning Experience" 
                className="w-full h-auto rounded-xl border border-[#F2EFE9]"
              />
              
              {/* Floating decorative elements */}
              <div className="absolute -right-6 -top-6 bg-white p-3 rounded-xl shadow-lg border border-[#E8E4DB] rotate-[6deg] animate-bounce" style={{ animationDuration: '3s' }}>
                <span className="font-['Playfair_Display'] italic text-[#E27058] font-bold text-lg">"Cut to the chase"</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature / Live Clip Demo Section */}
        <section className="py-24 border-t border-[#E8E4DB]/60 mt-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#1A1918]">Like having a native friend pause the video for you.</h2>
            <p className="text-[#5C5856] text-lg">We take real cultural moments and break them down so you understand the nuance, not just the vocabulary.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            
            {/* Left: Video Player Mock */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8E4DB] shadow-sm overflow-hidden p-2">
              <div className="aspect-video bg-[#1A1918] rounded-2xl relative group overflow-hidden">
                <img src="https://images.unsplash.com/photo-1516280440502-8eb47963286b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="Video frame" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-105"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </button>
                </div>
                
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-4 text-white">
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 h-full bg-[#E27058] w-1/3"></div>
                    </div>
                    <span className="text-xs font-medium font-mono">0:14 / 0:42</span>
                    <Volume2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              {/* Interaction Bar */}
              <div className="flex items-center justify-between p-4 border-b border-[#F2EFE9]">
                <div className="flex items-center gap-2 text-sm text-[#5C5856] font-medium">
                  <Badge variant="outline" className="bg-[#F2EFE9] text-[#2C2A29] border-transparent hover:bg-[#E8E4DB]">Idioms</Badge>
                  <Badge variant="outline" className="bg-[#F2EFE9] text-[#2C2A29] border-transparent hover:bg-[#E8E4DB]">Business</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-[#827D79] hover:text-[#2C2A29] transition-colors"><RotateCcw className="w-5 h-5" /></button>
                  <button className="text-[#827D79] hover:text-[#2C2A29] transition-colors"><Bookmark className="w-5 h-5" /></button>
                </div>
              </div>
              
              {/* Transcript Area */}
              <div className="p-6">
                <div className="flex gap-6 mb-6">
                  <button 
                    onClick={() => setActiveTab('transcript')}
                    className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'transcript' ? 'border-[#E27058] text-[#2C2A29]' : 'border-transparent text-[#827D79] hover:text-[#5C5856]'}`}
                  >
                    Transcript
                  </button>
                  <button 
                    onClick={() => setActiveTab('notes')}
                    className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'notes' ? 'border-[#E27058] text-[#2C2A29]' : 'border-transparent text-[#827D79] hover:text-[#5C5856]'}`}
                  >
                    Cultural Notes
                  </button>
                </div>
                
                {activeTab === 'transcript' ? (
                  <div className="space-y-4">
                    <p className="text-[#827D79] text-lg leading-relaxed font-light">
                      <span className="font-medium text-[#2C2A29] block mb-1 text-sm">Speaker 1</span>
                      So we've been going back and forth on these mockups for weeks now. I mean, I love the direction, but we're running out of time.
                    </p>
                    <p className="text-[#1A1918] text-lg leading-relaxed font-medium">
                      <span className="font-medium text-[#2C2A29] block mb-1 text-sm">Speaker 2</span>
                      Yeah, I agree. Let's just <span className="relative inline-block cursor-help group">
                        <span className="bg-[#FDE2CD] text-[#A6452B] px-1 rounded">cut to the chase</span>
                        <span className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-[#2C2A29] text-white text-sm rounded-lg shadow-xl z-20 font-normal">
                          <strong className="block mb-1 text-[#FDE2CD]">Idiom</strong>
                          To get directly to the point, leaving out unnecessary details.
                        </span>
                        <svg className="absolute w-full h-1 -bottom-1 left-0 text-[#E27058] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                          <path d="M0 5 Q 50 8 100 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                        </svg>
                      </span>. Are we launching this feature on Tuesday or not?
                    </p>
                    <p className="text-[#827D79] text-lg leading-relaxed font-light">
                      <span className="font-medium text-[#2C2A29] block mb-1 text-sm">Speaker 1</span>
                      I <span className="border-b border-dashed border-[#827D79] hover:border-[#2C2A29] hover:text-[#2C2A29] cursor-pointer transition-colors">reckon</span> we can, if engineering gets the staging environment stable today.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 text-[#5C5856]">
                    <div className="p-4 bg-[#F2EFE9] rounded-xl">
                      <h4 className="font-medium text-[#2C2A29] mb-1 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#E27058]" />
                        Workplace Directness
                      </h4>
                      <p className="text-sm">In American business culture, saying "let's cut to the chase" is acceptable when time is short, but it can sound abrupt. It's usually softened with "Yeah, I agree" or used among equals.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Learning Panel */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Context Card */}
              <div className="bg-[#2C2A29] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BookOpen className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <span className="text-[#E27058] font-['Playfair_Display'] italic text-lg mb-2 block">Key phrase</span>
                  <h3 className="text-2xl font-bold mb-4">Cut to the chase</h3>
                  <div className="flex items-center gap-3 mb-6">
                    <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Volume2 className="w-4 h-4 text-[#FDE2CD]" />
                    </button>
                    <span className="text-sm text-white/70 font-mono">/kʌt tə ðə tʃeɪs/</span>
                  </div>
                  
                  <p className="text-white/80 text-sm leading-relaxed mb-6 border-l-2 border-[#E27058] pl-4">
                    Originates from early silent films, when boring dialogue scenes would transition to an exciting chase scene.
                  </p>

                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-lg p-3 text-sm">
                      <strong className="text-white block mb-1">A native might say:</strong>
                      <span className="text-white/70 italic">"We only have 5 minutes, so let's cut to the chase."</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => toggleSaveWord('cut to the chase')}
                    className={`w-full mt-6 rounded-xl py-6 font-medium border-2 transition-all ${savedWords.includes('cut to the chase') ? 'bg-[#E27058] border-[#E27058] text-white' : 'bg-transparent border-white/20 hover:border-white/40 text-white'}`}
                  >
                    {savedWords.includes('cut to the chase') ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Saved to your deck
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-5 h-5 mr-2" />
                        Save to my vocab deck
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Mini Progress */}
              <div className="bg-white border border-[#E8E4DB] rounded-3xl p-6 shadow-sm">
                <h4 className="font-semibold text-[#2C2A29] mb-4">Today's Progress</h4>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-[#F2EFE9]" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-[#E27058]" strokeWidth="3" strokeDasharray="60, 100" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-sm font-bold text-[#2C2A29]">3/5</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2C2A29]">Idioms & Expressions</p>
                    <p className="text-xs text-[#827D79] mt-1">2 more phrases to reach your daily goal.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        
        {/* Method Section */}
        <section className="py-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#F8F6F1] p-8 rounded-3xl border border-[#E8E4DB]/50">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E4DB] shadow-sm flex items-center justify-center mb-6">
                <Ear className="w-6 h-6 text-[#E27058]" />
              </div>
              <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#1A1918] mb-3">Active Listening</h3>
              <p className="text-[#5C5856] text-sm leading-relaxed">Train your ear to catch linked words, dropped sounds, and natural pacing that textbooks ignore.</p>
            </div>
            
            <div className="bg-[#F8F6F1] p-8 rounded-3xl border border-[#E8E4DB]/50 relative">
              <div className="absolute top-4 right-4 text-[#E27058]">
                 <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                    <path d="M20 50 Q 50 10 80 50 T 20 50" stroke="currentColor" strokeWidth="4" fill="none"/>
                 </svg>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E4DB] shadow-sm flex items-center justify-center mb-6 relative z-10">
                <BookOpen className="w-6 h-6 text-[#E27058]" />
              </div>
              <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#1A1918] mb-3 relative z-10">Cultural Context</h3>
              <p className="text-[#5C5856] text-sm leading-relaxed relative z-10">Language is culture. Understand the humor, politeness levels, and unspoken rules behind the words.</p>
            </div>
            
            <div className="bg-[#F8F6F1] p-8 rounded-3xl border border-[#E8E4DB]/50">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E4DB] shadow-sm flex items-center justify-center mb-6">
                <RotateCcw className="w-6 h-6 text-[#E27058]" />
              </div>
              <h3 className="text-xl font-['Playfair_Display'] font-bold text-[#1A1918] mb-3">Spaced Repetition</h3>
              <p className="text-[#5C5856] text-sm leading-relaxed">Save phrases you want to use. We'll remind you to review them just before you're likely to forget.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 mb-12 relative overflow-hidden rounded-3xl bg-[#2C2A29] text-center px-6">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-white mb-6">Sound like yourself, in English.</h2>
            <p className="text-[#E8E4DB] text-lg mb-10 max-w-lg mx-auto font-light">
              Join thousands of learners who have ditched the textbook to learn real, conversational English.
            </p>
            <Button className="bg-[#E27058] hover:bg-[#D15F43] text-white rounded-full px-10 py-7 text-lg font-medium shadow-[0_4px_20px_0_rgba(226,112,88,0.4)] transition-transform hover:scale-105">
              Start learning for free
            </Button>
            <p className="mt-6 text-sm text-[#827D79]">No credit card required. Cancel anytime.</p>
          </div>
        </section>

      </main>
      
      {/* Simple Footer */}
      <footer className="border-t border-[#E8E4DB] py-12 text-center text-[#827D79] text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <div className="w-6 h-6 rounded-full bg-[#E8E4DB] flex items-center justify-center text-[#2C2A29] font-bold font-['Playfair_Display'] italic text-xs">C</div>
             <span className="font-['Playfair_Display'] font-bold text-[#2C2A29]">ClipLingo</span>
             <span className="ml-2">© 2024</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#2C2A29] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#2C2A29] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#2C2A29] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#2C2A29] transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
