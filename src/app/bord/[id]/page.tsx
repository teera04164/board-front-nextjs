import BordDetailPage from "@/modules/bord-detail/BordDetailPage";

interface PageProps {
  params: {
    id: string;
  };
}

const page = ({ params }: PageProps) => {
  const id = params.id;
  return <BordDetailPage id={id}/>;
};

export default page;
