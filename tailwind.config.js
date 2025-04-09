/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        //# backgrounds
        primary: '#F02C56',
        primary_hover: '#ffeef2',
        gray_bg: '#F1F1F2',
        primary_hover_bg: '#e52c54',
        gray_hover_bg: '#f3f4f6',
        error: '#ef4444',
        success: '#04a777',

        //# fonts
        black_font: "#000000",
        gray_font: '#A1A2A7',

        //# borders
        gray_border: '#d1d5db',

        //# placeholder
        gray_placeholder: '#838383',

        //# following
        account_mark: '#58D5EC'
      },
      fontSize: {
        normal: '15px',
        small: '13px',
        s_small: '11px'
      }
    },
  },
}

