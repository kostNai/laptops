import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            colors: {
                'body-bg': '#eeeeee',
                'header-bg': '#001E28',
                'text-dark': '#1B3841',
                'bg-btn': '#ffce00',
                'bg-btn-hover': '#F94E4E',
                'link-hover-color': '#8177FF',
                'admin-page-bg': '#F1F4FA',
                'admin-text': '#9BA1AA'
            }
        }
    },
    plugins: []
}
export default config
