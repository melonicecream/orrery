import { STEM_INFO, ELEMENT_HANJA } from '../core/constants.ts'
import type { Element, RelationResult } from '../core/types.ts'

/** 천간의 오행 반환 */
export function stemElement(stem: string): Element | undefined {
  return STEM_INFO[stem]?.element
}

/** 오행에 대응하는 CSS 클래스 */
export function elementClass(element: Element | undefined): string {
  if (!element) return ''
  return `el-${element}`
}

/** 오행에 대응하는 배경 CSS 클래스 */
export function elementBgClass(element: Element | undefined): string {
  if (!element) return ''
  return `bg-el-${element}`
}

/** 천간에 대한 오행 색상 CSS 클래스 */
export function stemColorClass(stem: string): string {
  return elementClass(stemElement(stem))
}

/** 관계 결과를 문자열로 포맷 */
export function formatRelation(rel: RelationResult): string {
  if (rel.detail === null) return rel.type
  if (ELEMENT_HANJA[rel.detail]) return `${rel.type}${ELEMENT_HANJA[rel.detail]}`
  return `${rel.type}(${rel.detail})`
}

/** 2글자 한자 포맷 (1글자면 앞에 공백) */
export function fmt2(s: string): string {
  if (s.length === 1) return ` ${s} `
  return s
}
