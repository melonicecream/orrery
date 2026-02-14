import { useState } from 'react'
import type { BirthInput, Gender } from '../core/types.ts'

interface Props {
  onSubmit: (input: BirthInput) => void
}

const now = new Date()
const currentYear = now.getFullYear()
const defaultYear = currentYear - 20

export default function BirthForm({ onSubmit }: Props) {
  const [year, setYear] = useState(defaultYear)
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [day, setDay] = useState(now.getDate())
  const [hour, setHour] = useState(now.getHours())
  const [minute, setMinute] = useState(now.getMinutes())
  const [gender, setGender] = useState<Gender>('M')
  const [unknownTime, setUnknownTime] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      year, month, day,
      hour: unknownTime ? 12 : hour,
      minute: unknownTime ? 0 : minute,
      gender,
      unknownTime,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-wrap items-end gap-3">
        {/* 년 */}
        <label className="flex flex-col text-xs text-gray-500">
          년
          <input
            type="number"
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            min={1900}
            max={currentYear}
            className="mt-1 w-20 px-2 py-1.5 border border-gray-300 rounded text-sm text-gray-800"
          />
        </label>

        {/* 월 */}
        <label className="flex flex-col text-xs text-gray-500">
          월
          <select
            value={month}
            onChange={e => setMonth(Number(e.target.value))}
            className="mt-1 w-16 px-2 py-1.5 border border-gray-300 rounded text-sm text-gray-800"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>

        {/* 일 */}
        <label className="flex flex-col text-xs text-gray-500">
          일
          <select
            value={day}
            onChange={e => setDay(Number(e.target.value))}
            className="mt-1 w-16 px-2 py-1.5 border border-gray-300 rounded text-sm text-gray-800"
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>

        <div className="w-px h-8 bg-gray-200" />

        {/* 시 */}
        <label className="flex flex-col text-xs text-gray-500">
          시
          <select
            value={hour}
            onChange={e => setHour(Number(e.target.value))}
            disabled={unknownTime}
            className="mt-1 w-16 px-2 py-1.5 border border-gray-300 rounded text-sm text-gray-800 disabled:opacity-40"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </label>

        {/* 분 */}
        <label className="flex flex-col text-xs text-gray-500">
          분
          <select
            value={minute}
            onChange={e => setMinute(Number(e.target.value))}
            disabled={unknownTime}
            className="mt-1 w-16 px-2 py-1.5 border border-gray-300 rounded text-sm text-gray-800 disabled:opacity-40"
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </label>

        <div className="w-px h-8 bg-gray-200" />

        {/* 성별 */}
        <div className="flex items-center gap-3 pb-0.5">
          <label className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio" name="gender" value="M"
              checked={gender === 'M'}
              onChange={() => setGender('M')}
              className="accent-gray-800"
            />
            남
          </label>
          <label className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio" name="gender" value="F"
              checked={gender === 'F'}
              onChange={() => setGender('F')}
              className="accent-gray-800"
            />
            여
          </label>
        </div>
      </div>

      {/* 시간 모름 + 계산 */}
      <div className="flex items-center justify-between mt-3">
        <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={unknownTime}
            onChange={e => setUnknownTime(e.target.checked)}
            className="accent-gray-800"
          />
          시간 모름
        </label>

        <button
          type="submit"
          className="px-4 py-1.5 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition-colors"
        >
          계산
        </button>
      </div>
    </form>
  )
}
