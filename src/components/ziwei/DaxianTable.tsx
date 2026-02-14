import type { ZiweiChart } from '../../core/types.ts'
import { getDaxianList } from '../../core/ziwei.ts'

interface Props {
  chart: ZiweiChart
}

export default function DaxianTable({ chart }: Props) {
  const daxianList = getDaxianList(chart)

  return (
    <section>
      <h3 className="text-sm font-medium text-gray-700 mb-2">大限</h3>
      <div className="space-y-0.5">
        {daxianList.map((dx, i) => (
          <div key={i} className="flex items-center text-sm text-gray-600 gap-3">
            <span className="text-gray-400 w-14 text-right">
              {dx.ageStart}-{dx.ageEnd}歲
            </span>
            <span className="w-10">{dx.palaceName}</span>
            <span className="font-hanja text-gray-500 w-6">{dx.ganZhi}</span>
            <span className="text-gray-500">
              {dx.mainStars.length > 0
                ? dx.mainStars.join(', ')
                : <span className="text-gray-400">(空宮)</span>
              }
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
