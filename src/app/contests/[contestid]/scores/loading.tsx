import TableTemplate from '@/components/templates/table';
import ContentContainer from '@/containers/content';

export default function Loading() {
    return (
        <ContentContainer>
            <TableTemplate title="SCORES" caption='Loading...' />
        </ContentContainer>
    );
}
