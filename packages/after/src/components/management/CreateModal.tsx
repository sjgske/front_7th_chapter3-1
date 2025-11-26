import React from 'react';
import { Button, Modal } from '@/components/ui';
import { UserForm } from './UserForm';
import { PostForm } from './PostForm';

type EntityType = 'user' | 'post';

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  entityType: EntityType;
  formData: any;
  onFormDataChange: (data: any) => void;
  onCreate: () => void;
};

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  entityType,
  formData,
  onFormDataChange,
  onCreate,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}
      size="large"
      showFooter
      footerContent={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            취소
          </Button>
          <Button size="sm" onClick={onCreate}>
            생성
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {entityType === 'user' ? (
          <UserForm
            formData={formData}
            onFormDataChange={onFormDataChange}
            idPrefix="create-"
          />
        ) : (
          <PostForm
            formData={formData}
            onFormDataChange={onFormDataChange}
            idPrefix="create-"
          />
        )}
      </div>
    </Modal>
  );
};
