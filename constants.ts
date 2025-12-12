import { PhotoStyle } from './types';

export const PHOTO_STYLES: PhotoStyle[] = [
  {
    id: 'id_white_bg',
    title: '标准证件照 (白底)',
    description: 'Professional Frontal ID (White BG)',
    prompt: 'Generate a high-quality professional standard ID photo with a pure white background. Frontal view: Body and face must be facing directly forward (shoulders square to camera). Wear formal professional business attire. CRITICAL: Strictly preserve the original facial features and identity; ensure high clarity and sharpness. Even studio lighting. Pure white background.',
  },
  {
    id: 'professional',
    title: '职业肖像照 (蓝底)',
    description: 'Professional Business Portrait (Blue BG)',
    prompt: 'Generate a standard professional ID photo with a clean blue background. Frontal view: Body and face must be facing directly forward (shoulders square to camera). Wear formal professional business attire (suit and tie). CRITICAL: Strictly maintain the original facial features and reality of the person. High resolution, sharp focus. Even studio lighting. Solid professional blue background.',
  },
  {
    id: 'id_slight_side_dark_tie',
    title: '职业证件照 (微侧/深领带)',
    description: 'Professional ID (Slight Side, Dark Tie)',
    prompt: 'Generate a formal professional ID photo. Pose: Body slightly turned to the side (approx 15-30 degrees), with face looking directly at the camera. Attire: Formal dark business suit with a dark tie. CRITICAL: Strictly preserve the original facial features and identity. Background: Clean, solid professional background (light gray or white). Even studio lighting. High realism.',
  },
  {
    id: 'professional_side',
    title: '侧身职业形象照',
    description: 'Corporate Side-Angle Portrait',
    prompt: 'Generate a premium corporate headshot. Pose: Body turned 45 degrees to the side (three-quarter view), with the face turned to look directly at the camera. Expression: Confident, professional, and approachable. Attire: High-end tailored business suit. Background: Neutral dark grey or premium gradient studio background. Lighting: Professional cinematic studio lighting with rim light to separate subject from background. High sharpness.',
  },
  {
    id: 'fashion',
    title: '时尚写真',
    description: 'High Fashion Editorial',
    prompt: 'Generate a high-fashion editorial photograph based on this person. Trendy, stylish outfit. Dynamic and confident pose. Vogue magazine aesthetic. Artistic lighting, maybe some dramatic shadows. Stylish background. High aesthetic value.',
  },
  {
    id: 'gallery',
    title: '美术馆迷失的她',
    description: 'Lost in the Art Gallery',
    prompt: 'Generate an artistic candid shot of this person wandering in a modern art gallery. Looking at abstract paintings. Soft, slightly blurred background of art pieces. Ambient, museum lighting. Emotional, contemplative atmosphere. "Lost in art" vibe.',
  },
  {
    id: 'chinese_art',
    title: '中式美学艺术照',
    description: 'New Chinese Aesthetic',
    prompt: 'Generate a portrait with "New Chinese" aesthetic (Neo-Chinese style). Traditional oriental elements mixed with modern fashion. Elegant, serene expression. Soft, poetic lighting. Subtle textures like silk or bamboo in the background. High-class oriental beauty.',
  },
  {
    id: 'magazine',
    title: '美式杂志封面',
    description: 'American Lifestyle Magazine',
    prompt: 'Generate a lifestyle magazine cover shot. American casual style (like Gap or Ralph Lauren ads). Bright, vibrant colors. Confident, big smile. Outdoor sunny background or colorful studio backdrop. Bold, energetic atmosphere.',
  },
  {
    id: 'cinematic',
    title: '电影肖像',
    description: 'Cinematic Movie Still',
    prompt: 'Generate a cinematic film portrait. Dramatic lighting (chiaroscuro). Shallow depth of field (bokeh). Movie scene look. Color graded teal and orange or moody warm tones. 35mm film grain texture. Emotional close-up.',
  },
];

// Using "nano banana" equivalent model as per instructions
export const MODEL_NAME = 'gemini-2.5-flash-image';