import ContentContainer from '@/containers/content';
import TableTemplate from '@/components/templates/table';

export default function Loading() {
    return (
        <ContentContainer>
            <TableTemplate title="PUBLIC CONTESTS" caption="Loading..." />
        </ContentContainer>
    );
}
