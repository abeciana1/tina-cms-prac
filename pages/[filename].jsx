import { client } from "../.tina/__generated__/client";
// import { useTina } from "tinacms/dist/edit-state";

const DynamicPage = (props) => {
    console.log(props)
    return (
        <>
        </>
    )
}

export default DynamicPage

export const getStaticProps = async ({ params }) => {
    const tinaProps = await client.queries.contentQuery({
        relativePath: `${params.filename}.md`,
    });
    return {
        props: {
        data: tinaProps.data,
        query: tinaProps.query,
        variables: tinaProps.variables,
        },
    };
};

export const getStaticPaths = async () => {
    const pagesListData = await client.queries.pageConnection();
    return {
        paths: pagesListData.data.pageConnection.edges.map((page) => ({
        params: { filename: page.node._sys.filename },
        })),
        fallback: false,
    };
};