import React from 'react';
import { Alert, Button, Modal } from '@/components/ui';
import { UserForm } from './UserForm';
import { PostForm } from './PostForm';

type EntityType = 'user' | 'post';

type Entity = {
  id: number;
  createdAt: string;
  views?: number;
};

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  entityType: EntityType;
  selectedItem: Entity | null;
  formData: any;
  onFormDataChange: (data: any) => void;
  onUpdate: () => void;
};

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  entityType,
  selectedItem,
  formData,
  onFormDataChange,
  onUpdate,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`}
      size="large"
      showFooter
      footerContent={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            취소
          </Button>
          <Button size="sm" onClick={onUpdate}>
            수정 완료
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {selectedItem && (
          <Alert variant="info">
            ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
            {entityType === 'post' && selectedItem.views !== undefined &&
              ` | 조회수: ${selectedItem.views}`}
          </Alert>
        )}

        {entityType === 'user' ? (
          <UserForm
            formData={formData}
            onFormDataChange={onFormDataChange}
            idPrefix="edit-"
          />
        ) : (
          <PostForm
            formData={formData}
            onFormDataChange={onFormDataChange}
            idPrefix="edit-"
          />
        )}
      </div>
    </Modal>
  );
};
