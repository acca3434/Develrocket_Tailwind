'use client'
import Link from 'next/link'
import { ReactNode } from 'react'

interface PageProps {}

interface VisualProps {
    alt?: string
    children?: ReactNode
}
const Visual: React.FC<VisualProps> = ({ alt, children }) => {
    return (
        <div className="w-screen h-screen bg-[url('https://www.kiweb.or.kr/assets/front/img/develrocket2/main-bg.jpg')] md:bg-center  bg-[-1100px] bg-no-repeat">
            {children}
        </div>
    )
}

const KaKaoButton: React.FC = () => (
    <svg
        width="284"
        height="48"
        viewBox="0 0 284 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <rect width="284" height="48" fill="url(#pattern0)" />
        <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_6_18" transform="matrix(0.00223214 0 0 0.0132068 0 -0.00186012)" />
            </pattern>
            <image
                id="image0_6_18"
                width="448"
                height="76"
                xlinkHref="data:image/png;base64,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"
            />
        </defs>
    </svg>
)

const Page: React.FC<PageProps> = () => {
    return (
        <>
            <Visual>
                {/* <div className="md:absolute left-1/2 md:transform md:-translate-x-1/2"> */}
                {/* <div className="absolute md:m-auto md:left-0 md:right-0 flex justify-between align-items max-w-[1200px] h-[33px] "> */}
                <div className="relative flex flex-col max-w-[1200px] m-auto pt-4 justify-between h-full">
                    <div className="flex justify-center w-full align-items md:justify-between ">
                        <h1>
                            <Link href="/">
                                <img
                                    src="https://www.kiweb.or.kr/assets/front/img/block_logo.png"
                                    className="md:w-[255px] w-[150px]"
                                />
                            </Link>
                        </h1>
                        <nav className="hidden space-x-16 md:block">
                            <Link href="/" className="text-white text-xl hover:text-[#666]">
                                About
                            </Link>
                            <Link href="/" className="text-white text-xl hover:text-[#666]">
                                About
                            </Link>
                            <Link href="/" className="text-white text-xl hover:text-[#666]">
                                About
                            </Link>
                        </nav>
                    </div>
                    <div className="p-4 md:p-0">
                        <p className="md:text-[34px] md:text-left text-xl text-center text-white font-NanumGothic font-tiny">
                            이륙할 준비가 되셨나요?
                        </p>
                        <p className="md:text-52 md:p-0 mt-4 pl-7 pr-7 text-white font-NanumSquare text-center md:text-left md:leading-[3rem]">
                            <span className="font-bold">새로운 세상</span>
                            <span className="opacity-80">을 위한</span>
                            <br />
                            <span className="font-bold">앞서가는 개발자</span>
                            <span className="opacity-80">취업 프로젝트</span>
                        </p>
                    </div>
                    <div className="grid w-full grid-cols-1 p-5 md:grid-cols-3 h-210 mb-50 md:p-0">
                        <div className="flex flex-col justify-between pt-[16px] bg-white rounded-2xl">
                            <p className="col-span-2 text-center text-20 text-[#3d006d] font-NanumGothic font-bold">
                                D-STATION
                                <span className="ml-10 text-[#000] font-NanumSquare font-normal">
                                    디벨로켓 학습플랫폼
                                </span>
                            </p>
                            <div className="m-auto mb-32">
                                <button>
                                    <KaKaoButton />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 transform -translate-x-1/2 bg-white h-80 w-80 left-1/2">
                    <i className="fa-solid fa-circle-arrow-down"></i>
                    <span tw="text-[#ff0000]">animate-bounce</span>
                </div>
            </Visual>
            {/* <div className="m-auto w-[1180px] bg-white ">
                <div className="grid grid-cols-3 w-full h-[210px]">
                    <div className="flex flex-col justify-between pt-[16px]">
                        <p className="col-span-2 text-center text-[20px] text-[#3d006d] font-NanumGothic font-bold">
                            D-STATION
                            <span className="ml-[10px] text-[#000] font-NanumSquare font-normal">
                                디벨로켓 학습플랫폼
                            </span>
                        </p>
                        <div className="mb-[32px] m-auto">
                            <button>
                                <KaKaoButton />
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2">공지사항</div>
                </div>
            </div> */}

            {/* <div className="px-4 pt-6">
                <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-3 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0">
                                <span className="text-xl font-bold leading-none text-gray-900 sx:text-2xl dart:text-white">
                                    운영 과정
                                </span>
                                <h3 className="text-base font-light text-gary-500 dart:text-gray-400">
                                    현재 과정이 진행되고 있는 과정 목록입니다.
                                </h3>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                    <thead className="bg-gray-100 dart:bg-gray-700">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="p-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                                            >
                                                과정명
                                            </th>
                                            <th
                                                scope="col"
                                                className="p-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                                            >
                                                회차
                                            </th>
                                            <th
                                                scope="col"
                                                className="p-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                                            >
                                                수업기간
                                            </th>
                                            <th
                                                scope="col"
                                                className="p-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                                            >
                                                담당교수
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td className="p-4 text-xs font-normal text-center text-gray-500 whitespace-nowrap">
                                                생산형 AI를 활용한 게임 기획자 과정
                                            </td>
                                            <td className="p-4 text-xs font-normal text-center text-gray-500 whitespace-nowrap">
                                                1회차
                                            </td>
                                            <td className="p-4 text-xs font-normal text-center text-gray-500 whitespace-nowrap">
                                                2023-09-01 ~ 2024-04-18
                                            </td>
                                            <td className="p-4 text-xs font-normal text-center text-gray-500 whitespace-nowrap">
                                                김기원, 김두년, 최지웅
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex items-center justify-end flex-1 text-base font-medium"></div>
                    </div>
                    <div>asdf</div>
                    <div>asdf</div>
                </div>
            </div> */}
        </>
    )
}

export default Page
