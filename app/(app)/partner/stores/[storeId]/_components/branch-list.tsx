import { Branch } from '../_data/schema';
import BranchItem from './branch-item';

export default function BranchList({ branchs }: { branchs: Branch[] }) {
  if (!branchs.length) {
    return (
      <p className="mx-auto my-5 w-4/5 text-center text-[18px] font-semibold text-[#ececec]">
        <span role="img">👋</span> Add your first branch by clicking on a city
        on the map
      </p>
    );
  }

  return (
    <ul className="flex h-[65vh] w-full list-none flex-col gap-6 overflow-x-hidden overflow-y-scroll scrollbar-hide">
      {branchs.map((branch) => (
        <BranchItem branch={branch} key={branch.id} />
      ))}
    </ul>
  );
}
