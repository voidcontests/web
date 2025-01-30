import { getContest } from '@/actions/actions';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'THE VOID* :: Contest';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { cid: string } }) {
    const [contest, rubikRegular, rubikMedium] = await Promise.all([
        getContest(params.cid),
        fetch(new URL('../../../../fonts/Rubik-Regular.ttf', import.meta.url)).then(res => res.arrayBuffer()),
        fetch(new URL('../../../../fonts/Rubik-Medium.ttf', import.meta.url)).then(res => res.arrayBuffer())
    ]);

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#efefef',
                        width: '100%',
                        height: '98%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: '5%'
                    }}
                >
                    <span
                        style={{
                            color: '#4d96ff',
                            fontWeight: 500,
                            fontSize: 72,
                        }}
                    >
                        THE VOID* :: Contest
                    </span>
                    <span
                        style={{
                            color: '#040406',
                            fontWeight: 400,
                            fontSize: 100,
                        }}
                    >
                        {contest.title}
                    </span>
                </div>
                <div
                    style={{ background: '#4d96ff', width: '100%', height: '2%' }}
                >
                </div>
            </div >
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Rubik',
                    data: rubikRegular,
                    style: 'normal',
                    weight: 400,
                },
                {
                    name: 'Rubik',
                    data: rubikMedium,
                    style: 'normal',
                    weight: 500,
                },
            ],
        }
    )
}