// twin.macro.js (또는 twin.macro.ts)
import 'twin.macro'

// customColors 클래스를 확장한 tailwind CSS 클래스 설정
tw.config({
    theme: {
        extend: {
            colors: {
                ...tw.theme('customColors'),
            },
        },
    },
})
