import { client } from "../.tina/__generated__/client";
// import { useTina } from "tinacms/dist/edit-state";

const DynamicPage = (props) => {
    console.log(props)
    // const { data } = useTina({
    //     query: props.query,
    //     variables: props.variables,
    //     data: props.data,
    // })
    // <Layout rawData={data} data={data.global}>
    //     <Blocks {...data.page} />
    // </Layout>
    return (
        <>
            <h1>hello</h1>
        </>
    )}
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