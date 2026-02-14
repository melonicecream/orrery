import type { DaewoonItem } from '../../core/types.ts'
import { stemColorClass } from '../../utils/format.ts'

interface Props {
  daewoon: DaewoonItem[]
}

export default function DaewoonTable({ daewoon }: Props) {
  if (daewoon.length === 0) {
    return (
      <section>
        <h3 className="text-sm font-medium text-gray-700 mb-2">大運</h3>
        <p className="text-sm text-gray-400">대운 계산에는 출생 시간이 필요합니다.</p>
      </section>
    )
  }

  return (
    <section>
      <h3 className="text-sm font-medium text-gray-700 mb-2">大運</h3>
      <div className="space-y-0.5">
        {daewoon.map(dw => (
          <div key={dw.index} className="flex items-center text-sm text-gray-600 gap-3">
            <span className="text-gray-400 w-8 text-right">{dw.index}運</span>
            <span className="text-gray-400 w-10 text-right">({dw.age}세)</span>
            <span className="w-10 text-center">{dw.stemSipsin}</span>
            <span className={`font-hanja text-base ${stemColorClass(dw.ganzi[0])}`}>
              {dw.ganzi}
            </span>
            <span className="w-10 text-center">{dw.branchSipsin}</span>
            <span className="text-gray-400 text-xs">({dw.startDate.getFullYear()}年)</span>
          </div>
        ))}
      </div>
    </section>
  )
}
