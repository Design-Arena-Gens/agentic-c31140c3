'use client'

import { useState, useEffect } from 'react'

interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  quarter: string
  time: string
  status: 'live' | 'final' | 'upcoming'
}

interface Team {
  name: string
  record: string
  logo: string
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'scores' | 'standings'>('scores')
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const todayGames: Game[] = [
      {
        id: '1',
        homeTeam: 'Lakers',
        awayTeam: 'Warriors',
        homeScore: 98,
        awayScore: 102,
        quarter: 'Q4',
        time: '2:34',
        status: 'live'
      },
      {
        id: '2',
        homeTeam: 'Celtics',
        awayTeam: 'Heat',
        homeScore: 115,
        awayScore: 108,
        quarter: 'Final',
        time: '',
        status: 'final'
      },
      {
        id: '3',
        homeTeam: 'Bucks',
        awayTeam: 'Nets',
        homeScore: 0,
        awayScore: 0,
        quarter: '',
        time: '7:30 PM ET',
        status: 'upcoming'
      },
      {
        id: '4',
        homeTeam: 'Nuggets',
        awayTeam: 'Suns',
        homeScore: 89,
        awayScore: 87,
        quarter: 'Q3',
        time: '5:12',
        status: 'live'
      },
      {
        id: '5',
        homeTeam: 'Mavericks',
        awayTeam: 'Clippers',
        homeScore: 0,
        awayScore: 0,
        quarter: '',
        time: '8:00 PM ET',
        status: 'upcoming'
      },
      {
        id: '6',
        homeTeam: '76ers',
        awayTeam: 'Knicks',
        homeScore: 112,
        awayScore: 119,
        quarter: 'Final',
        time: '',
        status: 'final'
      },
    ]
    setGames(todayGames)

    const interval = setInterval(() => {
      setGames(prev => prev.map(game => {
        if (game.status === 'live') {
          const shouldUpdate = Math.random() > 0.5
          if (shouldUpdate) {
            return {
              ...game,
              homeScore: game.homeScore + Math.floor(Math.random() * 3),
              awayScore: game.awayScore + Math.floor(Math.random() * 3),
            }
          }
        }
        return game
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const teams: Team[] = [
    { name: 'Celtics', record: '42-17', logo: '🍀' },
    { name: 'Bucks', record: '40-19', logo: '🦌' },
    { name: 'Nuggets', record: '41-18', logo: '⛏️' },
    { name: 'Lakers', record: '38-21', logo: '💜' },
    { name: 'Warriors', record: '35-24', logo: '🌉' },
    { name: '76ers', record: '37-22', logo: '🔔' },
    { name: 'Suns', record: '36-23', logo: '☀️' },
    { name: 'Heat', record: '34-25', logo: '🔥' },
    { name: 'Mavericks', record: '35-24', logo: '🐴' },
    { name: 'Knicks', record: '33-26', logo: '🗽' },
    { name: 'Clippers', record: '32-27', logo: '⛵' },
    { name: 'Nets', record: '31-28', logo: '🏀' },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            🏀 NBA Game Center
          </h1>
          <p className="text-blue-200 text-lg">Live Scores & Standings</p>
        </header>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('scores')}
            className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
              activeTab === 'scores'
                ? 'bg-white text-blue-900 shadow-lg'
                : 'bg-blue-800 text-white hover:bg-blue-700'
            }`}
          >
            Live Scores
          </button>
          <button
            onClick={() => setActiveTab('standings')}
            className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
              activeTab === 'standings'
                ? 'bg-white text-blue-900 shadow-lg'
                : 'bg-blue-800 text-white hover:bg-blue-700'
            }`}
          >
            Standings
          </button>
        </div>

        {activeTab === 'scores' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map(game => (
              <div
                key={game.id}
                className="bg-white rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-transform"
              >
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      game.status === 'live'
                        ? 'bg-red-500 text-white animate-pulse'
                        : game.status === 'final'
                        ? 'bg-gray-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {game.status === 'live' ? `🔴 ${game.quarter} ${game.time}` : game.status === 'final' ? 'Final' : game.time}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">
                      {game.awayTeam}
                    </span>
                    <span className="text-3xl font-bold text-gray-900">
                      {game.status !== 'upcoming' ? game.awayScore : '-'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">
                      {game.homeTeam}
                    </span>
                    <span className="text-3xl font-bold text-gray-900">
                      {game.status !== 'upcoming' ? game.homeScore : '-'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Team</th>
                    <th className="px-6 py-4 text-center text-sm font-bold">Record</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr
                      key={team.name}
                      className={`border-b hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-4 text-gray-900 font-semibold">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{team.logo}</span>
                          <span className="text-gray-900 font-semibold">
                            {team.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-900 font-semibold">
                        {team.record}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center text-blue-200 text-sm">
          <p>Live scores update every few seconds • Standings as of Feb 2026</p>
        </footer>
      </div>
    </div>
  )
}
