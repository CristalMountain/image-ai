import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateDescription(file: any): Promise<string> {
    const base64Image = file.buffer.toString('base64');
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        store: true,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: "What's in this image?" },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
      });

      return (
        response.choices[0].message?.content || 'No description available.'
      );
    } catch (error) {
      console.error('Error generating description:', error);
      throw new Error('Failed to generate image description.');
    }
  }
}
