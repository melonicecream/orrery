/**
 * Orrery API Server
 * 
 * This file is part of the modified Orrery project.
 * Added on: 2026-02-21
 * Description: Bun-based HTTP API server for remote calculation.
 * License: AGPL-3.0 (inherited from Orrery)
 */

import { calculateSaju } from '@orrery/core/saju'
import { createChart } from '@orrery/core/ziwei'
import { calculateNatal } from '@orrery/core/natal'
import { encode } from '@toon-format/toon'
import type { BirthInput } from '@orrery/core/types'

const PORT = process.env.PORT || 13000;

Bun.serve({
  port: PORT,
  async fetch(req) {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      });
    }

    if (req.method !== "POST") {
      return new Response("Only POST requests are allowed", { status: 405 });
    }

    try {
      const body = await req.json() as { input: BirthInput };
      const input = body.input;

      if (!input || !input.year) {
        return new Response("Invalid input", { status: 400 });
      }

      // 1. 계산 수행 (Raw JSON 데이터 생성)
      const saju = calculateSaju(input);
      
      let ziwei = null;
      if (!input.unknownTime) {
        ziwei = createChart(
          input.year, input.month, input.day, 
          input.hour, input.minute, input.gender === 'M'
        );
      }

      const natal = await calculateNatal(input);

      // 2. 결과 데이터 통합
      const fullData = {
        saju,
        ziwei,
        natal
      };

      // 3. TOON 포맷으로 변환 (LLM 최적화)
      const toonString = encode(fullData);

      return Response.json({
        success: true,
        data: {
          text: toonString, // TOON 포맷 텍스트 (LLM용)
          rawJson: fullData // 원본 JSON (Frontend 시각화용)
        }
      }, {
        headers: { "Access-Control-Allow-Origin": "*" }
      });

    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ success: false, error: String(error) }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  },
});

console.log(`🔮 Orrery API Server running on port ${PORT}`);
