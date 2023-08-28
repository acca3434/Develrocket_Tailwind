---
해당 README.md는 개인적인 이해를 돕기 위한 문서이므로 정확한 답이 아닙니다. 정확한 답을 원하신다면 직접 찾으세영
---

# Twin.Macro

Twin.Macro라는 라이브러리는 기본적으로 Tailwind CSS에 유연함을 추가해주는 라이브러리입니다. tailwind 라이브러리만 사용한다면 HTML 요소에 스타일을 명시하는 방법이 다음 두 가지로 제한됩니다.

1.  class 속성에 tailwind 문법 사용하기
2.  style 속성에 인라인 스타일 명시하기

tailwind만으로는 스타일 처리가 까다로운 순간이 종종 옵니다. 예를 들어, 다음과 같이 div의 width 및 height를 외부로부터 주입받는 컴포넌트가 존재한다고 가정해봅시다.

```tsx
function ExampleDiv({ width, height }) {
    return <div>안녕하세요</div>
}
```

div 요소에 인자로 받은 width와 height를 스타일로 넣어주고 싶은데, tailwind로는 외부에서 전달해준 가변적인 인자를 div의 스타일로 주입해줄 방법이 없습니다. tailwind는 유틸리티에 임의 값을 넣을 수 있는 Arbitrary value support라는 기능을 제공하지만, 20px과 같은 단위를 직접 넣을 수 있을 뿐 다음과 같이 변수를 넣어줄 수는 없습니다.

```jsx
function ExampleDiv({ width, height }) {
  return <div class=`bg-black	w-[${width}px] h-[${height}px]`>안녕하세요</div>;
}
```

이런 경우에는 인라인 스타일 이외의 선택지가 없기 때문에 울며 겨자 먹기로 인라인 스타일을 사용해야 하지만, 요소 자체에 스타일이 노출되는 인라인 스타일의 사용은 최대한 배제하고 싶습니다. 이럴 때면 떠나보낸 Emotion CSS가 사무치게 그리워집니다.

Twin.Macro는 우리가 쫒아낸 Emotion CSS를 다시 데려와, Tailwind CSS와 ‘함께’ 사용할 수 있게 만들어줍니다. 즉, Tailwind CSS와 Emotion CSS를 동시에 ‘유연하게’ 사용할 수 있게 해줍니다.

```jsx
import tw from 'twin.macro'

function ExampleDiv({ width, height }) {
    return (
        <div
            css={[
                tw`bg-black`,
                {
                    width: width,
                    height: height,
                },
            ]}
        >
            안녕하세요
        </div>
    )
}
```

Twin.Macro는 이렇게 tailwind와 Emotion CSS를 함께 사용할 수 있는 방법을 제공해줌으로써, 개발자가 상황에 따라 최적의 방법을 선택해 디자인 코드를 작성할 수 있도록 도와줍니다. Twin.Macro는 또한 스타일 우선순위 문제를 해결해주는 등 개발할 때 불필요하게 신경 쓸 부분을 줄여주는 기능들도 제공해주기 때문에 사용하지 않을 이유가 없다고 판단.

## twin.macro 설정

### package.json

```json
    "babelMacros": {
        "twin": {
            "preset": "styled-components"
        }
    }
```

### withTwin.js

```javascript
const path = require('path')
const includedDirs = [path.resolve(__dirname, 'src')]

module.exports = function withTwin(nextConfig) {
    return {
        ...nextConfig,
        webpack(config, options) {
            const { dev, isServer } = options
            const patchedDefaultLoaders = options.defaultLoaders.babel
            patchedDefaultLoaders.options.hasServerComponents = false
            patchedDefaultLoaders.options.hasReactRefresh = false

            config.module = config.module || {}
            config.module.rules = config.module.rules || []
            config.module.rules.push({
                test: /\.(tsx|ts)$/,
                include: includedDirs,
                use: [
                    patchedDefaultLoaders,
                    {
                        loader: 'babel-loader',
                        options: {
                            sourceMaps: dev,
                            plugins: [
                                require.resolve('babel-plugin-macros'),
                                [require.resolve('babel-plugin-styled-components'), { ssr: true, displayName: true }],
                                [require.resolve('@babel/plugin-syntax-typescript'), { isTSX: true }],
                            ],
                        },
                    },
                ],
            })

            if (!isServer) {
                config.resolve.fallback = {
                    ...(config.resolve.fallback || {}),
                    fs: false,
                    module: false,
                    path: false,
                    os: false,
                    crypto: false,
                }
            }

            if (typeof nextConfig.webpack === 'function') {
                return nextConfig.webpack(config, options)
            } else {
                return config
            }
        },
    }
}
```

### next.config.js

```javascript
// next.config.js
const withTwin = require('./withTwin.js')

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
    reactStrictMode: true,
})
```

### twin.macro 설정(twin.d.ts)

```typescript
import 'twin.macro'
import styledImport, { CSSProp, css as cssImport } from 'styled-components'

declare module 'twin.macro' {
    // The styled and css imports
    const styled: typeof styledImport
    const css: typeof cssImport
}

declare module 'react' {
    // The css prop
    interface HTMLAttributes<T> extends DOMAttributes<T> {
        css?: CSSProp
        tw?: string
    }
    // The inline svg css prop
    interface SVGProps<T> extends SVGProps<SVGSVGElement> {
        css?: CSSProp
        tw?: string
    }
}

// The 'as' prop on styled components
declare global {
    namespace JSX {
        interface IntrinsicAttributes<T> extends DOMAttributes<T> {
            as?: string | Element
        }
    }
}
```

# 새로운 단위 정의하기

대부분의 브라우저는 디폴트 폰트 사이즈로 16px의 폰트 크기를 가지지만, 브라우저의 접근성 설정에서 디폴트 폰트 크기를 바꿀 수 있는 기능을 제공합니다. 하지만 유저가 웹사이트의 글씨를 더 크게 보고 싶어서 이 설정을 조정한다고 해도 웹사이트의 모든 단위가 px로 설정되어 있다면 아무것도 바뀌지 않게 됩니다. 디폴트 폰트 사이즈가 변경된다고 해서 우리가 직접 요소들에 넣어준 px 크기가 변경되지 않기 때문입니다.

카카오팀에서 집중했던 부분은 rem입니다. rem은 최상위 엘리먼트(html)에 지정된 폰트 사이즈를 기준으로 크기가 결정되는데, 최상위 엘리먼트에 폰트 사이즈를 임의로 명시하지 않으면 브라우저 기본값 (보통 16px)을 기준으로 크기가 결정됩니다 (1rem = 16px). rem을 사용한다면 유저가 브라우저 설정의 ‘접근성’ 기능을 통해 디폴트 텍스트 크기를 조정했을 때, 그에 따라 rem의 크기도 함께 변경되기 때문에 유저가 의도한 동작을 지원할 수 있게 됩니다.

카카오 팀은 `pxr`이라는 새로운 단위를 만들어 도입.
이 pxr 단위를 사용하면 디자인에 명시된 px 값을 그대로 사용할 수 있으며 (16pxr = 16px), 실제 페이지에는 rem 단위로 치환되어 적용되게 됩니다 (16pxr = 1rem).

```javascript
// tailwind.config.js

const pxToRem = (px, base = 16) => `${px / base}rem`;

module.export = {
  ...
  theme: {
    ...
    spacing: {
      ...range(1, 100).reduce((acc, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    }
  }
}
```

우린 카카오팀에서 만든 pxr의 설정을 조금 바꾸어 변경하였습니다.

```javascript
const pxToRem = (px, base = 16) => `${px / base}rem`
const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => index + start)
const getPxr = (end) => range(1, end).map((_, i) => pxToRem(i))
const pxr10 = getPxr(10)
const pxr100 = getPxr(100)
const pxr200 = getPxr(200)
const pxr500 = getPxr(500)

(...)

        extend: {
            spacing: pxr500,
            fontSize: pxr100,
            borderWidth: pxr10,
            lineHeight: pxr100,
            minWidth: pxr200,
            minHeight: pxr100,
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
}
export default config
```

자세한 내용은 다음 출처를 확인하세요.

[FE개발그룹에서는 Tailwind CSS를 왜 도입했고, 어떻게 사용했을까?](https://fe-developers.kakaoent.com/2022/221013-tailwind-and-design-system/)

# Issue

```json
{
    "plugins": ["babel-plugin-twin", "babel-plugin-macros"]
}
```
