import { Branch } from '../_data/schema';
import BranchItem from './branch-item';

export default function BranchList({ branchs }: { branchs: Branch[] }) {
  return (
    <ul className="flex h-[65vh] w-full list-none flex-col gap-6 overflow-x-hidden overflow-y-scroll scrollbar-hide">
      {branchs.map((branch) => (
        <BranchItem branch={branch} key={branch.id} />
      ))}
    </ul>
  );
}
