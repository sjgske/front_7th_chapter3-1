import React from 'react';
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

type UserFormData = {
  username?: string;
  email?: string;
  role?: string;
  status?: string;
};

type UserFormProps = {
  formData: UserFormData;
  onFormDataChange: (data: UserFormData) => void;
  idPrefix?: string;
};

export const UserForm: React.FC<UserFormProps> = ({
  formData,
  onFormDataChange,
  idPrefix = '',
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}username`}>
          사용자명 <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`${idPrefix}username`}
          value={formData.username || ''}
          onChange={(e) =>
            onFormDataChange({ ...formData, username: e.target.value })
          }
          placeholder="사용자명을 입력하세요"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}email`}>
          이메일 <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`${idPrefix}email`}
          type="email"
          value={formData.email || ''}
          onChange={(e) =>
            onFormDataChange({ ...formData, email: e.target.value })
          }
          placeholder="이메일을 입력하세요"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>역할</Label>
          <Select
            value={formData.role || 'user'}
            onValueChange={(value) =>
              onFormDataChange({ ...formData, role: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="역할 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">사용자</SelectItem>
              <SelectItem value="moderator">운영자</SelectItem>
              <SelectItem value="admin">관리자</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>상태</Label>
          <Select
            value={formData.status || 'active'}
            onValueChange={(value) =>
              onFormDataChange({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="상태 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">활성</SelectItem>
              <SelectItem value="inactive">비활성</SelectItem>
              <SelectItem value="suspended">정지</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};