import BordDetailPage from "@/modules/bord-detail/BordDetailPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  return <BordDetailPage id={resolvedParams.id} />;
};

export default page;
