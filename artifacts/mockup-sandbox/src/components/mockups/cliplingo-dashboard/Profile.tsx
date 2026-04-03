import React from 'react';
import { AppShell } from './_shared/AppShell';
import { Settings, Flame, Trophy, Bookmark, PlayCircle, Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function Profile() {
  const stats = [
    { label: 'Learning Streak', value: '34 Days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100' },
    { label: 'Clips Studied', value: '128', icon: PlayCircle, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'Words Saved', value: '452', icon: Bookmark, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { label: 'Current Level', value: 'B2 Upper', icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-100' },
  ];

  const weeklyActivity = [
    { day: 'Mon', height: '40%' },
    { day: 'Tue', height: '70%' },
    { day: 'Wed', height: '100%' },
    { day: 'Thu', height: '30%' },
    { day: 'Fri', height: '85%' },
    { day: 'Sat', height: '60%' },
    { day: 'Sun', height: '50%' },
  ];

  const savedWords = [
    { word: 'Cut to the chase', type: 'Idiom', added: '2 days ago' },
    { word: 'Reckon', type: 'Verb', added: '4 days ago' },
    { word: 'Throw under the bus', type: 'Idiom', added: '1 week ago' },
    { word: 'Nuance', type: 'Noun', added: '1 week ago' },
    { word: 'Elephant in the room', type: 'Idiom', added: '2 weeks ago' },
  ];

  return (
    <AppShell activePage="profile">
      <div className="max-w-5xl mx-auto px-8 py-12">
        
        {/* Header Profile Area */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=F2EFE9" />
                <AvatarFallback>FL</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-[#E27058] text-white text-xs font-bold px-2 py-1 rounded-lg border-2 border-white flex items-center gap-1 shadow-sm">
                <Award className="w-3 h-3" />
                Lvl 12
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#1A1918] mb-1">Felix L.</h1>
              <p className="text-[#5C5856]">Joined March 2024 • Native Language: German</p>
            </div>
          </div>
          
          <Button variant="outline" className="rounded-full border-[#E8E4DB] text-[#2C2A29] hover:bg-[#F2EFE9]">
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stats & Chart */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-[#E8E4DB] shadow-sm flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className="text-2xl font-bold text-[#2C2A29] mb-1">{stat.value}</span>
                    <span className="text-xs font-medium text-[#827D79] uppercase tracking-wider">{stat.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Activity Chart */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8E4DB] shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#2C2A29]">Weekly Activity</h3>
                <span className="text-sm font-medium text-[#827D79]">2.5 hrs this week</span>
              </div>
              
              <div className="h-48 flex items-end justify-between gap-2 px-2">
                {weeklyActivity.map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 w-full group">
                    <div className="w-full bg-[#F2EFE9] rounded-t-sm rounded-b-sm h-full relative overflow-hidden flex items-end">
                      <div 
                        className="w-full bg-[#E27058] rounded-t-sm transition-all duration-500 ease-out group-hover:bg-[#D15F43]" 
                        style={{ height: day.height }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-[#827D79]">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Saved Words */}
          <div className="lg:col-span-1">
            <div className="bg-[#F8F6F1] rounded-2xl border border-[#E8E4DB] p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#2C2A29]">Recent Words</h3>
                <button className="text-sm font-medium text-[#E27058] hover:text-[#D15F43]">View all</button>
              </div>

              <div className="space-y-3">
                {savedWords.map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-[#E8E4DB]/60 hover:border-[#E27058]/50 transition-colors shadow-sm group cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-[#2C2A29] group-hover:text-[#E27058] transition-colors">{item.word}</span>
                      <Bookmark className="w-4 h-4 text-[#827D79] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-0.5 bg-[#F2EFE9] text-[#5C5856] rounded">{item.type}</span>
                      <span className="text-xs text-[#827D79]">{item.added}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-6 bg-[#2C2A29] hover:bg-[#1A1918] text-white rounded-xl">
                Review Deck Now
              </Button>
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
