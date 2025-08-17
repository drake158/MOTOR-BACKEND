import { Injectable } from '@nestjs/common';

@Injectable()
export class InspirationService {
  // Genera resultados simulados
  getResults(
    type: 'images' | 'phrases' | 'videos',
    tokens: string[],
  ): any[] {
    const seed = (i: number) => encodeURIComponent(tokens[i % tokens.length] || `seed-${i}`);

    if (type === 'images') {
      // Imágenes de placeholder (picsum) con seed reproducible
      return Array.from({ length: 12 }).map((_, i) => ({
        title: `Imagen ${i + 1} - ${tokens.join(' ')}`.trim(),
        url: `https://picsum.photos/seed/${seed(i)}/${400 + (i % 3) * 40}/${300 + (i % 2) * 30}`,
      }));
    }

    if (type === 'videos') {
      return Array.from({ length: 8 }).map((_, i) => ({
        title: `Video ${i + 1} sobre ${tokens.join(', ')}`.trim() || `Video ${i + 1}`,
        url: `https://example.com/video/${seed(i)}`,
      }));
    }

    // phrases
    return Array.from({ length: 10 }).map((_, i) => ({
      text:
        tokens.length > 0
          ? `«${tokens.join(' · ')}» — inspiración #${i + 1}`
          : `Frase inspiradora #${i + 1}`,
    }));
  }
}
