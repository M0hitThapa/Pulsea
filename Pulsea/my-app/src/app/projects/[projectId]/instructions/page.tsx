const Page = async ({
  params,
}: {
  params: Promise<{
    projectId: string;
  }>;
}) => {
  const { projectId } = await params;
  return (
    <div>
      <h1>Start collecting feedback </h1>
      <p>Embed this code in your website</p>
      <code>
        {`<my-widget project=${projectId}></my-widget>`}
        {`<script src=${process.env.WIDGET_URL}/widget.umd.js></script>`}
      </code>
    </div>
  );
};

export default Page;
