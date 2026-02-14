import { useMemo } from 'react'
import { createChart } from '../../core/ziwei.ts'
import PalaceList from './PalaceList.tsx'
import SihuaSummary from './SihuaSummary.tsx'
import DaxianTable from './DaxianTable.tsx'
import LiunianView from './LiunianView.tsx'
import CopyButton from '../CopyButton.tsx'
import { ziweiToText } from '../../utils/text-export.ts'
import type { BirthInput } from '../../core/types.ts'

interface Props {
  input: BirthInput
}

export default function ZiweiView({ input }: Props) {
  if (input.unknownTime) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800 font-medium">
          자미두수는 출생 시간이 필수입니다.
        </p>
        <p className="text-sm text-amber-600 mt-1">
          시간에 따라 명반 전체 구조가 바뀝니다. 출생 시간을 입력해주세요.
        </p>
      </div>
    )
  }

  const chart = useMemo(
    () => createChart(input.year, input.month, input.day, input.hour, input.minute, input.gender === 'M'),
    [input],
  )

  const genderChar = input.gender === 'M' ? '男' : '女'

  // 신궁 궁명
  let shenPalaceName = ''
  for (const p of Object.values(chart.palaces)) {
    if (p.isShenGong) { shenPalaceName = p.name; break }
  }

  return (
    <div className="space-y-6">
      {/* 기본 정보 */}
      <section className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-700">紫微斗數 命盤</h2>
          <CopyButton getText={() => ziweiToText(chart)} />
        </div>

        <div className="space-y-0.5 text-sm text-gray-600">
          <div>
            <span className="text-gray-400">陽曆:</span>{' '}
            {chart.solarYear}年 {chart.solarMonth}月 {chart.solarDay}日 {chart.hour}時 {chart.minute}分
          </div>
          <div>
            <span className="text-gray-400">陰曆:</span>{' '}
            {chart.lunarYear}年 {chart.lunarMonth}月 {chart.lunarDay}日
            {chart.isLeapMonth && <span className="text-orange-600 ml-1">(閏月)</span>}
          </div>
          <div>
            <span className="text-gray-400">性別:</span> {genderChar}
          </div>
          <div className="pt-1">
            <span className="text-gray-400">年柱:</span>{' '}
            <span className="font-hanja">{chart.yearGan}{chart.yearZhi}</span>
          </div>
          <div>
            <span className="text-gray-400">命宮:</span>{' '}
            <span className="font-hanja">{chart.palaces['命宮']?.ganZhi}</span>
          </div>
          <div>
            <span className="text-gray-400">身宮:</span>{' '}
            {shenPalaceName} (<span className="font-hanja">{chart.shenGongZhi}</span>)
          </div>
          <div>
            <span className="text-gray-400">五行局:</span> {chart.wuXingJu.name}
          </div>
          <div>
            <span className="text-gray-400">大限起始:</span> {chart.daXianStartAge}歲
          </div>
        </div>
      </section>

      {/* 12궁 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <PalaceList chart={chart} />
      </div>

      {/* 사화 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <SihuaSummary chart={chart} />
      </div>

      {/* 대한 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <DaxianTable chart={chart} />
      </div>

      {/* 유년 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <LiunianView chart={chart} />
      </div>
    </div>
  )
}
