import Sidebar from "@/components/dashboard/Sidebar";

export default function DashBoardPage() {
  return (
    <div className="container py-6 md:py-14">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/5">
          <Sidebar />
        </div>
        <div className="md:w-4/5">MainContents</div>
      </div>
    </div>
  );
}
