
import React, { useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, FolderPlus } from 'lucide-react';

interface ProjectContextMenuProps {
  x: number;
  y: number;
  item: any;
  onClose: () => void;
}

const ProjectContextMenu: React.FC<ProjectContextMenuProps> = ({ x, y, item, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuItems = item.type === 'folder' ? [
    { icon: Plus, label: 'New File', action: () => console.log('New file') },
    { icon: FolderPlus, label: 'New Folder', action: () => console.log('New folder') },
    { icon: Edit, label: 'Rename', action: () => console.log('Rename') },
    { icon: Trash2, label: 'Delete', action: () => console.log('Delete'), danger: true }
  ] : [
    { icon: Edit, label: 'Rename', action: () => console.log('Rename') },
    { icon: Trash2, label: 'Delete', action: () => console.log('Delete'), danger: true }
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bg-slate-700 border border-slate-600 rounded-lg shadow-xl py-1 z-50 min-w-[150px]"
      style={{ left: x, top: y }}
    >
      {menuItems.map((menuItem, index) => (
        <button
          key={index}
          onClick={() => {
            menuItem.action();
            onClose();
          }}
          className={`w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-slate-600 transition-colors ${
            menuItem.danger ? 'text-red-400 hover:text-red-300' : 'text-gray-300 hover:text-white'
          }`}
        >
          <menuItem.icon className="w-4 h-4" />
          {menuItem.label}
        </button>
      ))}
    </div>
  );
};

export default ProjectContextMenu;
