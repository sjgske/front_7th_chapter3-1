import React from 'react';
import { Button } from '@/components/ui';

type EntityType = 'user' | 'post';

type EntityTypeTabsProps = {
  entityType: EntityType;
  onEntityTypeChange: (type: EntityType) => void;
};

export const EntityTypeTabs: React.FC<EntityTypeTabsProps> = ({
  entityType,
  onEntityTypeChange,
}) => {
  return (
    <div className="mb-4 border-b-2 border-gray-300 pb-1.5">
      <Button
        variant={entityType === 'post' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onEntityTypeChange('post')}
        className="mr-1.5"
      >
        게시글
      </Button>
      <Button
        variant={entityType === 'user' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onEntityTypeChange('user')}
      >
        사용자
      </Button>
    </div>
  );
};
