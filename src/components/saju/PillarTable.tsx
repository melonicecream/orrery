import type { PillarDetail } from '../../core/types.ts'
import { stemColorClass } from '../../utils/format.ts'
import { STEM_INFO } from '../../core/constants.ts'

interface Props {
  pillars: PillarDetail[]  // [시, 일, 월, 년]
  unknownTime?: boolean
}

const BRANCH_ELEMENT: Record<string, string> = {
  '寅': 'tree', '卯': 'tree',
  '巳': 'fire', '午': 'fire',
  '辰': 'earth', '未': 'earth', '丑': 'earth', '戌': 'earth',
  '申': 'metal', '酉': 'metal',
  '子': 'water', '亥': 'water',
}

function branchColorClass(branch: string): string {
  const el = BRANCH_ELEMENT[branch]
  return el ? `el-${el}` : ''
}

export default function PillarTable({ pillars, unknownTime }: Props) {
  // unknownTime이면 시주 숨김
  const displayPillars = unknownTime ? pillars.slice(1) : pillars
  const labels = unknownTime ? ['日柱', '月柱', '年柱'] : ['時柱', '日柱', '月柱', '年柱']

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center text-sm">
        <thead>
          <tr className="text-xs text-gray-500">
            <td className="py-1 pr-2 text-right w-12"></td>
            {labels.map(label => (
              <th key={label} className="py-1 px-3 font-normal">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="font-hanja">
          {/* 천간 십신 */}
          <tr className="text-xs text-gray-600">
            <td className="pr-2 text-right text-gray-400">십신</td>
            {displayPillars.map((p, i) => (
              <td key={i} className="py-0.5 px-3">{p.stemSipsin}</td>
            ))}
          </tr>

          {/* 천간 */}
          <tr className="text-2xl">
            <td className="pr-2 text-right text-xs text-gray-400">천간</td>
            {displayPillars.map((p, i) => (
              <td key={i} className={`py-1 px-3 ${stemColorClass(p.pillar.stem)}`}>
                {p.pillar.stem}
              </td>
            ))}
          </tr>

          {/* 지지 */}
          <tr className="text-2xl">
            <td className="pr-2 text-right text-xs text-gray-400">지지</td>
            {displayPillars.map((p, i) => (
              <td key={i} className={`py-1 px-3 ${branchColorClass(p.pillar.branch)}`}>
                {p.pillar.branch}
              </td>
            ))}
          </tr>

          {/* 지지 십신 */}
          <tr className="text-xs text-gray-600">
            <td className="pr-2 text-right text-gray-400">십신</td>
            {displayPillars.map((p, i) => (
              <td key={i} className="py-0.5 px-3">{p.branchSipsin}</td>
            ))}
          </tr>

          {/* 구분선 */}
          <tr>
            <td colSpan={labels.length + 1} className="py-1">
              <div className="border-t border-gray-200" />
            </td>
          </tr>

          {/* 운성 */}
          <tr className="text-xs text-gray-600">
            <td className="pr-2 text-right text-gray-400">운성</td>
            {displayPillars.map((p, i) => (
              <td key={i} className="py-0.5 px-3">{p.unseong}</td>
            ))}
          </tr>

          {/* 지장간 */}
          <tr className="text-xs text-gray-500">
            <td className="pr-2 text-right text-gray-400">장간</td>
            {displayPillars.map((p, i) => (
              <td key={i} className="py-0.5 px-3 tracking-wider">{p.jigang}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
