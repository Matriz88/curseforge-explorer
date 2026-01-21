import type { Mod } from '../../api/types';
import { ModCard } from './ModCard';

interface ModsListProps {
  mods: Mod[];
}

export const ModsList = ({ mods }: ModsListProps) => {
  if (mods.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No mods found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mods.map((mod) => (
        <ModCard key={mod.id} mod={mod} />
      ))}
    </div>
  );
};
