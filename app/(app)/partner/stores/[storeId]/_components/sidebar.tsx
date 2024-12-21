import { Branch } from '../_data/schema';
import BranchList from './branch-list';

export default function Sidebar({ branchs }: { branchs: Branch[] }) {
  return (
    <div className="flex basis-1/3 flex-col items-center bg-[#2d3439] px-8 py-4">
      <BranchList branchs={branchs} />
    </div>
  );
}
