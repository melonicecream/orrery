import type { ZiweiChart } from '../../core/types.ts'
import { PALACE_NAMES, MAIN_STAR_NAMES, LUCKY_STAR_NAMES, SHA_STAR_NAMES } from '../../core/constants.ts'

interface Props {
  chart: ZiweiChart
}

function siHuaColor(siHua: string): string {
  switch (siHua) {
    case '化祿': return 'text-green-600'
    case '化權': return 'text-yellow-600'
    case '化科': return 'text-blue-600'
    case '化忌': return 'text-red-600'
    default: return ''
  }
}

function brightnessColor(b: string): string {
  if (b === '廟' || b === '旺') return 'text-green-600'
  if (b === '陷') return 'text-red-500'
  return 'text-gray-500'
}

export default function PalaceList({ chart }: Props) {
  return (
    <section>
      <h3 className="text-sm font-medium text-gray-700 mb-2">十二宮</h3>
      <div className="space-y-2">
        {PALACE_NAMES.map(palaceName => {
          const palace = chart.palaces[palaceName]
          if (!palace) return null

          const mainStars = palace.stars.filter(s => MAIN_STAR_NAMES.has(s.name))
          const luckyStars = palace.stars.filter(s => LUCKY_STAR_NAMES.has(s.name))
          const shaStars = palace.stars.filter(s => SHA_STAR_NAMES.has(s.name))

          return (
            <div key={palaceName} className="text-sm">
              <div className="flex items-baseline gap-2">
                <span className="text-gray-800 font-medium w-10">{palace.name}</span>
                {palace.isShenGong && (
                  <span className="text-xs text-purple-600">·身</span>
                )}
                <span className="text-gray-400 text-xs font-hanja">{palace.ganZhi}</span>
                <span className="flex-1">
                  {mainStars.length > 0 ? (
                    mainStars.map((s, i) => (
                      <span key={s.name}>
                        {i > 0 && <span className="text-gray-300 mx-1">·</span>}
                        <span className="font-hanja">{s.name}</span>
                        {s.brightness && (
                          <span className={`text-xs ml-0.5 ${brightnessColor(s.brightness)}`}>
                            {s.brightness}
                          </span>
                        )}
                        {s.siHua && (
                          <span className={`text-xs ml-0.5 ${siHuaColor(s.siHua)}`}>
                            {s.siHua}
                          </span>
                        )}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">(空宮)</span>
                  )}
                </span>
              </div>

              {/* 보성/살성 */}
              {(luckyStars.length > 0 || shaStars.length > 0) && (
                <div className="ml-12 text-xs mt-0.5">
                  {luckyStars.length > 0 && (
                    <span className="text-green-600">
                      {luckyStars.map(s => s.name).join(' ')}
                    </span>
                  )}
                  {luckyStars.length > 0 && shaStars.length > 0 && (
                    <span className="text-gray-300 mx-1">|</span>
                  )}
                  {shaStars.length > 0 && (
                    <span className="text-red-500">
                      {shaStars.map(s => s.name).join(' ')}
                    </span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
