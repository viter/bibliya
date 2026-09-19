import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const OG_SIZE = { width: 1200, height: 630 };

const evangelieFont = await readFile(join(process.cwd(), 'src/lib/fonts/Evangelie.ttf'));

export function renderOgImage(title: string, subtitle: string): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#faf6ee',
          color: '#3b2a1a',
          fontFamily: 'Evangelie',
          textAlign: 'center',
          padding: 80,
        }}
      >
        <div style={{ fontSize: 110, lineHeight: 1.15 }}>{title}</div>
        <div style={{ fontSize: 44, marginTop: 32, color: '#8a6a3f' }}>{subtitle}</div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: 'Evangelie', data: evangelieFont, style: 'normal', weight: 400 }],
    },
  );
}
