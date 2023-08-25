import PageHeader from "@/components/HostPageHeader";
import DropeZone from "@/components/host/create/DropeZone";

export default function AddImages() {
  return (
    <>
      <PageHeader title="Add some photos of your place" description='choose up to 5 images to show your place' />
      <DropeZone />
    </>
  )
}
